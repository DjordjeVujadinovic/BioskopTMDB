<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const newName = ref('');
const email = ref('');
const password = ref('');
const newEmail = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');
const isLoggedIn = ref(false);
const router = useRouter();

// Ove tri za edit mod
const isEditingName = ref(false);
const isEditingEmail = ref(false);
const isEditingPassword = ref(false);

onMounted(() => {
    isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn.value) {
        alert('You must be logged in to view your profile.');
        router.push('/login');
        return;
    }

    name.value = localStorage.getItem('userName') || '';
    newName.value = name.value;

    email.value = localStorage.getItem('userEmail') || '';
    newEmail.value = email.value;

    password.value = localStorage.getItem('userPassword') || '';
    newPassword.value = password.value;
    confirmNewPassword.value = password.value;
});

function saveName() {
    if (!newName.value.trim()) {
        alert('Name is required.');
        return;
    }
    localStorage.setItem('userName', newName.value);
    name.value = newName.value;
    isEditingName.value = false;
    alert('Name updated!');
}

function saveEmail() {
    if (!newEmail.value.trim()) {
        alert('Email is required.');
        return;
    }
    localStorage.setItem('userEmail', newEmail.value);
    email.value = newEmail.value;
    isEditingEmail.value = false;
    alert('Email updated!');
}

function savePassword() {
    if (!newPassword.value.trim() || !confirmNewPassword.value.trim()) {
        alert('Both password fields are required.');
        return;
    }
    if (newPassword.value !== confirmNewPassword.value) {
        alert('Passwords do not match.');
        return;
    }
    localStorage.setItem('userPassword', newPassword.value);
    password.value = newPassword.value;
    isEditingPassword.value = false;
    alert('Password updated!');
}

</script>

<template>
   <div class="flex flex-col items-center justify-center h-screen bg-gray text-white">
  <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
    <h2 class="text-2xl font-semibold mb-4">Your Profile</h2>

    <!-- NAME -->
    <div class="mb-4 text-left">
      <p><strong>Name:</strong> {{ name }}</p>
      <button v-if="!isEditingName" @click="isEditingName = true" class="text-sm text-indigo-400 underline">Edit</button>
      <div v-if="isEditingName" class="mt-2">
        <input v-model="newName" type="text" class="w-full p-2 rounded text-black mb-2" />
        <button @click="saveName" class="bg-indigo-600 px-4 py-2 rounded text-white w-full">Save</button>
      </div>
    </div>

    <!-- EMAIL -->
    <div class="mb-4 text-left">
      <p><strong>Email:</strong> {{ email }}</p>
      <button v-if="!isEditingEmail" @click="isEditingEmail = true" class="text-sm text-indigo-400 underline">Edit</button>
      <div v-if="isEditingEmail" class="mt-2">
        <input v-model="newEmail" type="email" class="w-full p-2 rounded text-black mb-2" />
        <button @click="saveEmail" class="bg-indigo-600 px-4 py-2 rounded text-white w-full">Save</button>
      </div>
    </div>

    <!-- PASSWORD -->
    <div class="mb-4 text-left">
      <p><strong>Password:</strong> {{ password }}</p>
      <button v-if="!isEditingPassword" @click="isEditingPassword = true" class="text-sm text-indigo-400 underline">Edit</button>
      <div v-if="isEditingPassword" class="mt-2">
        <input v-model="newPassword" type="password" placeholder="New password" class="w-full p-2 rounded text-black mb-2" />
        <input v-model="confirmNewPassword" type="password" placeholder="Confirm new password" class="w-full p-2 rounded text-black mb-2" />
        <button @click="savePassword" class="bg-indigo-600 px-4 py-2 rounded text-white w-full">Save</button>
      </div>
    </div>

  </div>
</div>

</template>