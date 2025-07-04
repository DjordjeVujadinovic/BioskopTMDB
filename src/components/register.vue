<script>
//ovde korisnik unosi svoj mail, sifru, kao i ponovnu sifru radi verifikacije,ukoliko sifre nisu identicne, iskace prozor gde treba da korisnik proveri sifre ponovo,nakon toga ga vodi do Home sajta
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    handleRegister() {
  const existingEmail = localStorage.getItem('userEmail');
  if (existingEmail === this.email) {
    alert('An account with this email already exists.');
    return;
  }

  if (this.password !== this.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  // Sačuvaj sve podatke
  localStorage.setItem('userName', this.name);
  localStorage.setItem('userEmail', this.email);
  localStorage.setItem('userPassword', this.password);
  localStorage.setItem('isRegistered', 'true');
  localStorage.setItem('isLoggedIn', 'true');

  // Najvažnije: proveri da li ime postoji, ako ne — koristi email
  const userName = this.name || this.email;
  localStorage.setItem('ulogovanKorisnik', userName);

  console.log('Registering with:', this.email, this.password);
  this.$router.push('/');
},
  },
};
</script>
<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Registration</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleRegister">
        <div>
          <label for="name" class="block text-sm/6 font-medium text-white">Full Name</label>
          <div class="mt-2">
            <input type="text" name="name" v-model="name" id="name" required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

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
          <div class="flex items-center justify-between">
            <label for="confirmPassword" class="block text-sm/6 font-medium text-white">Confirm Password</label>
          </div>
          <div class="mt-2">
            <input type="password" name="confirmPassword" id="confirmPassword" v-model="confirmPassword"
              autocomplete="current-password" required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Already a member?
        <a href="/login" class="font-semibold text-indigo-600 hover:text-indigo-500">Login here</a>
      </p>
    </div>
  </div>
</template>
