import { FC, Dispatch, SetStateAction } from 'react';
import { Playlist } from '../types';

interface PlaylistLibraryProps {
  playlists: Playlist[];
  setSelectedPlaylist: Dispatch<SetStateAction<Playlist>>;
  nowPlayingPlaylist: Playlist | null;
}

const PlaylistLibrary: FC<PlaylistLibraryProps> = ({
  playlists,
  setSelectedPlaylist,
  nowPlayingPlaylist,
}) => {
  return (
    <div className='p-2 max-w-md bg-stone-800 rounded-md'>
      <h2 className='font-bold text-2xl mb-2 text-emerald-600 p-2 bg-stone-700 rounded-md'>
        Playlist
      </h2>
      {playlists.map((playlist, index) => {
        const { name, artist, year } = playlist;

        return (
          <div
            key={index}
            className='hover:cursor-pointer hover:bg-stone-700 text-neutral-50 rounded-md p-2'
            onClick={() => setSelectedPlaylist(playlist)}
          >
            <h5
              className={`${
                nowPlayingPlaylist?.name === playlist.name &&
                'text-emerald-600 font-semibold'
              }`}
            >
              {name}
            </h5>
            <p className='text-neutral-400'>
              {artist} • {year}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default PlaylistLibrary;
