import { Module } from '../../core/module';
import { getRandomColor, random } from '../../utils';
import styles from './message.module.css';

export default class MessageModule extends Module {
    static messages = [
        'Прекрасно выглядите!',
        'Самое лучшее случайное сообщение!',
        'Самое худшее случайное сообщение!',
        'Какой сегодня хороший день!',
        'Как дела?',
        'JS - твой самый любимый язык программирования',
        'Когда уже REACT?',
        'Пейте больше воды!',
        'Сделай 30 отжиманий',
        'Выпрями спину!',
    ];

    constructor(type, text) {
        super(type, text)
    }

    trigger() {
        const resultOfRandomNumber = random(0, MessageModule.messages.length - 1);
        const resultOfRandomColor = getRandomColor();


        const result = MessageModule.messages[resultOfRandomNumber];

        const messageElement = document.createElement('div');
        messageElement.className = styles['message-element'];
        messageElement.textContent = result;
        messageElement.style.backgroundColor = resultOfRandomColor;
        document.body.appendChild(messageElement);

        this.removeElementAfterTimeOut(messageElement, 3000);
    }

    removeElementAfterTimeOut(element, timeout) {
        function removeElement() {
            element.remove()
        }
        setTimeout(removeElement, timeout)
    }
}