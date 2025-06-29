<script lang="ts">
	import { enhance } from '$app/forms';
	export let form: { error?: string } | undefined = undefined;
	export let action: string | undefined = undefined;
</script>

<form
	method="post"
	use:enhance
	action={action ? `/?${action}` : ''}
	class={`${$$restProps.class} app-form`}
>
	<slot />

	{#if form && form.error}
		<div class="error-message">
			<p>{form.error}</p>
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
