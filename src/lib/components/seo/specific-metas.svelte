<script lang="ts">
	const properties = $props<{
		title: string;
		description: string;
		origin: string;
		image?: string;
	}>();
	const image = properties.image || "/images/mandarinos-announcement.jpg";
</script>

<meta name="twitter:title" content={properties.title} />
<meta name="twitter:description" content={properties.description} />
<meta name="twitter:image" content={image} />

<meta property="og:title" content={properties.title} />
<meta property="og:image" itemprop="image" content={image} />
<meta property="og:description" content={properties.description} />

<meta name="title" content={properties.title} />
<meta name="description" content={properties.description} />
