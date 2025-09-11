import type { CSSValue, ResolvedSlidevOptions, SlidevThemeMeta } from '@slidev/types'

export default {
  name: '@slidev/theme-ptna',
  colorSchema: 'both',
  highlighter: {
    theme: {
      dark: 'github-dark',
      light: 'github-light',
    },
  },
  defaults: {
    layout: 'default',
    themeConfig: {
      primary: '#770000',
      accent: '#ffffff',
      dark: '#000000',
    },
    fonts: {
      sans: ['"Noto Sans JP"', 'ui-sans-serif', 'system-ui'],
      serif: ['"Noto Serif JP"', 'ui-serif'],
      mono: ['"JetBrains Mono"', 'ui-monospace'],
    },
    htmlAttrs: {
      dir: 'ltr',
      lang: 'ja',
    },
  },
} satisfies SlidevThemeMeta
