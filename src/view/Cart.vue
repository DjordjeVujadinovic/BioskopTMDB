<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);
const cart = ref([]);
const korisnik = localStorage.getItem('ulogovanKorisnik');
const cartKey = `cart_${korisnik}`;

// Provera da li je korisnik ulogovan
onMounted(() => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn.value || !korisnik) {
    alert('Morate biti ulogovani da biste pristupili korpi.');
    router.push('/login');
    return;
  }

  const saved = localStorage.getItem(cartKey);
  if (saved) {
    cart.value = JSON.parse(saved);
  }
});

// Brisanje filma iz korpe
function removeFromCart(movieId) {
  cart.value = cart.value.filter(item => item.movieId !== movieId);
  localStorage.setItem(cartKey, JSON.stringify(cart.value));
}

// Potvrda rezervacije
function checkout() {
  alert('Hvala na rezervaciji!');
  cart.value = [];
  localStorage.removeItem(cartKey);
}
function goToMovie(movieId) {
  router.push(`/movies/${movieId}`);
}

</script>


<template>
  <div class="p-6 text-white">
    <h1 class="text-3xl font-bold mb-4">Your Cart</h1>

    <div v-if="cart.length === 0" class="text-gray-300">
      No items in your cart yet.
    </div>
    <div v-for="item in cart" :key="item.movieId" class="flex items-center mb-4 border-b pb-2 border-gray-600">
      <img
  :src="`https://image.tmdb.org/t/p/w200${item.poster}`"
  alt="Poster"
  class="w-16 h-24 mr-4 cursor-pointer transition duration-300 transform hover:scale-105"
  @click="goToMovie(item.movieId)"
/>

      <div class="flex-1">
        <h2 class="text-xl">{{ item.movieTitle }}</h2>
        <p>Tickets: {{ item.numberOfTickets }}</p>
        <p>Ukupno: {{ item.cena * item.numberOfTickets }} RSD</p>
      </div>
      <button @click="removeFromCart(item.movieId)" class="bg-red-600 px-3 py-1 rounded hover:bg-red-500">
        Remove
      </button>
    </div>

    <button v-if="cart.length > 0" @click="checkout" class="mt-6 bg-green-600 px-6 py-2 rounded hover:bg-green-500">
      Confirm Reservation
    </button>
  </div>
</template>
