<script setup>
import MovieCard from './MovieCard.vue';
//prikaz liste filmova u nizu,kao i prikaz selekcije kako ce odabrati film
const { movies } = defineProps({
    movies: Array
})
</script>

<template>
    <div class="grid grid-cols-3 gap-4 mx-20 my-10">
        <MovieCard v-for="movie in movies" :key="Math.random() * 20000" :movie="movie" />
    </div>
</template>