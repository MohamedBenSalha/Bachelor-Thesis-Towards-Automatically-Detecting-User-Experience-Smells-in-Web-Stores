import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-datenschutz',
  templateUrl: './datenschutz.component.html',
  styleUrls: ['./datenschutz.component.css'],
})
export class DatenschutzComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.navigate(['error'], {skipLocationChange: true});
  }
}
