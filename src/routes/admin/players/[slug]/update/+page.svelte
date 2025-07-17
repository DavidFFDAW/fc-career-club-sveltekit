<script lang="ts">
	import AppForm from '$lib/components/forms/app-form.svelte';
	import InputImage from '$lib/components/forms/input-image.svelte';
	import PlayerForm from '$lib/components/players/player-form.svelte';

	export let data;
	const player = data.playerUpdate.player;
</script>

<section class="admin-update-player-page">
	<header class="page-title">
		<h1>Actualizar Jugador</h1>
		<p>Modifica los detalles del jugador.</p>
	</header>

	<div class="w1 form-container down">
		<div class="w1 box player-form-container">
			<AppForm method="post" updateId={player.id} reset={false}>
				<input type="hidden" name="_action" value="update_player" />
				<input type="hidden" name="player_id" value={player.id} />

				<InputImage
					name="image"
					label="Imagen del jugador"
					bind:value={player.image as string}
					accept="image/*"
				/>
				<a
					href="https://sofifa.com/players?keyword={player.name}"
					target="_blank"
					rel="noopener noreferrer"
				>
					Obtén tu imagen aquí
				</a>
			</AppForm>
		</div>
	</div>
</section>

<style>
</style>
