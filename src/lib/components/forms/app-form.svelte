<script lang="ts">
	import { enhance } from '$app/forms';
	import { customEnhance } from './custom.enhance';

	export let afterSubmit: () => void = () => {};
	export let action: string | undefined = undefined;
	export let updateId: number | string | undefined = undefined;
</script>

<form
	method="post"
	use:enhance={customEnhance(afterSubmit)}
	action={action ? `?/${action}` : ''}
	class={`${$$restProps.class} app-form`}
>
	{#if updateId}
		<input type="hidden" name="_update_id" value={updateId} />
	{/if}

	<slot />
</form>

<style>
	.error-message {
		color: #fff;
		background-color: #dc3545;
		padding: 0.5rem;
		border-radius: 0.25rem;
	}
</style>
