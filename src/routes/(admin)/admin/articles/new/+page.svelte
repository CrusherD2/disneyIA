<script lang="ts">
	import ArticleForm from '../../article-form.svelte';
	import type { PageData } from './$types';

	const props: PageData = $props();
</script>

<div class="container pb-12">
	<h1 class="mb-3 text-3xl">Crea un nuevo articulo</h1>
	<ArticleForm tags={props.tags} />
</div>
