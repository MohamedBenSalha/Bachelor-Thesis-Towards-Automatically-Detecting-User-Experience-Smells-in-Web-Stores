import {Component, OnInit} from '@angular/core';
import {MatomoTracker} from '@ngx-matomo/tracker';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  constructor(private matomoTracker: MatomoTracker) {
  }

  ngOnInit(): void {
    let loc = document.referrer.toString();
    if (loc != null && loc.length > 0)
      this.matomoTracker.trackLink(loc, 'link');
    console.log('404 Event are being tracked...');
    let fourohfour = document.getElementsByClassName('error-four-oh-four');
    if (fourohfour.length > 0) {
      console.log('404 page recognised!');
      this.matomoTracker.trackEvent('Page', 'Error Page');
    }
  }
}
