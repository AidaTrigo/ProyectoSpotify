import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styles: []
})
export class LoadingComponent implements OnInit {

  constructor(public storage: StorageService) { }

  ngOnInit() {
  }

}
