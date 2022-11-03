import songsData from "~/data/songlist.json";

export type SongList = typeof songsData;

export type Song = SongList["songs"][number];
