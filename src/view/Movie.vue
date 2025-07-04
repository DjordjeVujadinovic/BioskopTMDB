<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import getImage from "../lib/getImage";

const cenaFilma = 450;
const korisnik = localStorage.getItem('ulogovanKorisnik');
const router = useRouter();
const filmId = router.currentRoute.value.params.id;

const movie = ref(null);
const comments = ref([]);
const draftComment = ref('');
const draftRating = ref(0);
const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');

const storageKey = `film-comments-${filmId}`;

// Fetch filma u onMounted sa async/await (ZAMENI ovaj deo sa starim fetch-om)
onMounted(async () => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${filmId}?api_key=f67b7e73f571b89afaccc58259cc9197&language=en-US`);
    movie.value = await res.json();

    // Učitaj komentare iz localStorage
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (Array.isArray(data)) {
          comments.value = data;
        } else if (data.comment && data.rating !== undefined) {
          comments.value = [{
            comment: data.comment,
            rating: data.rating,
            title: movie.value.title
          }];
        }
      } catch (error) {
        console.error('Failed to parse saved comments:', error);
      }
    }
  } catch (error) {
    console.error('Greška pri učitavanju filma:', error);
  }

  // Reset draft polja
  draftComment.value = '';
  draftRating.value = 0;
});

// Computed vrednosti da pristupiš podacima iz movie.value sigurno (DODAJ ovaj deo)
const title = computed(() => movie.value?.title || '');
const overview = computed(() => movie.value?.overview || '');
const background = computed(() => movie.value?.backdrop_path || '');
const poster = computed(() => movie.value?.poster_path || '');
const release_date = computed(() => movie.value?.release_date || '');
const vote = computed(() => movie.value?.vote_average || 0);
const popularity = computed(() => movie.value?.popularity || 0);
const runtime = computed(() => movie.value?.runtime || 0);
const movieDuration = computed(() => Math.round(runtime.value / 60));
const country = computed(() => movie.value?.production_countries?.[0]?.iso_3166_1 || '');

// Funkcije za komentare i rezervaciju (ostavi isto)
function saveComment() {
  const trimmedComment = draftComment.value.trim();

  if (!trimmedComment && draftRating.value === 0) {
    alert('Please enter a comment or select a rating before saving.');
    return;
  }

  const newEntry = {
    comment: trimmedComment,
    rating: draftRating.value,
    timestamp: Date.now()
  };

  comments.value.push(newEntry);
  localStorage.setItem(storageKey, JSON.stringify(comments.value));

  draftComment.value = '';
  draftRating.value = 0;

  alert('Comment and/or rating saved!');
}

function deleteComment(timestamp) {
  const confirmDelete = confirm('Are you sure you want to delete this comment?');
  if (!confirmDelete) return;

  comments.value = comments.value.filter(c => c.timestamp !== timestamp);
  localStorage.setItem(storageKey, JSON.stringify(comments.value));
}

function rezervisiKartu() {
  if (!korisnik) {
    alert('Morate biti ulogovani da biste rezervisali.');
    return;
  }

  const cartKey = `cart_${korisnik}`;
  const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');

  const existing = cart.find(item => item.movieId === filmId);
  if (existing) {
    existing.numberOfTickets += 1;
  } else {
    cart.push({
      movieId: filmId,
      movieTitle: title.value,
      poster: poster.value,
      numberOfTickets: 1,
      cena: cenaFilma
    });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  alert('Film je dodat u korpu!');
}
</script>

<template>
  <div class="h-screen w-screen grayscale-0" :style="{
    backgroundImage: 'url(' + getImage(background) + ')',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
  }">
    <div class="w-full h-full bg-gradient-to-r from-black to-transparent">
      <div class="pt-20 w-full h-full grid grid-cols-2 items-center">
        <img class="w-[400px] mx-auto rounded-lg" :src="getImage(poster)" />
        <div>
          <h1 class="text-4xl font-semibold mb-4">{{ title }}</h1>
          <p class="text-sm text-neutral-300 w-2/3">{{ overview }}</p>
          <div class="flex flex-col text-sm gap-2 mt-3">
            <div class="flex items-center gap-2">
              <Icon icon="uiw:date" />
              <span>{{ release_date }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="ic:round-star" />
              <span>{{ Math.round(vote) }}/10</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="ion:people" />
              <span>{{ popularity }} </span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="ic:twotone-access-time-filled" color="white" />
              <span>{{ movieDuration }}h / {{ runtime }} minutes</span>
            </div>
            <div v-if="isLoggedIn" class="mt-8 p-4 bg-gray-800 rounded-md w-2/3 text-white">
              <h2 class="text-xl font-semibold mb-2">Leave a review</h2>
              <textarea v-model="draftComment" rows="4" placeholder=""
                class="w-full p-2 rounded-md resize-none text-black"></textarea>
              <div class="flex items-center gap-2 mt-2">
                <span>Grade:</span>
                <template v-for="star in 5" :key="star">
                  <svg @click="draftRating = star" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" :class="[
                      'w-6 h-6 cursor-pointer',
                      draftRating >= star ? 'text-yellow-400' : 'text-gray-500'
                    ]">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.175 0l-3.39 2.462c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.04 9.393c-.783-.57-.38-1.81.588-1.81h4.183a1 1 0 00.951-.69l1.286-3.966z" />
                  </svg>
                </template>
              </div>
              <button @click="saveComment" class="mt-4 px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500">
                Save a comment
              </button>
              <div v-if="comments.length" class="mt-6 p-4 bg-gray-700 rounded-md w-2/3 text-white">
                <h3 class="text-lg font-semibold mb-2">Your previous comments and grades:</h3>
                <div v-for="(item, index) in comments" :key="index" class="mb-4 border-b border-gray-600 pb-2">
                  <p class="mb-1">{{ item.comment }}</p>
                  <div class="flex items-center gap-1">
                    <button @click="deleteComment(item.timestamp)"
                      class="mt-2 px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-white text-sm">
                      Delete
                    </button>

                    <span>Review:</span>
                    <template v-for="star in 5" :key="star">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        :class="[
                          'w-5 h-5',
                          item.rating >= star ? 'text-yellow-400' : 'text-gray-500'
                        ]">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.175 0l-3.39 2.462c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.04 9.393c-.783-.57-.38-1.81.588-1.81h4.183a1 1 0 00.951-.69l1.286-3.966z" />
                      </svg>
                    </template>
                  </div>
                </div>
              </div>
              <div class="mt-8 p-4 bg-green-900 rounded-md w-2/3 text-white" v-if="isLoggedIn">
                <p class="text-lg">Cena karte: <strong>{{ cenaFilma }} RSD</strong></p>
                <button @click="rezervisiKartu" class="mt-2 px-4 py-2 bg-green-600 rounded hover:bg-green-500">
                  Rezerviši kartu
                </button>
              </div>
            </div>
            <div v-else class="mt-8 p-4 bg-gray-800 rounded-md w-2/3 text-white">
              <p>
                You need to <router-link to="/login" class="text-indigo-400 underline">login</router-link> <span> or
                </span>
                <router-link to="/register" class="text-indigo-400 underline">register</router-link> in order to give a
                review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
