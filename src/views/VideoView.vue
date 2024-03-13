<script setup>
import { onMounted, computed, ref } from 'vue';
import { useDataStore } from '@/stores/data'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps({
    videoIdx: {
        default: 0,
    }
})

const dataStore = useDataStore()
const { videoList } = storeToRefs(dataStore);


const videoIndx = props.videoIdx;
const videoData = computed(() => {
    return videoList.value[videoIndx];
})
console.info('videoData', videoList.value)

const vimeoIframe = ref(null);
const isPlaying = ref(null);
let player;


onMounted(() => {

    console.info('onMounted called')

    player = new Vimeo.Player(vimeoIframe.value);

    console.info('player', player)

    // player.ready().then(function() {
    //     player.play();
    // });

    player.on('play', function () {
        console.log('Played the video');
        isPlaying.value = true;
    });

    player.getVideoTitle().then(function (title) {
        console.log('title:', title);
    });
})

const playVideo = (setPlaying) => {
    if (setPlaying) {
        player.play();
    } else {
        player.pause();
    }
    isPlaying.value = setPlaying;
}

const fullscreenVideo = () => {
    player.requestFullscreen().then(function () {
        // the player entered fullscreen
    }).catch(function (error) {
        // an error occurred
    });

}


</script>
<template>
    <v-layout class="w-full h-full">
        <v-app-bar color="" density="compact">
            <template v-slot:prepend>
                <v-app-bar-nav-icon @click="router.push('/')">
                    <v-icon icon="mdi-arrow-left"></v-icon>
                </v-app-bar-nav-icon>

            </template>

            <v-app-bar-title>{{ videoData.title }}</v-app-bar-title>

            <!-- <template v-slot:append>
                <v-btn icon="mdi-dots-vertical"></v-btn>
            </template> -->
        </v-app-bar>

        <v-main class="mt-3 text-center">
            <v-app-bar-title>{{ videoData.subTitle }}</v-app-bar-title>

            <iframe ref='vimeoIframe' v-if="videoData && videoData.videoUrl"
                class='w-1/2 h-2/3 mx-auto mb-3 shadow-lg pa-6' :src="videoData.videoUrl" />
            <v-btn v-if='isPlaying !== null && !isPlaying' class='text-h5' size="x-large" @click="playVideo(true)">재생 <v-icon
                    icon="mdi-play"></v-icon></v-btn>
            <v-btn v-else-if="isPlaying" class='text-h5' size="x-large" @click="playVideo(false)">일시정지 <v-icon
                    icon="mdi-pause"></v-icon></v-btn>
            <v-btn class='text-h5' size="x-large" @click="fullscreenVideo">전체화면 <v-icon
                    icon="mdi-fullscreen"></v-icon></v-btn>
        </v-main>


    </v-layout>
</template>
