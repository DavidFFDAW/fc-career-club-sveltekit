<script lang="ts">
	import { dropImages } from "$lib/actions/dropper.actions";
	import GeneralUtils from "$lib/utils/general.utils";

    export let width: number | undefined = undefined;
    export let height: number | undefined = undefined;
    export let label: string = 'Drop an image here';
    export let value: string | undefined = undefined;
    export let name: string;

    const handleFiles = async (files: File[]) => {
        const singleFile = files[0];
        try {
            value = await GeneralUtils.readFile(singleFile, 'dataURL') as string;
        } catch (error) {
            console.error('Error reading file:', error);
        }
    };
</script>


<div class="single-image-dropper-container" style="--width: {width ? `${width}px` : '100%'}; --height: {height ? `${height}px` : 'auto'}; --image: url({value})">
    <label class="form-item relative">
        <span class="label">{label}</span>
        <input type="file" name={name} accept="image/*" class="input" use:dropImages={handleFiles} />
        {#if value}
            <input type="hidden" name={`${name}`} value={value} />
        {/if}
    </label>
</div>

<style>
    .single-image-dropper-container {
        width: var(--width);
        height: var(--height);
        background-image: var(--image);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    .single-image-dropper-container label {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;
        height: 100%;
        position: relative;
        border: 2px dashed #ccc;
        border-radius: 8px;
        padding: 16px 8px;
    }
    
    .input[type="file"] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>