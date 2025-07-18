<script lang="ts">
	import PlayerForm from '$lib/components/players/player-form.svelte';
	import PlayerShirt from '$lib/components/players/player-shirt.svelte';
	import AppForm from '$lib/components/forms/app-form.svelte';
	import AdminListItem from '$lib/components/admin/admin-list-item.svelte';
	import { playerPositions } from '$lib/constants/players';

	export let data;
	const players = data.bulkPlayers.players;
</script>

<section class="page-players-container">
	<header class="page-title">
		<h1>Jugadores</h1>
		<p>Guardado y actualización masiva de jugadores</p>
	</header>

	<AppForm reset={false} method="post" class="admin-players-header-box" buttonsFixed={true}>
		<div class="w1 grid responsive bulk-players-update-list-container down">
			{#if players.length > 0}
				{#each players as player}
					<div class="w1 grid bulk-update-player-item responsive">
						<div class="w1 flex center acenter">
							<img width="100" src={player.image} alt="" />
						</div>

						<input type="hidden" name="id[]" value={player.id} />

						<label class="form-item">
							<span class="label">Nombre</span>
							<input
								type="text"
								name="name[]"
								placeholder="Nombre del jugador"
								bind:value={player.name}
								required
							/>
						</label>

						<label class="form-item">
							<span class="label">Imagen</span>
							<input
								type="text"
								name="image[]"
								placeholder="URL de la imagen del jugador"
								bind:value={player.image}
								required
							/>
							<a
								href="https://sofifa.com/players?keyword={encodeURIComponent(player.name)}"
								class="w1 block btn small icon info"
								target="_blank"
								rel="noopener noreferrer"
							>
								<i class="bi bi-image"></i>
								Imagen
							</a>
						</label>

						<label class="form-item">
							<span class="label">Dorsal</span>
							<input
								type="number"
								name="number[]"
								placeholder="Número del jugador"
								bind:value={player.number}
								required
							/>
						</label>

						<label class="form-item">
							<span class="label">Posición</span>
							<select name="position[]" bind:value={player.position} required>
								{#each playerPositions as position}
									<option value={position}>{position}</option>
								{/each}
							</select>
						</label>
					</div>
				{/each}
			{:else}
				<p>No players found.</p>
			{/if}
		</div>
	</AppForm>
</section>

<style>
	.bulk-players-update-list-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 10px;
	}
	.bulk-players-update-list-container .bulk-update-player-item {
		display: flex;
		flex-direction: column;
		gap: 8px;
		background-color: #fff;
		border-radius: 8px;
		border: 1px solid #ddd;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		padding: 10px;
	}
	header.admin-players-header-box {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 20px;
		background-color: #fff;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.player-position-count-banner {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 10px;
		padding: 15px 15px 15px 0;
	}
	.player-position-count-banner .position-count-item {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 5px 10px;
		border-radius: 0 5px 5px 0;
		background-color: #fff;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
		border-left: 4px solid transparent;
	}
	.player-position-count-banner .position-count-item.position-count-item-por {
		border-color: var(--color);
	}
	.player-position-count-banner .position-count-item.position-count-item-li,
	.player-position-count-banner .position-count-item.position-count-item-ld,
	.player-position-count-banner .position-count-item.position-count-item-dfc {
		border-color: #d2bd53;
	}
	.player-position-count-banner .position-count-item.position-count-item-ed,
	.player-position-count-banner .position-count-item.position-count-item-ei,
	.player-position-count-banner .position-count-item.position-count-item-dc {
		border-color: #007bff;
	}
	.player-position-count-banner .position-count-item.position-count-item-md,
	.player-position-count-banner .position-count-item.position-count-item-mco,
	.player-position-count-banner .position-count-item.position-count-item-mc,
	.player-position-count-banner .position-count-item.position-count-item-mi {
		border-color: #28a745;
	}

	.admin-list-item {
		grid-template-columns: repeat(5, 1fr);
	}

	.error-message {
		color: #fff;
		background-color: #dc3545;
		padding: 0.5rem;
		border-radius: 0.25rem;
	}
</style>
