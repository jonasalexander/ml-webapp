import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {UploadForm, UploadText} from './upload.js';

class Title extends React.Component {
  render() {
    if (this.props.page === "upload") {
      return (<h1>Create A Model API From a CSV File</h1>)
    }
    else {
      return (<h1>Generic Title</h1>)
    }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "page": "upload"
    };
  }

  render() {
    return (
      <div className="home-wrapper">
        <Title id="title-div" page={this.state.page}/>
        <div id="upload-wrapper">
          <UploadText/>
          <UploadForm/>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

