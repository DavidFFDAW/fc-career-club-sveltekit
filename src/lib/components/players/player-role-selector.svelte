<script lang="ts">
	import { playerRoles } from '$lib/constants/players';
	export let name: string;
	export let value: unknown = '';
</script>

<label class="form-item form-item-select">
	<span class="form-item-label label">Rol</span>
	<small class="form-item-description">Seleccione el rol del jugador.</small>
	<select {name} class="input select {$$restProps.class}" {...$$restProps} bind:value>
		<option value="" disabled selected>Seleccione un rol</option>
		{#each playerRoles as role}
			<option value={role}>{role}</option>
		{/each}
	</select>
	{#if value}
		<span class="form-item-value">Rol seleccionado: {value}</span>
	{/if}
</label>
