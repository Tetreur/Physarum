'use client'

import { useEffect, useRef, useState } from 'react'
import triangleVertex from '../shader/triangle-vertex.wgsl'

export const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const [isWebGL2Supported, setIsWebGL2Supported] = useState<boolean>(false)
	const [isWebGPUSupported, setIsWebGPUSupported] = useState<boolean>(false)

	useEffect(() => {
		const setupWebGPU = async () => {
			const canvas = canvasRef.current
			if (canvas) {
				console.log(triangleVertex)
				const webgl2CanvasCtx = canvas.getContext('webgl2')
				const webGPUCanvasCtx = canvas.getContext('webgpu')

				if (webGPUCanvasCtx) {
				} else if (webgl2CanvasCtx) {
				} else {
					setIsWebGL2Supported(false)
					setIsWebGPUSupported(false)
					return
				}

				try {
					const gl = canvas.getContext('webgpu')
					const adapter = await navigator.gpu?.requestAdapter({
						featureLevel: 'compatibility',
					})
					const device = await adapter?.requestDevice()

					if (!device) {
						setIsWebGPUSupported(false)
						return
					}

					setIsWebGPUSupported(!!gl)
					setupCanvas(canvas, device)
				} catch (e) {
					setIsWebGPUSupported(false)
				}
			}
		}

		setupWebGPU()
	}, [])

	return <canvas ref={canvasRef} className="w-full h-full" />
}

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

function setupCanvas(canvas: HTMLCanvasElement, device: GPUDevice) {
	const context: GPUCanvasContext | null = canvas.getContext('webgpu')

	if (!context) {
		console.error('WebGPU not supported')
		return
	}

	const devicePixelRatio = window.devicePixelRatio
	canvas.width = canvas.clientWidth * devicePixelRatio
	canvas.height = canvas.clientHeight * devicePixelRatio
	const presentationFormat = navigator.gpu.getPreferredCanvasFormat()

	context.configure({
		device,
		format: presentationFormat,
	})

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
