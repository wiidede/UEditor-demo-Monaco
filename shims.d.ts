import type { Options } from 'html-minifier'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare global {
  interface Window {
    minify(text: string, options?: Options): string
  }
}
