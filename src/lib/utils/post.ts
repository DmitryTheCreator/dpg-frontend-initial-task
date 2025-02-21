/**
 * Dependence Types
 */
import type { IPost } from '$lib/api/types/models/post';

/**
 * Interface of post utils
 */
export interface PostUtils {
/**
 * Merge posts
 * @param {IPost[] | []} oldPosts - Array of old posts
 * @param {IPost[]} newPosts - Array of new posts
 * @returns {IPost[]} - Resulting string of merged posts without duplicates
 */
	mergeUniquePosts(oldPosts: IPost[] | [], newPosts: IPost[]): IPost[];
}

/**
 * Post utils
 * @type {PostUtils}
 */
export const PostUtils: PostUtils = {} as PostUtils;

/**
 * Merge posts
 * @param {IPost[] | []} oldPosts - Array of old posts
 * @param {IPost[]} newPosts - Array of new posts
 * @returns {IPost[]} - Resulting string of merged posts without duplicates
 */
PostUtils.mergeUniquePosts = function (oldPosts: IPost[] | [], newPosts: IPost[]): IPost[] {
  if (oldPosts.length === 0) {
    return newPosts;
  }

	const uniqueNewPosts: IPost[] = newPosts.filter(
		(post) => !oldPosts.some((oldPost) => oldPost.id === post.id)
	);

	return [...oldPosts, ...uniqueNewPosts];
};
