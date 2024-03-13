import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useDataStore = defineStore("data", () => {
	const videoList = ref([
		{
			title: "Level1 Unit3",
			subTitle: "[북챈트1] I Have a Small Face",
			link: "https://tikitoki.ebsnurisam.com/direct?IDX=VSK1015",
            thumb: 'https://i.vimeocdn.com/video/1103377852-7e9092b8e941866ae413ba3cdf44bc59d13c96c3be3cc119794a5a814202d504-d?mw=2200&mh=1256&q=70',
            videoUrl : 'https://player.vimeo.com/video/533028742?autoplay=1&loop=1&autopause=0'
		},
		{
			title: "Level1 Unit3",
			subTitle: "[북챈트2] I Have a Small Face",
			link: "https://tikitoki.ebsnurisam.com/direct?IDX=VSK1016",
            thumb: 'https://i.vimeocdn.com/video/1103377990-13d7434eaa4994aa1fced39d340d60bb14be1711957ab6c9aedc775ad516e768-d?mw=2200&mh=1256&q=70',
            videoUrl : 'https://player.vimeo.com/video/533028765?autoplay=1&loop=1&autopause=0'
		},
	]);
	// const doubleCount = computed(() => count.value * 2);
	// function increment() {
	// 	count.value++;
	// }

	return { videoList };
});
