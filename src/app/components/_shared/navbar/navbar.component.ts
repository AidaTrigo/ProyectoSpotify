import { Component } from '@angular/core';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(public storage: StorageService) {}

}
