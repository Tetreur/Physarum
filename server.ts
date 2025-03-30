Bun.serve({
	port: 8080,
	fetch(req) {
		console.log(`Server Launched on port ${req}`)
		const url = new URL(req.url)
		if (url.pathname === '/') {
			const html = Bun.file('index.html')
			return new Response(html, {
				headers: { 'Content-Type': 'text/html' }
			})
		}
		return new Response()
	}
})
