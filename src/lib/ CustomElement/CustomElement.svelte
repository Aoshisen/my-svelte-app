<script lang="ts">
	import videoJs from "video.js";
	import "video.js/dist/video-js.css";
	import { onMount } from "svelte";
	import type Player from "video.js/dist/types/player";

	let customEl: HTMLDivElement;

	const MyComponent = videoJs.getComponent("Component");

	class CustomElement extends MyComponent {
		constructor(player: Player, options: any) {
			console.log(options, "<<<<<<<<<");
			super(player, options);
		}
		createEl() {
			return customEl!;
		}
	}

	videoJs.registerComponent("CustomElement", CustomElement);

	onMount(() => {
		videoJs.registerComponent("CustomElement", CustomElement);
	});
</script>

<div class="custom-container" bind:this={customEl}>这是自定义元素内容</div>

<style>
	.custom-container {
		position: absolute;
		top: 20px;
		right: 20px;
		background: rgba(0, 0, 0, 0.7);
		color: white;
		padding: 10px;
		border-radius: 4px;
		z-index: 2;
		pointer-events: auto;
		touch-action: auto;
	}
</style>
