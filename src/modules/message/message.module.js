import { Module } from '../../core/module';
import { getRandomColor, random } from '../../utils';
import './message.css';

export default class MessageModule extends Module {
    constructor(type, text) {
        super(type, text)
    }

    getRandomMessage() {

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

        return messages[random(0, messages.length - 1)]
    }

    createMessageElement(text, color) {
        const messageElement = document.createElement('p')
        messageElement.className = 'message-element';
        messageElement.textContent = text
        messageElement.style.background = color
        document.body.append(messageElement)
        return messageElement
    }

    trigger() {

        //массив случайных сообщений
        // const messages = [
        //     'Прекрасно выглядите!',
        //     'Самое лучшее случайное сообщение!',
        //     'Самое худшее случайное сообщение!',
        //     'Какой сегодня хороший день!',
        //     'Как дела?',
        //     'JS - твой самый любимый язык программирования',
        //     'Когда уже REACT?',
        //     'Пейте больше воды!',
        //     'Сделай 30 отжиманий',
        //     'Выпрями спину!',
        // ]

        //импортированная функция, дает рандомное число из указанных
        // const resultOfRandomNumber = random(0, 19)
        // const resultOfRandomNumber = random(0, messages.length - 1)

        //импортированная функция, дает рандомный цвет
        // const resultOfRandomColor = getRandomColor()


        // const result = messages.find((item, index) => {
        //     return index === resultOfRandomNumber
        // })


        // const messageElement = document.createElement('div');
        // messageElement.className = 'message-element';
        // messageElement.innerText = result;
        // messageElement.style.background = resultOfRandomColor;
        // document.body.appendChild(messageElement);

        const messageText = this.getRandomMessage()
        const colorBackground = getRandomColor()

        const message = this.createMessageElement(messageText, colorBackground)

        function removeElement() {
            message.remove()
        }
        setTimeout(removeElement, 3000)
    }
}