<script>
	import { data } from './stores';
	import { onMount } from 'svelte';
	import Modal from '../components/infoPane.svelte';
	import { urlFor } from './api/sanity';
	import { flip } from 'svelte/animate';
	import { slide } from 'svelte/transition';
	import { dndzone } from 'svelte-dnd-action';
	import { overrideItemIdKeyNameBeforeInitialisingDndZones } from 'svelte-dnd-action';
	overrideItemIdKeyNameBeforeInitialisingDndZones('_id');

	let events = [];
	let dataYears = [];
	for (const i in $data) {
		events.push($data[i]);
		dataYears.push($data[i].year);
	}
	let items = events.sort((a, b) => 0.5 - Math.random());
	let dropTargetStyle = {
		outline: 'none'
	};

	let orderStatus = false;
	let score = 0;
	const flipDurationMs = 300;
	let dragDisabled = false;

	function handleDndConsider(e) {
		items = e.detail.items;
	}
	function handleDndFinalize(e) {
		items = e.detail.items;
	}
	function checkTimeline() {
		let itemsYears = [];
		for (const i in items) {
			itemsYears.push(items[i].year);
		}
		if (JSON.stringify(dataYears) === JSON.stringify(itemsYears)) {
			orderStatus = true;
			dragDisabled = true;
		} else {
			orderStatus = false;
		}
		score = score + 1;
	}
	let descriptionVisible = false;
	let description = '';
	let title = '';
	let url = '';
	function showDescription(des, name, image) {
		descriptionVisible = true;
		description = des;
		title = name;
		url = image;
	}
	function hideDescription() {
		descriptionVisible = false;
		description = '';
	}
	function resetGame() {
		items = events.sort((a, b) => 0.5 - Math.random());
		dragDisabled = false;
		score = 0;
		orderStatus = false;
	}
</script>

<main id="" class="p-8 w-screen min-h-screen flex flex-col justify-start items-center h-auto">
	<header id="" class="w-full flex flex-row items-center justify-center">
		<h1
			class="text-3xl w-max mr-16 px-8 py-4 h-min rounded-full shadow-neumorphismlight-inner font-signika tracking-wider font-light border-2 border-slate-300 text-red-500 [text-shadow:0_0px_5px_rgba(236,72,153,.5)]"
		>
			Teacher Sonya's Timeline Game
		</h1>
		<div
			class="rounded-full w-32 h-32 shadow-neumorphismlight-inner border-slate-300 border-2 flex flex-col justify-center items-center"
		>
			<h3
				class="font-signika text-xl tracking-wider {!orderStatus
					? 'text-slate-600'
					: 'text-red-500 [text-shadow:0_0px_5px_rgba(236,72,153,.5)]'}"
			>
				{#if !orderStatus}
					Tries
				{:else}
					Score
				{/if}
			</h3>
			<span class="text-6xl font-signika font-extralight text-slate-400">{score}</span>
		</div>
	</header>
	<div class="my-auto w-full overflow-x-hidden py-16 relative flex flex-col items-center">
		{#if descriptionVisible}
			<div
				class="absolute top-0 left-0 right-0 bottom-0 bg-gray-100 z-50 p-8 flex flex-col"
				transition:slide|local
			>
				<button
					class="ml-auto w-16 h-16 rounded-full shadow-neumorphismlight border-2 bg-slate-100 hover:bg-slate-200 border-slate-300 text-4xl transition-all text-cyan-500 hover:text-cyan-800 [text-shadow:0_0px_25px_rgba(6,182,212,.5)]"
					on:click={hideDescription}><i class="fa-solid fa-xmark" /></button
				>
				<div id="content-wrapper" class="flex flex-row w-full pt-4">
					<img
						src={url}
						alt=""
						class="w-56 h-56 rounded-2xl object-cover aspect-square mr-4 shadow-neumorphismlight"
					/>
					<div class="flex flex-col">
						<h2
							class="text-2xl font-signika tracking-wider font-light text-red-500 [text-shadow:0_0px_5px_rgba(236,72,153,.5)]"
						>
							{title}
						</h2>
						<p class="text-base font-signika tracking-wide font-light text-slate-600">
							{description}
						</p>
					</div>
				</div>
			</div>
		{/if}
		<section
			id="timeline"
			class="flex flex-row items-start justify-start w-full py-16 overflow-x-scroll overflow-y-visible self-center scrollbar-hide shadow-neumorphismlight-inner rounded-2xl"
			use:dndzone={{ items, flipDurationMs, dropTargetStyle, dragDisabled }}
			on:consider={handleDndConsider}
			on:finalize={handleDndFinalize}
			on:finalize={() => checkTimeline()}
		>
			{#each items as item (item._id)}
				<div
					id=""
					class="w-36 h-full md:w-44 flex-shrink-0 bg-slate-100 rounded-2xl shadow-neumorphismlight mx-8 p-4 flex flex-col transition-all transform-gpu group border-2 border-slate-300 z-40 {!orderStatus
						? 'hover:bg-slate-200 hover:scale-105'
						: ''}"
					animate:flip={{ duration: flipDurationMs }}
				>
					<h3
						class="font-light font-signika text-base tracking-wider text-center text-cyan-500 h-10 mb-2 [text-shadow:0_0px_5px_rgba(6,182,212,.3)]"
					>
						{item.name}
					</h3>
					<div
						class="w-full aspect-square rounded-2xl shadow-neumorphismlight-inner flex flex-col items-center justify-center bg-slate-100 transition-all group-hover:bg-opacity-0 p-4"
					>
						<img
							src={urlFor(item.thumbnail.asset).width(200).url()}
							alt=""
							class="object-cover aspect-[4/3] rounded-2xl w-full"
						/>
						{#if orderStatus}
							<div class="mt-3">
								<h4
									class="font-signika text-base text-green-500 [text-shadow:0_0px_5px_rgba(34,197,94,.3)]"
								>
									{item.year}
								</h4>
							</div>
						{/if}
					</div>
					{#if orderStatus}
						<button
							class="bg-slate-200 text-sm rounded-2xl shadow-neumorphismlight p-1 mt-4 font-signika hover:bg-slate-100 transition-all border border-slate-300 text-red-400 hover:text-red-500 [text-shadow:0_0px_5px_rgba(236,72,153,.5)]"
							on:click={() =>
								showDescription(
									item.description,
									item.name,
									urlFor(item.thumbnail.asset).width(300).url()
								)}>Learn More</button
						>
					{/if}
				</div>
			{/each}
		</section>
		{#if orderStatus}
			<button
				class="group bg-slate-200 text-sm rounded-2xl shadow-neumorphismlight py-2 px-4 mt-4 font-signika hover:bg-slate-100 transition-all border border-slate-300 text-red-400 hover:text-red-500 [text-shadow:0_0px_5px_rgba(236,72,153,.5)]"
				on:click={() => resetGame()}><i class="fa-regular fa-rotate group-hover:rotate-90 transition-all"></i> Play Again</button
			>
		{/if}
	</div>
</main>
