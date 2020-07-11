import React from 'react';
import { FormGroup } from "@blueprintjs/core";
import axios from 'axios';
import './blueprint.css'
import './upload.css'
import { Button, FileInput } from "@blueprintjs/core";

function uploadFail(error) {
  return {
    type: 'UPLOAD_DOCUMENT_FAIL',
    error,
  };
}

export class UploadForm extends React.Component {
  constructor(props) {
    super(props);

    this.props = {
      ...this.props,
      "defaultFileName": "Choose file...",
    };

    this.state = {
      "file" : undefined,
      "fileName": this.props.defaultFileName,
      "fileInputSelected" : false,
    };
  }

  submitUploadFormHandler = (event) => {

    if (!this.state.fileInputSelected) {
      // TODO: display Error asking user to upload file
      this.props.errorCallback("Please upload a file.");
      return;
    }

    const file = this.state.file;

    let data = new FormData();
    data.append('file', file);
    data.append('headers', {"Access-Control-Allow-Origin": "http://localhost:5000"})
    axios.post('http://localhost:5000/create', data)
      .then(response => {
        this.props.onSubmit(response.data);
      })
      .catch(error => {
        console.log(uploadFail(error));
        this.props.errorCallback("Connection Error - Unable to process your request. Please try again later.");
      });
  }

  handleFileInputChange = (event) => {
    const file = event.nativeEvent.target.files[0];

    if (file === undefined) {
      // User clicked Cancel when the upload dialogue came up
      this.setState({
        "file": undefined,
        "fileName": this.props.defaultFileName,
        "fileInputSelected": false,
      });
    } else {
      this.setState({
        "file": file,
        "fileName": file.name,
        "fileInputSelected": true,
      });
    }
  }

  render() {
    return (
      <div id="upload-form">
        <FormGroup label="Select a csv file"
          helperText="Select a csv file with training and testing data to train the model on. Data must be in the long format (columns)."
          >
          <FileInput className={this.state.fileInputSelected && "bp3-file-input-has-selection"} 
            text={this.state.fileName}
            onInputChange={this.handleFileInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Button 
            className="submit-button"
            text="Submit"
            onClick={this.submitUploadFormHandler}
            intent="primary"
          />
        </FormGroup>
      </div>
      )
  }
}