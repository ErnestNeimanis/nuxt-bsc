<script setup lang="js">
import axios from "axios";
import { useRoute } from "vue-router"
import { useRouter } from 'vue-router'
import { formatDistanceToNow } from 'date-fns';
import { useWindowSize } from "@/composables/useWindowSize";
import { useInView } from "@/composables/useInView";
import { useScrollHandler } from "@/composables/useScrollHandler"
import { useHTMLContent } from '~/composables/useHTMLContent'
import { usePosts } from '~/stores/usePosts'

const props = defineProps({

})

const emit = defineEmits([])

defineExpose({

})

const route = useRoute();
const router = useRouter();
const { smallWindow, mediumWindow, largeWindow } = useWindowSize();
const scroll = useScrollHandler();

const wpPosts = usePosts();
const html = useHTMLContent();

//

const form = ref({
  email: '',
  firstName: '',
  lastName: '',
  message: ''
});

const responseMessage = ref("");
const buttonText = ref("Send")

onMounted(() => {

})

onUnmounted(() => {

})

async function handleSubmit() {
  try {
    const response = await axios.post('/api/contact', form.value);
    responseMessage.value = response;
    form.value = { email: '', subject: '', message: '' };
  } catch (error) {
    responseMessage.value = `${error}` || "Failed to send email.";
  }
}

function sendVisuals(){

}

</script>

<template>

  <div class="bg-stone-800 ">
    <form @submit.prevent="handleSubmit" class="flex flex-col space-y-3 min-w-[350px] p-2">

      <div class="flex space-x-3 max-w-1/2 font-semibold">
        <div class="">
          <label for="firstName" class=""></label>
          <input id="firstName" v-model="form.firstName" type="text" required placeholder="First Name"
            class="px-1 border border-black outline-none">
        </div>
        <div>
          <label for="lastName"></label>
          <input id="lastName" v-model="form.lastName" type="text" required placeholder="Last Name" class="
        px-1 border border-black outline-none">
        </div>
      </div>
      <div class="flex flex-col">
        <label for="email" class=""></label>
        <input id="email" v-model="form.email" type="email" required placeholder="Email"
          class="border border-black h-8 px-1 font-semibold outline-none ">
      </div>


      <div class="">
        <label for="message" class=""></label>
        <textarea id="message" v-model="form.message" required class="w-full outline-none border border-black" rows="4"
          placeholder="Tell us..."></textarea>
      </div>
      <div class="">
        <button type="submit" class="w-full  bg-green-600 text-white">{{buttonText }}</button>
      </div>

    </form>

    <div class="mb-4 h-full text-center text-white">
      {{ responseMessage }}
    </div>
  </div>

</template>
