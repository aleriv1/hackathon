import { Module } from '../core/module';

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
        this.color = this.getRandomHexColor();
      }
    } else {
      this.color = this.getRandomHexColor();
    }

    this.$body.style.backgroundColor = this.color;
    localStorage.setItem('appBgColor', this.color);
  }

  getRandomHexColor() {
    const hex = '0123456789abcdef';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += hex[Math.floor(Math.random() * 16)];
    }

    return color;
  }
}
