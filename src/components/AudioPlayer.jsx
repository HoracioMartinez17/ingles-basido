// VIEW: Reproductor de audio compacto tipo Spotify/YouTube
import { useEffect, useState, useRef } from "react";

export default function AudioPlayer({ audioUrl, phraseText }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(0.85);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const audioRef = useRef(null);

  const normalizedAudioUrl =
    audioUrl && audioUrl.startsWith("./audio/")
      ? audioUrl.replace("./audio/", "/audio/")
      : audioUrl;

  const SPEED_OPTIONS = [0.75, 0.85, 1, 1.15, 1.25];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const handlePlayPause = async () => {
    if (!normalizedAudioUrl) return;

    try {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        if (
          audioRef.current?.src !==
          new URL(normalizedAudioUrl, window.location.origin).href
        ) {
          audioRef.current.src = normalizedAudioUrl;
        }
        if (audioRef.current) {
          audioRef.current.playbackRate = playbackRate;
        }
        await audioRef.current?.play();
        setIsPlaying(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error reproduciendo audio:", error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 p-2 rounded-lg border border-blue-200 dark:border-slate-600 w-fit">
      {/* Botón Play/Pause */}
      <button
        onClick={handlePlayPause}
        disabled={!normalizedAudioUrl || isLoading}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all font-semibold ${
          !normalizedAudioUrl || isLoading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : isPlaying
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        title={normalizedAudioUrl ? (isPlaying ? "Pausar" : "Reproducir") : "Sin audio"}
      >
        {isLoading ? (
          <span className="animate-spin text-lg">⏳</span>
        ) : isPlaying ? (
          <span className="text-lg">⏸</span>
        ) : (
          <span className="text-lg">▶</span>
        )}
      </button>

      {/* Botón de velocidad con menú dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowSpeedMenu(!showSpeedMenu)}
          disabled={!normalizedAudioUrl}
          className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all ${
            !normalizedAudioUrl
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-100 dark:bg-slate-600 text-blue-700 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-slate-500 border border-blue-300 dark:border-slate-500"
          }`}
          title="Cambiar velocidad"
        >
          {playbackRate.toFixed(2)}x
        </button>

        {/* Menú de velocidades */}
        {showSpeedMenu && (
          <div className="absolute top-12 left-0 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg shadow-lg p-2 z-10 min-w-16">
            {SPEED_OPTIONS.map((speed) => (
              <button
                key={speed}
                onClick={() => {
                  setPlaybackRate(speed);
                  setShowSpeedMenu(false);
                }}
                className={`block w-full text-center px-3 py-2 text-sm font-semibold rounded transition-all ${
                  playbackRate === speed
                    ? "bg-blue-500 text-white"
                    : "bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-600"
                }`}
              >
                {speed.toFixed(2)}x
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Elemento de audio */}
      <audio
        ref={audioRef}
        preload="none"
        onLoadedMetadata={() => {
          if (audioRef.current) {
            audioRef.current.playbackRate = playbackRate;
          }
        }}
        onEnded={handleAudioEnd}
        onError={() => {
          console.error("Error cargando el audio:", normalizedAudioUrl);
          setIsPlaying(false);
          setIsLoading(false);
        }}
      />
    </div>
  );
}
