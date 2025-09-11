<template>
  <div class="slidev-layout two-cols" :class="$slidev?.nav?.currentLayout">
    <!-- Header -->
    <header class="two-cols-header" v-if="$frontmatter.showHeader !== false">
      <h1 class="slide-title" v-if="$frontmatter.title">{{ $frontmatter.title }}</h1>
    </header>

    <!-- Main Content Area -->
    <div class="two-cols-container">
      <!-- Left Column -->
      <div class="col-left">
        <slot />
      </div>

      <!-- Divider -->
      <div class="col-divider">
        <div class="divider-line">
          <div class="piano-divider">
            <div class="piano-key-small white"></div>
            <div class="piano-key-small black"></div>
            <div class="piano-key-small white"></div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="col-right">
        <slot name="right" />
      </div>
    </div>

    <!-- Footer -->
    <footer class="two-cols-footer" v-if="$frontmatter.showFooter !== false">
      <div class="footer-content">
        <div class="footer-info">
          <span v-if="$frontmatter.author">{{ $frontmatter.author }}</span>
          <span v-if="$frontmatter.event">{{ $frontmatter.event }}</span>
        </div>
        <div class="footer-pages">
          <SlideCurrentNo />
          /
          <SlidesTotal />
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.slidev-layout.two-cols {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.two-cols-header {
  margin-bottom: 2rem;
  text-align: center;
}

.slide-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--ptna-primary);
  margin: 0;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--ptna-primary);
}

.two-cols-container {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  align-items: stretch;
  min-height: 0;
}

.col-left,
.col-right {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  padding: 1rem;
  background: rgba(119, 0, 0, 0.02);
  border-radius: 0.5rem;
  border: 1px solid rgba(119, 0, 0, 0.1);
}

html.dark .col-left,
html.dark .col-right {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.col-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
}

.divider-line {
  position: relative;
  width: 2px;
  height: 80%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    var(--ptna-primary) 20%,
    var(--ptna-primary) 80%,
    transparent 100%
  );
}

.piano-divider {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: var(--ptna-white);
  padding: 4px;
  border-radius: 4px;
  border: 1px solid var(--ptna-gray);
}

html.dark .piano-divider {
  background: var(--ptna-gray-dark);
  border-color: var(--ptna-gray);
}

.piano-key-small {
  width: 12px;
  height: 8px;
  border-radius: 1px;
}

.piano-key-small.white {
  background: var(--ptna-white);
  border: 1px solid var(--ptna-gray);
}

.piano-key-small.black {
  background: var(--ptna-black);
}

html.dark .piano-key-small.white {
  background: var(--ptna-gray-light);
}

.two-cols-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(119, 0, 0, 0.2);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.footer-info {
  display: flex;
  gap: 1rem;
  color: var(--ptna-gray);
}

.footer-pages {
  font-weight: 600;
  color: var(--ptna-primary);
}

/* Content Styling */
.col-left :deep(h1),
.col-right :deep(h1) {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.col-left :deep(h2),
.col-right :deep(h2) {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid var(--ptna-primary);
  padding-bottom: 0.25rem;
}

.col-left :deep(h3),
.col-right :deep(h3) {
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}

.col-left :deep(p),
.col-right :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.col-left :deep(ul),
.col-right :deep(ul),
.col-left :deep(ol),
.col-right :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.col-left :deep(li),
.col-right :deep(li) {
  margin-bottom: 0.5rem;
}

.col-left :deep(img),
.col-right :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

/* Code blocks in columns */
.col-left :deep(pre),
.col-right :deep(pre) {
  font-size: 0.875rem;
  margin: 1rem 0;
  border-radius: 0.5rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .two-cols-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto 1fr;
  }
  
  .col-divider {
    min-height: 40px;
  }
  
  .divider-line {
    width: 80%;
    height: 2px;
    background: linear-gradient(
      to right,
      transparent 0%,
      var(--ptna-primary) 20%,
      var(--ptna-primary) 80%,
      transparent 100%
    );
  }
  
  .piano-divider {
    flex-direction: row;
  }
}

@media (max-width: 768px) {
  .slidev-layout.two-cols {
    padding: 1rem;
  }
  
  .slide-title {
    font-size: 1.5rem;
  }
  
  .col-left,
  .col-right {
    padding: 0.75rem;
  }
  
  .two-cols-container {
    gap: 1rem;
  }
}
</style>
