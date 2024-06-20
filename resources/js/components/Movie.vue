<template>
    <div class="container">
        <div class="row">
            <form @submit.prevent="fetchMovie()">
                <div class="columns large-8">
                    <input type="text" v-model="title" />
                </div>
                <div class="columns large-4">
                    <button
                        type="submit"
                        :disabled="!title"
                        class="button expanded"
                    >
                        Search titles
                    </button>
                    <button
                        type="submit"
                        class="button expanded"
                        @click="() => spinCount += 1"
                    >
                        SPIN
                    </button>
                </div>
            </form>
        </div>
        <!-- /search form row -->
    </div>
    <!-- /container -->
    <div v-if="loading" class="loader">
        <img
            src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif"
            alt="loader"
        />
    </div>

    <div v-else-if="error_message">
        <h3>{{ error_message }}</h3>
    </div>

    <div class="row" v-else-if="Object.keys(movie).length !== 0" id="movie">
        <div class="columns large-7">
            <h4>{{ movie.title }}</h4>
            <img :src="movie.id ? `https://img.rgstatic.com/content/movie/${movie.id}/poster-185.webp` : ''" :alt="movie.title" />
        </div>
        <div class="columns large-5">
            <p>{{ movie.overview }}</p>
            <small><strong>Rating:</strong> {{ movie?.imdb_rating }}</small>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

interface Emits {
  /* eslint-disable no-unused-vars */
  (e: "update:modelValue", v: Props["modelValue"]): void;
  (e: "update:new_movie"): void;
  /* eslint-enable no-unused-vars */
}

const emits = defineEmits<Emits>()
const title = ref("");
const error_message = ref("");
const movie = ref({});
const loading = ref(false);
const spinCount = ref(0)

function buildUrl(title) {
    const API_URL = "https://netflixroulette.net/api/api.php";
    return `${API_URL}?title=${title}`;
}

const callSpinner = (count) => {
    const API_SPIN_URL = "https://api.reelgood.com/v3.0/content/random?availability=onSources&content_kind=both&nocache=true&region=us&sources=netflix";
    return `${API_SPIN_URL}&spin_count=${count}`
}

const fetchMovie = () => {
    // if (!title.value) {
    //     alert("please enter a title to search for");
    //     return;
    // }
    loading.value = true;
    // fetch(buildUrl(title.value))
    fetch(callSpinner(spinCount.value))
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            loading.value = false;
            error_message.value = "";
            title.value = data.title
            if (data.errorcode) {
                error_message.value = `Sorry, movie with title '${data.title}' not found. Try searching for "Fairy tail" or "The boondocks" instead.`;
                return;
            }
            movie.value = data;
        })
        .catch((e) => {
            console.log(e);
            loading.value = false;
        });
};
</script>
<style scoped>
#movie {
    margin: 30px 0;
}
.loader {
    text-align: center;
}
</style>
