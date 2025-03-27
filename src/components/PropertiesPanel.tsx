
import React from 'react';
import { X } from 'lucide-react';

interface Media {
  id: string;
  type: 'image' | 'video';
  src: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  startTime: number;
  endTime: number;
}

interface PropertiesPanelProps {
  media: Media;
  onUpdate: (mediaId: string, updates: Partial<Media>) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ media, onUpdate }) => {
  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const width = parseInt(event.target.value, 10);
    if (!isNaN(width) && width > 0) {
      onUpdate(media.id, { size: { ...media.size, width } });
    }
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const height = parseInt(event.target.value, 10);
    if (!isNaN(height) && height > 0) {
      onUpdate(media.id, { size: { ...media.size, height } });
    }
  };

  const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const startTime = parseFloat(event.target.value);
    if (!isNaN(startTime) && startTime >= 0) {
      // Ensure start time is not greater than end time
      const endTime = Math.max(media.endTime, startTime);
      onUpdate(media.id, { startTime, endTime });
    }
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const endTime = parseFloat(event.target.value);
    if (!isNaN(endTime) && endTime >= media.startTime) {
      onUpdate(media.id, { endTime });
    }
  };

  return (
    <div className="properties-panel fade-in">
      <div className="properties-header">
        <div className="properties-title">Media Properties</div>
        <div className="properties-close">
          <X size={18} />
        </div>
      </div>
      <div className="properties-content">
        <div className="property-group">
          <div className="property-group-title">Size</div>
          <div className="property-row">
            <div className="property-label">Width</div>
            <div className="property-input">
              <input 
                type="number" 
                value={media.size.width} 
                onChange={handleWidthChange}
                min="50"
              />
            </div>
          </div>
          <div className="property-row">
            <div className="property-label">Height</div>
            <div className="property-input">
              <input 
                type="number" 
                value={media.size.height} 
                onChange={handleHeightChange}
                min="50"
              />
            </div>
          </div>
        </div>
        
        <div className="property-group">
          <div className="property-group-title">Timing</div>
          <div className="property-row">
            <div className="property-label">Start Time</div>
            <div className="property-input">
              <input 
                type="number" 
                value={media.startTime} 
                onChange={handleStartTimeChange}
                min="0"
                step="0.1"
              />
            </div>
          </div>
          <div className="property-row">
            <div className="property-label">End Time</div>
            <div className="property-input">
              <input 
                type="number" 
                value={media.endTime} 
                onChange={handleEndTimeChange}
                min={media.startTime}
                step="0.1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;
