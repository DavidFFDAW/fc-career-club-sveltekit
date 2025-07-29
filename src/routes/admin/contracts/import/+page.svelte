<script lang="ts">
	import Debug from '$lib/components/debug/debug.svelte';
	import AppForm from '$lib/components/forms/app-form.svelte';
	import Input from '$lib/components/forms/input.svelte';
	import PriceInput from '$lib/components/forms/price-input.svelte';
	import Droppable from '$lib/components/visuals/droppable/droppable.svelte';
	import { playerRoles } from '$lib/constants/players.js';
	import { readCsvContent, readFile, type CSVDatas } from '$lib/utils/general.utils';
	export let data;

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

	$: console.log('data:', data);
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

	<AppForm method="post" reset={false}>
		<div class="w1 flex column gap-medium">
			{#if csvDatas.datas.length > 0}
				{#each csvDatas.datas as contract}
					<div class="w1 csv-data csv-data-card card">
						<h3>Contrato de {contract['player_name']}</h3>

						<div class="w1 flex total start astart gap-small">
							<div class="first-column">
								<input type="hidden" name="player_id[]" value={contract['player_id'] || ''} />
								<input type="hidden" name="player_name[]" value={contract['player_name'] || ''} />

								<Input
									label="Duración del contrato (años)"
									value={contract['duration'] || ''}
									name="duration[]"
									placeholder="Duración del contrato"
									type="number"
								/>

								<label class="form-item">
									<span class="label">Rol</span>
									<select name="role[]" bind:value={contract['role']} class="input">
										<option value="" disabled selected>Selecciona un rol</option>
										{#each playerRoles as role}
											<option value={role}>{role}</option>
										{/each}
									</select>
								</label>
							</div>

							<div class="second-column economical-column">
								<PriceInput
									label="Salario"
									value={Number(contract['salary']) || undefined}
									name="salary[]"
									placeholder="Salario del jugador"
									type="number"
								/>

								<PriceInput
									label="Precio de traspaso"
									value={Number(contract['price']) || undefined}
									name="price[]"
									placeholder="Precio de traspaso"
									type="number"
								/>

								<Input
									label="Porcentaje de precio"
									value={contract['price_percentage'] || ''}
									name="price_percentage[]"
									placeholder="Porcentaje del precio"
									type="number"
								/>

								<PriceInput
									label="Cláusula de rescisión"
									value={Number(contract['termination_clause']) || undefined}
									name="termination_clause[]"
									placeholder="Cláusula de rescisión"
									type="number"
								/>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</AppForm>
</section>
