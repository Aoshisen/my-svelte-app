<script context="module" lang="ts">
  import Progress from "./lib/Progress/Progress.svelte";
  import Video, { type Source } from "./lib/Video/Video.svelte";
</script>

<script lang="ts">
  const sources: Source[] = [
    {
      src: "https://vjs.zencdn.net/v/oceans.mp4",
      type: "video/mp4",
    },
    {
      src: "https://upselling-apps.oss-cn-shenzhen.aliyuncs.com/upselling_video/20250210/173915039050420250210-091944.mp4",
      type: "video/mp4",
    },
    // {
    //   type: "video/youtube",
    //   src: "https://www.youtube.com/watch?v=xjS6SftYQaQ",
    // },
  ];
</script>

<div class="container">
  <div class="video">
    <Video {sources} />
  </div>
  <div class="progress">
    <Progress value={2} color="blue" />
  </div>
</div>

<style>
  .container {
  }
  .container .video {
  }
  .container .progress {
    margin-top: 10px;
  }
</style>
