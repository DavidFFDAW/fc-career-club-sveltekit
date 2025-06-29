<script>
	import '$lib/css/globals.css';
	import '$lib/css/media-queries.css';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import { slide } from 'svelte/transition';
	import CommonMetas from '$lib/components/seo/common-metas.svelte';
	import { initializePrototypeExtensions } from '$lib/prototype-extensions.js';
	import SpecificMetas from '$lib/components/seo/specific-metas.svelte';

	export let data;
	initializePrototypeExtensions();
	const year = new Date().getFullYear();
</script>

<svelte:head>
	<title>Mandarinos | {data.title || 'Club'}</title>
	<link rel="icon" href="/favicon.ico" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="canonical" href={data.url.canonical} />

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
		rel="stylesheet"
	/>

	<CommonMetas canonical={data.url.canonical} robots={data.robots} />
	{#if !data.page.isBlogPost}
		<SpecificMetas
			origin={data.url.origin}
			title={data.title}
			description="Mandarinos - Tu club de fútbol de confianza y cada día el de más gente."
		/>
	{/if}
</svelte:head>

<main class="app-main-container {data.url.route}" class:admin-page={data.page.isPageAdmin}>
	<header class="app-header flex">
		<a href="/" class="logo-icon" aria-label="Botaniq - Your plant care companion">
			<img width="50" height="50" src="/images/mandarinos.png" alt="" />
		</a>
		<p class="nunito capitalize pointer">Mandarinos S.A.D</p>
	</header>

	{#key data.url.route}
		<div class="real-page-content" transition:slide={{ duration: 300 }}>
			<slot><!-- optional fallback --></slot>
		</div>
	{/key}

	<!-- <footer class="app-footer flex">
		<p>Mandarinos &copy; {year}</p>
	</footer> -->
</main>

<style lang="css">
	main.admin-page div.real-page-content {
		padding: 0 15px;
	}
	header {
		background: #fff;
		box-shadow: 0 0px 5px rgba(0, 0, 0, 0.1);
		padding: 1rem 2rem;
		border-bottom: 1px solid #eaeaea;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		height: 60px;
	}

	header + div.real-page-content {
		width: 100%;
		padding: 2rem 1rem 6rem 1rem;
	}

	footer {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		box-shadow: 0 0px 5px rgba(0, 0, 0, 0.1);
		padding: 1rem 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}
</style>
