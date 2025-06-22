<script lang="ts">
	import { type players } from '@prisma/client';
	import PlayerShirt from './player-shirt.svelte';
	import Input from '../forms/input.svelte';
	import PriceInput from '../forms/price-input.svelte';
	import { playerPositions } from '$lib/constants/players.js';

	export let playerData: players;
</script>

<div class="w1 flex start astart gap-medium">
	<PlayerShirt name={playerData.name} number={playerData.number} width={140} />

	<div class="w1 grid player-form-fields-container">
		<Input
			label="Nombre"
			name="name"
			type="text"
			placeholder="Player Name"
			bind:value={playerData.name}
		/>
		<Input
			label="Nombre de camiseta"
			name="shirt_name"
			type="text"
			placeholder="Player Shirt Name"
			bind:value={playerData.shirt_name}
		/>
		<Input
			label="Dorsal"
			name="number"
			type="number"
			placeholder="Player Number"
			bind:value={playerData.number}
			min="1"
			max="50"
		/>
		<Input
			label="Media"
			name="overall"
			type="number"
			placeholder="Overall Rating"
			bind:value={playerData.overall}
		/>

		<Input
			label="Edad"
			name="age"
			type="number"
			placeholder="Player Age"
			bind:value={playerData.age}
		/>
		<Input
			label="Posición"
			name="position"
			type="select"
			maxlength="4"
			placeholder="Player Position"
			bind:value={playerData.position}
			options={playerPositions.map((position) => ({
				value: position,
				label: position
			}))}
		/>

		<Input
			label="Rol"
			name="role"
			type="text"
			placeholder="Player Role"
			bind:value={playerData.role}
		/>

		<PriceInput
			label="Salario"
			name="salary"
			placeholder="Player Salary"
			bind:value={playerData.salary}
		/>
		<PriceInput
			label="Valor de mercado"
			name="price"
			placeholder="Player Price"
			bind:value={playerData.price}
		/>

		<PriceInput
			label="Cláusula de rescisión"
			name="termination_clause"
			placeholder="Termination Clause"
			bind:value={playerData.termination_clause as number | undefined}
		/>

		<Input
			label="País"
			name="country"
			type="text"
			placeholder="Player Country"
			bind:value={playerData.country}
		/>
	</div>
</div>

<style>
	.grid.player-form-fields-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}
</style>
