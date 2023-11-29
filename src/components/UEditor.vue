<script lang="ts" setup>
const props = defineProps<{
  modelValue: string | undefined
  config?: any
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: typeof props.modelValue]
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const conf = computed(() => ({
  UEDITOR_HOME_URL: `/UEditor/`,
  enableAutoSave: false,
  elementPathEnabled: false,
  wordCount: false,
  allowDivTransToP: false,
  toolbars: [[
    'fullscreen',
    'undo',
    'redo',
    '|',
    'bold',
    'italic',
    'underline',
    'fontborder',
    'strikethrough',
    'superscript',
    'subscript',
    'removeformat',
    'formatmatch',
    'autotypeset',
    'blockquote',
    'pasteplain',
    '|',
    'forecolor',
    'backcolor',
    'insertorderedlist',
    'insertunorderedlist',
    'selectall',
    'cleardoc',
    '|',
    'rowspacingtop',
    'rowspacingbottom',
    'lineheight',
    '|',
    'customstyle',
    'paragraph',
    'fontfamily',
    'fontsize',
    '|',
    'directionalityltr',
    'directionalityrtl',
    'indent',
    '|',
    'justifyleft',
    'justifycenter',
    'justifyright',
    'justifyjustify',
    '|',
    'touppercase',
    'tolowercase',
    '|',
    'link',
    'unlink',
    'anchor',
    '|',
    // 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
    // 'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
    'horizontal',
    'date',
    'time',
    'spechars', /* 'snapscreen', 'wordimage', */
    '|',
    'inserttable',
    'deletetable',
    'insertparagraphbeforetable',
    'insertrow',
    'deleterow',
    'insertcol',
    'deletecol',
    'mergecells',
    'mergeright',
    'mergedown',
    'splittocells',
    'splittorows',
    'splittocols',
    'charts',
    '|',
    'print', /* 'preview', */
    'searchreplace', /* 'drafts', */
    'help',
    '|',
    'source',
  ]],
  ...props.config,
}))

let ue: any

const disabledValue = computed(() => props.disabled || false)
const exceptButtons = ['fullscreen', 'print']

function ready(instance: any) {
  ue = instance
  setDisabled(disabledValue.value)
}

function setDisabled(val: boolean) {
  val ? ue?.setDisabled(exceptButtons) : ue?.setEnabled()
}

watch(disabledValue, setDisabled)
</script>

<template>
  <VueUeditorWrap v-model="model" :config="conf" v-bind="$attrs" class="u-editor" @ready="ready" />
</template>

<style scoped>
.u-editor {
  white-space: initial;
  line-height: initial;
}
</style>
