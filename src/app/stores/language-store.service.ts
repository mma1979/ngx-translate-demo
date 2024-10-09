import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageStoreService {
languageSubject = new BehaviorSubject<string>(localStorage.getItem('language') || 'en');
language$ = this.languageSubject.asObservable();
  constructor(translate: TranslateService) {
    this.language$.subscribe(language => {
      translate.setDefaultLang(language);
      this.updateUI(language)
    })
  }

  changeLanguage(language: string) {
    this.languageSubject.next(language);
    localStorage.setItem('language', language);

    this.updateUI(language)
  }

  updateUI(language: string) {
    document.querySelector('body')!.lang = language
    let themeLink = document.getElementById('rtl-style') as HTMLLinkElement;

    if(language === 'ar') {
      document.querySelector('body')!.dir = 'rtl'
      themeLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css'
    }else{
      document.querySelector('body')!.dir = 'ltr'
      themeLink.href = ''
    }
  }
}
