import { useEffect, useRef, useState } from 'react'

export default function KidsSection() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const videoContainerRef = useRef(null)
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  
  const controlsTimeoutRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.animate-in')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Auto-play / pause when modal opens/closes
  useEffect(() => {
    if (isModalOpen && videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Autoplay blocked:', err))
      
      // Lock scroll
      document.body.style.overflow = 'hidden'
    } else {
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
      setIsPlaying(false)
      setCurrentTime(0)
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isModalOpen])

  // Hide controls when mouse is inactive inside modal
  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false)
    }, 2500)
  }

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
    }
  }, [isPlaying])

  const togglePlay = (e) => {
    e.stopPropagation()
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleScrub = (e) => {
    const newTime = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value)
    setVolume(newVol)
    if (videoRef.current) {
      videoRef.current.volume = newVol
      videoRef.current.muted = newVol === 0
      setIsMuted(newVol === 0)
    }
  }

  const toggleFullscreen = (e) => {
    e.stopPropagation()
    if (!videoContainerRef.current) return

    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => console.log('Fullscreen failed:', err))
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  const formatTime = (time) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60).toString().padStart(2, '0')
    return `${mins}:${secs}`
  }

  return (
    <section className="kids-section section-padding" ref={sectionRef}>
      <div className="container">
        <div className="kids-grid">
          <div className="kids-video animate-in">
            <div className="video-thumbnail-container" onClick={() => setIsModalOpen(true)}>
              <img src="/images/video_thumbnail.png" alt="Build N Bond Kids Workout" />
              <div className="play-overlay">
                <div className="play-icon-circle">
                  <svg viewBox="0 0 24 24" width="36" height="36" fill="white">
                    <polygon points="6,4 20,12 6,20" />
                  </svg>
                </div>
                <span>Play Video</span>
              </div>
            </div>
          </div>
          <div className="kids-content animate-in" style={{ transitionDelay: '0.2s' }}>
            <h2>We Love And Care For Your Kids</h2>
            <p>
              Your children are precious for us and we take care of them just like ours.
              Don't you want to see it. Okay, how about you see this short sweet video and find it yourself!
            </p>
            <button className="btn-primary" onClick={() => setIsModalOpen(true)} id="kids-cta">
              Play Video
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '8px' }}>
                <polygon points="5,3 19,12 5,21" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Glassmorphic Video Modal */}
      {isModalOpen && (
        <div className="video-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <button className="modal-close-btn" onClick={() => setIsModalOpen(false)} aria-label="Close modal">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div 
            className="custom-video-player-container" 
            ref={videoContainerRef}
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handleMouseMove}
          >
            <video
              ref={videoRef}
              src="https://web.archive.org/web/20250331051911im_/https://www.buildnbond.com/wp-content/uploads/2020/06/videobnb.mp4"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
              preload="metadata"
            />
            
            {/* Custom Playback Controls Overlay */}
            <div className={`video-controls-overlay ${showControls ? 'visible' : 'hidden'}`}>
              {/* Progress Bar */}
              <div className="video-progress-container">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleScrub}
                  className="video-progress-bar"
                />
              </div>
              
              <div className="video-controls-row">
                <div className="video-controls-left">
                  {/* Play / Pause */}
                  <button className="control-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? (
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <polygon points="6,4 20,12 6,20" />
                      </svg>
                    )}
                  </button>

                  {/* Volume Control */}
                  <div className="volume-control-group">
                    <button className="control-btn" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                      {isMuted ? (
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                          <line x1="23" y1="9" x2="17" y2="15"/>
                          <line x1="17" y1="9" x2="23" y2="15"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                        </svg>
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="volume-slider"
                      aria-label="Volume"
                    />
                  </div>

                  {/* Time Counter */}
                  <span className="video-time">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="video-controls-right">
                  {/* Fullscreen */}
                  <button className="control-btn" onClick={toggleFullscreen} aria-label="Toggle Fullscreen">
                    {isFullscreen ? (
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
