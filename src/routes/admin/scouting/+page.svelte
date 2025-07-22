<script lang="ts">
	import AdminListItem from '$lib/components/admin/admin-list-item.svelte';
	import AppForm from '$lib/components/forms/app-form.svelte';
	import Input from '$lib/components/forms/input.svelte';
	import PriceInput from '$lib/components/forms/price-input.svelte';
	import Dialog from '$lib/components/visuals/dialog/dialog.svelte';
	import type { Scouting } from '@prisma/client';

	export let data;
	let openDialog: boolean = false;

	let playerData = {
		id: 0,
		player_name: '',
		player_interest_type: 'transfer',
		player_supposed_price: 0,
		player_supposed_salary: 0
	};

	const setPlayerData = (player: Scouting) => (event: Event) => {
		event.preventDefault();
		playerData = {
			id: player.id,
			player_name: player.player_name,
			player_interest_type: player.player_interest_type || 'transfer',
			player_supposed_price: player.player_supposed_price || 0,
			player_supposed_salary: player.player_supposed_salary || 0
		};
		openDialog = true;
	};

	const resetForm = (dialogState: boolean = false) => {
		playerData = {
			id: 0,
			player_name: '',
			player_interest_type: 'transfer',
			player_supposed_price: 0,
			player_supposed_salary: 0
		};
		openDialog = dialogState;
	};

	$: formAction = playerData.id !== 0 ? 'update' : 'create';
</script>

<div class="w1 scouting-panel h1 flex astart start column gap">
	<h1>Panel de jugadores ojeados</h1>
	<!-- <Debug {data} /> -->
	<div class="w1 flex end acenter">
		<button type="button" on:click={() => resetForm(true)} class="btn cta icon">
			<i class="bi bi-plus"></i>
			<span class="text">Añadir jugador</span>
		</button>
	</div>

	<Dialog
		bind:opened={openDialog}
		title={playerData.id !== 0 ? 'Editar jugador' : 'Añadir jugador'}
		minwidth={700}
	>
		<AppForm
			action={formAction}
			updateId={playerData.id}
			class="w1 form flex column gap-small"
			afterSubmit={() => (openDialog = false)}
		>
			<div class="w1 grid two-column gap-small responsive">
				<Input
					type="text"
					name="player_name"
					label="Nombre del jugador"
					placeholder="Nombre del jugador"
					autocomplete="name"
					maxlength="100"
					value={playerData.player_name}
					required
				/>

				<Input
					type="select"
					name="interest_type"
					label="Tipo de interés"
					options={[
						{ value: 'cesion', label: 'Cesión' },
						{ value: 'transfer', label: 'Traspaso' },
						{ value: 'free', label: 'Libre' }
					]}
					value={playerData.player_interest_type || 'transfer'}
					placeholder="Selecciona un tipo de interés"
					required
				/>

				<PriceInput
					label="Precio estimado"
					name="stimated_price"
					value={playerData.player_supposed_price || undefined}
					placeholder="20.000.000"
				/>

				<PriceInput
					label="Salario estimado"
					name="stimated_salary"
					value={playerData.player_supposed_salary || undefined}
					placeholder="200.000"
				/>
			</div>
		</AppForm>
	</Dialog>

	<ul class="w1 admin-list">
		<AdminListItem columns={4} admin>
			<p>Jugador</p>
			<p>Precio estimado</p>
			<p>Salario estimado</p>
			<p>Acciones</p>
		</AdminListItem>

		{#each data.scoutingPlayers as player}
			<AdminListItem columns={4}>
				<div class="w1 flex start astart column gap-5">
					<p class="uppercase bold">{player.player_name}</p>
					<small>{player.interest_type}</small>
				</div>

				<small>
					{player.player_supposed_price?.toLocaleString('es-ES', {
						style: 'currency',
						currency: 'EUR',
						minimumFractionDigits: 0,
						maximumFractionDigits: 0
					})}
				</small>

				<small>
					{player.player_supposed_salary?.toLocaleString('es-ES', {
						style: 'currency',
						currency: 'EUR',
						minimumFractionDigits: 0,
						maximumFractionDigits: 0
					})}
				</small>

				<div class="w1 buttons-container">
					<button type="button" class="w1 btn icon update warning" on:click={setPlayerData(player)}>
						<i class="bi bi-trash"></i>
						<span class="text">Editar</span>
					</button>
				</div>
			</AdminListItem>
		{/each}
	</ul>
</div>
