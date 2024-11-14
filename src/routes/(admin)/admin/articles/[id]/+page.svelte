<script lang="ts">
	import ArticleForm from '../../article-form.svelte';
	import type { PageData } from './$types';

	let {
		data
	}: {
		data: PageData;
	} = $props();
</script>

<div class="px-12 py-12">
	<h1 class="mb-3 text-3xl">Edición de Artículo</h1>
	<ArticleForm article={data.article} />
</div>
