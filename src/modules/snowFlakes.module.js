import { Module } from '../core/module';

export class SnowModule extends Module {
  constructor() {
    super('snow', 'Снегопад');
    this.snowInterval = null;
    this.$snowflakes = [];
  }

  trigger() {
    this.snowInterval ? this.stop() : this.start();
  }

  start() {
    this.snowInterval = setInterval(() => this.createSnowflake(), 200);
  }

  createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.textContent = '❄';
    Object.assign(snowflake.style, {
      left: `${Math.random() * window.innerWidth}px`,
      fontSize: `${Math.random() * 10 + 10}px`,
      opacity: Math.random(),
      animationDuration: `${Math.random() * 5 + 5}s`,
      animationDelay: `${Math.random() * 5}s`,
    });

    document.body.appendChild(snowflake);
    this.$snowflakes.push(snowflake);

    setTimeout(
      () => {
        snowflake.remove();
        this.$snowflakes = this.$snowflakes.filter((el) => el !== snowflake);
      },
      parseFloat(snowflake.style.animationDuration) * 1000
    );
  }

  stop() {
    clearInterval(this.snowInterval);
    this.snowInterval = null;
    this.$snowflakes.forEach((el) => el.remove());
    this.$snowflakes = [];
  }
}
