import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { DataService } from './data/data.service';
import { CardComponent } from './card/card.component';
import { ContactComponent } from './contact/contact.component';
import { BehaviorSubject } from 'rxjs';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, CardComponent, NgFor, NgIf, CurrencyPipe, ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  showContact$ = new BehaviorSubject<boolean>(false)

  constructor(public data: DataService) {
  }

  ngOnInit(): void {
  }

  onCheckout() {
    this.showContact$.next(true)
  };

}
