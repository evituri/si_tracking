import React from 'react';
import './App.css';
import Camera from './Camera';
import Content from './Content'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            renderContent: false,
            img: false
        }
    }

    renderContent = (render, img) => {
        this.setState({
            renderContent: render,
            img: img
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
                    {renderContent ? <Content imgSrc={this.state.img}></Content> : <Camera renderContent={this.renderContent}></Camera>}
                </main>
            </div>
        )
    }
}

export default App;
