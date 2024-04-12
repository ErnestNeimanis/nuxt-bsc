<script setup lang="js">
import { ref } from 'vue';
import axios from 'axios';
import {Loader } from '@googlemaps/js-api-loader'

const form = ref({
  email: '',
  name: '',
  message: ''
});



const mapContainer = ref(null);
const loc = ref("")

const mapSrc = ref("");

onMounted(() => {

})


</script>
<template>
<div class="flex justify-center">
  
 <EmailForm class="w-24 "/>

 <!-- <GoogleMap class=""/> -->
</div>


</template>