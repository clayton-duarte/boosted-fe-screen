import React, { Dispatch } from "react";
import { FiPlay, FiPause, FiSkipBack, FiSkipForward } from "react-icons/fi";

import IconButton from "~/components/IconButton";

interface PlayerProps {
  setCurrentlyPlaying: Dispatch<number | null>;
  currentlyPlaying: number | null;
  lastSongId: number;
  songId: number;
}

export default function Player({
  setCurrentlyPlaying,
  currentlyPlaying,
  lastSongId,
  songId,
}: PlayerProps) {
  const handlePlay = () => {
    setCurrentlyPlaying(songId);
  };

  const handlePause = () => setCurrentlyPlaying(null);

  const handleSkipBack = () => {
    const prevSongId = songId - 1;

    if (prevSongId >= 0) {
      return setCurrentlyPlaying(prevSongId);
    }

    return setCurrentlyPlaying(null);
  };

  const handleSkipForward = () => {
    const prevSongId = songId + 1;

    if (prevSongId <= lastSongId) {
      return setCurrentlyPlaying(prevSongId);
    }

    return setCurrentlyPlaying(null);
  };

  return (
    <div>
      <IconButton disabled={songId === 0} onClick={handleSkipBack}>
        <FiSkipBack />
      </IconButton>
      {songId === currentlyPlaying ? (
        <IconButton onClick={handlePause}>
          <FiPause />
        </IconButton>
      ) : (
        <IconButton onClick={handlePlay}>
          <FiPlay />
        </IconButton>
      )}
      <IconButton disabled={songId === lastSongId} onClick={handleSkipForward}>
        <FiSkipForward />
      </IconButton>
      <style jsx>{`
        div {
          grid-template-columns: repeat(3, auto);
          align-items: center;
          display: grid;
          gap: 0.25rem;
        }
      `}</style>
    </div>
  );
}
