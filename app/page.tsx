'use client'

import { Canvas } from './Canvas'
import { DrawerComponent } from './components'

export default function Home() {
	return (
		<div className="flex justify-between flex-col items-end min-h-screen gap-2 font-[family-name:var(--font-geist-mono)] bg-black">
			<Canvas />
			<footer className="w-full p-2">
				<DrawerComponent />
			</footer>
		</div>
	)
}
