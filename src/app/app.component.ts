import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from './service/seo.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angularssr';
  constructor(private seoService: SeoService) {}
  ngOnInit() {
    this.seoService.setSEOData(
      'Angularssr',
      'Angularssr',
    );
  }
}
