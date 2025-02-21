<script lang="ts">
	export let value = 0;
	export let max = 100;
	export let color = "#4CAF50";
	export let height = "8px";

	let progressBar: HTMLDivElement;
	let isDragging = false;

	$: percentage = Math.round((value / max) * 100);

	function startDragging(event: MouseEvent) {
		isDragging = true;
		updateProgress(event);
		window.addEventListener("mousemove", updateProgress);
		window.addEventListener("mouseup", stopDragging);
	}

	function stopDragging() {
		isDragging = false;
		window.removeEventListener("mousemove", updateProgress);
		window.removeEventListener("mouseup", stopDragging);
	}

	function updateProgress(event: MouseEvent) {
		if (!isDragging) return;
		const rect = progressBar.getBoundingClientRect();
		const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
		const newValue = Math.round((x / rect.width) * max);
		value = newValue;
	}
</script>

<svelte-css-wrapper
	style="
	--progress-height: {height};
	--progress-bar-width:{percentage}%;
	--progress-bar-background:{color};
	--progress-handle-translate-x: -{percentage}%;
	--progress-handle-left:{percentage}%;
	"
>
	<div
		class="progress-container"
		bind:this={progressBar}
		on:mousedown={startDragging}
	>
		<div class="progress-bar">
			<div class="inner" />
		</div>
		<div class="progress-handle" />
	</div>
</svelte-css-wrapper>

<style>
	.progress-container {
		position: relative;
		width: 100%;
		height: var(--progress-height);
		background-color: #e0e0e0;
		border-radius: 4px;
		cursor: pointer;
	}
	.progress-bar {
		height: 100%;
		width: 100%;
		border-radius: 4px;
		overflow: hidden;
	}

	.progress-bar .inner {
		height: 100%;
		width: var(--progress-bar-width, 0px);
		background: var(--progress-bar-background, red);
	}

	.progress-handle {
		position: absolute;
		top: 50%;
		transform: translate(var(--progress-handle-translate-x, 0), -50%);
		width: 16px;
		height: 16px;
		background-color: white;
		border-radius: 50%;
		border: 2px solid currentColor;
		cursor: grab;
		left: var(--progress-handle-left, 0);
	}

	.progress-handle:active {
		cursor: grabbing;
	}
</style>
