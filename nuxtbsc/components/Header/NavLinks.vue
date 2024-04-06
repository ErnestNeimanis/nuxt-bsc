<script setup lang="js">
import {useNavLinks} from "@/composables/useNavLinks"
import {useRoute} from 'vue-router'

const route = useRoute();
const nav = useNavLinks().navLinks;
</script>
<template>
  
    <ul class="flex justify-center ">
        <li v-for="(link, index) in nav" :key="index">
            <div class="">
                <NuxtLink :to="link.url">
                    <div class="">
                        <span :class="{'underline': route.path == link.url}">{{link.title}}</span>
                    </div>
                </NuxtLink>
            </div>
        </li>
    </ul>
 
</template>

