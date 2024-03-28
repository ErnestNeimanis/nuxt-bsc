<script setup lang="js">
import {useNavLinks} from "@/composables/useNavLinks"
const nav = useNavLinks().navLinks;
</script>
<template>
  <div class="">
    <ul>
        <li v-for="(link, index) in nav" :key="index">
            <div>
                <NuxtLink :to="link.url">
                    <div>
                        <span>{{link.title}}</span>
                    </div>
                </NuxtLink>
            </div>
        </li>
    </ul>
  </div>
</template>

