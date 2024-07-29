<script setup>
import axios from 'axios';
import matter from 'gray-matter';
import {ref} from 'vue';

const fileContent = ref()
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      fileContent.value = e.target.result;
      console.log(matter(fileContent.value))
      const frontmatter = matter(fileContent.value)
      const articleData = {
        title: frontmatter.data.title,
        author: frontmatter.data.author,
        body: frontmatter.content,
        createDate: frontmatter.data.createDate,
        tagNames: frontmatter.data.tagNames || []
      };
      try {
        const response = axios.put('/api/article/upload', articleData);
        console.log('Article uploaded successfully:', response.data);
      } catch (error) {
        console.error('Error uploading article:', error);
      }
    };
    reader.readAsText(file);
  }
};

</script>

<template>
  <div>
    <input type="file" @change="handleFileUpload" />
    <pre>{{ fileContent }}</pre>
  </div>
</template>

<style scoped>

</style>