import { useState, useRef, useEffect, FC } from 'react';
import PlaylistData from './data/playlists.json';
import PlaylistLibrary from './components/PlaylistLibrary';
import CurrentPlaylist from './components/CurrentPlaylist';
import NowPlaying from './components/NowPlaying';
import { Playlist, Track } from './types';

const App: FC = () => {
  const [playlists] = useState<Playlist[]>(PlaylistData.playlists);
  // Used for keeping track playlists being browsed by user before selecting a track to play
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>(
    playlists[0]
  );
  // Used to separately keep track of the playlist of the currently playing track so user can freely
  // select different playlists without affecting the current track/playlist
  const [nowPlayingPlaylist, setNowPlayingPlaylist] = useState<Playlist | null>(
    null
  );
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let audio = audioRef.current;

    // Initializes audioRef.current if it doesn't exist.
    if (!audio && !nowPlayingPlaylist) {
      audioRef.current = new Audio(
        selectedPlaylist.tracks[currentTrackIndex].url
      );
      audio = audioRef.current;
    }

    // Playback logic when track index changes
    if (nowPlayingPlaylist && audio) {
      const newSrc = nowPlayingPlaylist.tracks[currentTrackIndex].url;

      if (audio.src !== newSrc) {
        // Only update src when track actually changes
        audio.src = newSrc;
        audio.load();
        if (isPlaying) {
          audio.play();
        }
      }

      setCurrentTrack(nowPlayingPlaylist.tracks[currentTrackIndex]);
    }
  }, [
    currentTrackIndex,
    isPlaying,
    nowPlayingPlaylist,
    selectedPlaylist.tracks,
  ]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!currentTrack) {
      setCurrentTrack(selectedPlaylist.tracks[currentTrackIndex]);
      setNowPlayingPlaylist(selectedPlaylist);
    }

    if (isPlaying && audio) audio.pause();
    else if (!isPlaying && audio) audio.play();

    setIsPlaying(!isPlaying);
  };

  const handlePlayTrack = (
    trackIndex: number,
    track: Track,
    currentPlaylist: Playlist
  ) => {
    setCurrentTrackIndex(trackIndex);
    setCurrentTrack(track);
    setNowPlayingPlaylist(currentPlaylist);
    setIsPlaying(true);

    // Add these lines to ensure playback starts
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.load();
      audioRef.current.play();
    }
  };

  const handleNextTrack = () => {
    if (nowPlayingPlaylist) {
      setCurrentTrackIndex((prevIndex) =>
        prevIndex === nowPlayingPlaylist.tracks.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevTrack = () => {
    if (nowPlayingPlaylist) {
      setCurrentTrackIndex((prevIndex) =>
        prevIndex === 0 ? nowPlayingPlaylist.tracks.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className='bg-stone-900 h-screen p-3 flex flex-col justify-center items-center'>
      <div className='flex flex-1 gap-x-6'>
        <PlaylistLibrary
          playlists={playlists}
          setSelectedPlaylist={setSelectedPlaylist}
          nowPlayingPlaylist={nowPlayingPlaylist}
        />
        <CurrentPlaylist
          selectedPlaylist={selectedPlaylist}
          handlePlayTrack={handlePlayTrack}
          audioRef={audioRef.current}
          currentTrack={currentTrack}
        />
      </div>
      <NowPlaying
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        currentTrack={currentTrack}
        handleNextTrack={handleNextTrack}
        handlePrevTrack={handlePrevTrack}
      />
    </div>
  );
}

export default App;
