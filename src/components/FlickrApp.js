import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Form, FormGroup, FormControl, Button, InputGroup, Alert } from 'react-bootstrap';
import { flickrKey } from '../config';
import './FlickrApp.css';
import Carousel from './Carousel';

class FlickrApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
          loading: false,
          galleryID: null,
          photos: [],
          selectedPhotoID: ''
        }
    }

    handleInputChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value});
    }

    handleClick(e) {
        let galleryApiUrl = 'https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key='+ flickrKey
        + '&gallery_id='+ this.state.galleryID +'&format=json&nojsoncallback=1';

        this.setState({ loading: true });

        // Get Gallery Info
        axios.get(galleryApiUrl)
        .then(res => {
            if (res.data.photos && res.data.photos.photo.length > 0) {

                let photos = res.data.photos.photo;
                let promises = photos.map((photo) => axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key='+ flickrKey
                + '&photo_id='+ photo.id +'&secret='+ photo.secret +'&format=json&nojsoncallback=1&'));

                // Get Photo Info
                axios.all(promises).then(results => {
                    let photoObjects = results.map(item => {
                        return {
                            id: item.data.photo.id,
                            title: item.data.photo.title._content,
                            owner: item.data.photo.owner.realname !== '' ? item.data.photo.owner.realname : item.data.photo.owner.username,
                            views: item.data.photo.views,
                            taken: item.data.photo.dates.taken,
                            url: "https://farm" + item.data.photo.farm + ".staticflickr.com/" +  item.data.photo.server + "/" + item.data.photo.id + "_" + item.data.photo.secret + "_b.jpg"
                        }
                    });

                    this.setState({ photos: photoObjects, loading: false, error: '' });
                }).catch((error) => {
                    this.setState({ loading: false, error, photos: [], selectedPhotoID: '' });
                    this.handleError();
                });


            } else {
                this.setState({ error: res.data.message, loading: false, photos: [], selectedPhotoID: '' });
                this.handleError();
            }
        }).catch(error => {
            this.setState({ loading: false, error });
        });
    }

    handleError() {
        // Send Photo info to parent page
        window.parent.postMessage('', '*');
    }

    renderCarousel() {
        if (this.state.loading) {
            return (
              <div className="loader"></div>
            );
        }

        if (this.state.error && this.state.error !== '') {
            return (
                <Alert bsStyle="danger">{this.state.error}</Alert>
              );
        }

        return (
            <Carousel photos={this.state.photos} onClick={this.handleThumbnailClick.bind(this)} selectedPhotoID={this.state.selectedPhotoID} />
        )
    }

    handleThumbnailClick(e) {
        let photoInfo = _.find(this.state.photos, {id: e.target.id});
        if (this.state.selectedPhotoID !== e.target.id) {
            this.setState({ selectedPhotoID: e.target.id });
        }else{
            this.setState({ selectedPhotoID: '' });
        }

        // Send Photo info to parent page
        window.parent.postMessage(JSON.stringify(photoInfo), '*');
    }

    render() {
        return (
            <div className="container">
                <Form inline>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon>Enter Gallery ID</InputGroup.Addon>
                            <FormControl id="galleryID" name="galleryID" type="text" label="Enter Gallry ID" onChange={this.handleInputChange.bind(this)}/>{' '}
                        </InputGroup>
                    </FormGroup>{' '}
                    <Button bsStyle="primary" onClick={this.handleClick.bind(this)}>Search</Button>
                </Form>
                <hr />
                <div className="carousel-container">
                    {this.renderCarousel()}
                </div>
            </div>
        );
    }
}

export default FlickrApp;
