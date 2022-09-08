import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {MatomoTracker} from '@ngx-matomo/tracker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private matomoTracker: MatomoTracker
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data && child.snapshot.data['title']) {
              return child.snapshot.data['title'];
            } else {
              return null;
            }
          }
          return null;
        })
      )
      .subscribe((data: any) => {
        if (data) {
          this.titleService.setTitle(data);
        }
      });
  }

  ngOnInit() {
    // console.log("Referrer and Location are being determined...")
    // let referrer = document.referrer;
    // let location = document.location.toString();
    // let path: string = referrer + "->" + location;
    // if (path.length > 0 && referrer !== location) {
    //   console.log("Navigation has been tracked");
    //   this.matomoTracker.trackEvent("Page Flow", "Navigation", path)
    // }
  }
}
