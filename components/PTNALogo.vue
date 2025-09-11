<template>
  <div class="ptna-logo-container" :class="[`size-${size}`, variant, { interactive: href }]">
    <a 
      v-if="href" 
      :href="href" 
      :target="target"
      :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
      class="logo-link"
    >
      <div class="logo-content">
        <img 
          v-if="src"
          :src="src"
          :alt="alt"
          class="logo-image"
          :class="{ 'with-text': showText }"
        />
        <div v-else class="logo-placeholder">
          <div class="placeholder-icon">♪</div>
          <div v-if="showText" class="placeholder-text">PTNA</div>
        </div>
        
        <div v-if="showText && showFullName" class="logo-text">
          <div class="org-name-ja">一般社団法人 全日本ピアノ指導者協会</div>
          <div class="org-name-en">Piano Teachers' National Association of Japan</div>
        </div>
        <div v-else-if="showText" class="logo-text-short">
          <div class="org-name-short">PTNA</div>
        </div>
      </div>
    </a>
    
    <div v-else class="logo-content">
      <img 
        v-if="src"
        :src="src"
        :alt="alt"
        class="logo-image"
        :class="{ 'with-text': showText }"
      />
      <div v-else class="logo-placeholder">
        <div class="placeholder-icon">♪</div>
        <div v-if="showText" class="placeholder-text">PTNA</div>
      </div>
      
      <div v-if="showText && showFullName" class="logo-text">
        <div class="org-name-ja">一般社団法人 全日本ピアノ指導者協会</div>
        <div class="org-name-en">Piano Teachers' National Association of Japan</div>
      </div>
      <div v-else-if="showText" class="logo-text-short">
        <div class="org-name-short">PTNA</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  src?: string
  alt?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  variant?: 'default' | 'header' | 'footer' | 'cover' | 'minimal'
  showText?: boolean
  showFullName?: boolean
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
}

const props = withDefaults(defineProps<Props>(), {
  alt: 'PTNA Logo',
  size: 'md',
  variant: 'default',
  showText: false,
  showFullName: false,
  target: '_blank',
})
</script>

<style scoped>
.ptna-logo-container {
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
}

.logo-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.logo-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* サイズバリエーション */
.size-xs .logo-image {
  height: 1.5rem;
}

.size-sm .logo-image {
  height: 2rem;
}

.size-md .logo-image {
  height: 2.5rem;
}

.size-lg .logo-image {
  height: 3rem;
}

.size-xl .logo-image {
  height: 4rem;
}

.size-2xl .logo-image {
  height: 5rem;
}

.logo-image {
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: all 0.3s ease;
}

.logo-image.with-text {
  margin-right: 0.5rem;
}

/* プレースホルダーロゴ */
.logo-placeholder {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--ptna-primary);
  font-weight: bold;
}

.placeholder-icon {
  font-size: 2rem;
  animation: gentle-spin 8s linear infinite;
}

.placeholder-text {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

@keyframes gentle-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* テキスト部分 */
.logo-text,
.logo-text-short {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.org-name-ja {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ptna-primary);
  margin-bottom: 0.125rem;
}

.org-name-en {
  font-size: 0.75rem;
  color: var(--ptna-gray);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.org-name-short {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ptna-primary);
  letter-spacing: 0.1em;
}

/* バリアントスタイル */
.variant-header .logo-image {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.variant-footer .logo-image {
  opacity: 0.8;
}

.variant-footer .org-name-ja,
.variant-footer .org-name-en,
.variant-footer .org-name-short {
  color: var(--ptna-gray);
}

.variant-cover .logo-image {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.variant-cover .org-name-ja {
  font-size: 1rem;
  font-weight: 700;
}

.variant-cover .org-name-en {
  font-size: 0.875rem;
}

.variant-cover .org-name-short {
  font-size: 1.5rem;
}

.variant-minimal .logo-text,
.variant-minimal .logo-text-short {
  display: none;
}

/* インタラクティブスタイル */
.interactive .logo-link:hover {
  transform: scale(1.05);
}

.interactive .logo-link:hover .logo-image {
  filter: drop-shadow(0 4px 12px rgba(119, 0, 0, 0.3));
}

.interactive .logo-link:hover .org-name-ja {
  color: var(--ptna-primary-light);
}

/* ダークモード */
html.dark .logo-image {
  filter: drop-shadow(0 2px 4px rgba(255, 255, 255, 0.1));
}

html.dark .interactive .logo-link:hover .logo-image {
  filter: drop-shadow(0 4px 12px rgba(119, 0, 0, 0.5));
}

/* レスポンシブデザイン */
@media (max-width: 768px) {
  .logo-content {
    gap: 0.5rem;
  }
  
  .org-name-ja {
    font-size: 0.75rem;
  }
  
  .org-name-en {
    font-size: 0.625rem;
  }
  
  .size-2xl .logo-image {
    height: 3rem;
  }
  
  .size-xl .logo-image {
    height: 2.5rem;
  }
  
  .variant-cover .org-name-ja {
    font-size: 0.875rem;
  }
  
  .variant-cover .org-name-en {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .logo-text .org-name-en {
    display: none;
  }
  
  .size-lg .logo-image,
  .size-xl .logo-image,
  .size-2xl .logo-image {
    height: 2rem;
  }
}

/* アクセシビリティ */
@media (prefers-reduced-motion: reduce) {
  .placeholder-icon {
    animation: none;
  }
  
  .interactive .logo-link:hover {
    transform: none;
  }
  
  .logo-link,
  .logo-image {
    transition: none;
  }
}

/* 印刷スタイル */
@media print {
  .logo-image {
    filter: none !important;
  }
  
  .org-name-ja,
  .org-name-en,
  .org-name-short {
    color: #000 !important;
  }
}
</style>
