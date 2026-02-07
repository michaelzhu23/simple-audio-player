import { FC } from 'react';
import {
  PlayIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon,
} from '@heroicons/react/24/solid';
import { Track } from '../types';

interface NowPlayingProps {
  isPlaying: boolean;
  togglePlayPause: () => void;
  handleNextTrack: () => void;
  handlePrevTrack: () => void;
  currentTrack: Track | null;
}

const NowPlaying: FC<NowPlayingProps> = ({
  isPlaying,
  togglePlayPause,
  handleNextTrack,
  handlePrevTrack,
  currentTrack,
}) => {
  return (
    <div className='flex h-20 justify-center items-center'>
      <div className='w-60'>
        <p className='text-emerald-600 font-bold'>Now Playing</p>
        <p className='text-neutral-100'>{currentTrack?.name}</p>
      </div>
      <div className='w-xs flex justify-evenly'>
        <BackwardIcon
          onClick={() => handlePrevTrack()}
          className='size-10 text-neutral-100 hover:cursor-pointer hover:text-emerald-600'
        />
        {isPlaying ? (
          <PauseIcon
            onClick={() => togglePlayPause()}
            className='size-10 text-neutral-100 hover:cursor-pointer hover:text-emerald-600'
          />
        ) : (
          <PlayIcon
            onClick={() => togglePlayPause()}
            className='size-10 text-neutral-100 hover:cursor-pointer hover:text-emerald-600'
          />
        )}
        <ForwardIcon
          onClick={() => handleNextTrack()}
          className='size-10 text-neutral-100 hover:cursor-pointer hover:text-emerald-600'
        />
      </div>
    </div>
  );
};

export default NowPlaying;
