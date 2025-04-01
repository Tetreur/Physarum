import { checkGPU } from "./check-gpu";
import { setupCanvas } from "./canvas";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (app === null) throw new Error();

app.innerHTML = `
  <canvas id="canvas">
  </canvas>
`;

const canvas = document.querySelector<HTMLCanvasElement>("#canvas");
if (!canvas) throw new Error("Could not select canvas element");

const result = await checkGPU();
setupCanvas({ canvas, ...result });
