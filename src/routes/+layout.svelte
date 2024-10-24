<script>
	import '../app.css';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	$: ({ session, supabase } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
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
	<slot />
</main>
