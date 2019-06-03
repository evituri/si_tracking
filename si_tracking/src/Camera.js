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
  
  componentDidMount () {
    let context = this.canvasRef.current.getContext('2d');

    let tracker = new window.tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    window.tracking.track('#video', tracker, { camera: true });

    tracker.on('track', function(event) {
    context.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
    event.data.forEach(function(rect) {
        context.strokeStyle = '#a64ceb';
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = '11px Helvetica';
        context.fillStyle = "#fff";
        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
      });
    });    
  }

  render = () => <div className="camera_container">
    <video id="video" width="320" height="240" preload autoplay loop muted ref={this.videoRef}></video>
    <canvas id="canvas" width="320" height="240" ref={this.canvasRef}></canvas>
  </div> 
}

export default Camera;
