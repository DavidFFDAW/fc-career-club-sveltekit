<script lang="ts">
	import Debug from '$lib/components/debug/debug.svelte';
	import type { CSVDatas } from '$lib/utils/general.utils';

	export let csvDatas: CSVDatas = {
		header: [],
		datas: []
	};
</script>

<div class="w1 block overflowable-table-container">
	{#if csvDatas.datas.length > 0}
		<table class="w1 table overflowable-table overflow-horizontal">
			<thead>
				<tr>
					{#each csvDatas.header as headerItem}
						<th>
							{headerItem}
							<input type="hidden" name="csv-header-item[]" value={headerItem} />
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each csvDatas.datas as dataItem}
					<tr>
						{#each Object.entries(dataItem) as [key, value]}
							<td>
								{value}
								<input type="hidden" name="{key}[]" {value} />
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>

<style>

	.overflowable-table-container {
		overflow-x: auto;
		border-radius: 8px;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		overflow: hidden;
		overflow-x: auto;
	}

	th,
	td {
		padding: 8px;
		text-align: left;
		border: 1px solid var(--accent);
		border-right: 1px solid #fff;
	}

	th:last-child {
		border-right-color: var(--accent);
	}

	th {
		background-color: var(--accent);
		color: white;
		font-weight: bold;
		text-transform: capitalize;
	}

	td {
		background-color: #fff;
		color: #333;
		border: 1px solid #ddd;
	}
</style>
