<script context="module">
	import { data } from './stores';
	export async function load({ fetch }) {
		const response = await fetch('/api/sanity');
		if (response.ok) {
			data.set(await response.json());
		}
		return [];
	}
</script>

<script>
	import '../app.css';
</script>

<svelte:head>
	<link rel="preconnect" href="https://api.fonts.coollabs.io" />
	<link href="https://api.fonts.coollabs.io/css2?family=Signika&display=swap" rel="stylesheet" />
	<script src="https://kit.fontawesome.com/58020331f1.js" crossorigin="anonymous"></script>
</svelte:head>
<slot />

<style>
	:global(body) {
		@apply bg-gray-100;
	}
</style>
