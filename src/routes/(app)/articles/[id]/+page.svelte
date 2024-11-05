<script lang="ts">
	import type { PageData } from './$types';

	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import DeleteCommentDialog from './delete-comment-dialog.svelte';
	import { toast } from 'svelte-sonner';
	import EditCommentDialog from './edit-comment-dialog.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const { article, comments, supabase, user } = data;

	async function handleDeleteComment(id: number) {
		const { error } = await supabase.from('comments').delete().eq('id', id);
		if (error) {
			console.error('Error deleting comment:', error.message);
			toast.error('Error deleting comment');
			return;
		}
		toast.success('Comment deleted');
		window.location.reload();
	}

	async function handleUpdateComment(id: number, name: string, content: string) {
		const { error } = await supabase.from('comments').update({ content, name }).eq('id', id);
		if (error) {
			console.error('Error updating comment:', error.message);
			toast.error('Error updating comment');
			return;
		}
		toast.success('Comment updated');

		window.location.reload();
	}
</script>

<section class="container max-w-[767px] text-black dark:text-white">
	{#if article}
		<div
			class="mb-3 flex flex-col gap-3 border border-x-0 border-t-0 border-b-black pb-3 dark:border-b-white"
		>
			<h1 class="text-3xl">{article.title}</h1>
			<p class="text-gray-600 dark:text-gray-400">{article.summary}</p>
			<p class="text-gray-500 dark:text-gray-400">
				{new Date(article.created_at).toLocaleDateString()}
			</p>
			<p class="text-gray-700 dark:text-gray-300">By {article.author}</p>
		</div>
		<div>
			{@html article.content}
		</div>
		<div class="mt-3 flex flex-col gap-3">
			<h2 class="text-2xl">Comments</h2>
			<form class="flex flex-col justify-center gap-3" method="POST" action="?/comment">
				<div>
					<Label for="name">Name</Label>
					<Input type="text" id="name" name="name" required />
				</div>
				<div>
					<Label for="content">Comment</Label>
					<Textarea id="content" name="content" required />
				</div>
				<Button type="submit">Submit</Button>
			</form>
			{#if comments}
				{#each comments as comment}
					<div>
						<div
							class="mb-3 flex flex-col gap-3 border border-x-0 border-t-0 border-b-black pb-3 dark:border-b-white"
						>
							<div
								class="group relative flex flex-col gap-3 rounded border border-gray-300 p-2 dark:border-gray-700"
							>
								<div>
									<span class="text-gray-700 dark:text-gray-300">{comment.name}</span>
									<span class="text-gray-500 dark:text-gray-400"
										>at {new Date(comment.created_at).toLocaleString()}</span
									>
								</div>
								<hr />
								<p class="text-gray-600 dark:text-gray-300">{comment.content}</p>
								{#if user}
									<div class="absolute right-2 top-2 hidden gap-2 group-hover:flex">
										<EditCommentDialog {comment} updateContent={handleUpdateComment} />
										<DeleteCommentDialog {comment} deleteComment={handleDeleteComment} />
									</div>
								{/if}
							</div>
						</div>
					</div>
				{:else}
					<p>No comments yet</p>
				{/each}
			{:else}
				<p>Be the first to comment</p>
			{/if}
		</div>
	{:else}
		<h1>Article not found</h1>
	{/if}
</section>
