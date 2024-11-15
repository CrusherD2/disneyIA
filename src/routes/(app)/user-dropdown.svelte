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
		<Button variant="ghost" class="h-8 w-8 rounded-full bg-primary/10 hover:bg-primary/20">
			<span class="text-sm font-medium">{username.charAt(0).toUpperCase()}</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Group>
			<DropdownMenu.Label>Mi cuenta</DropdownMenu.Label>
			<DropdownMenu.Item>
				<a href="/admin" class="flex w-full items-center">
					<Settings class="mr-2 h-4 w-4" />
					<span>Editar artículos</span>
				</a>
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item on:click={handleLogout} class="text-destructive focus:text-destructive">
				<LogOut class="mr-2 h-4 w-4" />
				<span>Cerrar sesión</span>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
