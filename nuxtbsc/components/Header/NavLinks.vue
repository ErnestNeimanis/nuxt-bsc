<script setup lang="js">
import {useNavLinks} from "@/composables/useNavLinks"
const nav = useNavLinks().navLinks;
</script>
<template>
  <div class="">
    <ul class="flex gap-4">
        <li v-for="(link, index) in nav" :key="index">
            <div class="">
                <NuxtLink :to="link.url">
                    <div class="">
                        <span>{{link.title}}</span>
                    </div>
                </NuxtLink>
            </div>
        </li>
    </ul>
  </div>
</template>

