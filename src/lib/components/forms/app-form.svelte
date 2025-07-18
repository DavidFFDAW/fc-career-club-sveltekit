<script lang="ts">
	import { enhance } from '$app/forms';
	import { customEnhance } from './custom.enhance';

	export let showButtons: boolean = true;
	export let buttonText: string = 'Guardar';
	export let afterSubmit: () => void = () => {};
	export let action: string | undefined = undefined;
	export let redirect: string | undefined = undefined;
	export let updateId: number | string | undefined = undefined;
	export let buttonsFixed: boolean = false;
	export let reset: boolean = true;

	let loading: boolean = false;
	const setLoading = (value: boolean) => {
		loading = value;
	};
</script>

<form
	method="post"
	use:enhance={customEnhance(afterSubmit, { reset, setLoading })}
	action={action ? `?/${action}` : ''}
	data-redirect={redirect ? redirect : ''}
	class="relative {$$restProps.class} app-form"
	class:buttons-fixed={buttonsFixed}
	enctype="multipart/form-data"
>
	{#if loading}
		<div class="form-loading-overlay"></div>
	{/if}

	{#if updateId}
		<input type="hidden" name="_update_id" value={updateId} />
	{/if}

	<slot />

	{#if showButtons}
		<div class="w1 flex between gap-5 responsive down buttons-container">
			<button type="reset" disabled={loading} class="btn reset rounded responsive-w1 tcenter">
				<span class="text">Cancelar</span>
			</button>
			<button
				type="submit"
				disabled={loading}
				class="btn relative icon cta rounded responsive-w1 center"
				class:loading
			>
				<i class="bi bi-person"></i>
				<span class="text">{buttonText}</span>
				{#if loading}
					<span class="loading-spinner">
						<i class="bi bi-arrow-repeat"></i>
					</span>
				{/if}
			</button>
		</div>
	{/if}
</form>

<style>
	.btn .loading-spinner {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.btn .loading-spinner i {
		color: #333;
		font-weight: 800;
		font-size: 1.5rem;
		animation: spin 1s linear infinite;
	}

	.form-loading-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.1);
		z-index: 1000;
		display: flex;
		justify-content: center;
		align-items: center;
		backdrop-filter: blur(1px);
		pointer-events: none;
	}
	.app-form.buttons-fixed {
		margin-bottom: 20px;
	}
	.app-form.buttons-fixed .buttons-container {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		max-height: 60px;
		width: calc(100% - var(--admin-aside-width));
		margin-left: var(--admin-aside-width);
		padding: 1rem;
		background-color: #fff;
		box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
	}
	.error-message {
		color: #fff;
		background-color: #dc3545;
		padding: 0.5rem;
		border-radius: 0.25rem;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
