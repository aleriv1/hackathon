import { Module } from "../core/module";

export class ClicksModule extends Module {
    constructor() {
        this.timeLimit = timeLimit;
        this.singleClicks = 0;
        this.doubleClicks = 0;
        this.timer = null;
        this.active = false;

        this.handleClick = this.handleClick.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.stop = this.stop.bind(this);
    }

    start() {
        const timer = prompt('Введите количество секунд:');
        const duration = Number(timer) * 1000;

        if (!Number.isFinite(duration) || duration <= 0) return;

        this.singleClicks = 0;
        this.doubleClicks = 0;
        this.active = true;

        document.addEventListener('click', this.handleClick);
        document.addEventListener('dblclick', this.handleDoubleClick);

        his.timerId = setTimeout(this.stop, duration);
    }

    stop() {
        this.active = false;

        document.removeEventListener('click', this.handleClick);
        document.removeEventListener('dblclick', this.handleDoubleClick);

        alert(`Статистика:\nОдиночные клики:, ${this.singleClicks}\nДвойные клики:, ${this.doubleClicks}`);
    }

    handleClick() {
        if (this.active) this.singleClicks++;
    }

    handleDoubleClick() {
        if (this.active) this.doubleClicks++;
    }
}