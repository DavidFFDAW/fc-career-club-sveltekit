<script lang="ts">
	import PlayerShirt from "$lib/components/players/player-shirt.svelte";
	import Slider from "$lib/components/visuals/slider/slider.svelte";

	let slides = Array.from({ length: 5 }, (_, i) => ({
		image: `https://picsum.photos/800/400?random=${i + 1}`,
		title: `Slide ${i + 1}`,
		description: `Description for slide ${i + 1}`
	}));
</script>

<section class="w1 home-container">
	<Slider slides={slides} />

	<div class="flex column gap astart">
		<a href="/announcements">Anuncios</a>
		<a href="/announcements/franco-mastantuono">Anuncios > Franco Mastantuono</a>
		
		<a href="/blog/cristiano-se-retira-al-final-de-temporada">
			Noticia: Cristiano dice adiós tras una carrera legendaria
		</a>
	</div>
</section>
