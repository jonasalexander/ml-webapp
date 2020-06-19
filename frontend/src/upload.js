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

    this.state = {
      "file" : "Choose file...",
      "fileInputSelected" : false
    };
  }

  submitUploadFormHandler = (event) => {

    if (!this.state.fileInputSelected) {
      return;
    }

    const file = this.state.file;

    let data = new FormData();
    data.append('file', file);
    data.append('name', 'csv');
    data.append('headers', {"Access-Control-Allow-Origin": "http://localhost:5000"})
    axios.post('http://localhost:5000/create', data)
      .then(response => {
        const modelId = response.data;
        this.props.onSubmit(modelId);
        console.log(modelId);
      })
      .catch(error => console.log(uploadFail(error)));
    
  }

  handleFileInputChange = (event) => {
    this.setState({
      "file": event.nativeEvent.target.files[0],
      "fileInputSelected": true,
    })
  }

  render() {
    return (
      <div id="upload-form">
        <FormGroup label="Select a csv file" helperText="Select a csv file with training and testing data to train the model on. Data must be in the long format (columns).">
          <FileInput className={this.state.fileInputSelected && "bp3-file-input-has-selection"} 
            text={this.state.file.name} 
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