<script lang="ts">
	export let numbersInUse: number[] = [];
	export let name: string = 'shirt_number';
	export let label: string = 'Número de camiseta';
	export let value: number | undefined = undefined;
	const numbers: number[] = [0, ...Array.from({ length: 50 }, (_, i) => i + 1)];
	const nonSelectedNumbers = numbers.filter((num) => !numbersInUse.includes(num));
</script>

<label class="form-item">
	<span class="label">{label}</span>
	<select {name} class="input" bind:value required {...$$restProps}>
		<option value="" disabled selected>Selecciona un número</option>
		{#each nonSelectedNumbers as number}
			<option value={number} selected={value === number}>
				{number}
			</option>
		{/each}
	</select>
</label>
