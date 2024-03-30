<script setup lang="js">
import { ref } from 'vue';
import axios from 'axios';

const form = ref({
  email: '',
  subject: '',
  message: ''
});

const responseMessage = ref("");

async function handleSubmit() {
  try {
    // Here you make the POST request to your backend API
    const response = await axios.post('/api/contact', form.value);
    // Assuming your API returns a message upon success
    responseMessage.value = response.data.message;
    // Optionally, clear the form or give user feedback
    console.log("Email sent successfully:", response.data);
    form.value = { email: '', subject: '', message: '' }; // Clear form after submission
  } catch (error) {
    // Handle any errors here
    console.error("Failed to send email:", error);
    responseMessage.value = error.response?.data?.message || "Failed to send email.";
  }
}
</script>
<template>
<div>
 <form @submit.prevent="handleSubmit" class="max-w-md mx-auto mt-10">
    <div class="mb-6">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email:</label>
      <input id="email" v-model="form.email" type="email" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
    </div>
    <div class="mb-6">
      <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject:</label>
      <input id="subject" v-model="form.subject" type="text" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
    </div>
    <div class="mb-6">
      <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Message:</label>
      <textarea id="message" v-model="form.message" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" rows="4"></textarea>
    </div>
    <button type="submit" class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
  </form>
----
    <div v-if="responseMessage" class="mb-4 text-center">
  {{ responseMessage }}
</div>
----
</div>


</template>