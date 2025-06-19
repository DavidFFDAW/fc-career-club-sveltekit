<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto, invalidate } from '$app/navigation';
	import Icon from './icon.svelte';
	import type { ActionResult, SubmitFunction } from '@sveltejs/kit';
	import LoadingIcon from './loaders/loading-icon.svelte';
	import { browser } from '$app/environment';
	import ToastUtils from '$lib/stores/toast';

	export let open: boolean = false;
	export let title: string = 'Panel';
	export let action: string = '';
	export let method: 'get' | 'post' = 'post';
	export let updateId: number | null = null;
	export let width: number = 300;
	export let redirect: string = '';
	let loading: boolean = false;

	const toggleOpen = () => {
		open = !open;
	};

	const customEnhanceForm: SubmitFunction = ({ submitter }) => {
		loading = true;
		const submit = submitter as HTMLButtonElement;
		if (submit.disabled) return;
		
		return async ({ result, update }) => {
			setTimeout(() => {
				loading = false;
				open = false;
								
				const response = result as ActionResult & { data: { message: string } };
				const toastType = result.type === 'success' ? 'success' : 'error';
				const defaultMessage = result.type === 'success' ? 'Form submitted successfully!' : 'Form submission failed!';
				const toastMessage = response.data?.message || defaultMessage;
				ToastUtils.add(toastMessage, toastType);
			}, 800);

			await update({ reset: result.type === 'success' });
			await invalidate('');
			if (result.type === 'failure') {
				console.error('Form submission failed:', result);
				return;
			}
			if (result.type === 'success' && redirect) {
				setTimeout(() => {
					goto(redirect);
				}, 1200);
			}
		};

	};

	function checkOpenDocument(state: boolean) {
		if (!browser) return;
		const body = document.body;
		if (!body) return;

		state 
			? body.classList.add('no-scroll') 
			: body.classList.remove('no-scroll');
	}

	$: checkOpenDocument(open);
</script>

<div class="lateral-aside-overlay-wrapper">
	{#if open}
		<div class="overlay" role="presentation" on:click={toggleOpen}></div>
	{/if}
	<aside class="aside lateral-aside-container" class:open style="--width: {width}px">
		<form {method} use:enhance={customEnhanceForm} action={action ? `?/${action}` : ''}>
			{#if loading}
				<LoadingIcon />
			{/if}
			<header class="relative">
				<h2 class="title">{title}</h2>
				<button type="button" class="btn close" on:click={toggleOpen}>
					<Icon icon="x" />
				</button>
			</header>

			{#if updateId}
				<input type="hidden" name="_id" value={updateId} />
			{/if}
			{#if redirect}
				<input type="hidden" name="_redirect" value={redirect} />
			{/if}

			<div class="aside-content">
				<slot />
			</div>

			<div class="form-submitters flex between acenter gap-small">
				<button type="reset" class="btn light" on:click={toggleOpen}> Cancelar </button>
				<button type="submit" class="btn primary iconed">
					<Icon icon="check" /> Guardar
				</button>
			</div>
		</form>
	</aside>
</div>

<style>
	.aside.lateral-aside-container form {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.aside.lateral-aside-container {
		position: fixed;
		min-width: 300px;
		width: var(--width, 300px);
		top: 15px;
		bottom: 15px;
		right: 15px;
		padding: 1rem;
		transform: translateX(150%);
		background-color: #fff;
		border-radius: 8px;
		z-index: 1000;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}
	.lateral-aside-overlay-wrapper .overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}

	.aside.lateral-aside-container header {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.aside.lateral-aside-container header::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		width: 100%;
		height: 2px;
		background-color: #eee;
		transform: scaleX(1) translateX(-50%);
		transition: transform 0.3s ease-in-out;
	}

	.aside.lateral-aside-container header .btn.close {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1.5rem;
		color: #333;
	}

	.aside.lateral-aside-container.open {
		transform: translateX(0);
	}

	.aside.lateral-aside-container .aside-content {
		overflow: auto;
		max-width: 600px;
		max-height: calc(100vh - 200px);
		padding: 10px 5px;
	}
</style>
