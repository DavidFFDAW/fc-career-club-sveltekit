<script lang="ts">
	export let name: string;
	export let label: string;
	export let value: string | number | boolean | undefined = undefined;
	export let options: { value: string | boolean | number; label: string }[] = [];
</script>

<div class="w1 form-item app-form-item radio-check-item">
	<span class="label">
		{label}
		{#if $$restProps.required}
			<strong class="required"> * </strong>
		{/if}
	</span>
	<div class="flex total wrap">
		{#each options as option}
			<label class="unlabel relative">
				<input type="radio" {name} value={option.value} bind:group={value} {...$$restProps} />
				<span class="radio-label-item">{option.label}</span>
			</label>
		{/each}
	</div>
</div>
