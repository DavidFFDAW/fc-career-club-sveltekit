<script lang='ts'>
	export let value: string = 'https://placehold.co/80';
	const randomUUID = crypto.randomUUID();
</script>

<div class="image-input-container">
	<img width="80" height="80" src={value} alt="input preview" class="product-image" />
	<div class="input-container form-item">
		<label for="image-{randomUUID}">Imagen del producto</label>
		<small>Sube una imagen del producto. Se recomienda un tamaño de 80x80px.</small>
	<label for=""></label>
		<input type="text" id="image-{randomUUID}" name="image" bind:value={value} accept="image/*" required />
	</div>
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