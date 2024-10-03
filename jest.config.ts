// jest.config.ts
import type { Config } from 'jest'

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		// Handle CSS imports (with CSS Modules)
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		// Handle image imports
		'\\.(jpg|jpeg|png|gif|svg)$': 'jest-transform-stub',
	},
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	setupFilesAfterEnv: ['./jest.setup.ts'],
}

export default config
