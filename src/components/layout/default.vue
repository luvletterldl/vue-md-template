<script setup lang="ts">

</script>

<template>
  <header px-12px h-42px flex items-center gap-12px>
    <router-link to="/">
      Web API Shared
    </router-link>
  </header>
  <main overflow-auto h="[calc(100vh-42px)]" p-12px>
    <slot />
  </main>
</template>
