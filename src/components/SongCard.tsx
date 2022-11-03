import React, { useMemo } from "react";
import { Duration } from "luxon";

import { Song } from "~/typings";

export default function SongCard({ title, artist, duration }: Song) {
  const formattedDuration = useMemo(() => {
    return Duration.fromObject({ seconds: duration }).toFormat("mm:ss");
  }, [duration]);

  return (
    <div>
      <h2>{title}</h2>
      <h3>{artist}</h3>
      <p>{formattedDuration}</p>
    </div>
  );
}
