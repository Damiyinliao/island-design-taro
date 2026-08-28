import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'

const taroElements = ['view', 'image', 'text', 'button', 'block', 'scroll-view', 'swiper', 'swiper-item']

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => taroElements.includes(tag),
        },
      },
    }),
    dts({
      entryRoot: 'src',
      tsconfigPath: './tsconfig.json',
      cleanVueFileName: true,
    }),
  ],
  build: {
    minify: false,
    target: 'es2015',
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'component-list': resolve(__dirname, 'src/component-list.ts'),
        resolver: resolve(__dirname, 'src/resolver.ts'),
        'components/island-animate-modal/index': resolve(__dirname, 'src/components/island-animate-modal/index.ts'),
        'components/island-image/index': resolve(__dirname, 'src/components/island-image/index.ts'),
        'components/island-navbar/index': resolve(__dirname, 'src/components/island-navbar/index.ts'),
        'components/island-text/index': resolve(__dirname, 'src/components/island-text/index.ts'),
      },
      formats: ['es', 'cjs'],
      cssFileName: 'style',
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['vue', '@tarojs/taro', '@tarojs/components'],
      output: {
        exports: 'named',
      },
    },
  },
})
