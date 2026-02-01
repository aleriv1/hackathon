import { Module } from "../../core/module";
import styles from './clicks.module.css'
import { getRandomColor } from "../../utils";

export class ClicksModule extends Module {
    constructor(text) {
        super('Clicks module', text);
        this.singleClicks = 0;
        this.doubleClicks = 0;
        this.timer = null;
        this.active = false;

        this.handleClick = this.handleClick.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.stop = this.stop.bind(this);

        this.clickTimeout = null

        this.clickCountMessageEl = null
    }

    createMessageElement(text) {
        this.clickCountMessageEl = document.createElement('p')
        this.clickCountMessageEl.className = styles['click-statistics']
        this.clickCountMessageEl.textContent = text
        this.clickCountMessageEl.style.backgroundColor = getRandomColor()
        document.body.append(this.clickCountMessageEl)
    }

    showMessage(message) {
        this.createMessageElement(message)

        setTimeout(() => {
            this.clickCountMessageEl.remove()
            this.clickCountMessageEl = null
        }, 5000)
    }

    trigger() {
        const timer = prompt('Введите количество секунд:');
        if (!timer) {
            const message = `Жизнь не клик... и правильно!`
            this.showMessage(message)
        }

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

        document.removeEventListener("click", this.handleClick);
        document.removeEventListener("dblclick", this.handleDoubleClick);

        clearTimeout(this.clickTimer);

        const message = `Статистика:\nОдиночные клики: ${this.singleClicks}\nДвойные клики: ${this.doubleClicks}`

        this.showMessage(message)
    }

    handleClick() {
        if (!this.active) return

        if (this.clickTimeout) return

        this.clickTimeout = setTimeout(() => {
            this.singleClicks++
            this.clickTimeout = null
        }, 250);

    }

    handleDoubleClick() {
        if (!this.active) return

        if (this.clickTimeout) {
            clearTimeout(this.clickTimeout)
            this.clickTimeout = null
        }
        this.doubleClicks++
    }
}