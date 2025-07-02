<script lang='ts'>
	export let list: any[] = [];
	export let text: string = 'Añadir resource';
</script>

{#if list.length > 0}
	<slot></slot>
{:else}
	<div class="w1 flex column astart gap">
		<p>{text}.</p>
	</div>
{/if}