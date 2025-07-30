<script lang="ts">
	import AppForm from '$lib/components/forms/app-form.svelte';
	import Input from '$lib/components/forms/input.svelte';
	import PriceInput from '$lib/components/forms/price-input.svelte';
	import PageTitle from '$lib/components/visuals/page-title.svelte';
	import type { Scouting } from '@prisma/client';

	export let data;
	let scouting = data.upsertScouting.scoutingPlayer as Scouting;
</script>

<section class="page-scouting-upsert">
	<PageTitle
		title="Jugadores ojeados"
		description="Gestiona los jugadores ojeados por tu equipo."
	/>

	<div class="box">
		<AppForm method="post" updateId={scouting.id} redirect="/admin/scouting">
			<input
				type="hidden"
				name="_action"
				value={data.upsertScouting.isEditing ? 'update' : 'create'}
			/>

			<div class="w1 grid two-column gap-small responsive">
				<Input
					type="text"
					name="player_name"
					label="Nombre del jugador"
					placeholder="Nombre del jugador"
					autocomplete="name"
					maxlength="100"
					bind:value={scouting.player_name}
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
					bind:value={scouting.player_interest_type as string}
					placeholder="Selecciona un tipo de interés"
					required
				/>

				<PriceInput
					label="Precio estimado"
					name="stimated_price"
					bind:value={scouting.player_supposed_price as number}
					placeholder="20.000.000"
				/>

				<PriceInput
					label="Salario estimado"
					name="stimated_salary"
					bind:value={scouting.player_supposed_salary as number}
					placeholder="200.000"
				/>
			</div>
		</AppForm>
	</div>
</section>
