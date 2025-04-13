'use client'

import * as SwitchPrimitive from '@radix-ui/react-switch'
import { twMerge } from 'tailwind-merge'

function Switch({
	className,
	...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			className={twMerge(
				'data-[state=checked]:bg-neutral-600 data-[state=unchecked]:bg-neutral-800',
				'inline-flex shrink-0 items-center rounded-full border border-transparent',
				'relative h-[1.15rem] w-8 cursor-default rounded-full outline-none',
				'disabled:cursor-not-allowed disabled:opacity-50',
				'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus:shadow-black',
				'shadow-xs',
				'transition-all',
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={twMerge(
					'block size-4 ring-0 rounded-full transition-transform duration-100',
					'data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0',
					'data-[state=checked]:bg-neutral-50 data-[state=unchecked]:bg-neutral-50',
				)}
			/>
		</SwitchPrimitive.Root>
	)
}

export default Switch
