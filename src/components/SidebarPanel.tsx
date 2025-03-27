
import React from 'react';
import { Upload, Search, Clock, Users, Cloud, ChevronDown } from 'lucide-react';

interface SidebarPanelProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  stockVideos: Array<{ id: number; src: string; duration: string }>;
  aiAvatars: Array<{ id: number; src: string }>;
  onAddStockVideo: (video: { id: number; src: string; duration: string }) => void;
}

const SidebarPanel: React.FC<SidebarPanelProps> = ({ 
  onFileUpload, 
  stockVideos, 
  aiAvatars,
  onAddStockVideo 
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">Add Media</div>

      <div className="upload-area">
        <input
          type="file"
          id="file-upload"
          onChange={onFileUpload}
          accept="image/*,video/*"
          style={{ display: 'none' }}
        />
        <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
          <Upload className="upload-icon" />
          <div className="upload-title">Upload a File</div>
          <div className="upload-hint">Drag & drop a file</div>
          <div className="upload-hint">or</div>
          <div className="upload-link">import from a link</div>
        </label>
      </div>

      <div className="tabs-container">
        <div className="tab">
          <Clock size={18} />
          <span>Record</span>
        </div>
        <div className="tab tab-active">
          <Users size={18} />
          <span>Brand Kits</span>
          <div className="tab-badge">1</div>
        </div>
      </div>

      <div className="tabs-container">
        <div className="tab">
          <Clock size={18} />
          <span>Text To Speech</span>
          <div className="tab-badge">1</div>
        </div>
        <div className="tab tab-active">
          <Users size={18} />
          <span>Voice Clone</span>
          <div className="tab-badge">1</div>
        </div>
      </div>

      <div className="media-category">
        <div className="category-header">
          <div className="category-title">AI Avatars</div>
          <div className="view-all">View All</div>
        </div>
        <div className="media-grid">
          {aiAvatars.map(avatar => (
            <div key={avatar.id} className="media-item">
              <img src={avatar.src} alt={`Avatar ${avatar.id}`} />
              <div className="duration">AI</div>
            </div>
          ))}
        </div>
      </div>

      <div className="media-category">
        <div className="category-header">
          <div className="category-title">Stock Videos</div>
          <div className="search-bar">
            <Search size={16} />
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="filter-tabs">
          <div className="filter-tab filter-tab-active">Animals</div>
          <div className="filter-tab">Nature</div>
          <div className="filter-tab">People</div>
          <div className="filter-tab">More</div>
        </div>
        <div className="media-grid">
          {stockVideos.map(video => (
            <div 
              key={video.id} 
              className="media-item"
              onClick={() => onAddStockVideo(video)}
            >
              <video src={video.src} muted />
              <div className="duration">{video.duration}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarPanel;
