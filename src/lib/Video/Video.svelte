<script context="module" lang="ts">
	import videoJs from "video.js";
	import "video.js/dist/video-js.css";
	import "videojs-youtube";
	import { onMount, onDestroy } from "svelte";
	import type Player from "video.js/dist/types/player";
	import { pseudo, rewriteFullScreen } from "../../helper/fullscreen";
	import CustomElement, {
		COMPONENT_NAME,
	} from "../CustomElement/CustomElement.svelte";

	type SourceType = "video/mp4" | "video/youtube";
	export interface Source {
		src: string;
		type: SourceType;
	}
</script>

<script lang="ts">
	// video 元素
	let videoElement: HTMLVideoElement | null;
	// 使用video.js 初始化后的播放器实例
	let player: Player | null;

	export let sources: Source[];

	// 初始化播放器
	const initializePlayer = () => {
		const videoJsConfig = {
			controls: true,
			fluid: true,
			sources,
			techOrder: ["youtube"],
		};

		function playerReady(this: Player) {
			//添加自定义的元素,并传递自定义的参数
			this.addChild(COMPONENT_NAME, { ass: "1111" });
			if (!this.fsApi_.fullscreenEnabled) {
				rewriteFullScreen.call(this);
			}
		}

		return videoJs(videoElement!, videoJsConfig, playerReady);
	};

	// 清理播放器资源
	const cleanupPlayer = () => {
		if (!player) {
			return;
		}
		player.dispose();
		player = null;
	};

	//挂载
	onMount(() => {
		player = initializePlayer();
		player.muted(true);
	});

	//销毁
	onDestroy(() => {
		cleanupPlayer();
	});
</script>

<div
	class="video-container"
	class:pseudo-fullscreen={$pseudo && player?.isFullscreen()}
>
	<video bind:this={videoElement} class="video-js" playsinline>
		<track kind="captions" />
		<p class="vjs-no-js">
			要查看此视频，请启用 JavaScript，并考虑升级到支持 HTML5 视频的浏览器
		</p>
	</video>
	<CustomElement />
</div>

<style>
	.video-container {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
		position: relative;
	}

	.video-container.pseudo-fullscreen {
		position: fixed !important;
		width: 100% !important;
		height: 100% !important;
		box-sizing: border-box !important;
		min-width: 0px !important;
		max-width: none !important;
		min-height: 0px !important;
		max-height: none !important;
		transform: none !important;
		inset: 0px !important;
		margin: 0px !important;
	}
</style>
