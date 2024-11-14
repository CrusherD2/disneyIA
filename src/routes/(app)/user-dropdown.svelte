<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	type Props = {
		email: string;
		handleLogout: () => void;
	};

	let { email, handleLogout }: Props = $props();

	const username = email.split('@')[0];
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button>{username}</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Mi cuenta</DropdownMenu.Label>
			<DropdownMenu.Item>
				<a href="/admin">Editar artículos</a>
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item onclick={handleLogout}>Cerrar sesión</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
