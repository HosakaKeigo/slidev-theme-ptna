<!--
Profile Layout - 人物紹介用レイアウト

使用用途:
- 講師や審査員のプロフィール紹介
- 受賞者や演奏者の紹介
- チームメンバーの紹介
- PTNAの役員・スタッフ紹介

特徴:
- 写真と情報をバランス良く配置
- 音符装飾付きの洗練されたデザイン
- 複数人表示にも対応（グリッドレイアウト）
- SNSリンクやWebサイトの表示オプション

使用方法:
---
layout: profile
image: /path/to/photo.jpg
name: 山田太郎
title: ピアノ指導者
organization: PTNA正会員
---

プロフィール本文...
-->

<script setup lang="ts">
import { computed } from "vue";
import { handleBackground } from "../layoutHelper";
import PtnaLogo from "../components/PtnaLogo.vue";
import PageIndicator from "../components/PageIndicator.vue";

const props = defineProps({
  background: {
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  organization: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  layout: {
    type: String,
    default: "single",
    validator: (value: string) => ["single", "grid"].includes(value),
  },
});

const style = computed(() => handleBackground(props.background));
</script>

<template>
  <div class="slidev-layout profile" :style="style">
    <PtnaLogo />

    <!-- Single profile layout -->
    <div v-if="layout === 'single'" class="single-profile h-full">
      <div class="profile-container h-full">
        <div class="profile-card">
          <!-- Photo section -->
          <div v-if="image" class="photo-section">
            <div class="photo-frame">
              <img :src="image" :alt="name || 'Profile photo'" class="profile-photo" />
            </div>
          </div>

          <!-- Info section -->
          <div class="info-section">
            <!-- Name and title -->
            <div class="profile-header">
              <h1 v-if="name" class="profile-name">{{ name }}</h1>
              <p v-if="title" class="profile-title">{{ title }}</p>
              <p v-if="organization" class="profile-org">{{ organization }}</p>
            </div>

            <!-- Bio content -->
            <div class="profile-content">
              <slot />
            </div>

            <!-- Contact info -->
            <div v-if="email || website" class="contact-info">
              <div v-if="email" class="contact-item">
                <span class="contact-icon">✉</span>
                <a :href="`mailto:${email}`" class="contact-link">{{ email }}</a>
              </div>
              <div v-if="website" class="contact-item">
                <span class="contact-icon">🌐</span>
                <a :href="website" target="_blank" class="contact-link">{{ website }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Grid layout for multiple profiles -->
    <div v-else-if="layout === 'grid'" class="grid-profiles h-full px-8 py-8">
      <div v-if="$slots.title" class="text-center mb-8">
        <slot name="title" />
      </div>
      
      <div class="profiles-grid">
        <slot name="profiles" />
      </div>
    </div>

    <PageIndicator />
  </div>
</template>

<style scoped>
.slidev-layout.profile {
  @apply h-full;
  background: white;
}

/* Single profile layout */
.profile-card {
  @apply flex gap-8 items-stretch h-full;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 0;
  padding: 0;
  box-shadow: none;
}

/* Photo section - 左1/3 */
.photo-section {
  @apply flex-shrink-0;
  width: 33.333%;
  background: linear-gradient(135deg, #f8f9fa 0%, #e8f4fd 100%);
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.photo-frame {
  @apply relative;
  width: 100%;
  max-width: 320px;
  aspect-ratio: 1;
}

.profile-photo {
  @apply w-full h-full object-cover rounded-lg shadow-lg;
  border: 4px solid white;
}


/* Info section - 右2/3 */
.info-section {
  @apply flex flex-col;
  width: 66.667%;
  padding: 3rem;
}

.profile-header {
  @apply mb-6 pb-4 border-b-2;
  border-color: rgba(0, 0, 0, 0.1);
}

.profile-name {
  @apply text-4xl font-bold mb-3;
  color: var(--ptna-primary);
  letter-spacing: -0.02em;
}

.profile-title {
  @apply text-2xl font-medium mb-2;
  color: var(--ptna-text-primary);
}

.profile-org {
  @apply text-xl;
  color: var(--ptna-text-secondary);
}

/* Content */
.profile-content {
  @apply flex-1 mb-6;
}

.profile-content :deep(p) {
  @apply text-lg leading-relaxed mb-4;
  color: var(--ptna-text-primary);
}

.profile-content :deep(ul),
.profile-content :deep(ol) {
  @apply ml-6 mb-4 space-y-2;
  color: var(--ptna-text-primary);
}

.profile-content :deep(li) {
  @apply relative;
}

.profile-content :deep(h2) {
  @apply text-xl font-semibold mt-4 mb-2;
  color: var(--ptna-primary);
}

.profile-content :deep(h3) {
  @apply text-lg font-medium mt-3 mb-2;
  color: var(--ptna-text-secondary);
}

/* Contact info */
.contact-info {
  @apply flex gap-6 pt-4 border-t;
  border-color: rgba(0, 0, 0, 0.1);
}

.contact-item {
  @apply flex items-center gap-2;
}

.contact-icon {
  @apply text-lg;
  color: var(--ptna-primary);
}

.contact-link {
  @apply text-sm underline;
  color: var(--ptna-primary);
}

.contact-link:hover {
  @apply no-underline;
  opacity: 0.8;
}

/* Grid layout styles */
.profiles-grid {
  @apply grid gap-6;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

/* Profile card in grid */
.profiles-grid :deep(.profile-item) {
  @apply p-6 rounded-lg text-center;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profiles-grid :deep(.profile-item:hover) {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.profiles-grid :deep(.profile-item img) {
  @apply w-32 h-32 mx-auto mb-4 rounded-full object-cover;
  border: 3px solid var(--ptna-primary);
}

.profiles-grid :deep(.profile-item h3) {
  @apply text-xl font-bold mb-1;
  color: var(--ptna-primary);
}

.profiles-grid :deep(.profile-item p) {
  @apply text-sm;
  color: var(--ptna-text-secondary);
}

/* Title for grid layout */
.slidev-layout.profile h1 {
  @apply text-4xl font-bold;
  color: var(--ptna-primary);
}

/* Responsive design */
@media (max-width: 768px) {
  .profile-card {
    @apply flex-col;
  }

  .photo-section {
    width: 100%;
    padding: 2rem;
  }

  .info-section {
    width: 100%;
    padding: 2rem;
  }

  .photo-frame {
    @apply mx-auto;
    max-width: 200px;
  }

  .profile-name {
    @apply text-2xl text-center;
  }

  .profile-title,
  .profile-org {
    @apply text-center;
  }

  .contact-info {
    @apply flex-col gap-3;
  }

  .profiles-grid {
    grid-template-columns: 1fr;
  }
}
</style>