"use client";

import { useEffect, useRef, useState } from "react";
import triangleVertex from "./shader/triangle-vertex.wgsl";

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isWebGLSupported, setIsWebGLSupported] = useState<boolean>(false);

  useEffect(() => {
    const setupWebGPU = async () => {
      const canvas = canvasRef.current;
      if (canvas) {
        console.log(triangleVertex);
        try {
          const gl = canvas.getContext("webgpu");
          const adapter = await navigator.gpu?.requestAdapter({
            featureLevel: "compatibility",
          });
          const device = await adapter?.requestDevice();

          if (!device) {
            setIsWebGLSupported(false);
            return;
          }

          setIsWebGLSupported(!!gl);
          setupCanvas(canvas, device);
        } catch (e) {
          setIsWebGLSupported(false);
        }
      }
    };

    setupWebGPU();
  }, []);

  function setupCanvas(canvas: HTMLCanvasElement, device: GPUDevice) {
    const context = canvas.getContext("webgpu") as GPUCanvasContext;

    const devicePixelRatio = window.devicePixelRatio;
    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;
    const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

    context.configure({
      device,
      format: presentationFormat,
    });

    // const pipeline = device.createRenderPipeline({
    //   layout: 'auto',
    //   vertex: {
    //     module: device.createShaderModule({
    //       code: triangleVertWGSL,
    //     }),
    //   },
    //   fragment: {
    //     module: device.createShaderModule({
    //       code: redFragWGSL,
    //     }),
    //     targets: [
    //       {
    //         format: presentationFormat,
    //       },
    //     ],
    //   },
    //   primitive: {
    //     topology: 'triangle-list',
    //   },
    // });
  }

  return (
    <div>
      <canvas ref={canvasRef} className="w-full h-full" />
      {isWebGLSupported ? (
        <p className="p-2 text-xs text-green-500">
          WebGPU is supported. GPU is available.
        </p>
      ) : (
        <p className="text-xs text-gray-500">
          WebGPU is not supported. GPU is not available.
        </p>
      )}
    </div>
  );
};

// function frame(device: GPUDevice, context: GPUCanvasContext, pipeline: ) {
//   const commandEncoder = device.createCommandEncoder();
//   const textureView = context.getCurrentTexture().createView();

//   const renderPassDescriptor: GPURenderPassDescriptor = {
//     colorAttachments: [
//       {
//         view: textureView,
//         clearValue: [0, 0, 0, 0], // Clear to transparent
//         loadOp: "clear",
//         storeOp: "store",
//       },
//     ],
//   };

//   const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
//   passEncoder.setPipeline(pipeline);
//   passEncoder.draw(3);
//   passEncoder.end();

//   device.queue.submit([commandEncoder.finish()]);
//   requestAnimationFrame(frame);
// }
