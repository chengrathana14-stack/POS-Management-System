<template>
  <div class="d-flex min-vh-100" style="background-color: #f3f6fa;">
    <!-- Fixed Sidebar -->
    <AppSidebar class="d-none d-md-flex flex-shrink-0" />

    <!-- Main Content Area -->
    <div class="d-flex flex-column flex-grow-1" style="min-width: 0;">
      <AppHeader />
      <main class="flex-grow-1 p-3 p-xl-4 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue'
import AppSidebar from '~/components/layout/AppSidebar.vue'
</script>
