import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { UploadForm } from './upload.js';
import { ValidateApp } from './validate.js';

const PageNameMap = {
  0: "upload",
  1: "validate",
  2: "train",
  3: "predict",
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "page": 0,
      "modelId": null,
    };
  }

  handleUploadSubmit = (modelId) => {
    this.setState(prevState => {
      return {
        "page": prevState.page+1, 
        "modelId": modelId
      }
    });
  }

  render() {
    const pageName = PageNameMap[this.state.page];

    let titleText;
    let renderPage;
    switch (pageName) {
      case "upload":
        titleText = "Create A Model API From a CSV File";
        renderPage = () => {
          return (
              <UploadForm onSubmit={this.handleUploadSubmit}/>
          )
        };
        break;

      case "validate":
        titleText = "Validate Data";
        renderPage = () => {
          return (
            <ValidateApp modelId={this.state.modelId} />
          );
        };
        break;

      case "train":
        titleText = "Please Wait, Model is Training";
        renderPage = () => {};
        break;

      case "predict":
        titleText = "Model API";
        renderPage = () => {};
        break;

      default:
        titleText = "Generic Title";
        renderPage = () => {};
    }
    
    return (
      <div className="home-wrapper">
        <h1 id="title-div">
          {titleText}
        </h1>
        {renderPage()}
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

