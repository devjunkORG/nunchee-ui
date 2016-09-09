import React from 'react';
import ImageCropper from 'react-cropper';
import Form from '../Form/Form';
import Field from '../Form/Fields';
import Input from '../Form/Input';
import config from '../../../config';
import 'react-cropper/node_modules/cropperjs/dist/cropper.css';

class Cropper extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this._zoomOut = this._zoomOut.bind(this);
        this._zoomIn = this._zoomIn.bind(this);
        this._flipLeft = this._flipLeft.bind(this);
        this._flipRight = this._flipRight.bind(this);
        this._remove = this._remove.bind(this);
        this._upload = this._upload.bind(this);
        this._setImageSource = this._setImageSource.bind(this);
    }

    initialize() {
        return {
            aspectRatio: this.props.aspectRatio,
            cropResult: '',
            croppedWidth: this.props.defaultWidth,
            croppedHeight: this.props.defaultHeight,
            imageSource: this.props.src,
            cuts: [],
            backdropSelection: { url: '', sizes: [] },
            mediumhSelection: { url: '', sizes: [] },
            mediumvSelection: { url: '', sizes: [] },
            posterSelection: { url: '', sizes: [] },
            bannerSelection: { url: '', sizes: [] },
            squareSelection: { url: '', sizes: [] }
        };
    }

    componentWillMount() {
        this.state = this.initialize();
    }
    componentDidMount() {
        setTimeout(function() {
            window.dispatchEvent(new Event('resize'));
        },1000); /* @TODO: fix this. This is just a workaround because react-cropper initializes the
        cropper canvas on the default size (200x100), probably because it does not recognise the size of the container.
        What this does, is fake a resize event so that the cropper resets the width because of the responsive feature  */
    }

    _zoomOut() {
        this.refs.cropper.zoom(-0.1);
    }
    _zoomIn() {
        this.refs.cropper.zoom(0.1);
    }
    _flipLeft() {
        this.refs.cropper.rotate(-45);
    }
    _flipRight() {
        this.refs.cropper.rotate(45);
    }
    _setImageSource(e) {
        this.setState({ imageSource: e.target.value });
    }
    _remove() {

    }
    _upload() {

    }
    _checkSizes(type,cropData) {
        let imageTypes = config.media.imageTypes;
        let imageSizes = config.media.imageSizes;
        let size = imageTypes[type] ? imageTypes[type].split('x') : [ 0, 0 ];
        let comparable = parseInt(size[0])*parseInt(size[1]);
        let cropSize = cropData.width*cropData.height;
        let availableSizes = [];

        availableSizes = imageSizes.filter(v => { return cropSize >= comparable*v; });

        return availableSizes;
    }

    _onChange() {
        let image = this.refs.cropper.getCroppedCanvas();
        image = image.toDataURL('image/jpeg',0.4);
        let data = this.refs.cropper.getData();
        let imageData = this.refs.cropper.getImageData();
        let cuts = this.state.cuts;

        const doCut = ratio => {
            const options = {};
            options[(16/9).toString()] = () => {
                return {
                    backdropSelection: {
                        url: image,
                        sizes: this._checkSizes('backdrop',data)
                    }
                };
            };
            options[(2/3).toString()] = () => {
                return {
                    posterSelection: {
                        url: image,
                        sizes: this._checkSizes('poster',data)
                    }
                };
            };
            options[(4/3).toString()] = () => {
                return {
                    mediumhSelection: {
                        url: image,
                        sizes: this._checkSizes('mediumh',data)
                    }
                };
            };
            options[(3/4).toString()] = () => {
                return {
                    mediumvSelection: {
                        url: image,
                        sizes: this._checkSizes('mediumv',data)
                    }
                };
            };
            options['1'] = () => {
                return {
                    squareSelection: {
                        url: image,
                        sizes: this._checkSizes('square',data)
                    }
                };
            };
            options['5'] = () => {
                return {
                    bannerSelection: {
                        url: image,
                        sizes: this._checkSizes('banner',data)
                    }
                };
            };
            if (typeof options[ratio] !== 'function') {
                throw new Error('Invalid option');
            }
            let result = options[ratio]();
            let exists;
            cuts.forEach(v => {
                if (Object.keys(result)[0] == Object.keys(v)[0]) {
                    cuts[Object.keys(v)[0]] = v;
                    exists = true;
                }
            });
            if (!exists) {
                cuts.push(result);
            }
            this.setState(result);
            this.setState({ cuts: cuts });
        };

        doCut(this.state.aspectRatio);

        if (this.props.onChange) {
            this.props.onChange(image,this.state.cuts);
        }
        this.setState({
            croppedWidth: data.width,
            croppedHeight: data.height,
            originalWidth: imageData.naturalWidth,
            originalHeight: imageData.naturalHeight,
            cropResult: image
        });
    }

    setAspectRatio(ratio) {
        this.setState({ aspectRatio: ratio });
    }

    render() {
        return (
            <div style={{ maxWidth: 960 }}>
                <Form>
                    <Field>
                        <Input labeled label="URL" placeholder="http://" onChange={ this._setImageSource }/>
                    </Field>
                    <ImageCropper
                        ref="cropper"
                        src={ this.props.src }
                        aspectRatio={this.state.aspectRatio}
                        style={ {
                            width: '100%',
                            height: 400
                        } }
                        rotatable={ true }
                        cropend={ this._onChange }
                        crossOrigin={ this.state.imageSource }
                        zoomOnWheel={ false }
                        viewMode={ 1 }
                    />
                    <div className="cropper actions" style={{ display: 'flex' }}>
                        <button
                            onClick={ this._zoomOut }
                            className="ui clear teal basic button"
                        >
                            <i className="icon-zoom-out icon"></i>
                        </button>
                        <button
                            onClick={ this._zoomIn }
                            className="ui clear teal basic button"
                        >
                            <i className="icon-zoom-in icon"></i>
                        </button>
                        <button
                            onClick={ this._flipLeft }
                            className="ui clear teal basic button"
                        >
                            <i className="icon-arrow-flip-left icon"></i>
                        </button>
                        <button
                            onClick={ this._flipRight }
                            className="ui clear teal basic button"
                        >
                            <i className="icon-arrow-flip-right icon"></i>
                        </button>
                        <button
                            onClick={ this._remove }
                            className="ui clear red basic button"
                        >
                            <i className="icon-trash icon"></i>
                        </button>
                        <button
                            onClick={ this._upload }
                            className="ui clear teal basic button"
                        >
                            <i className="icon-arrow-up icon"></i>
                        </button>
                    </div>
                    <div>
                        <h5>Imagenes de preview</h5>
                        <p>En la elección del formato de la imagen, se aconseja
                            subir imágenes en el tamaño mínimo recomendado. No
                            obstante una imagen de menor tamaño se exhibirá de todas
                            maneras pero en menor calidad.</p>
                    </div>
                    <div className="image preview list">
                        <section>
                            <button
                                onClick={ this.setAspectRatio.bind(this,16/9)}
                                className="item ui button"
                                style={ {
                                    width: 170*(16/9),
                                    height: '170px',
                                    backgroundImage: `url(${this.state.backdropSelection.url})`,
                                    backgroundSize: 'cover'
                                } }
                            >
                                <span>1600x900 (16:9)</span>
                                <h4>Backdrop</h4>
                            </button>
                            <button
                                onClick={ this.setAspectRatio.bind(this,2/3) }
                                className="item ui button"
                                style={ {
                                    width: 170*(2/3),
                                    height: '170px',
                                    backgroundImage: `url(${this.state.posterSelection.url})`,
                                    backgroundSize: 'cover'
                                } }
                            >
                                <span>600x900 (2:3)</span>
                                <h4>Poster</h4>
                            </button>
                            <button
                                onClick={ this.setAspectRatio.bind(this,4/3) }
                                className="item ui button"
                                style={ {
                                    width: 170*(4/3),
                                    height: '170px',
                                    backgroundImage: `url(${this.state.mediumhSelection.url})`,
                                    backgroundSize: 'cover'
                                } }
                            >
                                <span>800x600 (4:3)</span>
                                <h4>Medium H</h4>
                            </button>
                            <button
                                onClick={ this.setAspectRatio.bind(this,1/1) }
                                className="item ui button"
                                style={ {
                                    width: 170,
                                    height: '170px',
                                    backgroundImage: `url(${this.state.squareSelection.url})`,
                                    backgroundSize: 'cover'
                                } }
                            >
                                <span>600x600 (1:1)</span>
                                <h4>Square</h4>
                            </button>
                            <button
                                onClick={ this.setAspectRatio.bind(this,3/4) }
                                className="item ui button"
                                style={ {
                                    width: 170*(3/4),
                                    height: '170px',
                                    backgroundImage: `url(${this.state.mediumvSelection.url})`,
                                    backgroundSize: 'cover'
                                } }
                            >
                                <span>600x800 (3:4)</span>
                                <h4>Medium V</h4>
                            </button>
                        </section>
                        <section>
                            <button
                                onClick={ this.setAspectRatio.bind(this,5/1)}
                                className="item ui button"
                                style={ {
                                    width: 192*(5),
                                    height: '192px',
                                    backgroundImage: `url(${this.state.bannerSelection.url})`,
                                    backgroundSize: 'cover'
                                } }
                            >
                                <span>1600x320 (5:1)</span>
                                <h4>Banner</h4>
                            </button>
                        </section>
                    </div>
                </Form>
            </div>
        );
    }
}

Cropper.propTypes = {
    aspectRatio: React.PropTypes.number,
    guides: React.PropTypes.bool,
    style: React.PropTypes.object,
    src: React.PropTypes.string,
    onCrop: React.PropTypes.func,
    crop: React.PropTypes.func
};
Cropper.defaultProps = {
    aspectRatio: 16/9,
    defaultWidth: 1600,
    defaultHeight: 900,
    guides: false,
    src: '',
    style: {},
    onCrop: Cropper._onCrop,
    crop: Cropper._crop
};

export default Cropper;
