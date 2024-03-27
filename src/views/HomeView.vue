<script setup>
import { useRouter } from 'vue-router';
import { useDataStore } from '@/stores/data'
import { storeToRefs } from 'pinia'

const router = useRouter();
const dataStore = useDataStore()
const { videoTitles } = storeToRefs(dataStore);
const { getVideosByTitles } = dataStore;

</script>

<template>
    <v-layout>
        <v-app-bar color="" density="compact" class="max-w-[500px] mx-auto">
            <!-- <template v-slot:prepend>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </template> -->

            <v-app-bar-title>티키토키 재생목록</v-app-bar-title>

            <!-- <template v-slot:append>
                <v-btn icon="mdi-dots-vertical"></v-btn>
            </template> -->
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <div v-for="(title, titleIdx) in videoTitles" :key="titleIdx">
                    <div class="pl-3 mb-3 mt-4 text-subtitle-2">{{ title }}</div>
                    <div class="flex flex-wrap">
                        <v-card class="mx-3 pb-3 w-2/5" elevated v-for="video in getVideosByTitles(title)"
                            :key="video.index" @click="router.push(`/video/${video.index}`)">
                            <v-img height="120  px" :src="video.thumb" cover></v-img>

                            <v-card-text>
                                {{ video.subTitle }}
                            </v-card-text>
                            <v-card-subtitle>
                                {{ video.title }}
                            </v-card-subtitle>
                        </v-card>
                    </div>
                    <hr />
                </div>
            </v-container>
        </v-main>
    </v-layout>
</template>
