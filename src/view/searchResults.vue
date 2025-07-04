<!-- src/views/SearchResults.vue -->
<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const movies = ref([]);
const route = useRoute();

const fetchSearchResults = async (query) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: 'f67b7e73f571b89afaccc58259cc9197', // tvoj ključ, OK je
        query: query,
      },
    });
    movies.value = response.data.results;
    console.log('Rezultati:', movies.value); // proveri u konzoli
  } catch (error) {
    console.error('Greška pri pretrazi:', error);
  }
};

watch(() => route.query.q, (newQuery) => {
  if (newQuery) fetchSearchResults(newQuery);
});

onMounted(() => {
  if (route.query.q) fetchSearchResults(route.query.q);
});
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Rezultati za "{{ route.query.q }}"</h2>

    <div v-if="movies.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <router-link
  v-for="movie in movies"
  :key="movie.id"
  :to="`/movies/${movie.id}`"
  class="block bg-gray p-2 rounded shadow hover:bg-black transition"
>
  <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`" alt="Poster" />
  <h3 class="font-semibold mt-2">{{ movie.title }}</h3>
  <p class="text-sm">{{ movie.release_date }}</p>
</router-link>

    </div>

    <div v-else>
      <p class="text-gray-500">Nema rezultata za ovaj upit.</p>
    </div>
  </div>
</template>
