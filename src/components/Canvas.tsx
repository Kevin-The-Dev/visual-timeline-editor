
import React, { useRef, useState, useEffect } from 'react';

interface Media {
  id: string;
  type: 'image' | 'video';
  src: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  startTime: number;
  endTime: number;
}

interface CanvasProps {
  mediaItems: Media[];
  selectedMediaId: string | null;
  currentTime: number;
  onMediaSelect: (mediaId: string) => void;
  onMediaMove: (mediaId: string, newPosition: { x: number; y: number }) => void;
  onMediaResize: (mediaId: string, newSize: { width: number; height: number }) => void;
}

const Canvas: React.FC<CanvasProps> = ({ 
  mediaItems, 
  selectedMediaId, 
  currentTime,
  onMediaSelect, 
  onMediaMove, 
  onMediaResize 
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragInfo, setDragInfo] = useState<{
    isDragging: boolean;
    mediaId: string | null;
    initialX: number;
    initialY: number;
    initialMouseX: number;
    initialMouseY: number;
  }>({
    isDragging: false,
    mediaId: null,
    initialX: 0,
    initialY: 0,
    initialMouseX: 0,
    initialMouseY: 0,
  });

  const [resizeInfo, setResizeInfo] = useState<{
    isResizing: boolean;
    mediaId: string | null;
    handle: string | null;
    initialWidth: number;
    initialHeight: number;
    initialMouseX: number;
    initialMouseY: number;
  }>({
    isResizing: false,
    mediaId: null,
    handle: null,
    initialWidth: 0,
    initialHeight: 0,
    initialMouseX: 0,
    initialMouseY: 0,
  });

  const handleMediaMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
    mediaId: string
  ) => {
    event.stopPropagation();
    
    const media = mediaItems.find(m => m.id === mediaId);
    if (!media) return;
    
    onMediaSelect(mediaId);
    
    setDragInfo({
      isDragging: true,
      mediaId,
      initialX: media.position.x,
      initialY: media.position.y,
      initialMouseX: event.clientX,
      initialMouseY: event.clientY,
    });
  };

  const handleResizeMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
    mediaId: string,
    handle: string
  ) => {
    event.stopPropagation();
    
    const media = mediaItems.find(m => m.id === mediaId);
    if (!media) return;
    
    setResizeInfo({
      isResizing: true,
      mediaId,
      handle,
      initialWidth: media.size.width,
      initialHeight: media.size.height,
      initialMouseX: event.clientX,
      initialMouseY: event.clientY,
    });
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (dragInfo.isDragging && dragInfo.mediaId) {
      const deltaX = event.clientX - dragInfo.initialMouseX;
      const deltaY = event.clientY - dragInfo.initialMouseY;
      
      onMediaMove(dragInfo.mediaId, {
        x: dragInfo.initialX + deltaX,
        y: dragInfo.initialY + deltaY,
      });
    }
    
    if (resizeInfo.isResizing && resizeInfo.mediaId && resizeInfo.handle) {
      const deltaX = event.clientX - resizeInfo.initialMouseX;
      const deltaY = event.clientY - resizeInfo.initialMouseY;
      
      let newWidth = resizeInfo.initialWidth;
      let newHeight = resizeInfo.initialHeight;
      
      switch (resizeInfo.handle) {
        case 'e':
          newWidth = resizeInfo.initialWidth + deltaX;
          break;
        case 'se':
          newWidth = resizeInfo.initialWidth + deltaX;
          newHeight = resizeInfo.initialHeight + deltaY;
          break;
        case 's':
          newHeight = resizeInfo.initialHeight + deltaY;
          break;
        case 'sw':
          newWidth = resizeInfo.initialWidth - deltaX;
          newHeight = resizeInfo.initialHeight + deltaY;
          break;
        case 'w':
          newWidth = resizeInfo.initialWidth - deltaX;
          break;
        case 'nw':
          newWidth = resizeInfo.initialWidth - deltaX;
          newHeight = resizeInfo.initialHeight - deltaY;
          break;
        case 'n':
          newHeight = resizeInfo.initialHeight - deltaY;
          break;
        case 'ne':
          newWidth = resizeInfo.initialWidth + deltaX;
          newHeight = resizeInfo.initialHeight - deltaY;
          break;
        default:
          break;
      }
      
      // Ensure minimum size
      newWidth = Math.max(50, newWidth);
      newHeight = Math.max(50, newHeight);
      
      onMediaResize(resizeInfo.mediaId, {
        width: newWidth,
        height: newHeight,
      });
    }
  };

  const handleMouseUp = () => {
    setDragInfo({
      isDragging: false,
      mediaId: null,
      initialX: 0,
      initialY: 0,
      initialMouseX: 0,
      initialMouseY: 0,
    });
    
    setResizeInfo({
      isResizing: false,
      mediaId: null,
      handle: null,
      initialWidth: 0,
      initialHeight: 0,
      initialMouseX: 0,
      initialMouseY: 0,
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragInfo, resizeInfo]);

  // Filter media items to only show those that are within the current time
  const visibleMediaItems = mediaItems.filter(media => 
    currentTime >= media.startTime && currentTime <= media.endTime
  );

  return (
    <div 
      ref={canvasRef} 
      className="editor-canvas"
      style={{ width: '1280px', height: '720px' }}
      onClick={() => onMediaSelect('')}
    >
      {visibleMediaItems.map(media => (
        <div
          key={media.id}
          className={`resizable-media ${selectedMediaId === media.id ? 'selected' : ''}`}
          style={{
            left: `${media.position.x}px`,
            top: `${media.position.y}px`,
            width: `${media.size.width}px`,
            height: `${media.size.height}px`,
          }}
          onMouseDown={(e) => handleMediaMouseDown(e, media.id)}
        >
          {media.type === 'image' ? (
            <img src={media.src} alt="Media" />
          ) : (
            <video src={media.src} loop muted autoPlay />
          )}
          
          {selectedMediaId === media.id && (
            <>
              <div 
                className="resize-handle resize-handle-n" 
                onMouseDown={(e) => handleResizeMouseDown(e, media.id, 'n')}
              />
              <div 
                className="resize-handle resize-handle-ne" 
                onMouseDown={(e) => handleResizeMouseDown(e, media.id, 'ne')}
              />
              <div 
                className="resize-handle resize-handle-e" 
                onMouseDown={(e) => handleResizeMouseDown(e, media.id, 'e')}
              />
              <div 
                className="resize-handle resize-handle-se" 
                onMouseDown={(e) => handleResizeMouseDown(e, media.id, 'se')}
              />
              <div 
                className="resize-handle resize-handle-s" 
                onMouseDown={(e) => handleResizeMouseDown(e, media.id, 's')}
              />
              <div 
                className="resize-handle resize-handle-sw" 
                onMouseDown={(e) => handleResizeMouseDown(e, media.id, 'sw')}
              />
              <div 
                className="resize-handle resize-handle-w" 
                onMouseDown={(e) => handleResizeMouseDown(e, media.id, 'w')}
              />
              <div 
                className="resize-handle resize-handle-nw" 
                onMouseDown={(e) => handleResizeMouseDown(e, media.id, 'nw')}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Canvas;
