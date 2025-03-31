export function setupCanvas(canvas: HTMLCanvasElement) {
	canvas.addEventListener('click', () => console.log(canvas))
	const canvasContext = canvas.getContext('2d')

	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

	// Redraw canvas on resize
	window.addEventListener('resize', () => {
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
	})

	if (canvasContext === null) {
		throw new Error('Canvas context is null')
	}

	canvasContext.fillStyle = 'red'
	canvasContext.fillRect(50, 50, 100, 100)
}
