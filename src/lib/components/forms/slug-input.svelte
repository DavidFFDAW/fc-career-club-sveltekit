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
		<div class="w1 labeled flex between acenter gap-smaller">
			<span class="label">
				{label}
				{#if $$restProps.required}
					<strong class="required"> * </strong>
				{/if}
			</span>
			<p class="slug-value non-visible-scroll">
				<span class="slug-preview">{slug}</span>
			</p>
		</div>

		<input type="text" class="slug-input" bind:value {...$$restProps} {name} />
		<input type="hidden" name="slug-{name}" value={slug} />
	</label>
</div>

<style>
	.slug-value {
		width: 100%;
		max-width: 160px;
		display: block;
		font-weight: light;
		font-size: 12px;
		color: #888;
		overflow: scroll;
		white-space: nowrap;
		padding: 0 5px;
		text-align: right;
	}
	@media only screen and (max-width: 768px) {
		.slug-value {
			max-width: 200px;
		}
	}
</style>
