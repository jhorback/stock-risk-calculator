import html from '@web/rollup-plugin-html';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: "demo/index.html",
  output: { dir: "build" },
  plugins: [nodeResolve(), html()],
};
