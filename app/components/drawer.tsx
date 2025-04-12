import { Info } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { Drawer } from 'vaul'

export function DrawerComponent() {
	return (
		<Drawer.Root>
			<Drawer.Trigger
				className={twMerge(
					'ring',
					'h-6 gap-2 px-2',
					'shadow-sm rounded-full bg-white text-sm font-medium',
					'relative flex flex-shrink-0 items-center gap-2 justify-center',
					'transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white',
				)}
			>
				<Info size={16} />
				more info
			</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 bg-black/40" />
				<Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
					<div className="p-4 bg-white rounded-t-[10px] flex-1">
						<div
							aria-hidden
							className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"
						/>
						<div className="max-w-md mx-auto">
							<Drawer.Title className="font-medium mb-4 text-gray-900">
								{' '}
								Drawer for React.
							</Drawer.Title>
							<p className="text-gray-600 mb-2">
								This component can be used as a Dialog replacement on mobile and
								tablet devices.
							</p>
						</div>
					</div>
					<div className="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
						<div className="flex gap-6 justify-end max-w-md mx-auto">
							<a
								className="text-xs text-gray-600 flex items-center gap-0.25"
								href="https://github.com/emilkowalski/vaul"
								target="_blank"
								rel="noreferrer"
							>
								{' '}
								GitHub{' '}
								<svg
									fill="none"
									height="16"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									width="16"
									aria-hidden="true"
									className="w-3 h-3 ml-1"
								>
									<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
									<path d="M15 3h6v6" />
									<path d="M10 14L21 3" />
								</svg>
							</a>
							<a
								className="text-xs text-gray-600 flex items-center gap-0.25"
								href="https://twitter.com/emilkowalski_"
								target="_blank"
								rel="noreferrer"
							>
								{' '}
								Twitter{' '}
								<svg
									fill="none"
									height="16"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									width="16"
									aria-hidden="true"
									className="w-3 h-3 ml-1"
								>
									<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
									<path d="M15 3h6v6" />
									<path d="M10 14L21 3" />
								</svg>
							</a>
						</div>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	)

	// {/* <Drawer.Content>
	// 	<a
	// 		className="flex items-center gap-1 hover:underline hover:underline-offset-4 text-xs text-gray-500"
	// 		href="https://cargocollective.com/sagejenson/physarum"
	// 		target="_blank"
	// 		rel="noopener noreferrer"
	// 	>
	// 		<Image
	// 			aria-hidden
	// 			src="/brain.svg"
	// 			alt="brain icon"
	// 			width={16}
	// 			height={16}
	// 		/>
	// 		Physarum
	// 	</a>
	// </Drawer.Content> */}
}
