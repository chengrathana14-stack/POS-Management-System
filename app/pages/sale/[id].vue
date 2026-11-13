<template>
  <div></div>
</template>

<script setup lang="ts">
const route = useRoute()
navigateTo(`/receipts/${route.params.id}`)
</script>

