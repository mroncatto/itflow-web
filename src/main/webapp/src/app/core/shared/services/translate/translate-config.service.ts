import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ILanguage } from '../../commons/interface/language';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, enGbLocale, esLocale, ptBrLocale } from 'ngx-bootstrap/chronos';


@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {

  private languages : ILanguage[] = [
    { id: "en", name: "English" },
    { id: "es", name: "Español" },
    { id: "pt", name: "Português" }
  ];

  protected currentLang: string = "en";
  private browserLang: string = window.navigator.language.substring(0, 2);

  constructor(private translate: TranslateService, private http: HttpClient, private localeService: BsLocaleService) {
    this.translate.use('en');
    // Load language from browser language if exists
    this.languages.forEach(l => {
      if (l.id === this.browserLang) this.currentLang = this.browserLang
    })

    // If exists language on localStorage then overwrite it
    let localStorageLang = this.getLangFromLocalStorage();
    if (localStorageLang) this.currentLang = localStorageLang;

    //Update the service language
    this.onChangeLanguage(this.currentLang);
  }

  private setLanguage(type: string) {
    this.translate.use(type);
    this.defineLocale(type);
    this.localeService.use(type);
  }

  private defineLocale(locale: string): void {
    switch(locale) {
      case "en":
        defineLocale('en-gb', enGbLocale);
        break;
      case "es":
        defineLocale('es', esLocale);
        break;
      case "pt":
        defineLocale('pt', ptBrLocale);
        break;
    }
  }

  onChangeLanguage(currentLang: string): void {
    this.setLanguage(currentLang);
    localStorage.setItem("lang", currentLang);
  }

  private getLangFromLocalStorage(): string | null {
    return localStorage.getItem("lang");
  }

  getAvailableLanguages(): any {
    return this.languages;
  }

  instant(value: string, param?: any): string {
    return this.translate.instant(value, param);
  }

  get currentLanguage(): string {
    return this.currentLang;
  }
}
