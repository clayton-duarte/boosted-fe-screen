import React from "react";

import songsData from "~/data/songlist.json";

interface PageProps {
  songList: typeof songsData;
}

export function getStaticProps() {
  return {
    props: {
      songList: songsData.songs,
    },
  };
}

export default function Home({ songList }: PageProps) {
  return (
    <div>
      {songList.songs.map(({ title, artist, duration }) => (
        <div key={title}>
          <h1>{title}</h1>
          <h2>{artist}</h2>
          <h3>{duration}</h3>
        </div>
      ))}
    </div>
  );
}
