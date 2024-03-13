<script setup>
import { useRouter } from 'vue-router';
import { useDataStore } from '@/stores/data'
import { storeToRefs } from 'pinia'

const router = useRouter();
const dataStore = useDataStore()
const { videoList } = storeToRefs(dataStore);
console.info('videoList, ', videoList)
</script>

<template>
    <v-layout>
        <v-app-bar color="" density="compact">
            <!-- <template v-slot:prepend>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </template> -->

            <v-app-bar-title>TikiToki Playlist</v-app-bar-title>

            <!-- <template v-slot:append>
                <v-btn icon="mdi-dots-vertical"></v-btn>
            </template> -->
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <div class="flex">
                    <v-card class="mx-3 pb-3" max-width="344" elevated v-for="(video, videoIdx) in videoList"
                        :key="videoIdx"
                        @click="router.push(`/video/${videoIdx}`)"
                    >
                        <v-img height="120  px" :src="video.thumb" cover></v-img>

                        <v-card-title>
                            {{ video.title }}
                        </v-card-title>

                        <v-card-subtitle>
                            {{ video.subTitle }}
                        </v-card-subtitle>
                    </v-card>
                </div>
            </v-container>
        </v-main>
    </v-layout>
</template>
