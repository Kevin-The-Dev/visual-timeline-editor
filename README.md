# Media Canvas Editor

A visual timeline editor that allows users to add, manipulate, and time media elements on a canvas.

![Media Canvas Editor Screenshot](https://i.imgur.com/YourScreenshot.jpg)

## Features

- **Media Management**: Upload and add images or videos to the canvas
- **Interactive Canvas**: Drag, resize, and position media elements freely
- **Properties Panel**: Control media dimensions (width/height) and timing (start/end) through an intuitive interface
- **Timeline Controls**: Play/pause functionality with visual timeline slider
- **Time-Based Visibility**: Media elements appear and disappear based on their configured time ranges

## Core Functionality

1. **Media Addition**: Upload photos and videos to place on the canvas
2. **Interactive Manipulation**: Drag and resize media elements with intuitive controls
3. **Property Controls**: Adjust width, height, start time, and end time via the properties panel
4. **Timeline Playback**: Media elements appear and disappear according to their configured time ranges

## Technology Stack

- **Framework**: React with TypeScript
- **UI Components**: Custom styled components
- **State Management**: React hooks for local state management
- **Styling**: Custom CSS for precise control over appearance
- **Media Handling**: Native browser APIs for media manipulation

## Getting Started

### Prerequisites

- Node.js 14+ and npm installed

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/media-canvas-editor.git

# Navigate to the project directory
cd media-canvas-editor

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`.

## Usage

1. **Add Media**: Click the upload button or use one of the provided stock videos
2. **Position Media**: Drag and resize the media element on the canvas
3. **Configure Properties**: Use the properties panel to set precise dimensions and timing
4. **Preview**: Use the playback controls to see how media appears and disappears based on the timeline

## Project Structure

```
src/
├── components/           # UI Components
│   ├── Canvas.tsx        # Canvas for media manipulation
│   ├── MediaEditor.tsx   # Main editor component
│   ├── PropertiesPanel.tsx  # Media properties controls
│   └── SidebarPanel.tsx  # Left sidebar with media options
├── styles/               # CSS styles
│   └── MediaEditor.css   # Main styling for the editor
└── pages/                # Application pages
    └── Index.tsx         # Main entry point
```

## Future Enhancements

- Export functionality to save projects
- Additional media effects and transitions
- Multi-track timeline support
- Collaborative editing capabilities

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by professional media editing software
- Developed as a demonstration of interactive web capabilities
