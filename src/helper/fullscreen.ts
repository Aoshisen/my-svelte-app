import { writable } from "svelte/store";
import type Player from "video.js/dist/types/player";

export const pseudo = writable<boolean>(false);

const enablePseudoFullscreen = (player: Player) => {
	if (!player) {
		return;
	}
	player.isFullscreen_ = true;
	pseudo.set(true)

	player.el_.classList.add("vjs-fullscreen");
};

// 禁用伪全屏
const disablePseudoFullscreen = (player: Player) => {
	if (!player) {
		return;
	}
	player.isFullscreen_ = false;
	pseudo.set(true)
	player.el_.classList.remove("vjs-fullscreen");
};

function customRequestFullscreen(this: Player) {
	enablePseudoFullscreen(this);
	this.trigger("fullscreenchange");
	return Promise.resolve();
}

function customExitFullscreen(this: Player) {
	disablePseudoFullscreen(this);
	this.trigger("fullscreenchange");
	return Promise.resolve();
}

export function rewriteFullScreen(this: Player) {
	this.requestFullscreen = customRequestFullscreen;
	this.exitFullscreen = customExitFullscreen;
}