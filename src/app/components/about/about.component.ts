import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styles: []
})
export class AboutComponent implements OnInit {

  constructor(public storage: StorageService, private titleService: Title) {
    this.titleService.setTitle('About - ' + this.titleService.getTitle());
  }

  ngOnInit() {
  }

}
