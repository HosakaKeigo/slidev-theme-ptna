<template>
  <div class="slidev-layout section" :class="$slidev?.nav?.currentLayout">
    <!-- Background Musical Elements -->
    <div class="section-background">
      <div class="musical-notes">
        <div class="note note-1">♪</div>
        <div class="note note-2">♫</div>
        <div class="note note-3">♬</div>
        <div class="note note-4">♩</div>
        <div class="note note-5">♪</div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="section-content">
      <!-- Section Number -->
      <div class="section-number" v-if="$frontmatter.sectionNumber">
        {{ $frontmatter.sectionNumber }}
      </div>

      <!-- Title -->
      <div class="section-title">
        <slot />
      </div>

      <!-- Subtitle -->
      <div class="section-subtitle" v-if="$frontmatter.subtitle">
        {{ $frontmatter.subtitle }}
      </div>

      <!-- Description -->
      <div class="section-description" v-if="$frontmatter.description">
        {{ $frontmatter.description }}
      </div>
    </div>

    <!-- Decorative Line -->
    <div class="decorative-line">
      <div class="line-left"></div>
      <div class="piano-key">
        <div class="white-key"></div>
        <div class="black-key"></div>
      </div>
      <div class="line-right"></div>
    </div>
  </div>
</template>

<style scoped>
.slidev-layout.section {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem;
  min-height: 100vh;
  background: radial-gradient(circle at center, rgba(119, 0, 0, 0.05) 0%, transparent 50%),
              linear-gradient(45deg, var(--ptna-white) 0%, #fafafa 100%);
}

html.dark .slidev-layout.section {
  background: radial-gradient(circle at center, rgba(119, 0, 0, 0.3) 0%, transparent 50%),
              linear-gradient(45deg, var(--ptna-black) 0%, #0a0a0a 100%);
}

.section-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
}

.musical-notes {
  position: relative;
  width: 100%;
  height: 100%;
}

.note {
  position: absolute;
  font-size: 3rem;
  color: var(--ptna-primary);
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.note-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.note-2 {
  top: 30%;
  right: 15%;
  animation-delay: 1s;
}

.note-3 {
  top: 60%;
  left: 20%;
  animation-delay: 2s;
}

.note-4 {
  top: 70%;
  right: 25%;
  animation-delay: 3s;
}

.note-5 {
  top: 15%;
  left: 70%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

.section-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
}

.section-number {
  display: inline-block;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ptna-white);
  background: var(--ptna-primary);
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  margin-bottom: 2rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.section-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--ptna-primary);
  margin-bottom: 1.5rem;
  line-height: 1.1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-subtitle {
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--ptna-gray-dark);
  margin-bottom: 1rem;
  line-height: 1.3;
}

html.dark .section-subtitle {
  color: var(--ptna-gray);
}

.section-description {
  font-size: 1.125rem;
  color: var(--ptna-gray);
  line-height: 1.5;
  max-width: 600px;
  margin: 0 auto;
}

.decorative-line {
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 60%;
  z-index: 1;
}

.line-left,
.line-right {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, var(--ptna-primary) 50%, transparent 100%);
}

.piano-key {
  position: relative;
  display: flex;
  align-items: center;
}

.white-key {
  width: 20px;
  height: 60px;
  background: var(--ptna-white);
  border: 2px solid var(--ptna-gray);
  border-radius: 0 0 4px 4px;
}

html.dark .white-key {
  background: var(--ptna-gray-light);
}

.black-key {
  position: absolute;
  top: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 35px;
  background: var(--ptna-black);
  border-radius: 0 0 2px 2px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .slidev-layout.section {
    padding: 2rem 1.5rem;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .section-subtitle {
    font-size: 1.25rem;
  }
  
  .section-description {
    font-size: 1rem;
  }
  
  .decorative-line {
    width: 80%;
    bottom: 2rem;
  }
  
  .note {
    font-size: 2rem;
  }
}
</style>
