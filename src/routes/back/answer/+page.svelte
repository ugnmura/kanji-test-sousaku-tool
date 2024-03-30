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

<div class="w-full px-8 py-4 flex flex-col items-center mt-4">
	<h2 class="text-xl mb-4">漢字テスト</h2>
	<table class="table-auto w-full border-collapse border-2 border-neutral-500">
		<thead>
			<tr>
				<th class="border-2 border-neutral-400 px-4 py-2 w-auto">読み</th>
				<th class="border-2 border-neutral-400 px-4 py-2">書き</th>
			</tr>
		</thead>
		<tbody>
			{#each vocabList as { front, back }}
				<tr>
					<td class="w-[1px] whitespace-nowrap border-2 border-neutral-400 px-4 py-2 w-auto"
						>{back}</td
					>
					<td class="w-full border-2 border-neutral-400 px-4 py-2 text-red-500">{front}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
