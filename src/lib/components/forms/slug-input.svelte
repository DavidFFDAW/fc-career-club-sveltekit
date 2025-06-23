<script lang="ts">
	import { slugify } from '$lib/utils/general.utils';

	export let name: string;
	export let label: string = 'Slug';
	export let value: string = '';
	export let slug: string = '';

	$: slug = slugify(value);
</script>

<div class="w1 form-item app-form-item">
	<label class="input-item label-input-container">
		<span class="label">{label}</span>
		<div class="w1 flex acenter nogap responsive">
			<input type="text" class="slug-input" bind:value {...$$restProps} {name} />
			<input type="hidden" name="{name}-slug" value={slug} />
			<span class="slug-preview">{slug}</span>
		</div>
	</label>
</div>

<style>
	.slug-input {
		max-height: 40px;
		height: 40px;
		border-radius: 4px 0 0 4px;
		border-right: none;
	}
	.slug-preview {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex: 1;
		font-size: 0.875rem;
		color: #888;
		display: block;
		padding: 10px 1rem;
		border: 1px solid #ccc;
		border-radius: 0 4px 4px 0;
		background-color: #eee;
		min-height: 40px;
		max-height: 40px;
	}

	@media only screen and (max-width: 768px) {
		.slug-input {
			width: 100%;
			border-radius: 4px 4px 0 0;
			border-right: 1px solid var(--accent);
			overflow: hidden;
			border-bottom: none;
			min-height: unset;
		}
		.slug-preview {
			width: 100%;
			max-width: 100%;
			border-radius: 0 0 4px 4px;
			min-height: unset;
		}
	}
</style>
