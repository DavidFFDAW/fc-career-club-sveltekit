<script lang="ts">
	import type { players } from '@prisma/client';
	import { enhance } from '$app/forms';
	import PlayerForm from '$lib/components/players/player-form.svelte';
	import PlayerShirt from '$lib/components/players/player-shirt.svelte';

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
	export let form: { error?: string } | undefined;
</script>

<div class="page-players-container">
	<div class="title">
		<h1>Players</h1>
		<small>Manage your players here.</small>
	</div>

	<header class="admin-players-header-box">
		<form action="" method="post" use:enhance>
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
		</form>
	</header>

	<div class="list-container down">
		{#if data.players.length > 0}
			<ul class="players-list admin-list">
				{#each data.players as player}
					<li class="w1 flex start acenter player-item admin-list-item">
						<a href={`/admin/players/${player.id}`} class="player-link block">
							<PlayerShirt name={player.name} number={player.number} />
							<h2>{player.name}</h2>
							<p class="player-number">#{player.age}</p>
							<p class="player-position">{player.position}</p>
							<p class="player-role">{player.role}</p>
							<p class="player-salary">${player.salary}</p>
						</a>
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
</style>
