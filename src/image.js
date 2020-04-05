import React from 'react';
import './image.css';
import IndexImage from './images/index.jpg';
import { scaleToNatural } from './utils';
import { Label } from './utils';


class Image extends React.Component {
    constructor(props) {
        super(props);
        this.imageRef = React.createRef();
        this.calcImageDim = this.calcImageDim.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleColorChange = this.handleColorChange(this);
        this.state = { natural: {}, offsets: {}, pageX: 0, pageY: 0, imageX: 0, imageY: 0, labels: [] };
        this.coordinates = [];
    }

    calcImageDim = (event) => {
        this.setState(
            {
                natural: {
                    'height': this.imageRef.current.naturalHeight,
                    'width': this.imageRef.current.naturalWidth,
                },
                offsets: {
                    'left': this.imageRef.current.offsetLeft,
                    'top': this.imageRef.current.offsetTop,
                    'height': this.imageRef.current.offsetHeight,
                    'width': this.imageRef.current.offsetWidth,
                },
            }
        )
    }

    handleMouseMove = (event) => {
        this.setState({ pageX: event.clientX, pageY: event.clientY });
        // calculate coordinates with respect to image
        this.setState({ imageX: event.clientX - this.state.offsets.left, imageY: event.clientY - this.state.offsets.top });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const labelName = form.elements['label-name'].value;
        const labelColor = form.elements['label-color'].value;
        const labelObj = new Label(labelName, labelColor);
        this.setState({
            labels: [...this.state.labels, labelObj],
        })
        form.reset();
    }

    checkLabelExists = (event) => {
        event.preventDefault();
        const curLabelName = event.currentTarget.value;
        const existingLabelNames = this.state.labels.map((label) => label.name);
        if (curLabelName in existingLabelNames) {
            // label name exists popup
        }
        console.log(event.currentTarget.value);
    }

    handleColorChange = (event) => {
        // change color of label object
    }

    render() {
        return (
            <div className='root'>
                <div className='image-window'>
                    <h5>Image X and Y co-ordinates Identification</h5>
                    <img
                        id='image'
                        src={IndexImage}
                        alt='document-img'
                        className='image'
                        ref={this.imageRef}
                        // onMouseMove={(event) => displayMouseCoords(event, this.state.offsets, this.state.natural)}
                        onMouseMove={this.handleMouseMove}
                        onLoad={this.calcImageDim}
                    />
                </div>
                <div className='label-window'>
                    <h5>Label properties</h5>
                    <div>
                        Original image size: Height: {this.state.natural.height}, Width: {this.state.natural.width} <br />
                        Webpage image size: Height: {this.state.offsets.height}, Width: {this.state.offsets.width} <br />
                        Coordinates relative to page, X: {this.state.pageX}, Y: {this.state.pageY} <br />
                        Coordinates relative to webpage image X: {this.state.imageX} Y: {this.state.imageY} <br />
                        Coordinates relative to natural image X: {scaleToNatural(this.state.natural.width, this.state.offsets.width, this.state.imageX)}, Y: {scaleToNatural(this.state.natural.height, this.state.offsets.height, this.state.imageY)}
                    </div>
                    <hr />
                    <div>
                        <form className='label-form' onSubmit={this.handleFormSubmit}>
                            <input name='label-name' placeholder='enter label name' style={{ flexGrow: 1 }} onChange={this.checkLabelExists}></input>
                            <input type='color' name='label-color'></input>
                            <button type='submit'>create label</button>
                        </form>
                    </div>
                    <hr />
                    <div>
                        <ul>
                            {this.state.labels.map((label) =>
                                <li key={label.name}>
                                    <span className='label-span'>
                                        <div>{label.name}</div>
                                        <input onChange={this.handleColorChange} type='color' value={label.color}></input>
                                    </span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Image;