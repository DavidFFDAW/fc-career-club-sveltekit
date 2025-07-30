<script lang="ts">
	import AppForm from '$lib/components/forms/app-form.svelte';
	import Fieldset from '$lib/components/forms/fieldset.svelte';
	import InputImage from '$lib/components/forms/input-image.svelte';
	import Input from '$lib/components/forms/input.svelte';
	import PriceInput from '$lib/components/forms/price-input.svelte';
	import SlugInput from '$lib/components/forms/slug-input.svelte';
	import PlayerPositionSelector from '$lib/components/players/player-position-selector.svelte';
	import PlayerRoleSelector from '$lib/components/players/player-role-selector.svelte';
	import PageTitle from '$lib/components/visuals/page-title.svelte';
	import { defaultPlayerImage } from '$lib/constants/players';

	export let data;
	const player = data.scoutingCreatePlayer.scoutingPlayers;
</script>

<section class="page-create-player-from-scouting-container">
	<PageTitle
		title="Fichar jugador ojeado"
		description="Formulario para crear un nuevo jugador ojeado desde el scouting."
	/>

	<AppForm redirect="/admin/players" method="post" class="form-container">
		<div class="w1 flex column gap-medium responsive down">
			<div class="box">
				<Fieldset legend="Información del jugador">
					<div class="w1 flex column gap-small responsive">
						<SlugInput
							name="name"
							label="Nombre"
							placeholder="Nombre del jugador"
							value={player?.player_name || ''}
							required
						/>

						<InputImage
							name="thumbnail"
							label="Imagen del jugador"
							placeholder="URL de la imagen del jugador"
							value={defaultPlayerImage}
						/>

						<Input
							name="shirt_name"
							label="Nombre en la camiseta"
							type="text"
							placeholder="Nombre en la camiseta"
						/>
						
						<Input
							name="number"
							label="Número de camiseta"
							type="number"
							placeholder="Número de camiseta"
						/>

						<Input name="age" label="Edad" type="number" placeholder="Edad del jugador" />

						<PlayerPositionSelector name="position" required />

						<Input
							name="overall"
							label="Media del jugador"
							type="number"
							placeholder="Media del jugador"
							required
						/>

						<Input
							name="country"
							label="País del jugador"
							type="text"
							placeholder="País del jugador"
						/>

						<!-- <Input
							name="status"
							label="Estado del jugador"
							type="text"
							placeholder="Activo, Inactivo, etc."
						/> -->
					</div>
				</Fieldset>
			</div>

			<div class="box">
				<Fieldset legend="Información del contrato">
					<div class="w1 flex column gap-small responsive">
						<Input
							type="number"
							placeholder="3 años"
							name="contract_duration"
							label="Duración del contrato"
							value={3}
						/>

						<PlayerRoleSelector
							name="contract_role"
							label="Rol del jugador"
						/>

						<PriceInput
							name="contract_salary"
							label="Salario"
							placeholder="70.000"
							value={player.player_supposed_salary as number}
						/>
						<PriceInput
							name="contract_transfer_fee"
							label="Precio de traspaso"
							placeholder="20.000.000"
							value={player.player_supposed_price as number}
						/>
						<PriceInput
							name="contract_release_clause"
							label="Cláusula de rescisión"
							placeholder="85.000.000"
							value={0}
						/>
					</div>
				</Fieldset>
			</div>
		</div>
	</AppForm>
</section>
