'use client'

import { useEffect, useRef, useState } from 'react'

export const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const [isWebGL2Supported, setIsWebGL2Supported] = useState<boolean>(false)
	const [isWebGPUSupported, setIsWebGPUSupported] = useState<boolean>(false)

	useEffect(() => {
		const detectContext = () => {
			if (!canvasRef.current) {
				console.error('Canvas not found')
				return
			}

			const glCtx = canvasRef.current.getContext('webgl2')
			if (!glCtx) {
				// Browser could not initialize WebGL. User probably needs to
				// update their drivers or get a new browser. Present a link to
				// http://get.webgl.org/webgl2/troubleshooting
				console.log('ℹ️ WebGL2 not supported')
				setIsWebGL2Supported(false)
			} else {
				console.info('🐸 WebGL2 supported')
				setIsWebGL2Supported(true)
			}

			const gpuCtx = canvasRef.current.getContext('webgpu')
			if (!gpuCtx) {
				// Browser could not initialize WebGPU. User probably needs to
				// update their drivers or get a new browser. Present a link to
				// http://get.webgl.org/webgpu/troubleshooting
				console.info('ℹ️ WebGPU not supported')
				setIsWebGPUSupported(false)
			} else {
				console.info('🐸 WebGPU supported')
				setIsWebGPUSupported(true)
			}
		}

		detectContext()

		if (isWebGL2Supported && canvasRef.current) {
			setupWebGL2(canvasRef.current)
		}
	}, [isWebGL2Supported])

	// if (isWebGL2Supported && canvasRef.current) {
	// 	setupWebGL2(canvasRef.current)
	// }

	return <canvas ref={canvasRef} className="w-full h-full" />
}

function setupWebGL2(canvas: HTMLCanvasElement) {
	console.log('Setting up WebGL2')
	const gl = canvas.getContext('webgl2')
	if (!gl) {
		console.error('HAAA')
		return
	}

	// GL as multiple layers, here we clear the color and depth buffers
	gl.clearColor(0.5, 0.5, 0.5, 1.0) // Set clear color to black, fully opaque
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
}
