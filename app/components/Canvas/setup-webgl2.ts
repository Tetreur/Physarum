import { fragmentShaderSourceCode, vertexShaderSourceCode } from "./shader";

export function setupWebGL2(canvas: HTMLCanvasElement) {
  console.log("Setting up WebGL2");
  const gl = canvas.getContext("webgl2");
  if (!gl) {
    throw new Error("WebGL2 not supported");
  }

  // GPU like 32 float array
  const quadVerticesCPUBuffer = new Float32Array([
    // First triangle
    // Bottom Left
    -1.0, -1.0,
    // Bottom Right
    1.0, -1.0,
    // Top Left
    -1.0, 1.0,
    // Second triangle
    // Top Left
    -1.0, 1.0,
    // Bottom Right
    1.0, -1.0,
    // Top Right
    1.0, 1.0,
  ]);

  /**
   * * "Opaque handle"
   * Send vertices data to the GPU by creating a buffer from my Float32Array
   * When we talk to the WebGL API about a WebGL Buffer it know what i'm talking about
   * Even though the variable itself doesn't have the data
   * So this variable doesn't even have the memory yet.
   */
  const quadGeoBuffer = gl.createBuffer();

  /**
   * Attach the buffer to a WebGL attachment point
   * ArrayBufferAttachmentPoint
   * Essentially we are creating a slot of memory
   */
  gl.bindBuffer(gl.ARRAY_BUFFER, quadGeoBuffer);

  /**
   * Now that the buffer has a slot,
   * Fill it with the triangle vertex buffer data
   */
  gl.bufferData(gl.ARRAY_BUFFER, quadVerticesCPUBuffer, gl.STATIC_DRAW);

  /**
   * Creating the vertex shader from a stringified source code
   */
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  if (!vertexShader) throw new Error("Couldn't create vertex shader");

  gl.shaderSource(vertexShader, vertexShaderSourceCode);
  gl.compileShader(vertexShader);

  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    /**
     * Check any comp error if any
     */
    const compileError = gl.getShaderInfoLog(vertexShader);
    console.error(compileError);
    return;
  }

  /**
   * Creating the fragment shader from a stringified source code
   */
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  if (!fragmentShader) throw new Error("Couldn't create fragment shader");
  gl.shaderSource(fragmentShader, fragmentShaderSourceCode);
  gl.compileShader(fragmentShader);

  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    /**
     * Check any comp error if any
     */
    const compileError = gl.getShaderInfoLog(vertexShader);
    console.error(compileError);
    return;
  }

  /**
   * In GLSL we never use fragment and vertex shader independently
   * We have to combine them
   */
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  /**
   * Link the program
   */
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    /**
     * Check any comp error if any
     */
    const compileError = gl.getProgramInfoLog(program);
    console.error(compileError);
    return;
  }

  const vertexPositionAttribLocation = gl.getAttribLocation(
    program,
    "vertexPosition"
  );

  if (vertexPositionAttribLocation === -1) {
    console.error(
      "Couldn't get the 'vertexPosition' attribute location on the vertex shader"
    );
    return;
  }

  /**
   * * Pipeline
   * 4 Input assembler - how to read vertices from our GPU triangle buffer
   * 5 Primitive assembly - how to make triangles from these vertices
   * 2 Rasterizer - which pixels are part of triangle
   * 3 Set GPU program - vertex + fragment shader pair
   * 1 Output merger - how to merge the shader pixel fragment with the existing output image
   */

  // 1 Output merger
  // GL as multiple layers, here we clear the color and depth buffers
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  gl.clearColor(0.5, 0.5, 0.5, 1.0); // Set clear color to grey, fully opaque
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

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
    //2 * Float32Array.BYTES_PER_ELEMENT,
    0,
    /** offset: How many bytes should the input assembler skip into the buffer when reading attributes */
    0
  );

  let mouseX = 0;
  let mouseY = 0;

  function setCanvasSize() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }

  function setMousePosition(event: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
  }

  function setMouseLeave() {
    mouseX = 0;
    mouseY = 0;
  }

  window.addEventListener("resize", setCanvasSize);
  canvas.addEventListener("mousemove", setMousePosition);
  canvas.addEventListener("mouseleave", setMouseLeave);
  canvas.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
    },
    { passive: false }
  );
  canvas.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
    },
    { passive: false }
  );

  // Final step -> uniforms
  const resolutionLocation = gl.getUniformLocation(program, "iResolution");
  const mouseLocation = gl.getUniformLocation(program, "iMouse");
  const timeLocation = gl.getUniformLocation(program, "iTime");

  function render(time: number) {
    if (gl) {
      time *= 0.001; // convert to seconds
      // 2 Rasterizer
      gl.viewport(0, 0, canvas.width, canvas.height);
      // 3 Set GPU program
      gl.useProgram(program);
      gl.enableVertexAttribArray(vertexPositionAttribLocation);

      // 4 Input assembler
      gl.bindBuffer(gl.ARRAY_BUFFER, quadGeoBuffer);

      // Set the uniforms
      gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
      gl.uniform1f(timeLocation, time);
      gl.uniform2f(mouseLocation, mouseX, mouseY);

      // Draw call, also configure Primitive assembly (3)
      gl.drawArrays(
        gl.TRIANGLES,
        0, // Offset
        6 // Number of vertices to process
      );

      requestAnimationFrame(render);
    }
  }

  requestAnimationFrame(render);
}
