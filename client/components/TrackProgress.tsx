import React from 'react';

interface TrackProgress {
  left: number;
  right: number;
  onChange: (e) => void;
  formatValue?: boolean
}

const TrackProgress: React.FC<TrackProgress> = ({ left, right, onChange, formatValue }) => {

  const formatProgress = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Number(sec - (minutes * 60));

    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds.toFixed()}` : seconds.toFixed()}`;
  }

  const progress = formatValue
    ? `${formatProgress(left)} / ${formatProgress(right)} `
    : `${left} / ${right}`

  return (
    <div style={{ display: "flex" }}>
      <input
        type="range"
        min={0}
        max={right}
        value={left}
        onChange={onChange} />
      <div>{progress}</div>
    </div>
  );
};

export default TrackProgress;