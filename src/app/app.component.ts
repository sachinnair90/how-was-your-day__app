import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  static DEFAULT_LANG = 'en';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(AppComponent.DEFAULT_LANG);
  }
}
