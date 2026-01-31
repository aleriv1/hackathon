import { Module } from '././core/module';
import { getRandomColor } from '././utils';
import { random } from '././utils';
import './message/message.css';

export default class MessageModule extends Module {
    constructor (type, text) {
        super(type, text)
    }

    trigger() {
        //импортированная функция, дает рандомное число из указанных
        const resultOfRandomNumber = random(0, 19)
        //импортированная функция, дает рандомный цвет
        const resultOfRandomColor = getRandomColor()

        //массив случайных сообщений
        const messages = [
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
        ]
        const result = messages.find((item, index) => {
            return index === resultOfRandomNumber
        })
        const messageElement = document.createElement('div');
        messageElement.className = 'message-element';
        messageElement.innerText = result;
        messageElement.style.background = resultOfRandomColor;
        document.body.appendChild(messageElement);

        function removeElement() {
            messageElement.remove()
        }
        setTimeout(removeElement, 3000)
    }
}