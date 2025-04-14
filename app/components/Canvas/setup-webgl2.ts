import { fragmentShaderSourceCode, vertexShaderSourceCode } from './shader'

export function setupWebGL2(canvas: HTMLCanvasElement) {
	console.log('Setting up WebGL2')
	const gl = canvas.getContext('webgl2')
	if (!gl) {
		console.error('HAAA')
		return
	}

	// GPU like 32 float array
	const triangleVerticesCPUBuffer = new Float32Array([
		// Top Middle
		0.0, 0.5,
		// Bottom Left
		-0.5, -0.0,
		// Bottom Right
		0.5, 0.0,
	])

	/**
	 * * "Opaque handle"
	 * Send vertices data to the GPU by creating a buffer from my Float32Array
	 * When we talk to the WebGL API about a WebGL Buffer it know what i'm talkin about
	 * Even though the variable itself doesn't have the data
	 * So this variable doesn't even have the memory yet.
	 */
	const triangleGeoBuffer = gl.createBuffer()

	/**
	 * Attach the buffer to a WebGL attachment point
	 * ArrayBufferAttachmentPoint
	 * Essentially we are creating a slot of memory
	 */
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleGeoBuffer)

	/**
	 * Now that the buffer has a slot,
	 * Fill it with the triangle vertex buffer data
	 */
	gl.bufferData(gl.ARRAY_BUFFER, triangleVerticesCPUBuffer, gl.STATIC_DRAW)

	/**
	 * Creating the vertex shader from a stringified source code
	 */
	const vertexShader = gl.createShader(gl.VERTEX_SHADER)
	if (!vertexShader) throw new Error("Couldn't create vertex shader")

	gl.shaderSource(vertexShader, vertexShaderSourceCode)
	gl.compileShader(vertexShader)

	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		/**
		 * Check any comp error if any
		 */
		const compileError = gl.getShaderInfoLog(vertexShader)
		console.error(compileError)
		return
	}

	/**
	 * Creating the fragment shader from a stringified source code
	 */
	const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
	if (!fragmentShader) throw new Error("Couldn't create fragment shader")
	gl.shaderSource(fragmentShader, fragmentShaderSourceCode)
	gl.compileShader(fragmentShader)

	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		/**
		 * Check any comp error if any
		 */
		const compileError = gl.getShaderInfoLog(vertexShader)
		console.error(compileError)
		return
	}

	/**
	 * In GLSL we never use fragment and vertex shader independantely
	 * We have to comnbine them
	 */
	const triangleShaderProgram = gl.createProgram()
	gl.attachShader(triangleShaderProgram, vertexShader)
	gl.attachShader(triangleShaderProgram, fragmentShader)

	/**
	 * Link the program
	 */
	gl.linkProgram(triangleShaderProgram)

	if (!gl.getProgramParameter(triangleShaderProgram, gl.LINK_STATUS)) {
		/**
		 * Check any comp error if any
		 */
		const compileError = gl.getProgramInfoLog(triangleShaderProgram)
		console.error(compileError)
		return
	}

	const vertexPositionAttribLocation = gl.getAttribLocation(
		triangleShaderProgram,
		'vertexPosition',
	)

	if (vertexPositionAttribLocation === -1) {
		console.error(
			"Couldn't get the 'vertexPosition' attribute location on the vertex shader",
		)
		return
	}

	/**
	 * * Pipeline
	 * 4 Input assembler - how to read vertices from our GPU triangle buffer
	 * 5 Primitive assembly - how to make triangles from thos vertices
	 * 2 Rasterizer - which pixels are part of triangle
	 * 3 Set GPU program - vertex + fragment shader pair
	 * 1 Output merger - how to merge the shader pixel fragment with the existing output image
	 */

	// 1 Output merger
	// GL as multiple layers, here we clear the color and depth buffers
	canvas.width = canvas.clientWidth
	canvas.height = canvas.clientHeight
	gl.clearColor(0.5, 0.5, 0.5, 1.0) // Set clear color to black, fully opaque
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

	// 2 Rasterizer
	gl.viewport(0, 0, canvas.width, canvas.height)

	// 3 Set GPU program
	gl.useProgram(triangleShaderProgram)
	gl.enableVertexAttribArray(vertexPositionAttribLocation)

	// 4 Input assembler
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleGeoBuffer)
	gl.vertexAttribPointer(
		/** index: Which attribute index location to use */
		vertexPositionAttribLocation,
		/** size: The number of component in that attribute */
		2,
		/** type: What is the data type stored in the GPU buffer for this attribute */
		gl.FLOAT,
		/** normalize: How you convert from int to float */
		false,
		/** stride: How many bytes to move forward in the buffer to find the same attribute for the next vertex, 0 mean -> you figure it out */
		2 * Float32Array.BYTES_PER_ELEMENT,
		/** offset: How many bytes should the input assembler skip into the buffer when reading attributes */
		0,
	)

	// Draw call, also configure Primitive assembly (3)
	gl.drawArrays(gl.TRIANGLES, 0, 3)
}
