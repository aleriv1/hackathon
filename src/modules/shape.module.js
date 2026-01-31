import { Module } from '../core/module'
import { randomSize, randomHex, angleColor, radialGradient, conicGradient, randomShape } from "../utils"

export class ShapeModule extends Module {

    constructor() {
        super('shape', 'Случайная фигура')
        this.isActive = false
        this.clickBody = this.handleClick.bind(this)
    }

    trigger() {
        this.isActive = !this.isActive

        if (this.isActive) {
            alert("После того как вы нажали данный пункт меню, вам доступен функционал неограниченного создания фиугр при клике на документ\nДля выхода из этого режима Нажмите еще раз на данный пункт меню")
            document.addEventListener("click", this.clickBody)
        } else {
            alert("К сожалению что-то пошло не так, нажмите пункт меню еще раз")
            document.removeEventListener("click", this.clickBody)
            this.cleanup()
        }
    }
    handleClick(event) {
        if (event.target.closest(".random-figure") || event.target.closest(".menu-item")) return
        this.createFigure(event.clientX, event.clientY)

    }
    createFigure(x, y) {

        const figure = document.createElement("div")
        figure.className = "random-figure"
        const color = this.randomTypeColor()
        const size = randomSize(20, 150)
        const shapeForm = randomShape()

        figure.style.cssText = `
        position: 'fixed'
        width: ${size.width}px,
        height: ${size.height}px,
        left: ${x - size.width / 2}px,
        top: ${y - size.height / 2}px,
        background: ${color},
        pointerEvents: 'none',
        zIndex: ${Math.floor(Math.random() * 100)},
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
        `

        this.ShapeStyle(figure, shapeForm, size)

        document.body.appendChild(figure)

    }

    ShapeStyle(figure, shapeForm, size) {
        switch (shapeForm) {
            case 'circle':
                figure.style.borderRadius = '50%'
                break

            case 'square':
                figure.style.borderRadius = '0'
                break

            case 'rounded':
                figure.style.borderRadius = '25%'
                break

            case 'ellipse':
                figure.style.borderRadius = '50%'
                const newHeight = size.height * 0.7
                figure.style.height = `${newHeight}px`
                break
        }
    }

    randomTypeColor() {
        const options = [
            () => randomHex(),
            () => angleColor(5),
            () => angleColor(2),
            () => angleColor(7),
            () => radialGradient(),
            () => conicGradient()
        ]
        const randomOptionColor = options[Math.floor(Math.random() * options.length)]
        return randomOptionColor()
    }

    cleanup() {
        document.querySelectorAll('.random-figure').forEach(fig => fig.remove())
    }

}