import { Brain, Github } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { Drawer } from 'vaul'
import Trigger from './Trigger'

export function DrawerComponent() {
	return (
		<div
			className={twMerge(
				'absolute w-full bottom-0 h-4/12',
				'group',
				'overflow-clip',
			)}
		>
			<Drawer.Root>
				<Trigger />
				<Drawer.Portal>
					<Drawer.Overlay className="fixed inset-0 bg-black/20" />
					<Drawer.Content
						className={twMerge(
							'font-mono text-sm text-neutral-400',
							'rounded-xs',
							'bg-black',
							'flex flex-col',
							'overflow-clip',
							'outline-none border border-neutral-900',
							'mt-24 h-fit fixed bottom-4',
							'w-[400px] right-1/2 translate-x-1/2',
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
							<Drawer.Description className="text-neutral-400">
								Physarum polycephalum is a slime mold that can solve mazes and
								find the shortest path to food. It is a fascinating organism
								that has been studied for its unique behavior and ability to
								adapt to its environment.
							</Drawer.Description>
						</div>

						{/* <Engine Switches> */}
						{/* <div className="p-6 border-t border-neutral-900 flex flex-col gap-4">
							<Switch id="webgpu" />
							<Switch id="webgl2" />
						</div> */}

						<div className="px-6 py-4 border-t border-neutral-900 bg-neutral-950 mt-auto">
							<div className="flex gap-6 justify-end text-xs">
								<a
									className="text-xs flex items-center gap-1.5 hover:text-neutral-100"
									href="https://github.com/Tetreur/Physarum"
									target="_blank"
									rel="noreferrer"
								>
									<Github size={14} />
								</a>
							</div>
						</div>
					</Drawer.Content>
				</Drawer.Portal>
			</Drawer.Root>
		</div>
	)
}
