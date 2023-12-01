<script lang="ts" setup>
const ue = ref('')
const mo = ref('')

const { isFocused: isMoFocused } = useMonacoState()

function mini(val: string | undefined) {
  if (!val)
    return ''
  return window.minify(val, {
    collapseWhitespace: true,
  })
}

watch(ue, (val, oldVal) => {
  if (isMoFocused.value)
    return
  const minVal = mini(val)
  const minOldVal = mini(oldVal)
  const minMo = mini(mo.value)
  if (minVal !== minOldVal && minVal !== minMo)
    mo.value = val
}, {
  immediate: true,
})

watch(mo, async (val, oldVal) => {
  const minVal = mini(val)
  const minOldVal = mini(oldVal)
  const minUe = mini(ue.value)
  if (minVal !== minOldVal && minVal !== minUe)
    ue.value = minVal
}, {
  immediate: true,
})
</script>

<template>
  <div h-full flex gap1>
    <div of-x-hidden of-y-auto>
      <div w-798px flex-1>
        <UEditor v-model="ue" />
      </div>
    </div>
    <div h-full min-w0 flex-auto b-1>
      <MonacoWrapper v-model="mo" />
    </div>
  </div>
</template>

<style  scoped>

</style>
