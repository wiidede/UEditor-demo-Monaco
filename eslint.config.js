import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default antfu(
  {
    ignores: [
      'public/UEditor/**',
    ],
  },
  unocss.configs.flat,
)
