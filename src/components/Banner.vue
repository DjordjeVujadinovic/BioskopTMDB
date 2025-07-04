<script setup>
import getImage from "../lib/getImage"
import { RouterLink, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { ref, computed, onMounted, onUnmounted  } from 'vue'
const router = useRouter();

const { banners } = defineProps(["banners"])
const currentIndex = ref(0)

const currentBanner = computed(() => banners[currentIndex.value])
let interval
onMounted(() => {
  interval = setInterval(() => {
    next()
  }, 5000)
})
onUnmounted(() => {
  clearInterval(interval)
})
function prev() {
  if (currentIndex.value === 0) {
    currentIndex.value = banners.length - 1
  } else {
    currentIndex.value--
  }
}

function next() {
  if (currentIndex.value === banners.length - 1) {
    currentIndex.value = 0
  } else {
    currentIndex.value++
  }
}

const description = computed(() => {
  const overview = currentBanner.value?.overview || ''
  return overview.length <= 200 ? overview : overview.slice(0, 200) + "..."
})
function goToMovie(id) {
  if (id) router.push(`/movies/${id}`)
}
</script>

<template>
  <div class="w-screen h-screen relative overflow-hidden">
    <!-- Strelice -->
    <button
      @click="prev"
      class="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 p-2 rounded-full text-white hover:bg-black"
    >
      <Icon icon="mdi:chevron-left" width="30" />
    </button>
    <button
      @click="next"
      class="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 p-2 rounded-full text-white hover:bg-black"
    >
      <Icon icon="mdi:chevron-right" width="30" />
    </button>

    <!-- Klikabilni BANER sa hover efektom i animacijom -->
    <Transition name="slide-fade" mode="out-in">
      <div
        :key="currentBanner?.id"
        class="absolute w-full h-full cursor-pointer group"
        :style="{
          backgroundImage: 'url(' + getImage(currentBanner?.backdrop_path) + ')',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
        }"
        @click="goToMovie(currentBanner?.id)"
      >
        <div class="text-white p-10 flex flex-col justify-center w-full h-full bg-gradient-to-r from-black to-transparent transition duration-500 group-hover:backdrop-brightness-110">
          <h1 class="text-8xl font-bold">{{ currentBanner?.title }}</h1>
          <p class="mt-2 w-1/2 text-sm text-neutral-400">{{ description }}</p>
          <div
            class="flex items-center gap-1 px-6 py-4 rounded-md bg-green-700 w-fit mt-4 transition hover:bg-neutral-800 font-semibold"
          >
            <span>View More</span>
            <Icon icon="ic:round-play-arrow" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
  position: absolute;
  width: 100%;
  height: 100%;
}

.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
