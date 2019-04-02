import zipObject from "lodash/zipObject";

const sources = [
  "youtu.be",
  "www.youtu.be",
  "youtube.com",
  "www.youtube.com",
  "soundcloud.com",
  "www.soundcloud.com"
];

const playableSources = zipObject(sources, sources);

export function isPostPlayable(postUrl) {
  const host = new URL(postUrl).host;
  return Boolean(playableSources[host]);
}
