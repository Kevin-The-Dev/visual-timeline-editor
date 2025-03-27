
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Search, Clock, Users, Cloud, ChevronDown, ChevronRight, Pause, Play, ZoomIn, ZoomOut, Maximize, Settings } from 'lucide-react';
import SidebarPanel from './SidebarPanel';
import Canvas from './Canvas';
import PropertiesPanel from './PropertiesPanel';

const stockVideos = [
  { id: 1, src: 'https://assets.mixkit.co/videos/preview/mixkit-mountain-range-view-from-a-distance-43784-large.mp4', duration: '0:14' },
  { id: 2, src: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4', duration: '0:15' },
  { id: 3, src: 'https://assets.mixkit.co/videos/preview/mixkit-elevated-landscape-view-over-hills-56272-large.mp4', duration: '0:29' },
];

const aiAvatars = [
  { id: 1, src: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 2, src: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: 3, src: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { id: 4, src: 'https://randomuser.me/api/portraits/women/24.jpg' },
];

interface Media {
  id: string;
  type: 'image' | 'video';
  src: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  startTime: number;
  endTime: number;
}

const MediaEditor: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<Media[]>([]);
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(60); // Default 60 seconds
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const selectedMedia = mediaItems.find(media => media.id === selectedMediaId);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    const reader = new FileReader();

    reader.onload = (e) => {
      const newMedia: Media = {
        id: `media-${Date.now()}`,
        type: isVideo ? 'video' : 'image',
        src: e.target?.result as string,
        position: { x: 200, y: 150 },
        size: { width: 400, height: 300 },
        startTime: 0,
        endTime: 10,
      };

      setMediaItems([...mediaItems, newMedia]);
      setSelectedMediaId(newMedia.id);
    };

    reader.readAsDataURL(file);
  };

  const handleAddStockVideo = (video: typeof stockVideos[0]) => {
    const newMedia: Media = {
      id: `media-${Date.now()}`,
      type: 'video',
      src: video.src,
      position: { x: 200, y: 150 },
      size: { width: 400, height: 300 },
      startTime: 0,
      endTime: 10,
    };

    setMediaItems([...mediaItems, newMedia]);
    setSelectedMediaId(newMedia.id);
  };

  const handleMediaSelect = (mediaId: string) => {
    setSelectedMediaId(mediaId);
  };

  const handleMediaMove = (mediaId: string, newPosition: { x: number; y: number }) => {
    setMediaItems(mediaItems.map(item => 
      item.id === mediaId 
        ? { ...item, position: newPosition } 
        : item
    ));
  };

  const handleMediaResize = (mediaId: string, newSize: { width: number; height: number }) => {
    setMediaItems(mediaItems.map(item => 
      item.id === mediaId 
        ? { ...item, size: newSize } 
        : item
    ));
  };

  const handleMediaUpdate = (mediaId: string, updates: Partial<Media>) => {
    setMediaItems(mediaItems.map(item => 
      item.id === mediaId 
        ? { ...item, ...updates } 
        : item
    ));
  };

  const togglePlayback = () => {
    if (isPlaying) {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
        playIntervalRef.current = null;
      }
    } else {
      playIntervalRef.current = setInterval(() => {
        setCurrentTime(prevTime => {
          const newTime = prevTime + 0.1;
          if (newTime >= totalDuration) {
            if (playIntervalRef.current) {
              clearInterval(playIntervalRef.current);
              playIntervalRef.current = null;
            }
            setIsPlaying(false);
            return 0;
          }
          return newTime;
        });
      }, 100);
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${(seconds % 1).toFixed(1).substring(2)}`;
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPositionRatio = (e.clientX - rect.left) / rect.width;
    const newTime = totalDuration * clickPositionRatio;
    setCurrentTime(newTime);
  };

  return (
    <div className="media-editor">
      <div className="nav-sidebar">
        <div className="nav-item active">
          <Search size={24} />
        </div>
        <div className="nav-item">
          <Settings size={24} />
        </div>
        <div className="nav-item">
          <Clock size={24} />
        </div>
        <div className="nav-item">
          <Users size={24} />
        </div>
        <div className="nav-item">
          <Cloud size={24} />
        </div>
      </div>

      <SidebarPanel 
        onFileUpload={handleFileUpload} 
        stockVideos={stockVideos} 
        aiAvatars={aiAvatars}
        onAddStockVideo={handleAddStockVideo} 
      />

      <div className="editor-main">
        <div className="editor-header">
          <div className="project-info">
            <div className="project-title">Project Name</div>
            <div className="save-status">
              <Clock size={16} />
              <span>Log in to save progress</span>
            </div>
          </div>
          <div className="editor-controls">
            <button className="apple-button">Sign up</button>
            <button className="apple-button">Log in</button>
            <button className="apple-button primary">Upgrade <ChevronDown size={16} /></button>
            <button className="apple-button primary">Done <ChevronRight size={16} /></button>
          </div>
        </div>

        <div className="canvas-container">
          <Canvas
            mediaItems={mediaItems}
            selectedMediaId={selectedMediaId}
            currentTime={currentTime}
            onMediaSelect={handleMediaSelect}
            onMediaMove={handleMediaMove}
            onMediaResize={handleMediaResize}
          />

          {selectedMedia && (
            <PropertiesPanel
              media={selectedMedia}
              onUpdate={handleMediaUpdate}
            />
          )}
        </div>

        <div className="editor-footer">
          <div className="timeline-controls">
            <button className="button icon secondary" onClick={togglePlayback}>
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <div className="timeline-time">
              {formatTime(currentTime)} / {formatTime(totalDuration)}
            </div>
          </div>
          <div className="timeline-slider" onClick={handleTimelineClick}>
            <div 
              className="timeline-slider-progress" 
              style={{ width: `${(currentTime / totalDuration) * 100}%` }}
            ></div>
          </div>
          <div className="zoom-controls">
            <button className="button icon secondary">
              <ZoomOut size={18} />
            </button>
            <button className="button icon secondary">
              <ZoomIn size={18} />
            </button>
            <button className="button icon secondary">
              <Maximize size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaEditor;
