/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import progress from 'vite-plugin-progress';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
	build: {
		minify: `esbuild`,
		polyfillModulePreload: true,
		rollupOptions: {
			// external: [`aws-sdk`, `mock-aws-s3`, `nock`],
			// external: [`#ansi-styles`, `#supports-color`],
			input: `src/index.ts`,
			output: {
				chunkFileNames: `[name].chunk.js`,
				dir: `dist`,
				format: `es`,
				// inlineDynamicImports: false,

				// manualChunks(id) {
				// 	if (id.includes(`node_modules`)) {
				// 		return `vendor`;
				// 	}
				// },
				// name: `app`,

				sourcemap: true,
			},
		},
		// vite build configs, for details see [vite doc](https://vitejs.dev/config/#build)
		target: `es2022`,
	},

	optimizeDeps: {
		// Vite does not work well with optionnal dependencies,
		// you can mark them as ignored for now
		// eg: for nestjs, exlude these optional dependencies:
		// exclude: [
		//   '@nestjs/microservices',
		//   '@nestjs/websockets',
		//   'cache-manager',
		//   'class-transformer',
		//   'class-validator',
		//   'fastify-swagger',
		// ],
		// exclude: [`aws-sdk`, `mock-aws-s3`, `nock`],
	},

	plugins: [
		visualizer(),
		progress(),
		nodeResolve({
			// browser: false,
			exportConditions: [`node`],
		}),
		// ...VitePluginNode({
		// Nodejs native Request adapter
		// currently this plugin support 'express', 'nest', 'koa' and 'fastify' out of box,
		// you can also pass a function if you are using other frameworks, see Custom Adapter section
		// adapter: 'express',

		// tell the plugin where is your project entry
		// appPath: './src/vite-node-app.ts',

		// Optional, default: 'viteNodeApp'
		// the name of named export of you app from the appPath file
		// exportName: 'viteNodeApp',

		// Optional, default: 'esbuild'
		// The TypeScript compiler you want to use
		// by default this plugin is using vite default ts compiler which is esbuild
		// 'swc' compiler is supported to use as well for frameworks
		// like Nestjs (esbuild dont support 'emitDecoratorMetadata' yet)
		// you need to INSTALL `@swc/core` as dev dependency if you want to use swc
		// tsCompiler: 'esbuild',

		// Optional, default: {
		// jsc: {
		//   target: 'es2019',
		//   parser: {
		//     syntax: 'typescript',
		//     decorators: true
		//   },
		//  transform: {
		//     legacyDecorator: true,
		//     decoratorMetadata: true
		//   }
		// }
		// }
		// swc configs, see [swc doc](https://swc.rs/docs/configuration/swcrc)
		// swcOptions: {}
		// })
	],
	// ...vite configures
	server: {
		// vite server configs, for details see [vite doc](https://vitejs.dev/config/#server-host)
		port: 3_000,
	},
	test: {
		exclude: [...`test/mocha/*.test.ts`, `**/test/mocha/**`, `**/node_modules/**`],
		// coverage: {
		//   reporter: ['text', 'json', 'html']
		// }
	},
});
