<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import ScrollProgress from '@/components/ScrollProgress.vue'
import CustomDialog from '@/components/CustomDialog.vue'
</script>

<template>
  <NavBar />
  <RouterView />
  <ScrollProgress />
  <CustomDialog />
</template>

<style>
@import '@/styles/global.css';
</style>
