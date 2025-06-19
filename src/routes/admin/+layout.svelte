<script lang="ts">
	import SpecificMetas from "$lib/components/seo/specific-metas.svelte";
	import { specificGeneralMetas } from "$lib/utils/metas.utils";
</script>

<svelte:head>
	<SpecificMetas metas={specificGeneralMetas} />
</svelte:head>

<aside class="admin-aside">
	<nav class="admin-aside-navigation">
		<!-- <Navigation /> -->
	</nav>
</aside>

<div class="admin-page-container">
	<slot/>
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
</style>