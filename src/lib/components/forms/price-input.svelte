<script lang="ts">
	export let label: string;
	export let name: string;
	export let value: number | undefined = undefined;
</script>

<div class="w1 form-item app-form-item">
	<label class="input-item label-input-container">
		<span class="label">
			{label}
			{#if $$restProps.required}
				<strong class="required"> * </strong>
			{/if}
		</span>
		<input
			type="number"
			{name}
			{...$$restProps}
			bind:value
			min="0"
			step="0.01"
			class="price-input"
			placeholder="0.00"
		/>
		<p>
			{value?.toLocaleString('es-ES', {
				style: 'currency',
				currency: 'EUR',
				minimumFractionDigits: 0
			})}
		</p>
	</label>
</div>
