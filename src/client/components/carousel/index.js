import React from "react";

import "./index.scss";

const CarouselView = ({
  images,
  content,
}) =>
  <div className="Carousel">
    {images.map((image, key) =>
      <div className={`Carousel-image Carousel-image--${image.state}`} key={key}>
        <img src={image.src} />
      </div>
    )}
    <div className="Carousel-content">
      {content}
    </div>
  </div>;

class Carousel extends React.Component {

  static CycleSeconds = 10;

  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    this.init(this.props);
  }

  componentWillReceiveProps(props) {
    this.init(props);
  }

  componentWillUnmount() {
    if (this._timer)
      clearTimeout(this._timer);
  }

  init(props) {
    this._index = -1;
    this._images = props.images;
    this._cycleSeconds = props.cycleSeconds || Carousel.CycleSeconds;

    if (this._timer)
      clearTimeout(this._timer);

    if (!Array.isArray(this._images))
      return;
    if (!this._images.length)
      return;
    
    this.next();
  }

  next() {
    this._index = (this._index + 1) % this._images.length;
    const indexLast = (this._index - 1) % this._images.length;
    const indexNext = (this._index + 1) % this._images.length;
    
    const pointer = this._index % 3;
    const pointerNext = (pointer + 1) % 3;
    const pointerLast = (pointer + 2) % 3;

    this.setState({
      images: Object.assign([], {
          [pointer]: {
            state: "show",
            src: this._images[this._index],
          },
          [pointerNext]: {
            state: "hide",
            src: this._images[indexNext],
          },
          [pointerLast]: {
            state: "hide",
            src: this._images[indexLast],
          },
        }),
    });

    this._timer = setTimeout(() =>
      this.next()
    , 1000 * this._cycleSeconds);
  }

  render() {
    return CarouselView({
      ...this.props,
      ...this.state,
    });
  }
}

export default Carousel;
