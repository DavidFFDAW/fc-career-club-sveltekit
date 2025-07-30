<script lang="ts">
	import AppForm from '$lib/components/forms/app-form.svelte';
	import Input from '$lib/components/forms/input.svelte';
	import PriceInput from '$lib/components/forms/price-input.svelte';
	import CsvDataList from '$lib/components/visuals/csv/csv-data-list.svelte';
	import ImportCsv from '$lib/components/visuals/csv/import-csv.svelte';
	import PageTitle from '$lib/components/visuals/page-title.svelte';
	import type { Scouting } from '@prisma/client';

	let csvData = {
		header: [],
		datas: []
	};
	export let data;
</script>

<section class="page-scouting-upsert">
	<PageTitle
		title="Importar jugadores ojeados"
		description="Importa jugadores ojeados desde un archivo CSV. Asegúrate de que el formato del archivo sea correcto y contenga los campos necesarios."
	/>

	<div class="w1 flex column start astart gap">
		<ImportCsv bind:csvDatas={csvData} />

		<AppForm method="post" redirect="/admin/scouting" class="w1">
			<CsvDataList bind:csvDatas={csvData} />
		</AppForm>
	</div>
</section>
