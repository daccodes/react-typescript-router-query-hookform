import { defineConfig } from "vite";

import mdx from "@mdx-js/rollup";
import svgr from "@svgr/rollup";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		reactRefresh(),
		mdx({ providerImportSource: "@mdx-js/react" }),
		svgr(),
	],
});
