<script lang="ts">
	import { onMount } from 'svelte';

	export let value: string = '';
	export let label: string = 'Editor';
	export let name: string = 'ckeditor';
	let textareaElement: HTMLTextAreaElement;
    let globalCkEditor: any;

	onMount(() => {
		const ckeditor = 'ClassicEditor' in window ? window.ClassicEditor : null;
		if (ckeditor && textareaElement) {
			globalCkEditor = ckeditor
				.create(textareaElement, {
                    placeholder: $$restProps.placeholder || 'Escribe aquí el contenido...',
					initialData: value,
					viewportOffset: {
						top: 50,
						bottom: 50
					}
				})
				.then((editor: any) => {
					editor.model.document.on('change:data', () => {
						value = editor.getData();
					});

                    return editor;
				});
		}
	});

    
</script>

<label class="w1 form-item app-form-item ckeditor-custom-container flex column gap-5 astart start">
	<span class="form-item-label label w1 block">{label}</span>
	<textarea bind:this={textareaElement} class="w1 input editor-textarea" readonly {name} bind:value></textarea>
</label>

<style>
	.ckeditor-custom-container .editor-textarea {
		min-height: 92px;
		border: 1px solid #ccc;
		padding: 10px;
		background: #f8f8f8;
	}
</style>
