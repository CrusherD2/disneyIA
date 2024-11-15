<script lang="ts">
	import '../app.css';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import { navigating } from '$app/stores';

	let { data, children } = $props();
	let { session, supabase } = $derived(data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<ModeWatcher />
<Toaster />
{@render children?.()}

{#if $navigating}
	{console.log('navigating:', $navigating)}
	<div
		class="fixed bottom-4 right-4 z-50 h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"
	></div>
{/if}
