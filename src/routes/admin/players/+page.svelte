<script lang="ts">
	import PlayerForm from '$lib/components/players/player-form.svelte';
	import PlayerShirt from '$lib/components/players/player-shirt.svelte';
	import NumberUtils from '$lib/utils/number.utils';
	import AppForm from '$lib/components/forms/app-form.svelte';
	import type { SlugifiedPlayer } from '$lib/types/interfaces.js';
	import { fade } from 'svelte/transition';
	import AdminListItem from '$lib/components/admin/admin-list-item.svelte';
	import ButtonAsync from '$lib/components/forms/button-async.svelte';

	let showUpsert: boolean = false;
	let playerData: SlugifiedPlayer = {
		name: '',
		number: 0,
		overall: 0,
		age: 0,
		position: '',
		role: '',
		salary: 0,
		shirt_name: '',
		slug: '',
		country: '',
		price: 0,
		price_percentage: 0,
		termination_clause: 0,
		status: 'active',
		overall_increment: 0
	} as SlugifiedPlayer;
	export let data;
</script>

<div class="page-players-container">
	<header class="page-title">
		<h1>Jugadores</h1>
		<p>Gestiona los jugadores de tu equipo.</p>
	</header>

	<div class="player-position-count-banner">
		{#each Object.entries(data.count) as [position, count]}
			<div class="position-count-item position-count-item-{position.toLowerCase()}">
				<span class="position-count">{count}</span>
				<span class="position-name">{position}</span>
			</div>
		{/each}
	</div>

	<section class="admin-players-header-box down">
		{#if showUpsert}
			<div transition:fade class="w1 box">
				<div class="w1 flex end acenter">
					<button
						type="button"
						class="btn btn-secondary unbutton"
						on:click={() => (showUpsert = !showUpsert)}
						aria-label="Toggle player form"
					>
						<i class="bi bi-x-circle"></i>
					</button>
				</div>

				<div>
					<AppForm method="post" reset={true}>
						<PlayerForm 
							bind:playerData 
							currentDorsals={data.players.map((p) => p.number)} 
						/>
					</AppForm>
				</div>
			</div>
		{/if}

		{#if !showUpsert}
			<div class="w1 buttons-container flex between acenter">
				<a href="players/import" class="btn icon icon-button">
					<i class="bi bi-file-earmark-arrow-down"></i>
					<span>Importar jugadores</span>
				</a>

				<button
					type="button"
					class="btn cta icon icon-button"
					on:click={() => (showUpsert = !showUpsert)}
				>
					<i class="bi bi-plus-circle"></i>
					<span>{showUpsert ? 'Cancelar' : 'Añadir jugador'}</span>
				</button>
			</div>
		{/if}
	</section>

	<div class="list-container down">
		{#if data.players.length > 0}
			<ul class="players-list admin-list">
				{#each data.players as player}
					<AdminListItem columns={6}>
						<PlayerShirt name={player.shirt_name} number={player.number} />
						<h4>{player.name}</h4>
						<p class="player-number">#{player.age}</p>
						<p class="player-position">{player.position}</p>

						<div class="button-group">
							<a
								href="/admin/players/{player.slug}/update"
								class="btn small warning"
								aria-label="Edit player"
								title="Editar jugador"
							>
								<i class="bi bi-pencil-square"></i>
							</a>
							<a
								href={`/admin/players/${player.id.toString()}/contract`}
								class="btn small info"
								aria-label="Ir a contrato"
								title="Ir a contrato"
							>
								<i class="bi bi-file-person"></i>
								<span>Contrato</span>
							</a>

							<ButtonAsync
								endpoint={`/api/protected/players/${player.id.toString()}/delete`}
								method="delete"
								icon="trash"
								confirmation={true}
								class="btn small danger"
								aria-label="Delete player"
								title="Eliminar jugador"
							/>
						</div>
					</AdminListItem>
				{/each}
			</ul>
		{:else}
			<p>No players found.</p>
		{/if}
	</div>
</div>

<style>
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
