<template>
    <h1>{{ title }}</h1>
  </template>
  
  <script setup>
  import { ref, defineProps } from 'vue';
  
  const props = defineProps({
    title: {
      type: String,
      default: 'Weather title' // Значение по умолчанию
    }
  });
  </script>
  
  <style lang="less" scoped>
  h1 {
    color: var(--darkColor); 
    text-align: center; 
    font-size: 24px;
  }
  </style>
  