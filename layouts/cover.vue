<template>
  <div class="slidev-layout cover" :class="$slidev?.nav?.currentLayout">
    <!-- Background Pattern -->
    <div class="cover-background">
      <div class="piano-pattern"></div>
    </div>

    <!-- Main Content -->
    <div class="cover-content">
      <!-- Logo Section -->
      <div class="logo-section">
        <img 
          src="/ptna-logo-large.svg" 
          alt="PTNA Logo" 
          class="ptna-logo-large"
          v-if="$frontmatter.showLogo !== false"
        />
      </div>

      <!-- Title Section -->
      <div class="title-section">
        <h1 class="cover-title">
          <slot />
        </h1>
        <div class="cover-subtitle" v-if="$frontmatter.subtitle">
          {{ $frontmatter.subtitle }}
        </div>
      </div>

      <!-- Info Section -->
      <div class="info-section">
        <div class="event-info" v-if="$frontmatter.event">
          <div class="event-name">{{ $frontmatter.event }}</div>
          <div class="event-date" v-if="$frontmatter.date">{{ $frontmatter.date }}</div>
          <div class="event-location" v-if="$frontmatter.location">{{ $frontmatter.location }}</div>
        </div>
        
        <div class="author-info" v-if="$frontmatter.author">
          <div class="author-name">{{ $frontmatter.author }}</div>
          <div class="author-title" v-if="$frontmatter.authorTitle">{{ $frontmatter.authorTitle }}</div>
          <div class="author-org" v-if="$frontmatter.organization">{{ $frontmatter.organization }}</div>
        </div>
      </div>
    </div>

    <!-- PTNA Branding -->
    <div class="ptna-branding">
      <div class="ptna-name">一般社団法人 全日本ピアノ指導者協会</div>
      <div class="ptna-name-en">Piano Teachers' National Association of Japan</div>
    </div>
  </div>
</template>

<style scoped>
.slidev-layout.cover {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 3rem;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--ptna-white) 0%, #f8f8f8 100%);
  color: var(--ptna-black);
}

html.dark .slidev-layout.cover {
  background: linear-gradient(135deg, var(--ptna-black) 0%, #1a1a1a 100%);
  color: var(--ptna-white);
}

.cover-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.05;
  z-index: 0;
}

.piano-pattern {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-15deg);
  width: 120%;
  height: 120%;
  background-image: repeating-linear-gradient(
    0deg,
    var(--ptna-primary) 0px,
    var(--ptna-primary) 2px,
    transparent 2px,
    transparent 20px
  ),
  repeating-linear-gradient(
    90deg,
    var(--ptna-primary) 0px,
    var(--ptna-primary) 2px,
    transparent 2px,
    transparent 40px
  );
}

.cover-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  width: 100%;
}

.logo-section {
  margin-bottom: 2rem;
}

.ptna-logo-large {
  height: 4rem;
  width: auto;
  filter: drop-shadow(0 4px 8px rgba(119, 0, 0, 0.2));
}

.title-section {
  margin-bottom: 3rem;
}

.cover-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--ptna-primary);
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  line-height: 1.2;
}

.cover-subtitle {
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--ptna-gray-dark);
  margin-bottom: 0.5rem;
}

html.dark .cover-subtitle {
  color: var(--ptna-gray);
}

.info-section {
  display: flex;
  justify-content: space-around;
  gap: 3rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.event-info,
.author-info {
  flex: 1;
  min-width: 200px;
}

.event-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ptna-primary);
  margin-bottom: 0.5rem;
}

.event-date,
.event-location {
  font-size: 1rem;
  color: var(--ptna-gray-dark);
  margin-bottom: 0.25rem;
}

html.dark .event-date,
html.dark .event-location {
  color: var(--ptna-gray);
}

.author-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--ptna-primary);
  margin-bottom: 0.5rem;
}

.author-title,
.author-org {
  font-size: 1rem;
  color: var(--ptna-gray-dark);
  margin-bottom: 0.25rem;
}

html.dark .author-title,
html.dark .author-org {
  color: var(--ptna-gray);
}

.ptna-branding {
  position: absolute;
  bottom: 2rem;
  right: 3rem;
  text-align: right;
  z-index: 1;
}

.ptna-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ptna-primary);
  margin-bottom: 0.25rem;
}

.ptna-name-en {
  font-size: 0.75rem;
  color: var(--ptna-gray);
  font-weight: 400;
}

/* Responsive Design */
@media (max-width: 768px) {
  .slidev-layout.cover {
    padding: 2rem 1.5rem;
  }
  
  .cover-title {
    font-size: 2rem;
  }
  
  .cover-subtitle {
    font-size: 1.25rem;
  }
  
  .info-section {
    flex-direction: column;
    gap: 2rem;
  }
  
  .ptna-branding {
    position: static;
    margin-top: 2rem;
    text-align: center;
  }
}
</style>
