<template>
  <h1>{{ title }}</h1>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: () => 'Прогноз погоды', 
  },
});
</script>

<style lang="less" scoped>
h1 {
  color: var(--darkColor);
  text-align: center;
  font-size: 24px;
}
</style>
