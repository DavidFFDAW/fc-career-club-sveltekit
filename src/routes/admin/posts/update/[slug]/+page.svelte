<script lang="ts">
	import AppForm from '$lib/components/forms/app-form.svelte';
	import Ckeditor from '$lib/components/forms/editor/ckeditor.svelte';
	import InputImage from '$lib/components/forms/input-image.svelte';
	import RadioList from '$lib/components/forms/radio-list.svelte';

	export let data;
</script>

<header>
	<h1>Editar post</h1>
</header>

{#if data.post}
	<article class="w1 post down">
		<AppForm redirect="/admin/posts" method="post" updateId={data.post.id}>
			<div class="w1 flex between two-columns gap-small responsive">
				<div class="box first-column box-column">
					<div class="w1 flex between acenter gap-smaller form-row-items responsive">
						<label class="form-item labeled">
							<span class="label">Título <strong class="required">*</strong></span>
							<input type="text" name="title" bind:value={data.post.title} required />
						</label>

						<label class="form-item labeled">
							<span class="label">Slug</span>
							<input type="text" name="slug-title" bind:value={data.post.slug} required />
						</label>
					</div>

					<label class="form-item labeled">
						<span class="label">Autor</span>
						<input type="text" name="author" bind:value={data.post.author} />
					</label>

					<InputImage
						name="thumbnail"
						label="Imagen destacada"
						bind:value={data.post.thumbnail as string}
						accept="image/*"
					/>

					<Ckeditor name="content" label="Contenido" bind:value={data.post.content} required />
				</div>

				<div class="box second-column box-column">
					<label class="form-item labeled">
						<span class="label">Categoría</span>
						<input type="text" name="category" bind:value={data.post.category} />
					</label>

					<RadioList
						label="Estado"
						name="status"
						options={[
							{ value: true, label: 'Publicado' },
							{ value: false, label: 'Borrador' },
						]}
						bind:value={data.post.published}
					/>

					<label class="form-item labeled">
						<span class="label">Resumen</span>
						<textarea name="excerpt" rows="8" class="input" bind:value={data.post.excerpt} required
						></textarea>
					</label>
				</div>
			</div>
		</AppForm>
	</article>
{/if}

<style>
	.form-row-items .form-item {
		flex: 1;
		width: 50%;
	}
	.box {
		overflow: hidden;
	}
	.two-columns {
		align-items: flex-start;
		/* align-items: unset; */
	}
	.box-column {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
	.first-column {
		width: 70%;
	}
	.second-column {
		width: 30%;
	}

	@media only screen and (max-width: 968px) {
		.two-columns {
			flex-direction: column;
			align-items: center;
		}
		.first-column {
			width: 100%;
		}
		.second-column {
			width: 100%;
		}
	}
</style>
