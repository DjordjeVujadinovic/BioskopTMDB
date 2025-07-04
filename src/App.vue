<script setup>
import { RouterView } from "vue-router"
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>


<template>
    <Navbar />
    <Suspense>
        <RouterView />
    </Suspense>
    <Footer/>
</template>
