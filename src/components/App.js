import React, { Component } from 'react';
import { isJsonValid } from '../helper';
import './App.css';
import PhotoDetails from './PhotoDetails';

class App extends Component {
  constructor(props) {
    super(props);
    this.msgHandler = this.msgHandler.bind(this);

    this.state = {
      photoSelected: null
    }
  }

  componentDidMount() {
    // Add the listener of the message from the iframe
    window.addEventListener('message', this.msgHandler);
  }

  componentWillUnmount() {
    // Remove the listener of the message from the iframe
    window.removeEventListener("message", this.msgHandler);
  }

  msgHandler(e) {
    // Save the photo selected
    if(typeof e.data === 'string' && e.data !== '') {
      if (isJsonValid(e.data)) {
        let photoInfoObj = JSON.parse(e.data);

        if (this.state.photoSelected === null || (this.state.photoSelected !== null && this.state.photoSelected.id !== photoInfoObj.id)) {
          this.setState({ photoSelected: photoInfoObj });
          // Move focust to Photo Details
          window.location.hash = '#photoDetails';
        } else {
          this.setState({ photoSelected: null });
        }
      }
    }else{
      this.setState({ photoSelected: null });
    }
  }

  render() {
    return (
      <div className="App">
        <h3>Gallery App</h3>
        <div className="iframe-div"><iframe title="gallery" ref = {e => { this.container = e; }} src="http://localhost:3000/search" /></div>
        <div id="photoDetails">
          <PhotoDetails photoInfo={this.state.photoSelected} />
        </div>
      </div>
    );
  }
}

export default App;
