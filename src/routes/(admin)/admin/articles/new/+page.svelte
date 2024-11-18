<script lang="ts">
	import ArticleForm from '../../article-form.svelte';
	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};

	const { data }: Props = $props();
</script>

<!-- Main container with gradient background -->
<div class="relative min-h-screen w-full">
	<!-- Background container that grows with content -->
	<div class="absolute inset-0 min-h-full w-full">
		<!-- Main gradient background - now stretches vertically -->
		<div
			class="absolute inset-0 h-[200%] bg-gradient-to-br from-blue-500/30 via-purple-500/25 to-pink-500/30
			dark:from-blue-900/50 dark:via-purple-800/40 dark:to-pink-900/50"
		></div>

		<!-- Accent gradients -->
		<div
			class="absolute inset-0 h-[200%] bg-gradient-to-tr from-transparent via-yellow-300/20 to-orange-400/30
			dark:via-yellow-700/10 dark:to-orange-800/20"
		></div>
	</div>

	<!-- Content container -->
	<div class="relative w-full px-4 py-12 sm:px-6 lg:px-8">
		<div class="rounded-xl bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
			<h1 class="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">Crear Nuevo Artículo</h1>
			<ArticleForm tags={data.tags} />
		</div>
	</div>
</div>

<style>
	:global(html, body) {
		min-height: 100vh;
	}

	:global(body > div) {
		min-height: 100vh;
	}
</style>
