<script setup>
import { onMounted, computed, ref, watch } from 'vue';
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
const { videoList, currentVideoIdx } = storeToRefs(dataStore);

if(props.videoIdx){
    // currentVideoIdx.value = props.videoIdx;
}

const videoData = computed(() => {
    return videoList.value[currentVideoIdx.value];
})

// const hasPrevVideo = computed(() => {
//     return !currentVideoIdx.value;
// })
// const hasNextVideo = computed(() => {
//     return currentVideoIdx.value && currentVideoIdx.value < videoList.value.length;
// })

const setNextVideoIdx = (numb)=>{
    isPlaying.value = null;
    currentVideoIdx.value += numb;
    if(currentVideoIdx.value < 0){
        currentVideoIdx.value = videoList.value.length-1;
    }else if(currentVideoIdx.value >= videoList.value.length){
        currentVideoIdx.value = 0;
    }
    router.push(`/video/${currentVideoIdx.value}`)
}

const vimeoIframe = ref(null);
const isPlaying = ref(null);
let player;

onMounted(() => {
    initVimeoPlayer();
})

watch(currentVideoIdx, ()=>{
    initVimeoPlayer();
})

const initVimeoPlayer = ()=>{
    player = new Vimeo.Player(vimeoIframe.value);

    // player.ready().then(function() {
    // });

    player.on('play', function () {
        // console.log('Played the video');
        isPlaying.value = true;
        fullscreenVideo();
    });

    player.on('pause', function () {
        // console.log('Paused the video');
    });
    player.on('ended', function () {
        setNextVideoIdx(1);
    });

    // player.getVideoTitle().then(function (title) {
    //     console.log('title:', title);
    // });
}

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

            <iframe ref='vimeoIframe' :key='videoData.videoUrl' v-if="videoData && videoData.videoUrl"
                class='w-full h-[calc(100%-56px)] mx-auto my-3 shadow-lg pa-3' :src="videoData.videoUrl" />

        </v-main>
        <v-bottom-navigation>
            <v-btn @click="setNextVideoIdx(-1)">
                <v-icon icon="mdi-skip-previous"></v-icon>
                이전
            </v-btn>

            <v-spacer />
            <v-btn v-if='!isPlaying' :disabled="isPlaying===null" @click="playVideo(true)">
                <v-icon icon="mdi-play"></v-icon>
                재생
            </v-btn>
            <v-btn v-else-if="isPlaying" :disabled="isPlaying===null" @click="playVideo(false)">
                <v-icon icon="mdi-pause"></v-icon>
                일시정지
            </v-btn>
            <v-btn @click="fullscreenVideo">
                <v-icon icon="mdi-fullscreen"></v-icon>
                전체화면
            </v-btn>
            <v-spacer />
            <v-btn @click="setNextVideoIdx(1)">
                <v-icon icon="mdi-skip-next"></v-icon>
                다음
            </v-btn>

        </v-bottom-navigation>
    </v-layout>
</template>
