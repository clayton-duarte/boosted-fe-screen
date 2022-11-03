import React, { useEffect, useMemo, useState, useRef, Dispatch } from "react";
import { Duration } from "luxon";

import Player from "~/components/Player";
import Track from "~/components/Track";
import { Song } from "~/typings";

type SongCardProps = Song & {
  id: number;
  setCurrentlyPlaying: Dispatch<number | null>;
  currentlyPlaying: number | null;
  lastSongId: number;
};

export default function SongCard({
  setCurrentlyPlaying,
  currentlyPlaying,
  lastSongId,
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
    <li id={`song-${id}`}>
      <h2>
        {title} <span>{artist}</span>
      </h2>
      <div>
        <Player
          setCurrentlyPlaying={setCurrentlyPlaying}
          currentlyPlaying={currentlyPlaying}
          lastSongId={lastSongId}
          songId={id}
        />
        <Track setPlayed={setPlayed} duration={duration} played={played} />
        <code>
          {formattedPlayed}/{formattedDuration}
        </code>
      </div>
      <style jsx>{`
        li {
          border-radius: 0.5rem;
          padding: 1rem 1.5rem;
          background: #333333;
          display: grid;
          width: 100%;
          gap: 1rem;
        }

        div {
          grid-template-columns: auto 1fr auto;
          align-items: center;
          display: grid;
          width: 100%;
          padding: 0;
          gap: 1rem;
          grid-template-areas: "player track duration";
        }

        h2 {
          grid-template-columns: auto auto 1fr;
          align-items: center;
          font-size: 1.5rem;
          display: grid;
          margin: 0;
          gap: 1rem;
        }

        span {
          font-size: 1rem;
          color: #999999;
        }

        @media (max-width: 768px) {
          h2 {
            grid-template-columns: auto;
            font-size: 1.25rem;
            gap: 0.5rem;
          }

          div {
            justify-content: space-between;
            grid-template-columns: auto auto;
            grid-template-areas:
              "track track"
              "player duration";
          }
        }
      `}</style>
    </li>
  );
}
