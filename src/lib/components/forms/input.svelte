<script lang="ts">
	export let label: string;
	export let name: string;
	export let datalist: string[] | null = null;
</script>

<div class="w1 form-item app-form-item">
	{#if datalist}
		<datalist id="{name}-datalist">
			{#each datalist as value}
				<option value={value} label="{value}"></option>
			{/each}
		</datalist>
	{/if}

	<label class="input-item label-input-container">
		<span class="label">
			{label}
			{#if $$restProps.required}
				<strong class="required"> * </strong>
			{/if}
		</span>

		{#if $$restProps.type === 'textarea'}
			<textarea {name} {...$$restProps}></textarea>
		{:else if $$restProps.type === 'select'}
			<select {name} {...$$restProps}>
				{#each $$restProps.options as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		{:else}
			<input {name} {...$$restProps} list="{name}-datalist" />
		{/if}

		{#if $$restProps.error}
			<span class="error">{$$restProps.error}</span>
		{/if}
	</label>
</div>