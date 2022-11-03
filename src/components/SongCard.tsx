import React, { useEffect, useMemo, useState, useRef, Dispatch } from "react";
import { FiPlay, FiPause, FiSkipBack, FiSkipForward } from "react-icons/fi";
import { Duration } from "luxon";

import { Song } from "~/typings";

type SongCardProps = Song & {
  id: number;
  setCurrentlyPlaying: Dispatch<number | null>;
  currentlyPlaying?: number | null;
  lastSong: number;
};

export default function SongCard({
  setCurrentlyPlaying,
  currentlyPlaying,
  lastSong,
  duration,
  artist,
  title,
  id,
}: SongCardProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [played, setPlayed] = useState(0);

  const isPlaying = useMemo(
    () => currentlyPlaying === id,
    [currentlyPlaying, id]
  );

  const formattedDuration = useMemo(() => {
    return Duration.fromObject({ seconds: duration }).toFormat("mm:ss");
  }, [duration]);

  const formattedPlayed = useMemo(() => {
    return Duration.fromObject({ seconds: played }).toFormat("mm:ss");
  }, [played]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setPlayed((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      // cleanup
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    if (currentlyPlaying != null && played > duration) {
      timerRef.current && clearInterval(timerRef.current); // stop timer
      setCurrentlyPlaying(currentlyPlaying + 1); // play next
      setPlayed(0); // reset played
    }
  }, [currentlyPlaying, setCurrentlyPlaying, played, duration]);

  return (
    <li>
      <div>
        <button
          disabled={id === 0}
          onClick={() => {
            const prevSongId = id - 1;
            if (prevSongId >= 0) return setCurrentlyPlaying(prevSongId);
            return setCurrentlyPlaying(null);
          }}
        >
          <FiSkipBack />
        </button>
        {isPlaying ? (
          <button onClick={() => setCurrentlyPlaying(null)}>
            <FiPause />
          </button>
        ) : (
          <button onClick={() => setCurrentlyPlaying(id)}>
            <FiPlay />
          </button>
        )}
        <button
          disabled={id === lastSong}
          onClick={() => {
            const prevSongId = id + 1;
            if (prevSongId <= lastSong) return setCurrentlyPlaying(prevSongId);
            return setCurrentlyPlaying(null);
          }}
        >
          <FiSkipForward />
        </button>
      </div>
      <h2>{title}</h2>
      <h3>{artist}</h3>
      <input
        onChange={(e) => setPlayed(Number(e.target.value))}
        value={played}
        max={duration}
        type="range"
        id="track"
        step={1}
        min={0}
      />
      <p>
        {formattedPlayed}/{formattedDuration}
      </p>
    </li>
  );
}
