<script lang="ts">
	/**
	 * Types
	 */
	import type { IPost } from '$lib/api/types/models/post';

	/**
	 * Components
	 */
	import Post from '$lib/components/feed/Post.svelte';

	export let posts: IPost[] = [];
</script>

<div class="posts">
	{#each posts as post (post.id)}
		<Post {post} />
	{/each}
</div>

<style lang="scss">
  .posts {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 500px;
  }
</style>