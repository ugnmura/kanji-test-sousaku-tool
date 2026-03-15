<script lang="ts">
	import { onMount } from 'svelte';
	import type { Vocab } from '$lib/types';

	let vocabList: Vocab[] = [];

	onMount(() => {
		const searchParams = new URLSearchParams(window.location.search);
		vocabList = Array.from(searchParams.entries()).map(([front, back]) => ({
			front,
			back
		}));
	});
</script>

<svelte:head>
	<title>漢字テスト — 読み 答え</title>
</svelte:head>

<div class="p-4">
	<h2 class="text-lg font-semibold mb-3">漢字テスト（読み）— 答え</h2>
	<table class="w-full border-collapse">
		<thead>
			<tr>
				<th class="border border-gray-600 px-3 py-2 text-left font-medium">書き</th>
				<th class="border border-gray-600 px-3 py-2 text-left font-medium">読み</th>
			</tr>
		</thead>
		<tbody>
			{#each vocabList as { front, back }}
				<tr>
					<td class="border border-gray-600 px-3 py-3 whitespace-nowrap w-0">{front}</td>
					<td class="border border-gray-600 px-3 py-3 w-full text-red-600">{back}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
