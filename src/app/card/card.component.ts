import { Component, Input } from '@angular/core';
import { card } from '../../db/type';
import { DataService } from '../data/data.service';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe, NgIf, AsyncPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() c!: card

  constructor(public data: DataService) { }

  isDecreasable() {
    let ret
    this.data.data$.subscribe(val => val.find(f => f.id === this.c.id)?.count ?? 0 > 0 ? ret = true : ret = false)
    return ret
  }
}
