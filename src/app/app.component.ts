import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from './shared/shared.module';
import {AsyncPipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {LanguageStoreService} from './stores/language-store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, SharedModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'untitled';
constructor(private languageStoreService: LanguageStoreService) {
  languageStoreService.language$.subscribe((language) => {
    this.title = language;
  })
}

switchLanguage(language: string) {
  this.languageStoreService.changeLanguage(language);
}

}
