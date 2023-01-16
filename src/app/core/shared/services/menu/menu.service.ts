import { Injectable, Injector } from '@angular/core';
import { ILanguage } from '../../commons/interface/language';
import { AbstractService } from '../abstract/abstract.service';
import { TranslateConfigService } from '../translate/translate-config.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends AbstractService {

  constructor(injector: Injector) {
    super(injector);
  }

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
        this.setDarkMode();
        break;
      case 'light':
        this.setLightMode();
        break;
      default:
        this.setLightMode();
    }
  }

  onChangeTheme(): void {
    const selectedTheme = document.body.getAttribute('data-theme');

    switch (selectedTheme) {
      case 'dark':
        this.setLightMode();
        break;
      case 'light':
        this.setDarkMode();
        break;
      default:
        this.setDarkMode();
    }
  }

  onChangeLanguage(currentLang: string): void {
    this.translateService.onChangeLanguage(currentLang);
  }

  private setDarkMode(): void {
    const themeButton = document.getElementById('theme-button');
    themeButton?.classList['remove']('fa-toggle-off');
    themeButton?.classList['add']('fa-toggle-on');
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('selected-theme', 'dark');
  }

  private setLightMode(): void {
    const themeButton = document.getElementById('theme-button');
    themeButton?.classList['remove']('fa-toggle-on');
    themeButton?.classList['add']('fa-toggle-off');
    document.body.setAttribute('data-theme', 'light');
    localStorage.setItem('selected-theme', 'light');
  }
}
