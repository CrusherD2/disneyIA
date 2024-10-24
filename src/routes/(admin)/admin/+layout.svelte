<script lang="ts">
	// import type { LayoutData } from './$types';

	import Button from '$lib/components/ui/button/button.svelte';

	const { children } = $props();
</script>

<header>
	<nav class="flex flex-row items-center justify-start gap-3 px-6 py-3">
		<a href="/admin">
			<Button>Dashboard</Button>
		</a>
		<a href="/admin/articles">
			<Button>Articles</Button>
		</a>
	</nav>
</header>
{@render children()}
