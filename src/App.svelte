<script lang="ts">
  import videoJs from "video.js";
  import "video.js/dist/video-js.css";
  import { onMount, onDestroy } from "svelte";
  import type Player from "video.js/dist/types/player";

  let videoElement: HTMLVideoElement;
  let player: Player | null;
  let customEl: HTMLDivElement;

  // 定义 Video.js 播放器配置
  const videoJsConfig = {
    controls: true,
    fluid: true,
    sources: [
      {
        src: "https://vjs.zencdn.net/v/oceans.mp4",
        type: "video/mp4",
      },
    ],
  };

  // 启用伪全屏
  let pseudo = false;
  const enablePseudoFullscreen = () => {
    if (!player) {
      return;
    }
    player.isFullscreen_ = pseudo = true;
    player.el_.classList.add("vjs-fullscreen");
  };

  // 禁用伪全屏
  const disablePseudoFullscreen = () => {
    if (!player) {
      return;
    }
    player.isFullscreen_ = pseudo = false;
    player.el_.classList.remove("vjs-fullscreen");
  };

  function customRequestFullscreen(this: Player) {
    enablePseudoFullscreen();
    this.trigger("fullscreenchange");
    return Promise.resolve();
  }
  function customExitFullscreen(this: Player) {
    disablePseudoFullscreen();
    this.trigger("fullscreenchange");
    return Promise.resolve();
  }
  // 初始化播放器
  const initializePlayer = () => {
    const player = videoJs(videoElement, videoJsConfig);
    if (player.fsApi_.fullscreenEnabled) {
      return player;
    }
    player.requestFullscreen = customRequestFullscreen;
    player.exitFullscreen = customExitFullscreen;
    return player;
  };

  // 添加自定义元素到播放器
  const addCustomElementToPlayer = (el: HTMLDivElement, player: Player) => {
    return player.el().appendChild(el);
  };

  // 清理播放器资源
  const cleanupPlayer = () => {
    if (player) {
      player.dispose();
      player = null;
    }
    return null;
  };

  onMount(() => {
    player = initializePlayer();
    player.muted(true);
    addCustomElementToPlayer(customEl!, player);
  });

  onDestroy(() => {
    cleanupPlayer();
  });
</script>

<div class="video-container" class:pseudo>
  <video bind:this={videoElement} class="video-js" playsinline>
    <track kind="captions" />
    <p class="vjs-no-js">
      要查看此视频，请启用 JavaScript，并考虑升级到支持 HTML5 视频的浏览器
    </p>
  </video>
  <div class="custom-container" bind:this={customEl}>这是自定义元素内容</div>
</div>

<style>
  .video-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    position: relative;

    &.pseudo {
      object-fit: contain;
      user-select: text;
      position: fixed !important;
      box-sizing: border-box !important;
      min-width: 0px !important;
      max-width: none !important;
      min-height: 0px !important;
      max-height: none !important;
      width: 100% !important;
      height: 100% !important;
      transform: none !important;
      inset: 0px !important;
      margin: 0px !important;
    }
  }

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
