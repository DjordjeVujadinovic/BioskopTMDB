<script setup>
import { ref, onBeforeMount, defineAsyncComponent } from "vue"
import MovieList from "../components/MovieList.vue";
//regulisanje instanci za prikaz banera i listu filmova koji ce biti prikazani u listi
const movies = ref([])
const bannerMovies = ref([]);

//ucitavanje komponente za baner
const AsyncBanner = defineAsyncComponent(() => {
  return import("../components/Banner.vue")
})
//funkcije koje poziva podatke sa API-ja i regulisanje prikaza podataka o filmovima
const getMovies = async () => {
  movies.value = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=f67b7e73f571b89afaccc58259cc9197&language=en-US")
  .then(res => res.json())
  .then(res => res.results)
}
//Funkcija generiše slučajan ceo broj , taj broj je id od filma od najmanjeg do najveceg i za koji se odabere, bice prikazan
function getRandomInt (min, max)  {
  return Math.floor(Math.random() * (max - min) + min)
}     

// home.vue
onBeforeMount(async () => {
  await getMovies();
  const shuffled = [...movies.value].sort(() => 0.5 - Math.random());
  bannerMovies.value = shuffled.slice(0, 5); // uzimamo 5 nasumičnih filmova
});


</script>

<template>
  <!-- povezuje baner filma i listu popularnih filmova(filmovi su popularni prema API,pa se menjaju podaci i raspored) -->
    <AsyncBanner :banners="bannerMovies" />

    <MovieList 
    :movies="movies"
    />
</template>