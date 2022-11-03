import React, { useState, useMemo, useEffect } from "react";
import { FiShuffle } from "react-icons/fi";

import IconButton from "~/components/IconButton";
import SongCard from "~/components/SongCard";
import songList from "~/data/songlist.json";
import { Song } from "~/typings";

interface PageProps {
  songList: Song[];
}

export function getStaticProps() {
  return {
    props: {
      songList: songList.songs,
    },
  };
}

export default function Home({ songList }: PageProps) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const [shuffleList, setShuffleList] = useState<Song[]>();

  const playlist = useMemo(
    () => (shuffleList != null ? shuffleList : songList),
    [shuffleList, songList]
  );

  const handleShuffle = () => {
    if (shuffleList) {
      return setShuffleList(undefined);
    }

    const newList = [...songList];

    // Durstenfeld shuffle algorithm
    newList.forEach((_, i) => {
      const j = Math.floor(Math.random() * (i + 1));
      [newList[i], newList[j]] = [newList[j], newList[i]];
    });

    setCurrentlyPlaying(null);

    return setShuffleList(newList);
  };

  useEffect(() => {
    if (currentlyPlaying) {
      document
        .getElementById(`audio-${currentlyPlaying}`)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentlyPlaying]);

  return (
    <main>
      <header>
        <h1>My Music Player</h1>
        <IconButton onClick={handleShuffle}>
          <FiShuffle color={shuffleList == null ? "inherit" : "#dd0000"} />
        </IconButton>
      </header>
      <ul>
        {playlist.map(({ title, artist, duration }, index) => (
          <SongCard
            setCurrentlyPlaying={setCurrentlyPlaying}
            currentlyPlaying={currentlyPlaying}
            lastSongId={playlist.length - 1}
            duration={duration}
            artist={artist}
            title={title}
            key={title}
            id={index}
          />
        ))}
      </ul>
      <footer>
        <strong>Now playing: </strong>
        {currentlyPlaying != null ? (
          <span>
            {`${playlist[currentlyPlaying].title} - ${playlist[currentlyPlaying].artist}`}
          </span>
        ) : null}
      </footer>
      <style jsx>{`
        main {
          padding: 0 1rem;
        }

        header {
          grid-template-columns: auto auto 1fr;
          align-items: center;
          background: #222222;
          margin: 0 -1rem;
          position: sticky;
          padding: 1rem;
          display: grid;
          z-index: 1;
          gap: 1rem;
          top: 0;
        }

        h1 {
          display: inline;
        }

        ul {
          list-style: none;
          display: grid;
          padding: 0;
          gap: 1rem;
        }

        footer {
          grid-template-columns: auto 1fr;
          background: #222222;
          position: sticky;
          margin: 0 -1rem;
          display: grid;
          padding: 1rem;
          gap: 0.5rem;
          z-index: 1;
          bottom: 0;
        }

        @media (max-width: 768px) {
          header {
            grid-template-columns: auto auto;
            justify-content: space-between;
          }

          footer {
            grid-template-columns: auto;
          }
        }
      `}</style>
    </main>
  );
}
