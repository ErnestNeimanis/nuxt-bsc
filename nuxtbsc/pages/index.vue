<script setup lang="js">
import { useCounterStore } from '~/stores/counter'
import { setActivePinia, createPinia } from 'pinia'
setActivePinia(createPinia())

const counter = useCounterStore()
</script>

<template>
  <div>index

<div>
    <p>The count is: {{ counter.count }}</p>
    <button @click="counter.increment">Increment</button>
  </div>

  </div>
</template>
