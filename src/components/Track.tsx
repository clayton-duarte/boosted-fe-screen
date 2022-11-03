import React, { Dispatch } from "react";

interface TrackProps {
  setPlayed: Dispatch<number>;
  duration: number;
  played: number;
}

export default function Track({ setPlayed, played, duration }: TrackProps) {
  return (
    <>
      <input
        onChange={(e) => setPlayed(Number(e.target.value))}
        value={played}
        max={duration}
        type="range"
        id="track"
        step={1}
        min={0}
      />
      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          transition: opacity 0.2s;
          border-radius: 0.25rem;
          background: #eeeeee;
          grid-area: track;
          height: 0.25rem;
          margin: 1rem 0;
          outline: none;
          opacity: 0.7;
          width: 100%;
        }

        input[type="range"]:hover {
          opacity: 1;
        }

        input[type="range"]::-webkit-slider-thumb {
          background: #dd0000;
          border-radius: 50%;
          appearance: none;
          cursor: pointer;
          height: 1rem;
          width: 1rem;
        }

        input[type="range"]::-moz-range-thumb {
          background: #dd0000;
          border-radius: 50%;
          appearance: none;
          cursor: pointer;
          height: 1rem;
          width: 1rem;
        }
      `}</style>
    </>
  );
}
