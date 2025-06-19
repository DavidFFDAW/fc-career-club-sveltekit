<script lang='ts'>
	import PlayerShirt from '$lib/components/players/player-shirt.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>Mandarinos | Jugadores</title>
</svelte:head>

<div class="main-players-list-container">
	{#each data.players as player}
		<div class="container">
			<PlayerShirt name={player.name} number={player.number} />
		</div>
	{/each}
</div>

<style>
  .main-players-list-container {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	justify-items: center;
	align-items: center;
	place-items: center;
	gap: 20px;
  }
</style>