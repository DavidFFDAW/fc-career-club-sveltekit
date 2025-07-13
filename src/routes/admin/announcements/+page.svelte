<script lang="ts">
	import AppForm from "$lib/components/forms/app-form.svelte";
	import AdminNoList from "$lib/components/visuals/admin-no-list.svelte";
	import AdminUpsertDialog from "$lib/components/visuals/admin-upsert-dialog.svelte";
	import type { posts } from "@prisma/client";
	import UpsertAnnouncement from "./upsert-announcement.svelte";

	export let data;
	let openDialog: boolean = false;
    let postDatas: posts = {} as posts;
	const toggleDialog = () => openDialog = !openDialog;
    const setPost = (post: posts) => (event: MouseEvent) => {
        event.preventDefault();
        postDatas = post;
        openDialog = true;
    };

    $: isEditing = 'id' in postDatas;
</script>

<div class="page-announcements-container">
	<div class="title">
		<h1>Anuncios oficiales</h1>
		<small>Gestiona los anuncios oficiales del club.</small>
	</div>

	<AdminUpsertDialog bind:openDialog title="{isEditing ? 'Editar' : 'Nuevo'} anuncio oficial" buttonText="Crear anuncio">
		<AppForm afterSubmit={toggleDialog} updateId={isEditing ? postDatas.id : undefined}>
            <input type="hidden" name="_action" value={isEditing ? 'update' : 'create'} />
			<UpsertAnnouncement post_type="announcement" post_data={postDatas as posts} />
		</AppForm>
	</AdminUpsertDialog>

	<div class="down">
		<AdminNoList list={data.announcements} text="No hay anuncios oficiales disponibles">
			<ul class="w1 flex column astart announcement-list gap-medium">
				{#each data.announcements as announcement}
					<li class="announcement-item">
						<img src="/images/mandarinos-announcement.jpg" alt="Miniatura del anuncio" />
						<div class="row">
							<div class="title">
								<h2>{announcement.title}</h2>
								<small class="slug">{announcement.slug}</small>
							</div>
							<p class="excerpt">{announcement.excerpt}</p>
						</div>
                        
                        <button type="button" class="button" on:click={setPost(announcement)}>
                            <i class="bi bi-pencil-square"></i>
                            Editar
                        </button>
					</li>
				{/each}
			</ul>
		</AdminNoList>
	</div>
</div>

<style>
	.announcement-item {
		width: 100%;
		display: flex;
		gap: 1rem;
		padding: 1rem;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 0.5rem;
		background-color: #fff;
	}
	.announcement-item img {
		width: 100px;
		height: 100px;
		display: block;
		object-fit: cover;
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
	}

	.announcement-item .row {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.announcement-item .row .title h2 {
		margin-bottom: -6px;
	}
	.announcement-item .row .title small.slug {
		font-size: 0.85rem;
		color: #666;
		opacity: .7;
	}

</style>