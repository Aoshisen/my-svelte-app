<script lang="ts">
  import videoJs from "video.js";
  import "video.js/dist/video-js.css";
  import { onMount, onDestroy } from "svelte";
  import type Player from "video.js/dist/types/player";
  import { pseudo, rewriteFullScreen } from "./helper/fullscreen";
  import CustomElement from "./lib/ CustomElement/CustomElement.svelte";

  let videoElement: HTMLVideoElement;
  let player: Player | null;

  // 定义 Video.js 播放器配置
  const sources = [
    {
      src: "https://vjs.zencdn.net/v/oceans.mp4",
      type: "video/mp4",
    },
  ];

  const videoJsConfig = {
    controls: true,
    fluid: true,
    sources,
  };

  function playerReady(this: Player) {
    //添加自定义的元素
    this.addChild("CustomElement", { ass: "1111" });
    //重写fullscreen方法
    if (!this.fsApi_.fullscreenEnabled) {
      rewriteFullScreen.call(this);
    }
  }

  // 初始化播放器
  const initializePlayer = () => {
    player = videoJs(videoElement, videoJsConfig, playerReady);
  };

  // 清理播放器资源
  const cleanupPlayer = () => {
    if (player) {
      player.dispose();
      player = null;
    }
  };

  onMount(() => {
    initializePlayer();

    player?.muted(true);
  });

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
