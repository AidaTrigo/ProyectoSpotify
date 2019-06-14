import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {

  constructor(public storage: StorageService, private router: Router) { }

  ngOnInit() {
  }

  openAbout() {
    this.router.navigate(['/about']);
  }

}
