<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import type { Comment } from '$lib/types';

	type Props = {
		comment: Comment;
		updateContent: (id: number, name: string, content: string) => Promise<void>;
	};

	let { comment, updateContent }: Props = $props();

	let content = $state(comment?.content);
	let name = $state(comment?.name);

	async function handleUpdateContent() {
		if (!comment || !content) {
      throw new Error('Comment or content is missing');
    }

    if (!content || !name) {
      throw new Error('Name or content is missing');
    }

		await updateContent(comment.id, name, content);
	}
</script>

<Dialog.Root>
	<Dialog.Trigger class="text-blue-500 hover:underline">Edit</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
			<Dialog.Description class="flex flex-col gap-3">
				<Input bind:value={name} />
        <Textarea bind:value={content} />
				<Button onclick={handleUpdateContent}>Update</Button>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
