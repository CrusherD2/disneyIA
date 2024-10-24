<script lang="ts">
	import type { PageData } from './$types';
	import ArticleForm from './article-form.svelte';

	let { articles }: PageData = $props();
</script>

<section class="container">
	<h1>Admin Page</h1>
	<p>This is an admin page.</p>

	<ArticleForm />
</section>
