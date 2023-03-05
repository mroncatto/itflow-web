import { Injectable, Injector } from '@angular/core';
import { MenuItem } from '../../commons/interface/item-menu';
import { ILanguage } from '../../commons/interface/language';
import { TopbarMenu } from '../../commons/interface/topbar-menu';
import { TopbarSubMenu } from '../../commons/interface/topbar-submenu';
import { TopbarSubMenuItem } from '../../commons/interface/topbar-submenu-item';
import { AbstractService } from '../abstract/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends AbstractService {

  constructor(injector: Injector) {
    super(injector);
  }


  /* ======================================================================================== */
  private readonly mainMenu: Record<string, MenuItem> = {
    menu_divider_helpdesk: new MenuItem().type('divider').translate('menu.helpdesk'),
    menu_divider_manage: new MenuItem().type('divider').translate('menu.manage'),
    menu_divider_device: new MenuItem().type('divider').translate('menu.devices'),
    menu_staff: new MenuItem().icon('fa-users').routerLink('/staff').translate('menu.staff'),
    menu_account: new MenuItem().icon('fa-user-circle').routerLink('/users').translate('menu.usersAccount'),
    menu_device: new MenuItem().icon('fa-desktop').routerLink('/device').translate('menu.devices'),
  };

  private readonly submenu: Record<string, TopbarSubMenu> = {
    menu_company: new TopbarSubMenu().setName('company.company').setIcon('fa-building').setItems(
      new TopbarSubMenuItem().setName('company.companies').setRouter('company/register').setPageParam('company'),
      new TopbarSubMenuItem().setName('branch.branches').setRouter('company/register').setPageParam('branch'),
      new TopbarSubMenuItem().setName('department.departments').setRouter('company/register').setPageParam('department'),
    ),
    menu_staff: new TopbarSubMenu().setName('staff.staff').setIcon('fa-users').setItems(
      new TopbarSubMenuItem().setName('occupation.occupation').setRouter('staff/register').setPageParam('occupation'),
    ),
    menu_device: new TopbarSubMenu().setName('device.devices').setIcon('fa-desktop').setItems(
      new TopbarSubMenuItem().setName('device.category').setRouter('device/register').setPageParam('device'),
    ),
  }
  /* ======================================================================================== */

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


  getTopbarMenu(): TopbarMenu[] {
    const menu: TopbarMenu[] = [];

    // Register
    this.registerMenu(menu);

    return menu;
  }

  private registerMenu(menu: TopbarMenu[]): void {
    const register = new TopbarMenu().setName('commons.register').setMenuId('register-menu');
    if (this.canCreateDeviceRecords()) register.submenu.push(this.submenu['menu_device']);
    if (this.canCreateCompanyRecords()) register.submenu.push(this.submenu['menu_company']);
    if (this.canCreateStaffRecords()) register.submenu.push(this.submenu['menu_staff']);

    if (!register.isEmpty()) menu.push(register)
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
    menu.push(this.mainMenu['menu_divider_helpdesk']);
  }

  private getStaffMenu(menu: MenuItem[]): void {
    menu.push(this.mainMenu['menu_staff']);
  }

  private getAccountDivider(menu: MenuItem[]): void {
    menu.push(this.mainMenu['menu_divider_manage']);
  }

  private getAccountMenu(menu: MenuItem[]): void {
    if (this.canOpenUsers()) menu.push(this.mainMenu['menu_account']);
  }

  private getDeviceDivider(menu: MenuItem[]): void {
    menu.push(this.mainMenu['menu_divider_device']);
  }

  private getDeviceMenu(menu: MenuItem[]): void {
    if (this.canOpenDevices()) menu.push(this.mainMenu['menu_device']);
  }

}
