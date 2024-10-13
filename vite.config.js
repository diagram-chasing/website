import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
import { format } from 'date-fns';
export default defineConfig({
	define: {
		'process.env.BUILD_TIME': JSON.stringify(format(new Date(), 'd, MMM, yyyy'))
	},
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$lib: path.resolve('./src/lib'),
			$components: path.resolve('./src/lib/components'),
			$assets: path.resolve('./src/lib/assets'),
			$styles: path.resolve('./src/lib/styles'),
			$utils: path.resolve('./src/utils'),
			$content: path.resolve('./src/content')
		}
	}
});
