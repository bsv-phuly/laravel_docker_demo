<!-- ./src/components/Review.vue -->
<template>
    <div class="container">
        <h4 class="uppercase">reviews</h4>
        <div class="review" v-for="(review, index) in reviews" :key="index">
            <p>{{ review.content }}</p>
            <div class="row">
                <div class="columns medium-7">
                    <h5>{{ review.reviewer }}</h5>
                </div>
                <div class="columns medium-5">
                    <h5 class="pull-right">{{ review.time }}</h5>
                </div>
            </div>
        </div>
        <div class="review-form" v-if="movie">
            <h5>add new review.</h5>
            <form @submit.prevent="addReview">
                <label>
                    Review
                    <textarea
                        v-model="review.content"
                        cols="30"
                        rows="5"
                    ></textarea>
                </label>
                <label>
                    Name
                    <input v-model="review.reviewer" type="text" />
                </label>
                <button
                    :disabled="!review.reviewer || !review.content"
                    type="submit"
                    class="button expanded"
                >
                    Submit
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const mockReviews = ref([
    {
        movie_id: 7128,
        content:
            "Great show! I loved every single scene. Defintiely a must watch!",
        reviewer: "Jane Doe",
        time: new Date().toLocaleDateString(),
    },
]);
const movie = ref(null);
const review = ref({
    content: "",
    reviewer: "",
});

const reviews = computed(() => {
    return mockReviews.value.filter((review) => {
        return review.movie_id === movie.value;
    });
});

const addReview = () => {
    if (!movie.value || !review.value.reviewer || !review.value.content) {
        return;
    }
    const newReview = {
        movie_id: movie.value,
        content: review.value.content,
        reviewer: review.value.reviewer,
        time: new Date().toLocaleDateString(),
    };
    mockReviews.value.unshift(newReview);
};
</script>
<style scoped>
.container {
    padding: 0 20px;
}
.review {
    border: 1px solid #ddd;
    font-size: 0.95em;
    padding: 10px;
    margin: 15px 0 5px 0;
}
.review h5 {
    text-transform: uppercase;
    font-weight: bolder;
    font-size: 0.7em;
}
.pull-right {
    float: right;
}
.review-form {
    margin-top: 30px;
    border-top: 1px solid #ddd;
    padding: 15px 0 0 0;
}
</style>
