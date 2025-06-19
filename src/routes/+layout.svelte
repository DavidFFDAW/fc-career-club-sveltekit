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
		href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
		rel="stylesheet"
	/>

	<CommonMetas canonical={data.url.canonical} robots={data.robots} />
	{#if !data.page.isBlogPost}
		<SpecificMetas origin={data.url.origin} title={data.title} description="Mandarinos - Tu club de fútbol de confianza y cada día el de más gente." />
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

	<footer class="app-footer flex">
		<p>Mandarinos &copy; {year}</p>
	</footer>
</main>

<style lang="css">
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
	header h1 {
		color: var(--green);
		font-size: 2rem;
	}

	header + div.real-page-content {
		width: 100%;
		padding: 2rem 1rem 6rem 1rem;
	}

	header .hamburger-menu {
		position: relative;
		z-index: 20;
	}
	header .hamburger-menu .menu-button {
		background: transparent;
		border: none;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	header .hamburger-menu .menu-button .bar {
		width: 2rem;
		height: 0.25rem;
		background: #355749;
		border-radius: 0.5rem;
		transition: all 0.3s ease-in-out;
	}

	header .hamburger-menu .menu-button .bar:nth-child(1) {
		transform: translateY(0);
	}
	header .hamburger-menu .menu-button .bar:nth-child(2) {
		transform: translateY(0);
	}
	header .hamburger-menu .menu-button .bar:nth-child(3) {
		transform: translateY(0);
	}
	header .hamburger-menu.open .menu-button .bar:nth-child(1) {
		transform: translateY(0.5rem) rotate(45deg);
	}
	header .hamburger-menu.open .menu-button .bar:nth-child(2) {
		opacity: 0;
		transform: translateY(0);
	}
	header .hamburger-menu.open .menu-button .bar:nth-child(3) {
		transform: translateY(-0.5rem) rotate(-45deg);
	}

	header .hamburger-menu .menu-content {
		position: absolute;
		width: 100%;
		max-width: 600px;
		min-width: 300px;
		top: calc(100% + 1rem);
		right: -2rem;
		background: #fff;
		box-shadow: 0 0px 5px rgba(0, 0, 0, 0.1);
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		transform: translateY(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.3s ease-in-out;
	}
	header .hamburger-menu.open .menu-content {
		transform: translateY(0);
		opacity: 1;
		pointer-events: all;
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

	@media only screen and (max-width: 768px) {
		header .hamburger-menu .menu-content {
			position: fixed;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			overflow: hidden;
			width: 100%;
			max-width: 100%;
			min-width: 100%;
			height: 100vh;
			/* padding: 2rem; */
			overflow-y: auto;
			z-index: 100000000000;
		}

		header .hamburger-menu .close-button-container {
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}

		header .hamburger-menu .close-button-container .btn-close {
			background: var(--green);
			border: none;
			cursor: pointer;
			padding: 2px 6px;
			font-size: 1rem;
			color: var(--white);
			border-radius: 0;
		}
		header .hamburger-menu .close-button-container .btn-close i {
			font-size: 1.5rem;
		}
	}
</style>
