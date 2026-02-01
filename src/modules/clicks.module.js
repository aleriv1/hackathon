import { Module } from "../core/module";

export class ClicksModule extends Module {
    // constructor() {
    constructor(text) {
        super('Clicks module', text);
        this.singleClicks = 0;
        this.doubleClicks = 0;
        this.timer = null;
        this.active = false;

        this.handleClick = this.handleClick.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.stop = this.stop.bind(this);

        // поле для таймера проверки
        this.clickTimeout = null
    }

    trigger() {
        const timer = prompt('Введите количество секунд:');
        const duration = Number(timer) * 1000;

        if (!Number.isFinite(duration) || duration <= 0) return;

        this.singleClicks = 0;
        this.doubleClicks = 0;
        this.active = true;

        // чтобы в следующей макротаске запустить
        setTimeout(() => {
            document.addEventListener('click', this.handleClick);
            document.addEventListener('dblclick', this.handleDoubleClick);

            this.timer = setTimeout(this.stop, duration);
        }, 0);
    }

    stop() {
        this.active = false;

        document.removeEventListener('click', this.handleClick);
        document.removeEventListener('dblclick', this.handleDoubleClick);

        alert(`Статистика:\nОдиночные клики: ${this.singleClicks}\nДвойные клики: ${this.doubleClicks}`);
    }

    handleClick() {
        // if (this.active) this.singleClicks++;
        if (!this.active) return

        if (this.clickTimeout) return

        // убеждаемся, что это не двойной клик
        this.clickTimeout = setTimeout(() => {
            this.singleClicks++
            this.clickTimeout = null
        }, 250);

    }

    handleDoubleClick() {
        // if (this.active) this.doubleClicks++;
        if (!this.active) return

        if (this.clickTimeout) {
            clearTimeout(this.clickTimeout)
            this.clickTimeout = null
        }
        this.doubleClicks++
        console.log('this.doubleClicks', this.doubleClicks)
    }
}