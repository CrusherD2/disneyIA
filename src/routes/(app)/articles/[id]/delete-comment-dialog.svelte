<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import type { Comment } from '$lib/types';

	type Props = {
		comment: Comment;
		deleteComment: (id: number) => Promise<void>;
		class: string;
	};

	const { comment, deleteComment, class: className }: Props = $props();

	async function handleDeleteComment() {
		if (!comment || !comment.id) return;
		await deleteComment(comment.id);
	}
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger class="text-red-500 hover:underline">Delete</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action on:click={handleDeleteComment}>Continue</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
