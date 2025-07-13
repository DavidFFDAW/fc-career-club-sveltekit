<script lang="ts">
	import { enhance } from '$app/forms';
	import { customEnhance } from './custom.enhance';

	export let showButtons: boolean = true;
	export let buttonText: string = 'Guardar';
	export let afterSubmit: () => void = () => {};
	export let action: string | undefined = undefined;
	export let updateId: number | string | undefined = undefined;
</script>

<form
	method="post"
	use:enhance={customEnhance(afterSubmit)}
	action={action ? `?/${action}` : ''}
	class={`${$$restProps.class} app-form`}
	enctype="multipart/form-data"
>
	{#if updateId}
		<input type="hidden" name="_update_id" value={updateId} />
	{/if}

	<slot />

	{#if showButtons}
		<div class="w1 flex between gap-5 responsive down">
			<button type="reset" class="btn reset rounded responsive-w1 tcenter">
				<span class="text">Cancelar</span>
			</button>
			<button type="submit" class="btn icon cta rounded responsive-w1 center">
				<i class="bi bi-person"></i>
				<span class="text">{buttonText}</span>
			</button>
		</div>
	{/if}
</form>

<style>
	.error-message {
		color: #fff;
		background-color: #dc3545;
		padding: 0.5rem;
		border-radius: 0.25rem;
	}
</style>
