<script lang="ts">
	import Debug from '$lib/components/debug/debug.svelte';
	import Input from '$lib/components/forms/input.svelte';
	import Droppable from '$lib/components/visuals/droppable/droppable.svelte';
	import { readCsvContent, readFile, type CSVDatas } from '$lib/utils/general.utils';

	let files: File[] = [];
	let csvDatas: CSVDatas = {
		header: [],
		datas: []
	};

	const handleImport = async (e: Event) => {
		e.preventDefault();
		console.log('about to import', files);
		
		const file = files[0];
		if (!file) {
			alert('Por favor, selecciona un archivo CSV para importar.');
			return;
		}
		if (file.type !== 'text/csv') {
			alert('El archivo seleccionado no es un CSV válido.');
			return;
		}

		const text = await readFile(file, 'text');
		console.log(text);		
		csvDatas = readCsvContent(text as string);
	};
</script>

<section class="contracts-import-page-container">
	<header class="page-title">
		<h1>Importar Contratos</h1>
		<p>Importar csv con los datos de los contratos a importar.</p>
	</header>

	<div class="form">
		<Droppable multiple={false} bind:files />
		<p>Selected files: {files.length}</p>
		<div class="flex end gap-small">
			<button type="button" on:click={handleImport} class="btn cta icon">
				<i class="bi bi-file-earmark-arrow-up"></i>
				<span>Importar</span>
			</button>
		</div>
	</div>

	<div class="pium">
		{#if csvDatas.datas.length > 0}
			{#each csvDatas.datas as data, index}
				<div class="csv-data csv-data-card card">
					<Debug {data} />
					<Input
						label="Nombre del jugador"
						value={data['player_name'] || ''}
						name={`player_name_${index}`}
						placeholder="Nombre del jugador"
						type="text"
					/>
				</div>
			{/each}
		{/if}
	</div>
</section>
