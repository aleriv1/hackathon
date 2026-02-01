import { Module } from '../core/module';
import { randomHex } from '../core/module';

export class BackgroundModule extends Module {
  constructor() {
    super('background', 'Случайный фон');
    this.$body = document.body;
    this.color = localStorage.getItem('appBgColor');
  }

  trigger() {
    if (this.color) {
      const chooseNew = confirm('Хотите выбрать новый цвет?');
      if (chooseNew) {
        this.color = randomHex();
      }
    } else {
      this.color = randomHex();
    }

    this.$body.style.backgroundColor = this.color;
    localStorage.setItem('appBgColor', this.color);
  }
}
