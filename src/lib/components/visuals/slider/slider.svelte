<script lang='ts'>
	let component: HTMLDivElement;
	import type { Slide } from '$lib/types/interfaces';
	import 'swiper/swiper-bundle.css';
	import Image from '../image.svelte';
	
	export let slides: Slide[] = [];
	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	
	onMount(() => {
		new Swiper(component, {
			loop: true,
			spaceBetween: 30,
			centeredSlides: true,
		});
	});
</script>

<div class="my-swiper swiper-container" bind:this={component}>
	<div class="swiper-wrapper">
		{#each slides as slide}
			<div class="swiper-slide">
				<Image src={slide.image} alt={slide.title} />
				<h2>{slide.title}</h2>
				<p>{slide.description}</p>
			</div>
		{/each}
	</div>
</div>
