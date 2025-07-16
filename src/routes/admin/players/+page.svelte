<script lang="ts">
	import PlayerForm from '$lib/components/players/player-form.svelte';
	import PlayerShirt from '$lib/components/players/player-shirt.svelte';
	import NumberUtils from '$lib/utils/number.utils';
	import AppForm from '$lib/components/forms/app-form.svelte';
	import type { SlugifiedPlayer } from '$lib/types/interfaces.js';
	import { fade } from 'svelte/transition';

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
	export let form: { error?: string } | undefined = undefined;
</script>

<div class="page-players-container">
	<header class="admin-players-header-box down">
		{#if showUpsert}
			<div transition:fade class="w1">
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
				<AppForm>
					<PlayerForm bind:playerData />

					{#if form && form.error}
						<div class="error-message">
							<p>{form.error}</p>
						</div>
					{/if}

					<div class="submit-buttons-container">
						<button type="submit" class="btn cta icon icon-button">
							<i class="bi bi-plus-circle"></i>
							<span>Crear jugador</span>
						</button>
					</div>
				</AppForm>
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
	</header>

	<div class="list-container down">
		{#if data.players.length > 0}
			<ul class="players-list admin-list">
				{#each data.players as player}
					<li class="w1 player-item admin-list-item">
						<PlayerShirt name={player.shirt_name} number={player.number} />
						<h4>{player.name}</h4>
						<p class="player-number">#{player.age}</p>
						<p class="player-position">{player.position}</p>
						<p class="player-role">{player.role}</p>
						<p class="player-salary">{NumberUtils.formatPrice(player.salary)}</p>
					</li>
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
