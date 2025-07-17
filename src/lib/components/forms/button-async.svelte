<script lang="ts">
	import { Http } from '$lib/services/http.service';
	import Toast from '$lib/services/toast.service';

	export let endpoint: string;
	export let icon: string | undefined | null = null;
	export let method: 'get' | 'post' | 'put' | 'delete' = 'post';
	export let redirect: string | undefined | null = null;
	export let confirmation: boolean = false;
	let loading: boolean = true;

	const sendRequest = async (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();

		if (confirmation && !confirm('Are you sure you want to proceed?')) return false;

		try {
			loading = true;
			const response = await Http[method](endpoint);
			console.log('Response:', response);
		} catch (error) {
			console.error('Error sending request:', error);
			return Toast.error('An error occurred while processing your request.');
		} finally {
			loading = false;
		}
	};
</script>

<button
	type="button"
	{...$$restProps}
	data-method={method}
	data-redirect={redirect}
	class="relative async-button {$$restProps.class}"
	class:loading
	on:click={sendRequest}
	disabled={loading}
>
	{#if icon}
		<i class="button-icon bi bi-{icon}" class:loading></i>
	{/if}
	{#if loading}
		<div class="spinner-container">
			<i class="button-loading-icon bi bi-hourglass-bottom"></i>
		</div>
	{/if}
	<span>
		<slot />
	</span>
</button>

<style>
	.async-button.loading {
		pointer-events: none;
		background-color: #f0f0f0;
		border: 1px solid #ccc;
		opacity: 0.5;
	}
	.async-button.loading .button-icon {
		opacity: 0.1;
	}
	.spinner-container {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transform-origin: center;
		color: #333;
	}
	.spinner-container i.button-loading-icon {
		font-size: 1rem;
		color: #333;
		animation: hourglass-spin 2.5s infinite ease-in-out; /* Animación de giro */
		transform-origin: center; /* Asegura que gire sobre su propio centro */
	}

	@keyframes hourglass-spin {
		0% {
			transform: rotate(0deg);
		}
		20% {
			/* Gira rápidamente los primeros 20% del tiempo */
			transform: rotate(180deg);
		}
		50% {
			/* Se mantiene quieto 30% del tiempo (del 20% al 50%) */
			transform: rotate(180deg);
		}
		70% {
			/* Gira rápidamente de nuevo el siguiente 20% */
			transform: rotate(360deg);
		}
		100% {
			/* Se mantiene quieto el último 30% del tiempo (del 70% al 100%) */
			transform: rotate(360deg);
		}
	}
</style>
