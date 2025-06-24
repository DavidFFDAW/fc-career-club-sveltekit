<script lang="ts">
	export let label: string;
	export let name: string;
	export let value: number | undefined = undefined;
</script>

<div class="w1 form-item app-form-item">
	<label class="input-item label-input-container">
		<div class="w1 labeled flex between acenter gap-smaller">
			<span class="w1 label">
				{label}
				{#if $$restProps.required}
					<strong class="required"> * </strong>
				{/if}
			</span>
			<p class="price-value">
				{value?.toLocaleString('es-ES', {
					style: 'currency',
					currency: 'EUR',
					minimumFractionDigits: 0
				})}
			</p>
		</div>
		
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
	</label>
</div>

<style>
	.price-value {
		display: block;
		height: 100%;
		font-weight: bold;
		color: #888;
	}
</style>
