import { Injectable } from '@angular/core';
import { getData } from '../../db/db';
import { BehaviorSubject } from 'rxjs';
import { card } from '../../db/type';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: card[] = getData().map(d => { return { ...d, count: 0 } })
  data$ = new BehaviorSubject<card[]>(this.data)
  constructor() { }

  addToStore(i: number) {
    const index = this.data.findIndex(f => f.id === i)
    this.data[index].count += 1
  }

  removeFromStore(i: number) {
    const index = this.data.findIndex(f => f.id === i)
    if (this.data[index].count > 0) {
      this.data[index].count -= 1;
      this.data$.next([...this.data]);
    }
  }

  getPrice() {
    let totalPrice = 0;
    for (const d of this.data) {
      totalPrice += d.price * (d?.count ?? 0);
    }
    return Math.round(totalPrice * 100) / 100
  }

}
