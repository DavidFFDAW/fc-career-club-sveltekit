<script lang="ts">
	export let label: string = 'Imagen';
	export let value: string = 'https://placehold.co/80';
	export let name: string = 'image';
	export let smallText: string | undefined = undefined;
</script>

<div class="image-input-container">
	<img width="80" height="80" src={value} alt="input preview" class="product-image" />
	<label class="input-container form-item">
		<span class="label">{label}</span>
		{#if smallText}
			<small>{smallText}</small>
		{/if}
		<input type="text" {name} bind:value accept="image/*" required {...$$restProps} />
	</label>
</div>

<style>
	.image-input-container {
		width: 100%;
		display: flex;
		gap: 1rem;
	}
	.form-item {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0rem;
	}
</style>
