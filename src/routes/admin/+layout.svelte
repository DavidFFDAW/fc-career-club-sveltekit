<script lang="ts">
	import Breadcrumbs from '$lib/components/seo/breadcrumbs.svelte';
	import SpecificMetas from '$lib/components/seo/specific-metas.svelte';
	import { alerts } from '$lib/stores/toast';
	export let data;
</script>

<svelte:head>
	<SpecificMetas
		origin={data.url.origin}
		title="Administración"
		description="Panel de administración de la aplicación"
	/>
    <script src="{data.url.origin}/libs/ckeditor.js"></script>
</svelte:head>

<aside class="admin-aside">
	<nav class="admin-aside-navigation w1 flex column gap-5 start aend">
		<!-- <Navigation /> -->
		<ul class="w1 admin-aside-link-list flex column gap-5 start aend">
			<li class="admin-aside-link-item">
				<a href="/admin/players">Jugadores</a>
			</li>
			<li class="admin-aside-link-item">
				<a href="/admin/scouting">Ojear jugadores</a>
			</li>
			<li class="admin-aside-link-item">
				<a href="/admin/announcements">Anuncios oficiales</a>
			</li>
			<li class="admin-aside-link-item">
				<a href="/admin/posts">Posts</a>
			</li>
		</ul>
	</nav>
</aside>

<div class="admin-page-container">
    <ul class="app-toast-container">
        {#each $alerts as alert}
            <li class={`toast toast-${alert.type}`}>
                {alert.message}
            </li>
        {/each}
    </ul>

	<header class="admin-breadcrumbs">
		<Breadcrumbs breadcrumbs={data.page.breadcrumbs} />
	</header>

	<slot />
</div>

<style>
	:root {
		--admin-aside-width: 280px;
	}

    ul.app-toast-container {
        position: fixed;
        top: 70px;
        right: 15px;
        z-index: 1000;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    ul.app-toast-container li {
        padding: 8px 15px;
        border-radius: 4px;
        color: #fff;
        font-size: 14px;
    }
    ul.app-toast-container li.toast.toast-success {
        background-color: #28a745;
    }
    ul.app-toast-container li.toast.toast-error {
        background-color: #c82333;
    }
    ul.app-toast-container li.toast.toast-warning {
        background-color: #ffc107;
    }
    ul.app-toast-container li.toast.toast-info {
        background-color: #17a2b8;
    }


	.admin-aside {
		position: fixed;
		top: 65px;
		left: 0;
		bottom: 5px;
		border-radius: 0 12px 12px 0;
		background: #fff;
		box-shadow: 0 0px 5px rgba(0, 0, 0, 0.3);
		padding: 1rem;
		width: var(--admin-aside-width);
		z-index: 10;
		overflow-y: auto;
		overflow-x: hidden;
	}
	.admin-page-container {
		margin-left: calc(var(--admin-aside-width) - 1rem);
		padding: 1rem 1rem 4rem 1rem;
	}

	@media only screen and (max-width: 768px) {
		.admin-aside {
			display: none;
		}
		.admin-page-container {
			margin-left: 0;
		}
		.admin-page-container {
			padding: 0;
		}
	}
</style>
