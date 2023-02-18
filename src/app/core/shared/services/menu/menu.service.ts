import { Injectable, Injector } from '@angular/core';
import { MenuItem } from '../../commons/interface/item-menu';
import { ILanguage } from '../../commons/interface/language';
import { AbstractService } from '../abstract/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends AbstractService {

  constructor(injector: Injector) {
    super(injector);
  }

  private readonly menuList: Record<string, MenuItem> = {
    menu_divider_helpdesk: new MenuItem().type('divider').translate('menu.helpdesk'),
    menu_divider_manage: new MenuItem().type('divider').translate('menu.manage'),
    menu_divider_device: new MenuItem().type('divider').translate('menu.devices'),
    menu_staff: new MenuItem().icon('fa-users').routerLink('/staff').translate('menu.staff'),
    menu_account: new MenuItem().icon('fa-user-circle').routerLink('/users').translate('menu.usersAccount'),
    menu_device: new MenuItem().icon('fa-desktop').routerLink('/device').translate('menu.devices'),
  };

  getCurrentLang(): string {
    return this.translateService.currentLanguage;
  }

  getLanguages(): ILanguage[] {
    return this.translateService.getAvailableLanguages();
  }

  onLoadTheme(): void {
    const selectedTheme = localStorage.getItem('selected-theme');

    switch (selectedTheme) {
      case 'dark':
        this.setThemeMode('dark');
        break;
      case 'light':
        this.setThemeMode('light');
        break;
      default:
        this.setThemeMode('light');
    }
  }

  onChangeTheme(): void {
    const selectedTheme = localStorage.getItem('selected-theme');

    switch (selectedTheme) {
      case 'dark':
        this.setThemeMode('light');
        break;
      case 'light':
        this.setThemeMode('dark');
        break;
      default:
        this.setThemeMode('light');
    }
  }

  private setThemeMode(theme: string) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('selected-theme', theme);
  }

  onChangeLanguage(currentLang: string): void {
    this.translateService.onChangeLanguage(currentLang);
  }

  getIconTheme(): string {
    const selectedTheme = localStorage.getItem('selected-theme');
    switch (selectedTheme) {
      case 'dark':
        return "fa-sun";
      default:
        return "fa-moon";
    }
  }


  getMenuList(): MenuItem[] {
    const menu: MenuItem[] = [];

    // HelpDesk 
    this.getHelpdeskDivider(menu);
    this.getStaffMenu(menu);
    this.checkEmptyMenuBlock(menu)

    // Accounts
    this.getAccountDivider(menu);
    this.getAccountMenu(menu);
    this.checkEmptyMenuBlock(menu)

    // Devices
    this.getDeviceDivider(menu);
    this.getDeviceMenu(menu);
    this.checkEmptyMenuBlock(menu)

    return menu;
  }

  private checkEmptyMenuBlock(menu: MenuItem[]): void {
    if (menu[menu.length - 1].isMenuDivider()) menu.pop();
  }

  private getHelpdeskDivider(menu: MenuItem[]): void {
    menu.push(this.menuList['menu_divider_helpdesk']);
  }

  private getStaffMenu(menu: MenuItem[]): void {
    menu.push(this.menuList['menu_staff']);
  }

  private getAccountDivider(menu: MenuItem[]): void {
    menu.push(this.menuList['menu_divider_manage']);
  }

  private getAccountMenu(menu: MenuItem[]): void {
    if (this.canOpenUsers()) menu.push(this.menuList['menu_account']);
  }

  private getDeviceDivider(menu: MenuItem[]): void {
    menu.push(this.menuList['menu_divider_device']);
  }

  private getDeviceMenu(menu: MenuItem[]): void {
    // TODO: Falta policy
    menu.push(this.menuList['menu_device']);
  }
}
