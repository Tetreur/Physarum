import { type Scope, animate, createScope, svg, utils } from 'animejs'
import { type SVGProps, useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { Drawer } from 'vaul'

function Trigger({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof Drawer.Trigger>) {
	const root = useRef<SVGSVGElement | null>(null)
	const scope = useRef<Scope | null>(null)

	useEffect(() => {
		// A function to generate random points on #path-2 on each iteration
		function generatePoints() {
			const isOdd = (n: number) => n % 2

			// Total number of point to generate on each iteration
			const total = utils.random(5, 32)
			const totalIteration = isOdd(total) ? total + 1 : total // Make sure the total is even

			// Random radius for the first set of points
			const r1 = utils.random(4, 56)

			// Random radius for the second set of points
			const r2 = 56

			let points = ''
			for (let i = 0; i < totalIteration; i++) {
				const r = isOdd(i) ? r1 : r2
				const a = (2 * Math.PI * i) / totalIteration - Math.PI / 2
				const x = 152 + utils.round(r * Math.cos(a), 0)
				const y = 56 + utils.round(r * Math.sin(a), 0)
				points += `${x},${y} `
			}
			return points
		}

		const [$path1, $path2] = utils.$('polygon')

		scope.current = createScope({
			root: '.logo:hover',
			// mediaQueries: { hover: '(hover: hover)' },
		}).add((self) => {
			function animateRandomPoints() {
				// Update the points attribute on #path-2
				utils.set($path2, { points: generatePoints() })
				// Morph the points of #path-1 into #path-2
				return animate($path1, {
					points: svg.morphTo($path2),
					ease: 'inOutCirc',
					duration: 800,
					autoplay: true,
					onComplete: animateRandomPoints,
				})
			}

			animateRandomPoints()
		})

		// Properly cleanup all anime.js instances declared inside the scope
		return () => scope.current?.revert()
	}, []) // Empty dependency array to run only once on mount

	return (
		<Drawer.Trigger
			className={twMerge(
				'cursor-pointer',
				'absolute translate-x-1/2 right-1/2',
				'bottom-5 sm:-bottom-18',
				'group-hover:bottom-5',
				'border border-black hover:border-neutral-900',
				'bg-black hover:bg-neutral-950',
				'text-sm font-mono text-neutral-500',
				'hover:text-neutral-300',
				'transition-all duration-300 ease-in-out',
				'rounded-xs',
			)}
		>
			<Icon
				ref={root}
				size={80}
				className="logo stroke-[7px] hover:text-neutral-50"
			/>
		</Drawer.Trigger>
	)
}

function Icon(
	props: {
		size?: number
	} & SVGProps<SVGSVGElement>,
) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={props.size ?? '56'}
			height={props.size ?? '56'}
			viewTarget={'6'}
			viewBox="0 0 304 112"
			fill="none"
			stroke="currentColor"
			fillRule="evenodd"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<title>more info</title>
			<polygon
				style={{ opacity: 1 }}
				id="path-1"
				points="152,4 170,38 204,56 170,74 152,108 134,74 100,56 134,38"
			/>
			<polygon
				style={{ opacity: 0, strokeWidth: 12 }}
				id="path-2"
				points="152,4 170,38 204,56 170,74 152,108 134,74 100,56 134,38"
			/>
		</svg>
	)
}

export default Trigger
