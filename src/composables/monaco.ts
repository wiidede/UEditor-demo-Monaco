export const useMonacoState = createGlobalState(
  () => {
    const isFocused = ref(false)
    return { isFocused }
  },
)
