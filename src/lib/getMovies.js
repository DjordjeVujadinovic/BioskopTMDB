export default function getRepository() {

  const getMovies = async () => {
    movies.value = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=f67b7e73f571b89afaccc58259cc9197&language=en-US")
      .then(res => res.json())
      .then(res => res.results)
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  onBeforeMount(async () => {
    await getMovies()
    bannerMovie.value = movies.value[getRandomInt(0, movies.value.length - 1)]
  })

}