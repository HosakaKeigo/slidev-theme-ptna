<template>
  <div class="slidev-layout default" :class="$slidev?.nav?.currentLayout">
    <!-- Header -->
    <header class="ptna-header" v-if="$frontmatter.showHeader !== false">
      <div class="header-content">
        <div class="logo-area">
          <img 
            src="/ptna-logo.svg" 
            alt="PTNA Logo" 
            class="ptna-logo"
            v-if="$frontmatter.showLogo !== false"
          />
        </div>
        <div class="header-title" v-if="$frontmatter.title">
          {{ $frontmatter.title }}
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="slidev-content">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="ptna-footer" v-if="$frontmatter.showFooter !== false">
      <div class="footer-content">
        <div class="footer-left">
          <span v-if="$frontmatter.event">{{ $frontmatter.event }}</span>
          <span v-if="$frontmatter.date">{{ $frontmatter.date }}</span>
        </div>
        <div class="footer-center">
          <span v-if="$frontmatter.author">{{ $frontmatter.author }}</span>
        </div>
        <div class="footer-right">
          <SlideCurrentNo />
          /
          <SlidesTotal />
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.slidev-layout.default {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.ptna-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--ptna-primary);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.ptna-logo {
  height: 2.5rem;
  width: auto;
}

.header-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ptna-primary);
}

.slidev-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.ptna-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e5e5;
}

html.dark .ptna-footer {
  border-top-color: #404040;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: var(--ptna-gray);
}

.footer-left,
.footer-center,
.footer-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-right {
  font-weight: 600;
  color: var(--ptna-primary);
}
</style>
