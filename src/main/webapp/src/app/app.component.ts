import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './core/components/user/model/user';
import { MenuItem } from './core/shared/commons/interface/item-menu';
import { ILanguage } from './core/shared/commons/interface/language';
import { TopbarMenu } from './core/shared/commons/interface/topbar-menu';
import { AuthenticationService } from './core/shared/services/authentication/authentication.service';
import { MenuService } from './core/shared/services/menu/menu.service';
import { TranslateMessages } from './core/shared/commons/enum/translate-messages.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user!: IUser | null;
  currentLang: string = '';
  languages: ILanguage[] = [];
  readonly version: string = environment.version;
  messages = TranslateMessages;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private menuService: MenuService,
    private title: Title
  ) {
    this.authService.getLoggedInName.subscribe(user => {
      this.user = user;
    });
    this.loadLang();
    this.title.setTitle('ITFLOW');
  }

  getMenu(): MenuItem[] {
    return this.menuService.getMenuList();
  }

  getTopbarMenu(): TopbarMenu[] {
    return this.menuService.getTopbarMenu();
  }

  isLoggedIn(): Observable<boolean> {
    return this.authService.isLoggedIn;
  }

  ngOnInit(): void {
    this.menuService.onLoadTheme();
    if (!this.user) this.loadUser(); 
  }

  getIconTheme(): string {
    return this.menuService.getIconTheme();
  }

  onChangeTheme(): void {
    this.menuService.onChangeTheme();
  }

  onChangeLanguage(): void {
    this.menuService.onChangeLanguage(this.currentLang);
  }

  onLogout(): void {
    this.authService.removeCredentials().then(() => {
      this.router.navigate(['/login']);
    });
  }

  private loadUser(): void {
    this.user = this.authService.getUserFromSessionStorage();
  }

  private loadLang(): void {
    this.currentLang = this.menuService.getCurrentLang();
    this.languages = this.menuService.getLanguages();
  }

  canOpenUsers(): boolean {
    return this.menuService.canOpenUsers();
  }

}
