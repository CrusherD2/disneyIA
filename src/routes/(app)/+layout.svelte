<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import Button from '$lib/components/ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Logo from '$lib/components/logo.svelte';
	import UserDropdown from './user-dropdown.svelte';
	import ThemeSwitcher from '$lib/components/theme-switcher.svelte';

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
		<a href="/">
			<Logo width={120} height={30} />
		</a>
		<ul class="flex flex-row gap-12">
			<li class="hover:underline font-bold">
				<a href="/about">About</a>
			</li>
			<li class="hover:underline font-bold">
				<a href="/contact">Contact</a>
			</li>
		</ul>
		<div class="flex items-center gap-3">
			{#if session && user && user.email}
				<UserDropdown email={user.email} {handleLogout} />
			{:else}
				<a href="/auth"> <Button>Login</Button></a>
			{/if}
			<ThemeSwitcher />
		</div>
	</nav>
</header>
<main class="mb-32">
	{@render children()}
</main>
<footer>
	<p class="text-center text-gray-500 text-sm">© 2021 Disney AI Usage Archive</p>
</footer>
