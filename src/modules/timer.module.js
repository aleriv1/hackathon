import { Module } from '../core/module';

export class TimerModule extends Module {
  constructor() {
    super('timer', 'Таймер отсчёта');
    this.$timerEl = null;
    this.interval = null;
  }

  trigger() {
    const input = prompt('Введите время в секундах (от 5 до 100)');
    if (input === null) return;

    const seconds = Number(input.trim());

    if (!Number.isInteger(seconds) || seconds < 5 || seconds > 100) {
      alert('Укажите количество секунд от 5 до 100');
      return;
    }

    this.createTimer(seconds);
  }

  createTimer(seconds) {
    this.$timerEl?.remove();
    clearInterval(this.interval);

    let timeLeft = seconds;

    const $timerEl = document.createElement('div');
    $timerEl.className = 'timer';
    document.body.append($timerEl);

    this.$timerEl = $timerEl;

    $timerEl.textContent = `Осталось: ${timeLeft} c`;

    this.interval = setInterval(() => {
      timeLeft--;

      if (timeLeft === 0) {
        clearInterval(this.interval);
        $timerEl.textContent = 'Время вышло!';
        setTimeout(() => $timerEl.remove(), 1000);
        return;
      }

      $timerEl.textContent = `Осталось: ${timeLeft} c`;
    }, 1000);
  }
}
