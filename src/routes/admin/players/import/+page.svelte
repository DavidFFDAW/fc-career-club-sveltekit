<script lang="ts">
	import PlayerForm from '$lib/components/players/player-form.svelte';
	import type { SlugifiedPlayer } from '$lib/types/interfaces';
	import { slugify } from '$lib/utils/general.utils';

	let csv: File | null = null;
	let csvData: SlugifiedPlayer[] = [];

	const readCsvDatas = async (file: File): Promise<any[]> => {
		const text = (await file.text()).replace(/(\r\n|\n|\r)/g, '\n'); // Normalizar saltos de línea
		const rows = text.split('\n').map((row) => row.split(','));
		const realRows = rows.slice(1); // Ignorar la primera fila si es el encabezado
		csvData = realRows.map((row) => {
			const [_, name, shirt_name, slug, overall, overall_increment, number, age, position, country, status] =
				row;
			const shirtNumber = parseInt(number, 10);

			return {
				name,
				slug: slugify(slug),
				shirt_name,
				number: Number.isNaN(shirtNumber) ? 0 : shirtNumber,
				position,
				overall: parseInt(overall, 10),
				overall_increment: parseInt(overall_increment, 10),
				age: parseInt(age, 10),
				country,
				status
			};
		});

		return csvData;
	};

	const changeFiles = async (event: Event) => {
		const input = event.target as HTMLInputElement;
		csv = input.files ? input.files[0] : null;
		if (csv) {
			const data = await readCsvDatas(csv);
			console.log(data); // Aquí puedes manejar los datos leídos del CSV
		}
	};

	const dropCsv = (event: DragEvent) => {
		event.preventDefault();
		const files = event.dataTransfer?.files;
		csv = files ? files[0] : null;
	};
</script>

<div class="container">
	<h1>Importar jugadores</h1>
	<div class="dropzone down">
		<p>
			{csv
				? `Archivo seleccionado: ${csv.name}`
				: 'Arrastra y suelta un archivo CSV aquí o selecciona uno'}
		</p>
		<input
			type="file"
			accept=".csv"
			on:change|preventDefault={changeFiles}
			on:dragover|preventDefault
			on:dragenter|preventDefault
			on:dragstart|preventDefault
			on:drop|preventDefault={dropCsv}
		/>
	</div>
</div>

<form action="" method="post" class="down w1 import-form flex column start astart gap-medium">
	<header class="w1 flex between">
	<button type="submit" class="btn btn-primary" disabled={csvData.length == 0}>
		Importar jugadores
	</button>
	<a href="/api/protected/download/players/csv" download="players-template.csv" class="btn btn-secondary">
		Descargar plantilla CSV
		<i class="bi bi-download"></i>
	</a>
	</header>

	{#if csvData.length == 0}
		<p class="info">No hay datos para mostrar. Por favor, sube un archivo CSV.</p>
	{/if}

	{#if csvData.length > 0}
		<ul class="importing-players-datas w1 flex column start astart gap-medium">
			{#each csvData as player}
				<li class="w1 box player-box-item">
					<PlayerForm playerData={player} multiple />
				</li>
			{/each}
		</ul>
	{/if}

	{#if csvData.length > 0}
		<button type="submit" class="btn btn-primary" disabled={csvData.length == 0}>
			Importar jugadores
		</button>
	{/if}
</form>

<style>
	.dropzone {
		width: 100%;
		min-width: 300px;
		min-height: 200px;
		position: relative;
		border: 2px dashed #ccc;
		border-radius: 10px;
		padding: 20px;
		text-align: center;
		background-color: #f9f9f9;
		cursor: pointer;
		display: grid;
		place-items: center;
	}

	.dropzone input[type='file'] {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}
</style>
