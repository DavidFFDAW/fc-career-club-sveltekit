<script lang="ts">
	import AppForm from "$lib/components/forms/app-form.svelte";
	import Fieldset from "$lib/components/forms/fieldset.svelte";

    export let data;
</script>

<header>
    <h1>Editar post</h1>
</header>

{#if data.post}
	<article class="w1 post down">
        <AppForm redirect="/admin/posts" method="post" class="w1 box">
            <div class="grid-form">
                <label>
                    <span>Título</span>
                    <input type="text" name="title" bind:value={data.post.title} required />
                </label>
                <label>
                    <span>Slug</span>
                    <input type="text" name="slug" bind:value={data.post.slug} required />
                </label>
                <label>
                    <span>Contenido</span>
                    <textarea name="content" bind:value={data.post.content} required></textarea>
                </label>
            </div>
        </AppForm>
	</article>
{/if}

<style>
    .grid-form {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-gap: 1rem;
    }
</style>