import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import rollupReplace from '@rollup/plugin-replace';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		rollupReplace({
			preventAssignment: true,
			values: {
				__DEV__: JSON.stringify(true),
				'process.env.NODE_ENV': JSON.stringify('development'),
			},
		}),
		react(),
		svgr(),
	],
	resolve: {
		alias: {
			'app': path.resolve(__dirname, 'src', 'app'),
			'shared': path.resolve(__dirname, 'src', 'shared'),
			'pages': path.resolve(__dirname, 'src', 'pages'),
			'widgets': path.resolve(__dirname, 'src', 'widgets'),
			'features': path.resolve(__dirname, 'src', 'features'),
			'entities': path.resolve(__dirname, 'src', 'entities'),
		}
	}
});
