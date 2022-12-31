import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IAuthResponse } from '../../../user/model/auth-response';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  authentication!: IAuthResponse;
  private redirect!: string;
  loading: boolean = false;

  constructor(
    private loginService: LoginService,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadForm();
    this.readUrlParam();
    this.checkIfLogIn();
  }

  checkIfLogIn(): void {
    this.loginService.isLogIn().subscribe({
      next: (rs) => { if (rs) this.loginService.navigate('dashboard') }
    }).unsubscribe();
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.loginService.login(this.loginService.createDataForm(this.loginForm.value)).subscribe({
        next: (data) => this.authentication = data,
        error: (err) => {
          this.loginService.onHttpError(err);
          this.loading = false;
          this.loginForm.reset();
        },
        complete: () => this.onAuthenticate(),
      })
    }
  }

  private readUrlParam(): void {
    //TODO: Preparar para usar urls com parametros!!!
    this.activatedRouter.queryParams.subscribe(
      query => {
        if (query['redirect']) {
          this.redirect = query['redirect'];
        }
      }
    ).unsubscribe();
  }

  private loadForm(): void {
    this.loginForm = this.loginService.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  private onAuthenticate(): void {
    this.loginService.saveCredentials(this.authentication);
    this.loginService.navigate(this.redirect ? this.redirect : 'dashboard');
  }

}
