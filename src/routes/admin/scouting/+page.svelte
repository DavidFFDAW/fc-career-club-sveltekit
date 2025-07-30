<script lang="ts">
	import AdminListItem from '$lib/components/admin/admin-list-item.svelte';
	import AppForm from '$lib/components/forms/app-form.svelte';
	import ButtonAsync from '$lib/components/forms/button-async.svelte';
	import Input from '$lib/components/forms/input.svelte';
	import PriceInput from '$lib/components/forms/price-input.svelte';
	import PlayerCard from '$lib/components/players/player-card.svelte';
	import Dialog from '$lib/components/visuals/dialog/dialog.svelte';
	import PageTitle from '$lib/components/visuals/page-title.svelte';
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
	<PageTitle
		title="Jugadores ojeados"
		description="Gestiona los jugadores ojeados por tu equipo.">
		<nav class="page-navigation-items w1 flex gap-5">
			<a
				href="/admin/scouting/upsert"
				class="btn small info icon"
				download="nuevo-jugador-ojeado"
				aria-label="Crear nuevo jugador ojeado"
				title="Crear nuevo jugador ojeado"
			>
				<i class="bi bi-plus"></i>
				<span class="text">Crear</span>
			</a>
			<a
				href="/admin/scouting/api/export"
				class="btn small warn icon"
				aria-label="Exportar jugadores ojeados"
				title="Exportar jugadores ojeados"
			>
				<i class="bi bi-file-earmark-arrow-down"></i>
				<span class="text">Exportar</span>
			</a>
			<a
				href="/admin/scouting/import"
				class="btn small success icon"
				aria-label="Importar jugadores ojeados"
				title="Importar jugadores ojeados"
			>
				<i class="bi bi-file-earmark-arrow-up"></i>
				<span class="text">Importar</span>
			</a>
		</nav>
	</PageTitle>

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
		{#each data.scoutingPlayers as player}
			<PlayerCard name={player.player_name}>
				<div class="w1 flex astart column gap-5">
					<p class="flex-responsive column">
						<strong>Interés:</strong>
						<small>{player.interest_type}</small>
					</p>
					<p class="flex-responsive column">
						<strong>Precio estimado:</strong>
						<small>{player.player_supposed_price?.toPriceFormat()}</small>
					</p>
					<p class="flex-responsive column">
						<strong>Salario estimado:</strong>
						<small>{player.player_supposed_salary?.toPriceFormat()}</small>
					</p>
				</div>

				<div class="button-group">
					<a
						href="/admin/scouting/upsert"
						class="btn small info"
						aria-label="Crear nuevo jugador ojeado"
						title="Crear nuevo jugador ojeado"
					>
						<i class="bi bi-plus-circle"></i>
					</a>

					<a
						href="/admin/scouting/upsert?id={player.id}"
						class="btn small warning"
						aria-label="Edit player"
						title="Editar jugador"
					>
						<i class="bi bi-pencil-square"></i>
					</a>
					
					<a
						href="/admin/scouting/create-player/{player.id}"
						class="btn small warning"
						aria-label="Fichar jugador"
						title="Fichar jugador"
					>
						<i class="bi bi-person-plus"></i>
						<span class="text">Fichar</span>
					</a>

					<ButtonAsync
						endpoint={`/api/protected/scouting/${player.id.toString()}/delete`}
						method="delete"
						icon="trash"
						confirmation={true}
						class="btn small danger"
						aria-label="Eliminar jugador"
						title="Eliminar jugador"
					/>
				</div>
			</PlayerCard>
		{/each}
	</ul>
</div>
