export function setupCanvas({
  canvas,
  device,
  gpu,
}: {
  canvas: HTMLCanvasElement;
  adapter: GPUAdapter;
  device: GPUDevice;
  gpu: GPU;
}) {
  // Get context
  const canvasContextWebGPU = canvas.getContext("webgpu");
  if (!canvasContextWebGPU)
    throw new Error(
      `Could not retrieve webgpu canvas context for ${canvas}, with device ${device}`,
    );

  // Set canvas UV
  const aspectRatio = window.devicePixelRatio;
  canvas.width = canvas.clientWidth * aspectRatio;
  canvas.height = canvas.clientHeight * aspectRatio;

  // Set presentation format
  const presentationFormat = gpu.getPreferredCanvasFormat();
  canvasContextWebGPU.configure({
    device,
    format: presentationFormat,
  });

  window.addEventListener("resize", (resizeEvent) => {
    // TODO
    console.log(resizeEvent);
  });
}
