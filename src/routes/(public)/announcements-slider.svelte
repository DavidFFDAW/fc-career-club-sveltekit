<script lang='ts'>
	import PostMiniature from "$lib/components/post/post-miniature.svelte";
	import type { Posts } from "@prisma/client";
	import 'swiper/swiper-bundle.css';
	import Swiper from 'swiper';
	import { onMount } from 'svelte';

	let slider: HTMLDivElement;
	export let announcements: Posts[] = [];

	onMount(() => {
		new Swiper(slider, {
			spaceBetween: 30,
			centeredSlides: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
	});
</script>

<div class="my-swiper swiper-container" bind:this={slider}>
	<div class="swiper-wrapper">
		{#each announcements as slide}
			<div class="swiper-slide">
				<PostMiniature
					post={slide}
				/>
			</div>
		{/each}
	</div>

	<div class="swiper-pagination"></div>
</div>
