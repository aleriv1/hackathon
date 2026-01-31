import { Menu } from './core/menu'

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
    console.log('open')
    if (this.modules.length === 0) {
      console.log('module.length === 0')
      this.el.innerHTML = `
      <li class="menu-item" data-type="dummy">Поменять фон</li>
      <li class="menu-item" data-type="dummy">Создать фигуру</li>
      <li class="menu-item" data-type="dummy">Считать клики</li>
    `;

    } else {

      // return
      this.el.innerHTML = ''
      this.modules.forEach(module => {
        this.el.insertAdjacentHTML('beforeend', module.toHTML())
      })
    }

    this.el.style.left = `${x}px`
    this.el.style.top = `${y}px`
    this.el.classList.add('open')
    this.isOpen = true
  }

  close() {
    this.el.classList.remove('open')
    this.isOpen = false
  }

  add(module) {
    this.modules.push(module)
  }

}