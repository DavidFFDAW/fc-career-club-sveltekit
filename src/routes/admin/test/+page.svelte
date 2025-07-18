<script lang="ts">
	import Debug from '$lib/components/debug/debug.svelte';
	import AppForm from '$lib/components/forms/app-form.svelte';
	export let data;
</script>

<section>
	<header class="page-title">
		<h1>Test Page</h1>
		<p>Testing HTTP GET request</p>
	</header>

	<!-- <Debug {data} /> -->
	<AppForm reset={false} method="post" action="" class="admin-test-form"></AppForm>
</section>
