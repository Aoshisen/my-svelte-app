<script context="module">
	import videoJs from "video.js";
	import "video.js/dist/video-js.css";
	import { onMount } from "svelte";
	import type Player from "video.js/dist/types/player";
	export const COMPONENT_NAME = "CustomElement";
</script>

<script lang="ts">
	let customEl: HTMLDivElement;
	const _Component = videoJs.getComponent("Component");
	class Comp extends _Component {
		constructor(player: Player, options: any) {
			super(player, options);
		}
		createEl() {
			return customEl!;
		}
	}
	videoJs.registerComponent(COMPONENT_NAME, Comp);
	onMount(() => {
		videoJs.registerComponent(COMPONENT_NAME, Comp);
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
