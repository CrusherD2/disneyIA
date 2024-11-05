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
			<Logo width={176} height={40} />
		</a>
		<ul class="flex flex-row gap-12">
			<li class="hover:underline">
				<a href="/about">About</a>
			</li>
			<li class="hover:underline">
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
<main>
	{@render children?.()}
</main>
