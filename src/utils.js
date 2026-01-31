export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function randomSize(min, max) {
  const width = Math.floor(Math.random() * (max - min + 1)) + min
  const height = Math.floor(Math.random() * (max - min + 1)) + min
  return { width, height }
}
export function randomHex() {
  const hex = "0123456789ABCDEF"
  let color = "#"

  for (i = 0; i <= 8; i++) {
    color += hex[Math.floor(Math.random() * 16)]
  }
  return color
}

export function angleColor(count = 2) {
  const color = []

  for (i = 0; i <= count; i++) {
    color.push(randomHex())
  }
  const angle = Math.floor(Math.random() * 360)
  return `linear-gradient(${angle}deg, ${color.join(", ")})`
}

export function radialGradient() {
  const color1 = randomHex()
  const color2 = randomHex()

  const positions = [
    'center',
    'top left',
    'top right',
    'bottom left',
    'bottom right',
    `${Math.random() * 100}% ${Math.random() * 100}%`
  ]

  const position = positions[Math.floor(Math.random() * positions.length)]
  const shape = Math.random() > 0.5 ? 'circle' : 'ellipse'

  return `radial-gradient(${shape} at ${position}, ${color1}, ${color2})`
}

export function conicGradient() {

  const color = []
  const countColor = 2 + Math.floor(Math.random() * 4)
  for (i = 0; i <= countColor; i++) {
    color.push(randomHex())
  }
  return `conic-gradient(${color.join(", ")})`
}

export function randomShape() {
  const shapes = ['circle', 'square', 'rounded', 'ellipse']
  return shapes[Math.floor(Math.random() * shapes.length)]
}