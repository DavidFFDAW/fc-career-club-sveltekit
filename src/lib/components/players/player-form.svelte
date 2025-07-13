<script lang="ts">
	import PlayerShirt from './player-shirt.svelte';
	import Input from '../forms/input.svelte';
	import PriceInput from '../forms/price-input.svelte';
	import { playerPositions, playerRoles } from '$lib/constants/players';
	import type { SlugifiedPlayer } from '$lib/types/interfaces';
	import SlugInput from '../forms/slug-input.svelte';
	import Fieldset from '../forms/fieldset.svelte';

	export let playerData: SlugifiedPlayer;
	export let multiple: boolean = false;
</script>

<div class="w1 flex column gap">
	<div
		class="w1 flex start astart gap-medium responsive player-form-container responsive-justify-center responsive-align-center"
	>
		<PlayerShirt name={playerData.shirt_name} number={playerData.number} width={140} />

		<div class="w1 player-form-fields-container">
			<Fieldset legend="Información">
				<div class="player-form-container w1 flex column gap-smaller">
					<div class="w1 grid two-column-grid acenter names-form responsive gap-smaller">
						<SlugInput
							label="Nombre"
							name={multiple ? 'name[]' : 'name'}
							placeholder="Player Name"
							bind:value={playerData.name}
							maxlength="100"
						/>
						<Input
							label="Nombre de camiseta"
							name={multiple ? 'shirt_name[]' : 'shirt_name'}
							type="text"
							placeholder="Player Shirt Name"
							bind:value={playerData.shirt_name}
							maxlength="50"
						/>
					</div>

					<div class="w1 grid two-column-grid acenter gap-small">
						<Input
							label="Dorsal"
							name={multiple ? 'number[]' : 'number'}
							type="number"
							placeholder="Player Number"
							bind:value={playerData.number}
							min="0"
							max="50"
						/>
						<Input
							label="Edad"
							name={multiple ? 'age[]' : 'age'}
							type="number"
							placeholder="Player Age"
							bind:value={playerData.age}
							min="16"
							max="50"
						/>
					</div>
				</div>
			</Fieldset>
		</div>
	</div>

	<div class="w1 grid two-column-grid gap-small responsive responsive-gap">
		<Fieldset legend="Extras">
			<div class="w1 flex start acenter gap-smaller column">
				<Input
					label="Posición"
					name={multiple ? 'position[]' : 'position'}
					type="select"
					maxlength="5"
					placeholder="Player Position"
					bind:value={playerData.position}
					options={playerPositions.map((position) => ({
						value: position,
						label: position
					}))}
				/>
				<Input
					label="Rol"
					name={multiple ? 'role[]' : 'role'}
					type="select"
					maxlength="50"
					placeholder="Player Role"
					bind:value={playerData.role}
					options={playerRoles.map((role) => ({
						value: role,
						label: role
					}))}
				/>

				<Input
					label="Estado"
					name={multiple ? 'status[]' : 'status'}
					type="text"
					placeholder="Player Status"
					bind:value={playerData.status}
					maxlength="150"
				/>
			</div>
		</Fieldset>

		<Fieldset legend="Media y país">
			<div class="w1 flex start acenter gap-smaller column">
				<Input
					label="Media"
					name={multiple ? 'overall[]' : 'overall'}
					type="number"
					placeholder="Overall Rating"
					bind:value={playerData.overall}
				/>

				<Input
					label="Incremento"
					name={multiple ? 'overall_increment[]' : 'overall_increment'}
					type="number"
					placeholder="Overall Increment"
					bind:value={playerData.overall_increment as number | undefined}
				/>

				<Input
					label="País"
					name={multiple ? 'country[]' : 'country'}
					type="text"
					placeholder="Player Country"
					bind:value={playerData.country}
					maxlength="50"
				/>
			</div>
		</Fieldset>
	</div>

	<Fieldset legend="Finanzas">
		<div class="form-group">
			<PriceInput
				label="Salario"
				name={multiple ? 'salary[]' : 'salary'}
				placeholder="Player Salary"
				bind:value={playerData.salary}
			/>
			<PriceInput
				label="Valor de mercado"
				name={multiple ? 'price[]' : 'price'}
				placeholder="Player Price"
				bind:value={playerData.price}
			/>

			<PriceInput
				label="Cláusula de rescisión"
				name={multiple ? 'termination_clause[]' : 'termination_clause'}
				placeholder="Termination Clause"
				bind:value={playerData.termination_clause as number | undefined}
			/>

			<Input
				label="Porcentaje de precio"
				name={multiple ? 'price_percentage[]' : 'price_percentage'}
				type="number"
				placeholder="Player Price Percentage"
				bind:value={playerData.price_percentage as number | undefined}
			/>
		</div>
	</Fieldset>
</div>

<style>
	.player-form-fields-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
