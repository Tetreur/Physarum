import { Brain, Github } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { Drawer } from 'vaul'

export function DrawerComponent() {
	return (
		<Drawer.Root>
			<Drawer.Trigger
				className={twMerge(
					'cursor-pointer',
					'absolute right-1/2 bottom-5 translate-x-1/2',
					'p-2',
					'bg-black',
					'text-sm font-mono text-neutral-500 hover:text-neutral-100',
					'transition-colors duration-300 ease-in-out',
				)}
			>
				<Brain size={16} />
			</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 bg-black/20" />
				<Drawer.Content
					className={twMerge(
						'font-mono text-sm text-neutral-400',
						'rounded-lg',
						'flex flex-col',
						'overflow-clip',
						'outline-none border border-neutral-900',
						'mt-24 h-fit fixed bottom-4',
						'w-1/2 right-1/2 translate-x-1/2',
					)}
					style={
						{
							'--initial-transform': 'calc(100% + 16px)',
						} as React.CSSProperties
					}
				>
					<div className="p-6 bg-black">
						<Drawer.Title className="mb-4 flex items-center gap-2 text-neutral-200">
							<Brain color="#e5e5e5" size={16} strokeWidth={1.5} /> Physarum
						</Drawer.Title>
						Slime mold that can solve mazes and find the shortest path to food.
						It is a fascinating organism that has been studied for its unique
						behavior and ability to adapt to its environment.
					</div>
					<div className="p-6 border-t border-neutral-900">hey</div>
					<div className="px-6 py-2 border-t border-neutral-900 bg-neutral-950 mt-auto">
						<div className="flex gap-6 justify-end text-xs">
							<a
								className="text-xs flex items-center gap-1.5 hover:text-neutral-100"
								href="https://github.com/Tetreur/Physarum"
								target="_blank"
								rel="noreferrer"
							>
								<Github size={16} />
							</a>
						</div>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	)
}
