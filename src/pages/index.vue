<script setup lang="ts">
const count = ref(0)
</script>

<template>
  <div w-full>
    <p>这里是vue组件</p>
    <button color-cyan text-lg w-150px @click="count++">
      click me! {{ count }}
    </button>
  </div>
  <div>
    <md />
  </div>
</template>
