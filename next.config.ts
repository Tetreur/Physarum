import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	devIndicators: false,
	webpack: (config) => {
		config.module?.rules?.push(
			{
				test: /\.wgsl$/i,
				use: 'raw-loader',
			},
			{
				test: /\.glsl$/i,
				use: 'raw-loader',
			},
		)

		return config
	},

	experimental: {
		turbo: {
			rules: {
				'*.wgsl': {
					loaders: ['raw-loader'],
					as: '*.js',
				},
				'*.glsl': {
					loaders: ['raw-loader'],
					as: '*.js',
				},
			},
		},
	},
}

export default nextConfig
