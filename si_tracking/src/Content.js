import React from 'react';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.imgRef = React.createRef();
    }

    componentDidMount() {
        this.imgRef.current.src = this.props.imgSrc;
    }

    render() {
        return (
            <div>
                <h1>Uspješno ste pristupili stranici sa slikom dolje.</h1>
                <img ref={this.imgRef}></img>
            </div>)
    }
}

export default Content;