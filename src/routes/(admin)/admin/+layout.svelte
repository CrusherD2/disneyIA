<script lang="ts">
	// import type { LayoutData } from './$types';

	import Button from '$lib/components/ui/button/button.svelte';

	import * as Menubar from '$lib/components/ui/menubar';
	const { children } = $props();
</script>

<Menubar.Root>
	<Menubar.Menu>
		<Menubar.Trigger>Articles</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>
				<a href="/admin">View Articles</a>
			</Menubar.Item>
			<Menubar.Item>
				<a href="/admin/articles/new">New Article</a>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>Routes</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>
				<a href="/">Home Page</a>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>Profile</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>
				<a href="/auth/logout">Logout</a>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
<main>
	{@render children()}
</main>
