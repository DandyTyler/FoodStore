import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {
  }

  getAll(): Observable<any> {
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges();
    // то, что должно работать
    // return this.db.list('/categories', ref => ref.orderByChild('name')).valueChanges();
  }
}
