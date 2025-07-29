<script lang="ts">
	import { defaultPlayerImage } from '$lib/constants/players';
	import Image from '../visuals/image.svelte';

	export let name: string;
	export let image: string = '';
	export let maxwidth: number = 80;
</script>

<div class="player-card-container player-card relative" style="--max-player: {maxwidth}px;">
	<div class="player-card-image-item">
		<h3 class="tcenter">{name}</h3>
		<Image src={image} alt={name} fallback={defaultPlayerImage} />
	</div>

	{#if $$slots.default}
		<div class="player-card-extra-info">
			<slot />
		</div>
	{/if}
</div>

<style>
	.player-card-container.player-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		border: 1px solid #ccc;
		background-color: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
	}

	.player-card-image-item {
		max-width: var(--max-player, 80px);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
	}
</style>
