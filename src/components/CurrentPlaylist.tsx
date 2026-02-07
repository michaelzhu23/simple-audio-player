import { FC } from 'react';
import { Playlist, Track } from '../types';

interface CurrentPlaylistProps {
  selectedPlaylist: Playlist;
  handlePlayTrack: (
    trackIndex: number,
    track: Track,
    currentPlaylist: Playlist
  ) => void;
  audioRef: HTMLAudioElement | null;
  currentTrack: Track | null;
}

const CurrentPlaylist: FC<CurrentPlaylistProps> = ({
  selectedPlaylist,
  selectedPlaylist: { name, artist, year, tracks },
  handlePlayTrack,
  currentTrack,
}) => {
  return (
    <div className='p-2 bg-stone-800 rounded-md w-4xl'>
      <div className='bg-stone-700 mb-4 text-neutral-200 p-2 rounded-md'>
        <h1 className='text-7xl font-extrabold text-emerald-600 p-4'>{name}</h1>
        <p className='font-semibold text-neutral-300 px-4'>{artist}</p>
        <p className='font-semibold mb-4 text-neutral-300 px-4'>{year}</p>
      </div>
      <ol className='list-decimal'>
        {tracks.map((track, index) => (
          <li
            key={index}
            className={`ml-10 hover:cursor-pointer hover:bg-stone-700 rounded-md p-2 ${
              currentTrack?.url === track.url
                ? 'text-emerald-600 font-semibold'
                : 'text-neutral-50'
            }`}
            onClick={() =>
              handlePlayTrack(index, tracks[index], selectedPlaylist)
            }
          >
            {track.name}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CurrentPlaylist;
