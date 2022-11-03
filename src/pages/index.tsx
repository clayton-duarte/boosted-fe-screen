import React, { useState } from "react";

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
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);

  return (
    <ul>
      {songList.songs?.map(({ title, artist, duration }, index) => (
        <SongCard
          setCurrentlyPlaying={setCurrentlyPlaying}
          lastSong={songList.songs.length - 1}
          currentlyPlaying={currentlyPlaying}
          duration={duration}
          artist={artist}
          title={title}
          key={title}
          id={index}
        />
      ))}
    </ul>
  );
}
