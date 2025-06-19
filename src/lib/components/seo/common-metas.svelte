<script lang='ts'>
  export let canonical: string;
  export let robots: string = 'index, follow';
</script>

<!-- Twitter metas -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@pichiflus" />
<meta name="twitter:creator" content="@pichiflus" />
<meta name="twitter:url" content={canonical} />
<!-- End twitter metas -->

<meta property="og:type" content="website" />
<meta property="og:site_name" content="Mandarinos S.A.D" />
<meta property="og:url" content={canonical} />

<!-- Normal metas -->
<meta name="author" content="David Fernández Flores" />
<meta name="keywords" content="mandarinos, sad, club, esports, gaming, sveltekit, svelte" />
<meta name="short-description" content={'Mandarinos S.A.D - Club de fútbol'} />
<meta name="theme-color" content="#000000" />
<!-- End normal metas -->

<meta name="robots" content={robots} />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="application-name" content="Mandarinos S.A.D" />
<meta name="apple-mobile-web-app-title" content="Mandarinos S.A.D" />