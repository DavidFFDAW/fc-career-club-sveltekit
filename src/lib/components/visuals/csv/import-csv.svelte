<script lang="ts">
	import { GeneralUtils, type CSVDatas } from "$lib/utils/general.utils";
	import Droppable from "../droppable/droppable.svelte";

	export let files: File[] = [];
	export let csvDatas: CSVDatas = {
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

		const text = await GeneralUtils.readFile(file, 'text');
		csvDatas = GeneralUtils.readCsvContent(text as string);
	};
</script>

<div class="w1 form">
	<Droppable multiple={false} bind:files />
	<div class="w1 flex between gap-small down">
		<p>Selected files: {files.length}</p>
		<button type="button" on:click={handleImport} class="btn warn icon">
			<i class="bi bi-file-earmark-arrow-up"></i>
			<span>Importar</span>
		</button>
	</div>
</div>
