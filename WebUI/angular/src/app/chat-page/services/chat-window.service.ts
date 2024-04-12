import { Injectable } from '@angular/core';

@Injectable()
export class ChatWindowServise {
    public counter = 0;

    public upCount(): void {
        this.counter = this.counter++;
    }
}
