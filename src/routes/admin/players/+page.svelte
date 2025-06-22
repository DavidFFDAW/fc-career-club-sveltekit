<script lang="ts">
	import type { players } from '@prisma/client';
	import PlayerForm from '$lib/components/players/player-form.svelte';
	import PlayerShirt from '$lib/components/players/player-shirt.svelte';
	import NumberUtils from '$lib/utils/number.utils';
	import AppForm from '$lib/components/forms/app-form.svelte';

	let playerData: players = {
		name: '',
		number: 0,
		overall: 0,
		age: 0,
		position: '',
		role: '',
		salary: 0
	} as players;
	export let data;
	export let form: { error?: string } | undefined = undefined;
</script>

<div class="page-players-container">
	<h1>Administración de jugadores</h1>

	<header class="admin-players-header-box down">
		<AppForm>
			<PlayerForm bind:playerData />

			{#if form && form.error}
				<div class="error-message">
					<p>{form.error}</p>
				</div>
			{/if}

			<div class="submit-buttons-container">
				<button type="submit" class="btn btn-primary icon icon-button">
					<i class="bi bi-plus-circle"></i>
					<span>Crear jugador</span>
				</button>
			</div>
		</AppForm>
	</header>

	<div class="list-container down">
		{#if data.players.length > 0}
			<ul class="players-list admin-list">
				{#each data.players as player}
					<li class="w1 player-item admin-list-item">
						<PlayerShirt name={player.name} number={player.number} />
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
