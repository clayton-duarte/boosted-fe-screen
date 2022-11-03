import React from "react";

import SongCard from "~/components/SongCard";
import songsData from "~/data/songlist.json";
import { SongList } from "~/typings";

interface PageProps {
  songList: SongList;
}

export function getStaticProps() {
  return {
    props: {
      songList: songsData,
    },
  };
}

export default function Home({ songList }: PageProps) {
  return (
    <div>
      {songList.songs?.map(({ title, artist, duration }) => (
        <SongCard
          duration={duration}
          artist={artist}
          title={title}
          key={title}
        />
      ))}
    </div>
  );
}
