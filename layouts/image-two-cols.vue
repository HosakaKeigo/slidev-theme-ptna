<script setup>
const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => []
  },
  position: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right'].includes(value)
  }
})
</script>

<template>
  <div class="slidev-layout image-two-cols" :class="`image-${position}`">
    <!-- Content Column -->
    <div class="content-col">
      <slot />
    </div>
    
    <!-- Image Column -->
    <div class="image-col">
      <v-switch>
        <template v-for="(image, index) in images" :key="index" #[index+1]>
          <img :src="image" alt="" class="full-image" />
        </template>
      </v-switch>
    </div>
  </div>
</template>

<style scoped>
.slidev-layout.image-two-cols {
  @apply h-full w-full grid;
  grid-template-columns: 1fr 1fr;
}

.slidev-layout.image-two-cols.image-left {
  direction: rtl;
}

.slidev-layout.image-two-cols.image-left > * {
  direction: ltr;
}

.content-col {
  @apply flex flex-col justify-center overflow-y-auto;
  padding: 2rem 4rem;
}

.image-col {
  @apply relative overflow-hidden;
}

.full-image {
  @apply absolute inset-0 w-full h-full object-cover;
}

.click-hint {
  @apply absolute bottom-8 left-1/2 transform -translate-x-1/2;
  @apply bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg text-sm;
  pointer-events: none;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}
</style>