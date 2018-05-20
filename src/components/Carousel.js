import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick'
import './Carousel.css';

class Carousel extends Component {
    render () {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
        {this.props.photos.map((photo, index) => {
            let thumbnailClass = 'thumbnail';
            if (this.props.selectedPhotoID === photo.id) {
                thumbnailClass = 'thumbnail thumbnail-active';
            }

            return (
                <div key={index}><img id={photo.id} alt={photo.title} className={thumbnailClass} src={photo.url} onClick={this.props.onClick}/></div>
            );
        })}
        </Slider>
    );
    }
}

Carousel.propTypes = {
    photos: PropTypes.array.isRequired,
    onClick: PropTypes.func,
    selectedPhotoID: PropTypes.string,
};

export default Carousel;