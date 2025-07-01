<script lang="ts">
	let dialog: HTMLDialogElement;
	export let title: string;
	export let minwidth: number = 450;
	export let opened: boolean = false;

	const closeDialog = () => {
		dialog.close();
		opened = false;
		document.body.classList.remove('no-scroll');
	};
</script>

<dialog class="dialog" open={opened} bind:this={dialog} style="--minimumWidth: {minwidth}px;">
	<header class="w1 dialog-header-container">
		<h2>{title}</h2>
		<button on:click={closeDialog} aria-label="Close dialog" class="btn unbutton">
			<i class="bi bi-x-circle" style="color: #ddd;"></i>
		</button>
	</header>

	<div class="dialog-content">
		<slot />
	</div>
</dialog>

{#if opened}
	<div class="dialog-overlay" role="presentation" on:click={closeDialog}></div>
{/if}


<style>
	.dialog {
		min-width: var(--minimumWidth, 450px);
		padding: 20px;
		background-color: white;
		border: none;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
	.dialog[open] + .dialog-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}
	dialog::backdrop {
		display: none;
	}

	.dialog-header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}
	.dialog-header-container h2 {
		margin: 0;
		font-size: 1.5rem;
		color: var(--primary-color);
	}
	.dialog-header-container .btn.unbutton {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1.5rem;
		color: var(--secondary-color);
	}
	.dialog .dialog-content {
		padding: 10px 15px;
	}

	dialog[open] {
		display: block;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1000;
		animation: fadeIn 0.3s ease-in-out;
	}

	@media only screen and (max-width: 768px) {
		.dialog {
			min-width: 90%;
			width: 90%;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translate(-50%, -60%);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%);
		}
	}
</style>
