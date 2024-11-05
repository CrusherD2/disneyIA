<script lang="ts">
	import type { Comment } from '$lib/types';

	type Props = {
		comment: Comment;
	};

	const { comment }: Props = $props();
</script>

{#if comment}
	<div class="mb-3 flex flex-col gap-3 border border-x-0 border-t-0 border-b-black pb-3">
		<p class="text-gray-700">{comment.name}</p>
		<p class="text-gray-500">{new Date(comment.created_at).toLocaleString()}</p>
		<p class="text-gray-600">{comment.content}</p>
	</div>
{:else}
	<div>
    <p>Unable to load comment</p>
  </div>
{/if}
