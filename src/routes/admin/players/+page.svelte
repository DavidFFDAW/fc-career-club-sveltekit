<script lang="ts">
	import { enhance } from '$app/forms';
	import Input from '$lib/components/forms/input.svelte';

	export let data;
	export let form;
	console.log('Data from load function:', data);
</script>

<div class="page-players-container">
	<div class="title">
		<h1>Players</h1>
		<small>Manage your players here.</small>
	</div>

	<header class="admin-players-header-box">
		<form action="" method="post" use:enhance>
			<div class="inputs-container">
				<Input
					label="Nombre"
					name="name"
					type="text"
					placeholder="Player Name"
				/>
				<Input
					label="Media"
					name="overall"
					type="number"
					placeholder="Overall Rating"
				/>
				<Input
					label="Dorsal"
					name="number"
					type="number"
					placeholder="Player Number"
				/>
				<Input
					label="Edad"
					name="age"
					type="number"
					placeholder="Player Age"
				/>
				<Input
					label="Posición"
					name="position"
					type="text"
					maxlength="4"
					placeholder="Player Position"
				/>

				<Input
					label="Rol"
					name="role"
					type="text"
					placeholder="Player Role"
				/>

				<Input
					label="Salario"
					name="salary"
					type="number"
					placeholder="Player Salary"
				/>
				<Input
					label="Precio"
					name="price"
					type="number"
					placeholder="Player Price"
				/>

				<Input
					label="Cláusula de rescisión"
					name="termination_clause"
					type="number"
					placeholder="Termination Clause"
				/>

				<Input
					label="País"
					name="country"
					type="text"
					placeholder="Player Country"
				/>
			</div>

			{#if form && form.error}
				<div class="error-message">
					<p>{form.error}</p>
				</div>
			{/if}

			<div class="submit-buttons-container">
				<button type="submit" class="btn btn-primary">
					<i class="bi bi-plus-circle"></i>
					Crear jugador
				</button>
			</div>
		</form>
	</header>

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
	header.admin-players-header-box .inputs-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}
</style>