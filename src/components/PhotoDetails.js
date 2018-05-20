import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import moment from 'moment';
import './PhotoDetails.css';

const PhotoDetails = (props) => {
    if (props.photoInfo && props.photoInfo.id){
        return (
            <div className="photo-details-box">
                <h3>Photo Details</h3>
                <ListGroup>
                    <ListGroupItem header="Title" className="photo-details">{props.photoInfo.title}</ListGroupItem>
                    <ListGroupItem header="Taken" className="photo-details">{moment(props.photoInfo.taken).format("dddd, MMMM Do YYYY")}</ListGroupItem>
                    <ListGroupItem header="Views" className="photo-details">{props.photoInfo.views}</ListGroupItem>
                    <ListGroupItem header="Owner" className="photo-details">{props.photoInfo.owner}</ListGroupItem>
                </ListGroup>
                <hr />
            </div>
        );
    }
    return null;
}

export default PhotoDetails;