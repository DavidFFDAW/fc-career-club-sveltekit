<script lang="ts">
	import RadioList from "./radio-list.svelte";

	export let label: string;
	export let name: string;
	export let value: boolean = false;
</script>

<RadioList
	label={label}
	name={name}
	class="switch"
	bind:value
	options={[
		{ value: true, label: "Sí" },
		{ value: false, label: "No" }
	]}
/>