import React from 'react';
import './App.css';
import Camera from './Camera';
import Content from './Content'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        renderContent: false
    }
  }

  renderContent = (render) => {
      this.setState({
          renderContent: render
      })
  }

  render = () => {
    const { renderContent } = this.state;
    
    return (
        <div>
            <header>
                <span className="header_title">SI Tracking App</span>
            </header>
            <main>
                {renderContent ? <Content></Content> : <Camera renderContent={this.renderContent}></Camera>}
            </main>
        </div>
    )
    }
}

export default App;
