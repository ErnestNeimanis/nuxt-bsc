import { defineStore } from 'pinia';
import axios from 'axios';

const BASE_URL = "https://public-api.wordpress.com/rest/v1.1/sites/groovediggers3.wordpress.com/posts/"




export const usePosts = defineStore('posts', {
  state: () => ({
    posts: [],
    category: '',
    currentPage: 1,
  }),
  actions: {
    async fetch(category = this.category, page = this.currentPage) {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            category: category,
            page: page,
            number: 3,
          },
        });

        this.posts = response.data.posts.map(post => ({
          title: post.title,
          featuredImg: post.featured_image,
          content: post.content,
        }));

        this.category = category;
        this.currentPage = page;
        
        // Return the updated posts array
        return this.posts;
      } catch (error) {
        console.error('Error fetching posts:', error);
        return []; // Return an empty array in case of error
      }
    },
    async nextPage() {
      this.currentPage += 1;
      return await this.fetch();
    },
    async previousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
        return await this.fetch();
      }
      return this.posts; // Return the current posts if we're already at the first page
    },
    async get(category) {
      this.category = category;
      this.currentPage = 1; // Reset to page 1 whenever the category changes
      return await this.fetch();
    }
  },
});
