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
<div class="flex flex-col items-center justify-center">
  <div class="flex justify-around w-full">
     <EmailForm class=" "/>
 <OpeningHours class="" />
  </div>
  <div  class="flex justify-around w-full">
    <ContactDataCard />
 <GoogleMap class=""/>
  </div>


 <SocialIcons class="" />
 <AdressCard/>

</div>

</template>