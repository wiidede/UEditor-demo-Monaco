<!-- eslint-disable no-restricted-globals -->
<script lang="ts" setup>
import * as monaco from 'monaco-editor'

import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'

const props = defineProps<{
  value?: string
}>()

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

window.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'typescript' || label === 'javascript')
      return new TsWorker()
    if (label === 'json')
      return new JsonWorker()
    if (label === 'css')
      return new CssWorker()
    if (label === 'html')
      return new HtmlWorker()
    return new EditorWorker()
  },
}

// self.MonacoEnvironment = {
//   getWorker(workerId, label) {
//     const getWorkerModule = (moduleUrl: string, label: string) => {
//       // eslint-disable-next-line ts/ban-ts-comment
//       // @ts-expect-error
//       return new Worker(self.MonacoEnvironment.getWorkerUrl(moduleUrl), {
//         name: label,
//         type: 'module',
//       })
//     }

//     switch (label) {
//       case 'json':
//         return getWorkerModule('/monaco-editor/esm/vs/language/json/json.worker?worker', label)
//       case 'css':
//       case 'scss':
//       case 'less':
//         return getWorkerModule('/monaco-editor/esm/vs/language/css/css.worker?worker', label)
//       case 'html':
//       case 'handlebars':
//       case 'razor':
//         return getWorkerModule('/monaco-editor/esm/vs/language/html/html.worker?worker', label)
//       case 'typescript':
//       case 'javascript':
//         return getWorkerModule('/monaco-editor/esm/vs/language/typescript/ts.worker?worker', label)
//       default:
//         return getWorkerModule('/monaco-editor/esm/vs/editor/editor.worker?worker', label)
//     }
//   },
// }

const containerRef = ref<HTMLElement>()
const editor = shallowRef<monaco.editor.IStandaloneCodeEditor>()

onMounted(async () => {
  if (!containerRef.value)
    throw new Error('Cannot find containerRef')

  const editorInstance = monaco.editor.create(containerRef.value, {
    value: props.value,
    language: 'html',
    fontSize: 13,
    automaticLayout: true,
    // 'scrollBeyondLastLine': false,
    // minimap: {
    //   enabled: false,
    // },
    // inlineSuggest: {
    //   enabled: false,
    // },
    // 'semanticHighlighting.enabled': true,
    // 'fixedOverflowWidgets': true,
  })
  editor.value = editorInstance

  watch(
    () => props.value,
    (value) => {
      if (editorInstance.getValue() === value)
        return
      editorInstance.setValue(value || '')
    },
    { immediate: true },
  )

  // editorInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
  //   // ignore save event
  // })

  editorInstance.onDidChangeModelContent(() => {
    emit('change', editorInstance.getValue())
  })
})

onBeforeUnmount(() => {
  editor.value?.dispose()
})
</script>

<template>
  <div ref="containerRef" class="h-full w-full" />
</template>

<style  scoped>

</style>
