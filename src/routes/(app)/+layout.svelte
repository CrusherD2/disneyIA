<script lang="ts">
	import type { LayoutData } from './$types';

	const { children } = $props();
</script>

<header>
	<nav class="flex items-center justify-center py-3">
		<ul class="flex flex-row gap-12">
			<li class="hover:underline">
				<a href="/">Home</a>
			</li>
			<li class="hover:underline">
				<a href="/about">About</a>
			</li>
			<li class="hover:underline">
				<a href="/contact">Contact</a>
			</li>
		</ul>
	</nav>
</header>
<main>
	{@render children?.()}
</main>
