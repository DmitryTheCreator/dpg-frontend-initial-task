<script lang="ts">
	/**
	 * Dependence
	 */
	import PostsApi from '$lib/api/methods/posts';
	import { getReasonPhrase } from 'http-status-codes';
	import { StorageUtils } from '$lib/utils/storage';
	import { PostUtils } from '$lib/utils/post';

	/**
	 * Components
	 */
	import Feed from '$lib/components/feed/Feed.svelte';
	import Loader from '$lib/components/shared/Loader.svelte';
	import ErrorComponent from '$lib/components/shared/Error.svelte';

	/**
	 * Get Cached Posts
	 * @description Метод для получения постов из локального хранилища
	 */
	const getCachedPosts = () => StorageUtils.get("posts", []);

	/**
	 * Get Loader Message
	 * @description Метод для вывода сообщения загрузки
	 */
	const getLoaderMessage = () => getCachedPosts().length > 0 ? "Данные загружаются из кеша" : "Загрузка данных с сервера";

	/**
	 * Get Error Message
	 * @description Метод для вывода сообщения об ошибке
	 */
	const getErrorMessage = (e: Error) => getCachedPosts().length > 0 ? e : "Нет данных для отображения";

	/**
	 * Load data
	 * @description Метод для получения постов
	 */
	const loadData = async () => {
		const response = await PostsApi.getAll();
		const cachedPosts = getCachedPosts();
		
		if (!response.success) {
			if (cachedPosts.length > 0) {
				StorageUtils.set("posts", cachedPosts);
				return cachedPosts;
			}
			throw new Error(getReasonPhrase(response.data.code));
		}

		const mergedPosts = PostUtils.mergeUniquePosts(cachedPosts, response.data);
		StorageUtils.set("posts", mergedPosts);
		return mergedPosts;
	};

</script>

{#await loadData()}
	<Loader>{getLoaderMessage()}</Loader>
{:then posts}
	<Feed {posts} />
{:catch e}
	<ErrorComponent>{getErrorMessage(e)}</ErrorComponent>
{/await}
