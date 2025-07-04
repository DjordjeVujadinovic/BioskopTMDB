<script setup>
import { Icon } from '@iconify/vue';
import { RouterLink, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
//funkcije  ukoliko korisnik nije registrovan u navbar ce biti prikazana opcija login, gde kada klikne moze odmah da se loguje, a ako nema ni nalog, da se registruje,nakon toga se brise login button i prikazuje logout button
const isLoggedIn = ref(false);
const searchQuery = ref('');
const router = useRouter();
const searchMovie = () => {
  if (searchQuery.value.trim() !== '') {
    router.push({ name: 'search', query: { q: searchQuery.value } });
    searchQuery.value = '';
  }
}
const goToProfile = () => {
  if (!isLoggedIn.value) {
    alert('You must be logged in to view your profile.');
  } else {
    window.location.href = '/profil'; // ili koristi this.$router.push('/profil') ako koristiš `export default`
  }
};
onMounted(() => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true';
});

const logout = () => {
  localStorage.removeItem('isLoggedIn');
  isLoggedIn.value = false;
};

</script>

<template>

  <!--button-i gde svaki vodi na odredjeni link-->
  <nav class="bg-gray border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <RouterLink to="/" class="flex text-3xl items-center font-bold gap-2">
        <Icon icon="mingcute:movie-line" width="40" />
        <span>Prototip</span>
      </RouterLink>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class=" font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:border-gray-700">
          <li>
            <a href="/" aria-current="page">
              <button
                class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span
                  class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  Home
                </span>
              </button>
            </a>
          </li>
          <li>
            <a href="/repository">
              <button
                class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span
                  class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  Repository
                </span>
              </button>
            </a>
          </li>
          <li>
            <RouterLink to="/cart">
              <button
                class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-yellow-400 to-yellow-600 group-hover:from-yellow-400 group-hover:to-yellow-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-200 dark:focus:ring-yellow-800">
                <span
                  class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 text-black rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  Cart
                </span>
              </button>
            </RouterLink>
          </li>

          <li v-if="!isLoggedIn">
            <a href="/login" aria-current="page">
              <button
                class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                <span
                  class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  Login
                </span>
              </button>
            </a>
          </li>
          <li v-else>
            <button @click="logout"
              class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-red-500 to-pink-500 group-hover:from-red-500 group-hover:to-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800">
              <span
                class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 text-black rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Logout
              </span>
            </button>
          </li>
          <li>
            <button @click="goToProfile"
              class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-green-500 to-emerald-500 group-hover:from-green-500 group-hover:to-emerald-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
              <span
                class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 text-black rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Profile
              </span>
            </button>
          </li>
          <li>
            <div class="flex items-center gap-2">
              <input v-model="searchQuery" @keyup.enter="searchMovie" type="text" placeholder="Pretraži filmove..."
                class="px-3 py-1 rounded-md text-black border border-gray-300 focus:outline-none focus:ring focus:border-blue-500" />
              <button @click="searchMovie" class="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Traži
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>