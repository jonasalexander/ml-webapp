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
      "modelId": undefined,
      "modelName": undefined,
      "csvPreview": [],
      "errorMessage": undefined,
    };
  }

  setTemporaryError = (errorMessage, time=5) => {
    this.setState({"errorMessage": errorMessage});
    setTimeout(() => {this.setState({"errorMessage": undefined});}, time*1000);
  }

  handleUploadSubmit = (uploadData) => {
    if (uploadData === undefined) {
      this.setTemporaryError("Server Error - Unable to process your request. Please try again later.", 10);
      return;
    }
    this.setState(prevState => {
      return {
        "page": prevState.page+1, 
        "modelId": uploadData.model_id,
        "modelName": uploadData.model_name,
        "csvPreview": uploadData.csv_data,
      }
    });
  }

  render() {
    const pageName = PageNameMap[this.state.page];

    let titleText;
    let renderPage;
    switch (pageName) {
      case "upload":
        titleText = "Create a Prediction API from a CSV File";
        renderPage = () => {
          return (
              <UploadForm
                onSubmit={this.handleUploadSubmit}
                errorCallback={this.setTemporaryError}
              />
          )
        };
        break;

      case "validate":
        titleText = `Validate Data for Model: "${this.state.modelName}"`;
        renderPage = () => {
          return (
            <ValidateApp
              modelId={this.state.modelId}
              modelName={this.state.modelName}
              csvPreview={this.state.csvPreview}
            />
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
        <h1 className="title-div">
          {titleText}
        </h1>
        <div className="error-message-wrapper">
          {this.state.errorMessage !== undefined && (
            <div className="error-message">{this.state.errorMessage}</div>
          )}
        </div>
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

