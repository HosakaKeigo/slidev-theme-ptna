<template>
  <div class="slidev-layout center" :class="$slidev?.nav?.currentLayout">
    <!-- Background Elements -->
    <div class="center-background">
      <div class="musical-staff">
        <div class="staff-line" v-for="n in 5" :key="n"></div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="center-content">
      <slot />
    </div>

    <!-- Corner Decorations -->
    <div class="corner-decoration top-left">
      <div class="treble-clef">𝄞</div>
    </div>
    <div class="corner-decoration bottom-right">
      <div class="bass-clef">𝄢</div>
    </div>

    <!-- Page Number -->
    <div class="page-number" v-if="$frontmatter.showPageNumber !== false">
      <SlideCurrentNo /> / <SlidesTotal />
    </div>
  </div>
</template>

<style scoped>
.slidev-layout.center {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 3rem;
  min-height: 100vh;
  background: var(--ptna-white);
  overflow: hidden;
}

html.dark .slidev-layout.center {
  background: var(--ptna-black);
}

.center-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  opacity: 0.05;
}

.musical-staff {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 10%;
}

.staff-line {
  height: 2px;
  width: 100%;
  background: var(--ptna-primary);
  opacity: 0.3;
}

.center-content {
  position: relative;
  z-index: 1;
  max-width: 900px;
  width: 100%;
}

/* Content Styling */
.center-content :deep(h1) {
  font-size: 3rem;
  font-weight: 700;
  color: var(--ptna-primary);
  margin-bottom: 2rem;
  line-height: 1.1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.center-content :deep(h2) {
  font-size: 2.25rem;
  font-weight: 600;
  color: var(--ptna-primary);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.center-content :deep(h3) {
  font-size: 1.75rem;
  font-weight: 500;
  color: var(--ptna-primary-dark);
  margin-bottom: 1rem;
}

.center-content :deep(p) {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--ptna-gray-dark);
  margin-bottom: 1.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

html.dark .center-content :deep(p) {
  color: var(--ptna-gray);
}

.center-content :deep(blockquote) {
  font-size: 1.5rem;
  font-style: italic;
  color: var(--ptna-primary);
  border-left: 4px solid var(--ptna-primary);
  padding-left: 2rem;
  margin: 2rem 0;
  background: rgba(119, 0, 0, 0.05);
  padding: 1.5rem 2rem;
  border-radius: 0 1rem 1rem 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

html.dark .center-content :deep(blockquote) {
  background: rgba(119, 0, 0, 0.2);
}

.center-content :deep(ul),
.center-content :deep(ol) {
  text-align: left;
  display: inline-block;
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.center-content :deep(li) {
  margin-bottom: 0.5rem;
  color: var(--ptna-gray-dark);
}

html.dark .center-content :deep(li) {
  color: var(--ptna-gray);
}

.center-content :deep(strong) {
  color: var(--ptna-primary);
  font-weight: 600;
}

.center-content :deep(em) {
  color: var(--ptna-primary-dark);
  font-style: italic;
}

.center-content :deep(code) {
  font-size: 1rem;
  background: rgba(119, 0, 0, 0.1);
  color: var(--ptna-primary);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-family: 'JetBrains Mono', monospace;
}

html.dark .center-content :deep(code) {
  background: rgba(119, 0, 0, 0.3);
}

.center-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
}

/* Corner Decorations */
.corner-decoration {
  position: absolute;
  z-index: 0;
  opacity: 0.1;
  font-size: 4rem;
  color: var(--ptna-primary);
  pointer-events: none;
}

.top-left {
  top: 2rem;
  left: 2rem;
}

.bottom-right {
  bottom: 2rem;
  right: 2rem;
}

.treble-clef,
.bass-clef {
  animation: gentle-pulse 4s ease-in-out infinite;
}

@keyframes gentle-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.15;
  }
}

/* Page Number */
.page-number {
  position: absolute;
  bottom: 1.5rem;
  right: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ptna-primary);
  z-index: 1;
}

/* Special Components Styling */
.center-content :deep(.highlight-box) {
  background: linear-gradient(135deg, rgba(119, 0, 0, 0.1) 0%, rgba(119, 0, 0, 0.05) 100%);
  border: 2px solid rgba(119, 0, 0, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  margin: 2rem 0;
}

html.dark .center-content :deep(.highlight-box) {
  background: linear-gradient(135deg, rgba(119, 0, 0, 0.3) 0%, rgba(119, 0, 0, 0.15) 100%);
  border-color: rgba(119, 0, 0, 0.4);
}

.center-content :deep(.key-point) {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--ptna-primary);
  background: var(--ptna-white);
  border: 3px solid var(--ptna-primary);
  border-radius: 2rem;
  padding: 1rem 2rem;
  margin: 2rem 0;
  display: inline-block;
  box-shadow: 0 4px 16px rgba(119, 0, 0, 0.2);
}

html.dark .center-content :deep(.key-point) {
  background: var(--ptna-black);
  color: var(--ptna-white);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .center-content :deep(h1) {
    font-size: 2.5rem;
  }
  
  .center-content :deep(h2) {
    font-size: 2rem;
  }
  
  .center-content :deep(p) {
    font-size: 1.125rem;
  }
}

@media (max-width: 768px) {
  .slidev-layout.center {
    padding: 2rem 1.5rem;
  }
  
  .center-content :deep(h1) {
    font-size: 2rem;
  }
  
  .center-content :deep(h2) {
    font-size: 1.75rem;
  }
  
  .center-content :deep(p) {
    font-size: 1rem;
  }
  
  .center-content :deep(blockquote) {
    font-size: 1.25rem;
    padding: 1rem 1.5rem;
  }
  
  .corner-decoration {
    font-size: 2.5rem;
  }
  
  .top-left {
    top: 1rem;
    left: 1rem;
  }
  
  .bottom-right {
    bottom: 1rem;
    right: 1rem;
  }
  
  .page-number {
    bottom: 1rem;
    right: 1.5rem;
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .corner-decoration {
    display: none;
  }
  
  .musical-staff {
    display: none;
  }
}
</style>
