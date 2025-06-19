<script lang='ts'>
	export let caption: string = '';
	let width = $$restProps.width || 120;
	const appFallback: string = `/images/default-plant.jpg`;
	export let fallback: string = `https://placehold.co/${width}x${width}/f3f4f6/000000?text=Image+not+found`;

	const onError = (e: Event) => {
		const target = e.target as HTMLImageElement;
		if (!target) return;
		if (target.tagName !== 'IMG') return;

		if (target.src === fallback) {
			target.src = appFallback;
			return;
		};
		
		if (target.src !== fallback) {
			target.src = fallback || appFallback;
		}
	};
</script>

<div class="image-container">
	<img {...$$restProps} class="default-image {$$restProps.class}" data-fallback="{fallback || appFallback}" data-app-fallback="{appFallback}" alt="{caption}" on:error={onError} loading="lazy" />
	{#if caption}
		<p>{caption}</p>
	{/if}
</div>
