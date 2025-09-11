<script setup lang="ts">
interface Props {
  variant?:
    | "default"
    | "animated"
    | "corners"
    | "divider"
    | "background"
    | "books"
    | "cover"
    | "section";
  opacity?: number;
  animate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  opacity: 0.2,
  animate: false,
});

const opacityStyle = {
  opacity: props.opacity,
};
</script>

<template>
  <!-- Default pattern - scattered notes -->
  <div
    v-if="variant === 'default'"
    class="absolute inset-0 overflow-hidden pointer-events-none"
  >
    <div
      class="absolute top-1/4 left-1/4 text-ptna-primary text-6xl transform -rotate-12"
      :style="opacityStyle"
    >
      ♪
    </div>
    <div
      class="absolute top-3/4 right-1/4 text-ptna-primary text-5xl transform rotate-12"
      :style="opacityStyle"
    >
      ♫
    </div>
    <div
      class="absolute top-1/2 left-1/6 text-ptna-primary text-4xl"
      :style="opacityStyle"
    >
      ♬
    </div>
  </div>

  <!-- Animated pattern - floating notes -->
  <div
    v-else-if="variant === 'animated'"
    class="absolute inset-0 overflow-hidden pointer-events-none"
  >
    <div
      class="absolute top-1/4 left-1/6 text-ptna-primary text-5xl"
      :class="{ 'animate-pulse': animate }"
      :style="opacityStyle"
    >
      ♪
    </div>
    <div
      class="absolute top-1/3 right-1/6 text-ptna-primary text-4xl"
      :class="{ 'animate-pulse': animate }"
      :style="{ ...opacityStyle, animationDelay: animate ? '1s' : '0s' }"
    >
      ♫
    </div>
    <div
      class="absolute bottom-1/3 left-1/4 text-ptna-primary text-6xl"
      :class="{ 'animate-pulse': animate }"
      :style="{ ...opacityStyle, animationDelay: animate ? '2s' : '0s' }"
    >
      ♬
    </div>
  </div>

  <!-- Corners pattern - small notes in corners -->
  <div
    v-else-if="variant === 'corners'"
    class="absolute inset-0 overflow-hidden pointer-events-none"
  >
    <div
      class="absolute -top-3 -left-3 bg-white text-ptna-primary text-2xl"
      :style="opacityStyle"
    >
      ♪
    </div>
    <div
      class="absolute -top-3 -right-3 bg-white text-ptna-primary text-2xl"
      :style="opacityStyle"
    >
      ♫
    </div>
    <div
      class="absolute -bottom-3 -left-3 bg-white text-ptna-primary text-2xl"
      :style="opacityStyle"
    >
      ♬
    </div>
  </div>

  <!-- Divider pattern - single note for dividers -->
  <div
    v-else-if="variant === 'divider'"
    class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-ptna-primary text-xl pointer-events-none"
    :style="opacityStyle"
  >
    ♪
  </div>

  <!-- Background pattern - large faded notes -->
  <div
    v-else-if="variant === 'background'"
    class="absolute inset-0 overflow-hidden pointer-events-none"
  >
    <div
      class="absolute top-8 left-8 text-ptna-primary text-4xl"
      :class="{ 'animate-float': animate }"
      :style="{ opacity: props.opacity * 0.5 }"
    >
      ♪
    </div>
    <div
      class="absolute top-16 right-16 text-ptna-primary text-5xl"
      :class="{ 'animate-float-delayed': animate }"
      :style="{ opacity: props.opacity * 0.4 }"
    >
      ♫
    </div>
    <div
      class="absolute bottom-16 left-1/4 text-ptna-primary text-6xl"
      :class="{ 'animate-float': animate }"
      :style="{ opacity: props.opacity * 0.3 }"
    >
      ♬
    </div>
  </div>

  <!-- Books pattern - book and document emojis for table of contents -->
  <div
    v-else-if="variant === 'books'"
    class="absolute inset-0 overflow-hidden pointer-events-none"
  >
    <div
      class="absolute top-1/4 left-1/6 text-ptna-primary text-6xl transform -rotate-12"
      :style="opacityStyle"
    >
      📖
    </div>
    <div
      class="absolute top-3/4 right-1/6 text-ptna-primary text-5xl transform rotate-12"
      :style="opacityStyle"
    >
      📑
    </div>
    <div
      class="absolute bottom-1/4 left-1/4 text-ptna-primary text-4xl"
      :style="opacityStyle"
    >
      📋
    </div>
    <div
      class="absolute bottom-1/4 right-1/4 text-ptna-primary text-4xl"
      :style="opacityStyle"
    >
      📚
    </div>
  </div>

  <!-- Cover pattern - for cover page -->
  <div
    v-else-if="variant === 'cover'"
    class="absolute inset-0 overflow-hidden pointer-events-none"
  >
    <div class="absolute top-8 left-8 opacity-20 text-white text-6xl">♫</div>
    <div class="absolute bottom-16 left-16 opacity-15 text-white text-4xl">
      ♪
    </div>
    <div class="absolute top-16 right-24 opacity-10 text-white text-5xl">♬</div>
  </div>

  <!-- Section pattern - large centered notes -->
  <div
    v-else-if="variant === 'section'"
    class="absolute inset-0 overflow-hidden pointer-events-none"
  >
    <div
      class="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div class="text-ptna-primary text-9xl" :style="opacityStyle">♪</div>
    </div>
    <div
      class="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2"
    >
      <div class="text-ptna-primary text-8xl" :style="opacityStyle">♫</div>
    </div>
  </div>
</template>

<style scoped>
.text-ptna-primary {
  color: var(--ptna-primary);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 3s ease-in-out infinite 1.5s;
}
</style>
