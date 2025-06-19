<script lang="ts">
	export let data;
	console.log('Data from load function:', data);
</script>

<div class="page-players-container">
	<div class="title">
		<h1>Players</h1>
		<small>Manage your players here.</small>
	</div>

	{#if data.players.length > 0}
		<ul class="players-list">
			{#each data.players as player}
				<li class="player-item">
					<a href={`/admin/players/${player.id}`} class="player-link">
						<i class="bi bi-person-fill"></i>
						{player.name}
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p>No players found.</p>
	{/if}
</div>
