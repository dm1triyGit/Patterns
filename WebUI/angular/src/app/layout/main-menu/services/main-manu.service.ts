import { Injectable } from '@angular/core';
import { Observable, filter, of } from 'rxjs';
import { MainMenuItem } from '../types';

const MENU_ITEMS_MOCK: MainMenuItem[] = [
  { id: 0, src: '/start', title: 'Home' },
  { id: 1, src: '/chat', title: 'Chat' },
];

@Injectable()
export class MainMenuService {
  public getMeniItems(): Observable<MainMenuItem[]> {
    return of(MENU_ITEMS_MOCK).pipe(filter((items) => items?.length > 0));
  }
}
