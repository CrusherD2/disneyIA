<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Settings, LogOut } from 'lucide-svelte';

	export let email: string;
	export let handleLogout: () => void;

	const username = email.split('@')[0];
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button
			variant="ghost"
			class="relative h-9 w-9 overflow-hidden rounded-full border border-gray-200/20 bg-white/75 shadow-sm backdrop-blur-lg hover:bg-gray-100/75 dark:border-gray-800/30 dark:bg-gray-950/75 dark:hover:bg-gray-900/75"
		>
			<span class="text-sm font-medium text-gray-700 dark:text-gray-300"
				>{username.charAt(0).toUpperCase()}</span
			>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content
		class="pointer-events-auto w-56 rounded-xl border border-gray-200/20 bg-white/75 p-1 shadow-lg backdrop-blur-lg transition-none dark:border-gray-800/30 dark:bg-gray-950/75 [&>*]:border-none"
	>
		<DropdownMenu.Group>
			<DropdownMenu.Label class="px-2 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400"
				>Mi cuenta</DropdownMenu.Label
			>
			<DropdownMenu.Item
				class="relative flex cursor-pointer select-none items-center rounded-lg px-2 py-1.5 text-sm outline-none transition-none hover:bg-blue-600/10 dark:hover:bg-blue-500/10"
			>
				<a href="/admin" class="flex w-full items-center text-gray-700 dark:text-gray-300">
					<Settings class="mr-2 h-4 w-4" />
					<span>Editar artículos</span>
				</a>
			</DropdownMenu.Item>
			<DropdownMenu.Separator class="my-1 h-px bg-gray-200/20 dark:bg-gray-800/30" />
			<DropdownMenu.Item
				on:click={handleLogout}
				class="relative flex cursor-pointer select-none items-center rounded-lg px-2 py-1.5 text-sm text-red-600 outline-none transition-none hover:bg-red-600/10 dark:text-red-400 dark:hover:bg-red-500/10"
			>
				<LogOut class="mr-2 h-4 w-4" />
				<span>Cerrar sesión</span>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
