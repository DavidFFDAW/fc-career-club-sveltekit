<script lang="ts">
	import AppForm from '$lib/components/forms/app-form.svelte';
	import AdminNoList from '$lib/components/visuals/admin-no-list.svelte';
	import AdminUpsertDialog from '$lib/components/visuals/admin-upsert-dialog.svelte';
	import UpsertAnnouncement from '../announcements/upsert-announcement.svelte';

	export let data;
	let openDialog: boolean = false;
	const toggleDialog = () => (openDialog = !openDialog);
</script>

<div class="page-players-container">
	<header class="title">
		<h1>Blog Posts</h1>
		<small>Gestiona los posts del blog de tu club</small>
	</header>

	<AdminUpsertDialog bind:openDialog title="Nuevo anuncio oficial" buttonText="Crear anuncio">
		<AppForm afterSubmit={toggleDialog}>
			<UpsertAnnouncement />
		</AppForm>
	</AdminUpsertDialog>

	<AdminNoList list={data.posts} text="No hay anuncios oficiales disponibles">
		<ul class="w1 flex column astart post-list gap-medium">
			{#each data.posts as post}
				<li class="w1 post-item" data-thumbnail={post.thumbnail}>
					<img src={post.thumbnail} alt="Miniatura del post" />
					<div class="row">
						<div class="title">
							<h2>{post.title}</h2>
							<small class="slug">{post.slug}</small>
						</div>
						<p class="excerpt">{post.excerpt}</p>
					</div>

                    <div class="button-group">
                        <a type="button" href="{data.url.path}/update/{post.slug}?slug={post.slug}" class="btn small warn" aria-label="Editar">
                            <i class="bi bi-pencil"></i>
                        </a>
                        <button type="button" class="btn small danger" aria-label="Eliminar">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
				</li>
			{/each}
		</ul>
	</AdminNoList>
</div>

<style>
    .post-list {
        margin-top: 20px;
    }
    .post-list .post-item {
        position: relative;
        display: flex;
        background-color: #fff;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 14px;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
        gap: 1rem;
    }

    .post-list .post-item img {
        width: 100%;
        max-width: 120px;
        height: auto;
        max-height: 120px;
        border-radius: 0.5rem;
    }

    .post-list .post-item .button-group {
        position: absolute;
        top: 5px;
        right: 10px;
        display: flex;
        gap: 4px;
    }

</style>