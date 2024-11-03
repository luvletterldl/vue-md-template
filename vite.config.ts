/// <reference types="vitest" />

import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import MarkdownItAnchor from 'markdown-it-anchor'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import VueDevTools from 'vite-plugin-vue-devtools'

hljs.registerLanguage('js', javascript)
hljs.registerLanguage('ts', typescript)

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    minify: 'terser',
    cssMinify: 'lightningcss',
  },
  css: {
    transformer: 'lightningcss',
  },
  plugins: [
    VueDevTools(),

    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md'],
    }),

    Markdown({
      headEnabled: true,
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
        langPrefix: '',
        highlight(str, lang) {
          return `<pre><code class="hljs">${
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
          }</code></pre>`
        },
      },
      markdownItSetup(md) {
        // for example
        md.use(MarkdownItAnchor)
      },
    }),

    // https://github.com/unplugin/unplugin-auto-import
    AutoImport({
      resolvers: [],
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        {
          consola: [
            ['default', 'consola'],
          ],
        },
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/unplugin/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [IconsResolver()],
      dts: true,
    }),

    // https://github.com/unplugin/unplugin-icons
    Icons({
      autoInstall: true,
    }),

    // https://github.com/unocss/unocss
    // see unocss.config.ts for config
    UnoCSS(),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})
