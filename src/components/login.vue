<script>
//vracaju se mail i sifra,handlelogin ima u sebi da povuce sa register mail i sifru,kao i ukoliko su uneti podaci nepostojeci, fajl vodi korisnika do /register kako bi se registrovao
//takodje ako se registrovao i opet uneo pogresne podatke,iskace prozor gde prenosi da proveri da li su podaci validni
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    handleLogin() {
      const registeredEmail = localStorage.getItem('userEmail');
      const registeredPassword = localStorage.getItem('userPassword');
      if (!registeredEmail || !registeredPassword) {
        alert('There is no account with data you inserted, please try to register.');
        this.$router.push('/register');
        return;
      }

      if (this.email === registeredEmail && this.password === registeredPassword) {
        localStorage.setItem('isLoggedIn', 'true');
        const userName = localStorage.getItem('userName') || this.email;
        localStorage.setItem('ulogovanKorisnik', userName);

        this.$router.push('/');
      } else {
        alert('Wrong,check your mail or password.');
      }
      console.log('Logging in with:', this.email, this.password);
    },
  },
};
</script>

<style scoped></style>
<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Log in</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleLogin">

        <div>
          <label for="email" class="block text-sm/6 font-medium text-white">Email address</label>
          <div class="mt-2">
            <input type="email" name="email" v-model="email" id="email" autocomplete="email" required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-white">Password</label>
            <div class="text-sm">
            </div>
          </div>
          <div class="mt-2">
            <input type="password" name="password" v-model="password" id="password" autocomplete="current-password"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>
        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Login
          </button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Not a member?
        <a href="/register" class="font-semibold text-indigo-600 hover:text-indigo-500">Register here</a>
      </p>
    </div>
  </div>
</template>
