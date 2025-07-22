<script lang="ts">
	import { enhance } from '$app/forms';
	import RadioList from '$lib/components/forms/radio-list.svelte';
	let type: 'json' | 'csv' = 'json';
</script>

<section class="contracts-export flex column gap astart">
	<header class="page-title">
		<h1>Exportar Contratos</h1>
		<small>Exporta los contratos de los jugadores del equipo.</small>
	</header>

	<div class="panel">
		<RadioList
			name="type"
			label="Formato de exportación"
			bind:value={type}
			options={[
				{ value: 'json', label: 'JSON' },
				{ value: 'csv', label: 'CSV' }
			]}
		/>

		<div class="w1 flex end down">
			<a href="/admin/contracts/export/api?type={type}" class="block btn primary" target="_blank" rel="noopener noreferrer">Exportar</a>
		</div>
	</div>
</section>
