<script setup>
import { ref, computed } from "vue"
import MovieList from '../components/MovieList.vue';

const movies = ref([]);
const sortOption = ref('');
const currentPage = ref(1);
const pageSize = 15;

// Fetch filmova
const getMovies = async () => {
  const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=f67b7e73f571b89afaccc58259cc9197&language=en-US&page=1");
  const data = await response.json();
  movies.value = data.results;
};
getMovies();

// Sortiranje
const sortedMovies = computed(() => {
  if (!sortOption.value) return movies.value;

  if (sortOption.value === 'title') {
    return [...movies.value].sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortOption.value === 'rating') {
    return [...movies.value].sort((a, b) => b.vote_average - a.vote_average);
  }

  return movies.value;
});

// Paginisani prikaz
const paginatedMovies = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return sortedMovies.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(sortedMovies.value.length / pageSize));

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}
</script>

<template>
  <div>
    <!-- Sort opcije -->
    <div class="mb-4">
      <label for="sort" class="mr-2 font-semibold text-white">Sort by:</label>
      <select id="sort" v-model="sortOption" class="rounded px-2 py-1 text-black">
        <option value="">Default</option>
        <option value="title">Title (A-Z)</option>
        <option value="rating">Rating (High to Low)</option>
      </select>
    </div>

    <!-- Lista filmova -->
    <MovieList :movies="paginatedMovies" />

    <!-- Paginacija -->
    <div class="mt-6 flex justify-center items-center gap-4">
      <button @click="prevPage" :disabled="currentPage === 1" class="bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50">Previous</button>
      <span class="text-white">Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50">Next</button>
    </div>
  </div>
</template>
