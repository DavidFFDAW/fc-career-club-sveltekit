<script lang="ts">
	import Ckeditor from '$lib/components/forms/editor/ckeditor.svelte';
	import InputImage from '$lib/components/forms/input-image.svelte';
	import Input from '$lib/components/forms/input.svelte';
	import RadioList from '$lib/components/forms/radio-list.svelte';
	import SingleImageDropper from '$lib/components/forms/single-image-dropper.svelte';
	import SlugInput from '$lib/components/forms/slug-input.svelte';
	import type { posts } from '@prisma/client';
    
    export let post_type: 'post' | 'announcement' = 'post';
    const postText = post_type === 'post' ? 'post' : 'anuncio';
	export let post_data: posts = {
		id: 0,
		title: '',
		author: 'Club',
		thumbnail: '/images/mandarinos-announcement.jpg',
		content: '',
		excerpt: '',
		slug: '',
		published: true,
		type: post_type,
		published_at: null,
		created_at: new Date(),
		updated_at: new Date(),
		tags: null,
		category: null,
		meta_title: null,
		meta_description: null,
        meta_keywords: null
	};

    $: console.log('post_data', post_data);
    
</script>

<div class="w1 flex column gap-medium">
	<div class="w1 grid two-column gap-small responsive">
		<SlugInput
			label="Título"
			placeholder="Título del {postText}"
            bind:value={post_data.title}
			name="title"
			maxlength={255}
			required
		/>

		<Input
            type="text"
            name="author"
            label="Autor"
            placeholder="Autor del {postText}"
            bind:value={post_data.author}
            maxlength={100}
            required
        />

		<input type="hidden" name="type" value={post_type} />

        {#if post_type === 'post'}
            <InputImage
                name="thumbnail"
                label="Imagen destacada"
                bind:value={post_data.thumbnail as string}
                placeholder="URL de la miniatura del post"
            />
        {/if}

		<RadioList
			label="Publicado"
			name="published"
			bind:value={post_data.published as boolean}
            placeholder="¿Está publicado?"
			options={[
				{ value: true, label: 'Sí' },
				{ value: false, label: 'No' }
			]}
		/>
	</div>

	<Ckeditor
		name="content"
		label="Contenido"
        bind:value={post_data.content}
		placeholder="Contenido del {postText}"
		required
	/>

	<Input
		type="textarea"
		name="excerpt"
		label="Resumen (preview)"
        bind:value={post_data.excerpt as string}
		placeholder="Resumen del {postText}"
		maxlength={1000}
		rows={5}
		required
	/>
</div>
