<script lang="ts">
	import AppForm from '$lib/components/forms/app-form.svelte';
	import CsvDataList from '$lib/components/visuals/csv/csv-data-list.svelte';
	import ImportCsv from '$lib/components/visuals/csv/import-csv.svelte';
	import PageTitle from '$lib/components/visuals/page-title.svelte';
	import { type CSVDatas } from '$lib/utils/general.utils';

	let csvData: CSVDatas;
</script>

<section class="page-players-import-container">
	<PageTitle
		title="Importar jugadores"
		description="Sube un archivo CSV para importar múltiples jugadores a la base de datos."
	/>

	<div class="box">
		<ImportCsv bind:csvDatas={csvData} />

		<AppForm method="post" class="down w1 import-form flex column start astart gap-medium">
			<header class="w1 flex between">
				<button type="submit" class="btn btn-primary" disabled={csvData.datas.length == 0}>
					Importar jugadores
				</button>
				<a
					href="/api/protected/download/players/csv"
					download="players-template.csv"
					class="btn btn-secondary"
				>
					Descargar plantilla CSV
					<i class="bi bi-download"></i>
				</a>
			</header>

			<CsvDataList csvDatas={csvData} />
		</AppForm>
	</div>
</section>
