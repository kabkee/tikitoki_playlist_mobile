<script setup>
import { onMounted, computed, ref, watch } from 'vue';
import { useDataStore } from '@/stores/data'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router';
import { set, useSwipe, useStorage } from '@vueuse/core'

const router = useRouter();
const props = defineProps({
    videoIdx: {
        default: 0,
    }
})

const dataStore = useDataStore()
const { videoList, videoRepeatOnce, currentVideoIdx } = storeToRefs(dataStore);

const storageVideoRepeatOnce = useStorage("videoRepeatOnce", false);
videoRepeatOnce.value = storageVideoRepeatOnce.value;

const videoData = computed(() => {
    return videoList.value[currentVideoIdx.value];
})

// const hasPrevVideo = computed(() => {
//     return !currentVideoIdx.value;
// })
// const hasNextVideo = computed(() => {
//     return currentVideoIdx.value && currentVideoIdx.value < videoList.value.length;
// })

const setNextVideoIdx = (numb) => {
    isPlaying.value = null;
    currentVideoIdx.value += parseInt(numb);
    if (currentVideoIdx.value < 0) {
        currentVideoIdx.value = videoList.value.length - 1;
    } else if (currentVideoIdx.value >= videoList.value.length) {
        currentVideoIdx.value = 0;
    }
    router.push(`/video/${currentVideoIdx.value}`)
}

const vimeoIframe = ref(null);
const isPlaying = ref(null);
let player;


onMounted(() => {
    currentVideoIdx.value = parseInt(props.videoIdx);
    setTimeout(() => {
        initVimeoPlayer();
    }, 500)
})

watch(currentVideoIdx, () => {
    initVimeoPlayer();
})


const initVimeoPlayer = () => {
    player = new Vimeo.Player(vimeoIframe.value);

    // player.ready().then(function() {
    // });

    player.on('play', function () {
        // console.log('Played the video');
        isPlaying.value = true;
        onClickFullscreen();
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

const onClickFullscreen = () => {
    player.requestFullscreen().then(function () {
        // the player entered fullscreen
    }).catch(function (error) {
        // an error occurred
    });

}

const onClickRepeat = () => {
    videoRepeatOnce.value = !videoRepeatOnce.value;
    storageVideoRepeatOnce.value = videoRepeatOnce.value;
}

const pageTranslateX = ref(0);
const swipeTarget = ref(null);
const { direction, isSwiping, lengthX, lengthY } = useSwipe(swipeTarget, {
    onSwipe() {
        if (isSwiping.value) {
            pageTranslateX.value = lengthX.value * -1;
        }
    },
    onSwipeEnd() {
        if (pageTranslateX.value > 0) {
            setNextVideoIdx(-1);
        } else {
            setNextVideoIdx(1);
        }
        pageTranslateX.value = 0;
    }
})

</script>
<template>
    <v-layout class="w-full h-full" ref="swipeTarget" :style="{ transform: `translateX(${pageTranslateX}px)` }">
        <v-app-bar color="" density="compact">
            <template v-slot:prepend>
                <v-app-bar-nav-icon @click="router.push('/')">
                    <v-icon icon="mdi-arrow-left"></v-icon>
                </v-app-bar-nav-icon>

            </template>

            <v-app-bar-title>{{ videoData.title }} <span class='text-subtitle-2'>({{ currentVideoIdx + 1 }} / {{
        videoList.length
    }})</span></v-app-bar-title>

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
            <v-btn v-if='!isPlaying' :disabled="isPlaying === null" @click="playVideo(true)">
                <v-icon icon="mdi-play"></v-icon>
                재생
            </v-btn>
            <v-btn v-else-if="isPlaying" :disabled="isPlaying === null" @click="playVideo(false)">
                <v-icon icon="mdi-pause"></v-icon>
                일시정지
            </v-btn>
            <v-btn @click="onClickRepeat">
                <v-icon v-if='videoRepeatOnce' icon="mdi-repeat-once"></v-icon>
                <v-icon v-else icon="mdi-repeat"></v-icon>
                반복
            </v-btn>
            <v-btn @click="onClickFullscreen">
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
