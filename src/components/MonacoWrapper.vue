<script setup lang="ts">
import Monaco from './Monaco.vue'

const model = defineModel<string>()

const MonacoRef = ref<InstanceType<typeof Monaco>>()

const wordWrap = useLocalStorage('wordWrap', false)
const autoFormat = useLocalStorage('autoFormat', false)
const { isFocused } = useMonacoState()

function trigger(command: string, payload?: any) {
  MonacoRef.value?.editor?.trigger(undefined, command, payload)
}

watch([() => MonacoRef.value?.editor, wordWrap], ([editor, wrap]) => {
  if (!editor)
    return
  editor.updateOptions({ wordWrap: wrap ? 'on' : 'off' })
})

watch([autoFormat, model], () => {
  if (!MonacoRef.value?.editor)
    return
  if (autoFormat.value && !isFocused.value)
    trigger('editor.action.formatDocument')
})
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <div class="flex gap4 px2">
      <div>
        <input id="word-wrap" v-model="wordWrap" type="checkbox">
        <label for="word-wrap">Word Wrap</label>
      </div>
      <div>
        <input id="auto-format" v-model="autoFormat" type="checkbox">
        <label for="auto-format">Auto Format</label>
      </div>
    </div>
    <div class="min-h0 flex-auto">
      <Monaco ref="MonacoRef" :value="model" @change="model = $event" />
    </div>
  </div>
</template>

<style scoped>

</style>
