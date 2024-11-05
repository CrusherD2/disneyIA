<script lang="ts">
	import type { PageData } from './$types';

	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const article = data.article;
	const comments = data.comments;
</script>

<section class="container max-w-[767px]">
	{#if article}
		<div class="mb-3 flex flex-col gap-3 border border-x-0 border-t-0 border-b-black pb-3">
			<h1 class="text-3xl">{article.title}</h1>
			<p class="text-gray-600">{article.summary}</p>
			<p class="text-gray-500">{new Date(article.created_at).toLocaleDateString()}</p>
			<p class="text-gray-700">By {article.author}</p>
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
						<div class="mb-3 flex flex-col gap-3 border border-x-0 border-t-0 border-b-black pb-3">
							<p class="text-gray-700">{comment.name}</p>
							<p class="text-gray-500">{new Date(comment.created_at).toLocaleString()}</p>
							<p class="text-gray-600">{comment.content}</p>
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
