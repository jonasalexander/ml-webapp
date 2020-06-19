import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { UploadForm } from './upload.js';

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

class UploadApp extends React.Component {
  constructor(props) {
    super(props);
    this.pageNameMap = {
      0: "upload",
      1: "validate",
    }
    this.state = {
      "page": 0
    };
  }

  handleUploadSubmit = () => {
    this.setState(prevState => {return {"page": prevState.page+1}})
  }

  render() {
    const pageName = this.pageNameMap[this.state.page];

    if (pageName === "upload") {
      return (
        <div className="home-wrapper">
          <Title id="title-div" page={pageName}/>
          <div id="upload-wrapper">
            <UploadForm onSubmit={this.handleUploadSubmit}/>
          </div>
        </div>
      );
    }
    else if (pageName === "validate") {
      return (
        <div className="home-wrapper">
          <Title id="title-div" page={pageName}/>
        </div>
      );
    }
    
  }
}

// ========================================

ReactDOM.render(
  <UploadApp />,
  document.getElementById('root')
);

