<script lang="ts">
	import Breadcrumbs from '$lib/components/seo/breadcrumbs.svelte';
	import SpecificMetas from '$lib/components/seo/specific-metas.svelte';
	export let data;
</script>

<svelte:head>
	<SpecificMetas
		origin={data.url.origin}
		title="Administración"
		description="Panel de administración de la aplicación"
	/>
</svelte:head>

<aside class="admin-aside">
	<nav class="admin-aside-navigation">
		<!-- <Navigation /> -->
	</nav>
</aside>

<div class="admin-page-container">
	<header class="admin-breadcrumbs">
		<Breadcrumbs breadcrumbs={data.page.breadcrumbs} />
	</header>
	
	<slot />
</div>

<style>
	:root {
		--admin-aside-width: 280px;
	}
	.admin-aside {
		position: fixed;
		top: 65px;
		left: 0;
		bottom: 65px;
		border-radius: 0 12px 12px 0;
		background: #fff;
		box-shadow: 0 0px 5px rgba(0, 0, 0, 0.1);
		padding: 1rem;
		width: var(--admin-aside-width);
		z-index: 10;
		overflow-y: auto;
		overflow-x: hidden;
	}
	.admin-page-container {
		margin-left: calc(var(--admin-aside-width) - 1rem);
		padding: 1rem;
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
