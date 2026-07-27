import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'invitacion-digital';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {

    if (isPlatformBrowser(this.platformId)) {

      this.router.events
        .pipe(
          filter(event => event instanceof NavigationEnd)
        )
        .subscribe(async () => {

          const AOS = await import('aos');

          setTimeout(() => {
            AOS.default.refreshHard();
          }, 500);

        });

    }

  }

}