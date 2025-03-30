import { setupCanvas } from './canvas'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')

if (app === null) throw new Error()

app.innerHTML = `
  <canvas id="canvas">
  </canvas>
`

const canvasElement = document.querySelector<HTMLCanvasElement>('#canvas')
canvasElement && setupCanvas(canvasElement)
