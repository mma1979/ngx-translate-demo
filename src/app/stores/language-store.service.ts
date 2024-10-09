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
    if(language === 'ar') {
      document.querySelector('body')!.dir = 'rtl'
    }else{
      document.querySelector('body')!.dir = 'ltr'
    }
  }
}
