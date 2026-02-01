import './menu.css'
import { Menu } from '../core/menu'

export class ContextMenu extends Menu {
  constructor(selector) {
    super(selector)
    this.modules = []
    this.isOpen = false

    document.addEventListener('contextmenu', e => {
      e.preventDefault()
      this.open(e.clientX, e.clientY)
    })

    document.addEventListener('click', e => {
      if (this.isOpen && !this.el.contains(e.target)) {
        this.close()
      }
    })

    this.el.addEventListener('click', e => {
      const item = e.target.closest('.menu-item')
      if (!item) return

      const type = item.dataset.type
      const module = this.modules.find(m => m.type === type)
      if (module) {
        module.trigger()
      }
      this.close()
    })
  }

  open(x, y) {
    this.el.innerHTML = ''
    this.modules.forEach(module => {
      this.el.insertAdjacentHTML('beforeend', module.toHTML())
    })
    this.el.classList.add('open')
    this.isOpen = true

    const menuWidth = this.el.offsetWidth
    const menuHeight = this.el.offsetHeight

    const maxX = window.innerWidth - menuWidth - 10
    const maxY = window.innerHeight - menuHeight - 10

    let finalX = x
    let finalY = y

    if (x > maxX) finalX = maxX
    if (y > maxY) finalY = maxY

    this.el.style.left = `${finalX}px`
    this.el.style.top = `${finalY}px`
  }

  close() {
    this.el.classList.remove('open')
    this.isOpen = false
  }

  add(module) {
    this.modules.push(module)
  }

}