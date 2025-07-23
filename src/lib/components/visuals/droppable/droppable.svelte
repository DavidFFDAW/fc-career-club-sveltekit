<script lang='ts'>
	import { dropImages } from "$lib/actions/dropper.actions";

  export let files: File[] = [];
  export let multiple: boolean = false;

  const handleFiles = (innerFiles: File[]) => {
	files = innerFiles;
  };
</script>

<div class="droppable-container">
	<label class="droppable droppable-input-container">
		<span>
			{#if files.length > 0}
				{files.map(file => file.name).join(', ')}
			{:else}
				<i class="bi bi-cloud-upload"></i>
				<span class="placeholder">Arrastra y suelta archivos aquí o haz clic para seleccionar</span>
			{/if}
		</span>

		<input type="file" multiple={multiple} use:dropImages={handleFiles} />
	</label>
</div>

<style>
	.droppable-container .droppable.droppable-input-container {
		min-width: 300px;
		min-height: 100px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		border: 2px dashed #ccc;
		border-radius: 8px;
		cursor: pointer;
	}

	.droppable-container .droppable.droppable-input-container input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}
</style>