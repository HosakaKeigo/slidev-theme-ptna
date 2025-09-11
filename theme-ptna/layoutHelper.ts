import type { CSSProperties } from 'vue'

export function handleBackground(background?: string, dim = false): CSSProperties {
  const isColor = background && ['#', 'rgb', 'hsl'].some(v => background.indexOf(v) === 0)

  const style: CSSProperties = {
    background: isColor
      ? background
      : background
        ? dim
          ? `linear-gradient(#0007, #0007), url(${background}) center/cover no-repeat`
          : `url(${background}) center/cover no-repeat`
        : undefined,
  }

  if (!style.background) {
    delete style.background
  }

  return style
}

export function resolveAssetUrl(url: string): string {
  if (url.startsWith('/') || url.match(/^https?:/) || url.match(/^data:/))
    return url
  return new URL(`../assets/${url}`, import.meta.url).href
}