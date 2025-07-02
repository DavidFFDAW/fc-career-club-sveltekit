<script lang="ts">
	import Dialog from './dialog/dialog.svelte';

	export let openDialog: boolean = false;
	export let title: string = 'Añadir resource';
	export let buttonText: string = 'Añadir';

	const toggleDialog = () => {
		openDialog = !openDialog;
	};
</script>

<div class="w1 flex end acenter">
	<button type="button" on:click={toggleDialog} class="btn cta icon">
		<i class="bi bi-plus"></i>
		<span class="text">{buttonText}</span>
	</button>
</div>

<Dialog {title} minwidth={700} bind:opened={openDialog}>
	<slot></slot>
</Dialog>
