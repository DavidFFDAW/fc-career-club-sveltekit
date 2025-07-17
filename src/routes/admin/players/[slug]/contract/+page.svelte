<script lang="ts">
	import AppForm from '$lib/components/forms/app-form.svelte';
	import Fieldset from '$lib/components/forms/fieldset.svelte';
	import Input from '$lib/components/forms/input.svelte';
	import PriceInput from '$lib/components/forms/price-input.svelte';
	import Switch from '$lib/components/forms/switch.svelte';
	import { playerRoles } from '$lib/constants/players.js';
	import { fade } from 'svelte/transition';

	export let data;
	const { player, contract, isEditing } = data.playerContract;
	let hasTerminationClause: boolean =
		(contract && contract.termination_clause && contract.termination_clause > 0) || false;
</script>

<section class="admin-player-contract-page">
	<header class="page-title">
		<h1>{isEditing ? 'Editar Contrato' : 'Crear Contrato'}</h1>
		<p>Gestiona el contrato del jugador {player.name}.</p>
	</header>

	<div class="w1 form-container down">
		<div class="w1 box contract-form-container">
			<AppForm
				method="post"
				buttonText={isEditing ? 'Actualizar Contrato' : 'Crear Contrato'}
				class="w1 flex astart gap-medium responsive"
				updateId={isEditing ? contract.id : undefined}
				reset={false}
			>
				<input type="hidden" name="player_id" value={player.id} />
				<input
					type="hidden"
					name="_action"
					value={isEditing ? 'update_contract' : 'create_contract'}
				/>

				<Fieldset legend="Información del contrato">
					<div class="flex column gap-smaller">
						<Input
							label="Duracion en años"
							name="duration"
							type="number"
							placeholder="Duración del contrato en años"
							bind:value={contract.duration}
							min="1"
							max="5"
							required
						/>

						<Input
							label="Rol en equipo"
							name="role"
							type="select"
							placeholder="Selecciona el rol del jugador"
							bind:value={contract.role}
							options={playerRoles.map((role) => ({ value: role, label: role }))}
							required
						/>
					</div>
				</Fieldset>

				<Fieldset legend="Datos económicos">
					<div class="flex column gap-smaller">
						<Switch
							label="¿Tiene cláusula de rescisión?"
							name="hasTerminationClause"
							bind:value={hasTerminationClause}
						/>
						<PriceInput
							label="Precio de compra"
							name="price"
							placeholder="Precio de compra del jugador"
							bind:value={contract.price}
							required
						/>
						<PriceInput
							label="Salario"
							name="salary"
							placeholder="Salario mensual del jugador"
							bind:value={contract.salary}
							required
						/>

						{#if hasTerminationClause}
							<div class="w1 termination-clause" transition:fade>
								<PriceInput
									label="Cláusula de rescisión"
									name="termination_clause"
									placeholder="Cláusula de rescisión del jugador"
									bind:value={contract.termination_clause as number}
									required
								/>
							</div>
						{/if}
					</div>
				</Fieldset>
			</AppForm>
		</div>
	</div>
</section>
