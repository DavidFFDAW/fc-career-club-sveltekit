<script lang="ts">
	import Input from '$lib/components/forms/input.svelte';
	import RadioList from '$lib/components/forms/radio-list.svelte';
	import SlugInput from '$lib/components/forms/slug-input.svelte';
</script>

<div class="w1 flex column gap-medium">
	<div class="w1 grid two-column gap-small responsive">
		<SlugInput
			label="Título"
			placeholder="Título del anuncio"
			name="title"
			maxlength={255}
			required
		/>
		<Input
			label="Autor"
			placeholder="Autor del anuncio"
			type="text"
			name="author"
			maxlength={100}
			value="Club"
			required
		/>

		<input type="hidden" name="type" value="announcement" />

		<Input
			type="text"
			maxlength={100}
			name="thumbnail"
			label="Miniatura"
			value="/images/mandarinos-announcement.jpg"
			placeholder="/images/mandarinos-announcement.jpg"
		/>

		<RadioList
			label="Publicado"
			name="published"
			value="true"
			options={[
				{ value: 'true', label: 'Sí' },
				{ value: 'false', label: 'No' }
			]}
		/>
	</div>

	<Input
		type="textarea"
		name="content"
		label="Contenido"
		placeholder="Contenido del anuncio"
		rows={8}
		required
	/>

	<Input
		type="textarea"
		name="excerpt"
		label="Resumen (preview)"
		placeholder="Resumen del anuncio"
		maxlength={1000}
		rows={5}
		required
	/>
</div>
