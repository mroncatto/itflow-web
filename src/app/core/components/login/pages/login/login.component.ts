import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IAuthResponse } from '../../../user/model/auth-response';
import { LoginService } from '../../services/login.service';
import { TranslateMessages } from 'src/app/core/shared/commons/enum/translate-messages.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: UntypedFormGroup;
  authentication!: IAuthResponse;
  private redirect!: string;
  loading: boolean = false;
  messages = TranslateMessages;

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
    this.activatedRouter.queryParams.subscribe(
      query => {
        if (query['redirect']) {
          this.redirect = this.removeQueries(query['redirect']);
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
    if (this.authentication.user.password_expired) {
      this.loginService.onWarning("attention", "passwordExpired");
      this.loginService.navigate('profile');
    } else {
      this.loginService.navigate(this.redirect ? this.redirect : 'dashboard');
    }
  }

  private removeQueries(url: string): string {
    return url.split('?')[0];
  }

}
