<script lang="ts">
	import { playerPositions } from '$lib/constants/players';
	export let name: string;
	export let value: unknown = '';
</script>

<label class="form-item form-item-select">
	<span class="form-item-label label">Posición</span>
	<small class="form-item-description">Seleccione la posición del jugador.</small>
	<select {name} class="input select {$$restProps.class}" {...$$restProps} bind:value>
		<option value="" disabled selected>Seleccione una posición</option>
		{#each playerPositions as position}
			<option value={position}>{position}</option>
		{/each}
	</select>
	{#if value}
		<span class="form-item-value">Posición seleccionada: {value}</span>
	{/if}
</label>
