<script lang="ts">
	import PlayerShirt from './player-shirt.svelte';
	import Input from '../forms/input.svelte';
	import PriceInput from '../forms/price-input.svelte';
	import { playerPositions, playerRoles } from '$lib/constants/players';
	import type { SlugifiedPlayer } from '$lib/types/interfaces';
	import SlugInput from '../forms/slug-input.svelte';
	import Fieldset from '../forms/fieldset.svelte';
	import ShirtNumberSelector from './shirt-number-selector.svelte';

	export let playerData: SlugifiedPlayer;
	export let multiple: boolean = false;
	export let currentDorsals: number[] = [];
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
						<ShirtNumberSelector
							label="Número de camiseta"
							name={multiple ? 'number[]' : 'number'}
							numbersInUse={currentDorsals}
							bind:value={playerData.number}
							placeholder="Selecciona un número"
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
</div>

<style>
	.player-form-fields-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
