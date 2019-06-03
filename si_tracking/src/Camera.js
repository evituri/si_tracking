import React from 'react';
import './Camera.css';

require('tracking')
require('tracking/build/data/face')

class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    let self = this;
    let tracker = new window.tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    this.track = true;

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } }).then(function (stream) {
      document.getElementById('video').srcObject = stream;
    });
    this.trackerTask = window.tracking.track('#video', tracker, { camera: true });

    tracker.on('track', function (event) {
      if (self.track) {
        event.data.forEach(function (rect) {
          self.canvasRef.current.width = rect.width;
          self.canvasRef.current.height = rect.height;
          let context = self.canvasRef.current.getContext('2d');
          let video = self.videoRef.current;
          context.drawImage(video, rect.x + rect.width - 30, rect.y + rect.height - 30, 240, 240, 0, 0, rect.width, rect.height);
          self.trackerTask.stop();
          self.track = false;
          self.props.renderContent(true, self.canvasRef.current.toDataURL('image/jpeg'));
        });
      }
    });
  }

  render = () => <div className="camera_container">
    <video id="video" width="320" height="240" preload="" autoPlay loop muted ref={this.videoRef}></video>
    <canvas id="canvas" ref={this.canvasRef}></canvas>
    <span style={{ textAlign: "center", top: "310px" }}>Pokažite facu da bi pristupili stranici.</span>
  </div>
}

export default Camera;
