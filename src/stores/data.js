import { ref, computed } from "vue";
import { defineStore } from "pinia";
import VIDEO_LIST from '../../crawler_data/data.js';

export const useDataStore = defineStore("data", () => {
    const currentVideoIdx = ref(0);
	const videoList = ref(VIDEO_LIST);
	// const videoList = ref([
	// 	{
	// 		title: "Level1 Unit3",
	// 		subTitle: "[북챈트1] I Have a Small Face",
	// 		link: "https://tikitoki.ebsnurisam.com/direct?IDX=VSK1015",
    //         thumb: 'https://i.vimeocdn.com/video/1103377852-7e9092b8e941866ae413ba3cdf44bc59d13c96c3be3cc119794a5a814202d504-d?mw=2200&mh=1256&q=70',
    //         videoUrl : 'https://player.vimeo.com/video/533028742?autoplay=1&loop=0&autopause=0'
	// 	},
	// 	{
	// 		title: "Level1 Unit3",
	// 		subTitle: "[북챈트2] I Have a Small Face",
	// 		link: "https://tikitoki.ebsnurisam.com/direct?IDX=VSK1016",
    //         thumb: 'https://i.vimeocdn.com/video/1103377990-13d7434eaa4994aa1fced39d340d60bb14be1711957ab6c9aedc775ad516e768-d?mw=2200&mh=1256&q=70',
    //         videoUrl : 'https://player.vimeo.com/video/533028765?autoplay=1&loop=0&autopause=0'
	// 	},
	// 	{
	// 		title: "Level1 Unit3",
	// 		subTitle: "[북챈트2] I Love You, Sister",
	// 		link: "https://tikitoki.ebsnurisam.com/direct?IDX=VSK1019",
    //         thumb: 'https://i.vimeocdn.com/video/1103384972-9fd471004c7a1d1e302181aed1e146f05c03bb4283404439a5d5ea51aef8a863-d?mw=2200&mh=1256&q=70',
    //         videoUrl : 'https://player.vimeo.com/video/533031580?autoplay=1&loop=0&autopause=0'
	// 	},
	// 	{
	// 		title: "Level1 Unit3",
	// 		subTitle: "[Animation] We Look Like Everyone!",
	// 		link: "https://tikitoki.ebsnurisam.com/direct?IDX=VSK1021",
    //         thumb: 'https://i.vimeocdn.com/video/1103378086-e1fc1e392d6beab005dc89d86603fb084b1c1010222ab88f51453222f6623a9b-d?mw=2200&mh=1256&q=70',
    //         videoUrl : 'https://player.vimeo.com/video/533028801?autoplay=1&loop=0&autopause=0'
	// 	},
		
	// ]);

    const videoTitles = computed(()=>{
        let setTitles = new Set()
        videoList.value.forEach(item=>{
            setTitles.add(item.title)
            return
        })
        return setTitles;
    })

    const getVideosByTitles = (title)=>{
        return videoList.value.filter(video=>{
            return video.title == title;
        })
    }


	// const doubleCount = computed(() => count.value * 2);
	// function increment() {
	// 	count.value++;
	// }

	return { videoTitles, videoList, currentVideoIdx, getVideosByTitles };
});
