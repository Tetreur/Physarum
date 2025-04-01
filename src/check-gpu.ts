export async function checkGPU(): Promise<{
  device: GPUDevice;
  adapter: GPUAdapter;
  gpu: GPU;
}> {
  const gpu = navigator.gpu;
  if (!gpu) throw new Error("Could not find navigator device");

  const adapter = await gpu.requestAdapter({
    featureLevel: "compatibility",
  });
  if (!adapter)
    throw new Error(`Could not retrieve adapter for the gpu ${gpu}`);

  const device = await adapter.requestDevice();
  if (!device) throw new Error(`Could not retrieve device for ${adapter}`);

  return { device, adapter, gpu };
}
