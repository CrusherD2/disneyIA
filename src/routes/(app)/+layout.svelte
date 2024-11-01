<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import Button from '$lib/components/ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	const { children, data }: { children: Snippet; data: LayoutData } = $props();

	const { user, session, supabase } = data;

	async function handleLogout() {
		const { error } = await supabase.auth.signOut();
		if (error) console.error('Sign out error', error.message);
		window.location.reload();
	}
</script>

<header>
	<nav class="flex items-center justify-between p-3">
		<div></div>
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
		{#if session}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Button>{user?.email}</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>My Account</DropdownMenu.Label>
						<DropdownMenu.Item>
							<a href="/admin">Dashboard</a>
						</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item onclick={handleLogout}>Log out</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{:else}
			<a href="/auth"> <Button>Login</Button></a>
		{/if}
	</nav>
</header>
<main>
	{@render children?.()}
</main>
