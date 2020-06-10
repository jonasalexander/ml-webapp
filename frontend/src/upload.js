import React from 'react';
import axios from 'axios';

function uploadSuccess({ data }) {
  return {
    type: 'UPLOAD_DOCUMENT_SUCCESS',
    data,
  };
}

function uploadFail(error) {
  return {
    type: 'UPLOAD_DOCUMENT_FAIL',
    error,
  };
}

export class UploadText extends React.Component {
  render() {
    return (
      <h3 className="instructions">
        Please submit a csv file with the data to use for training,
        validation and testing.
        </h3>
      )
  }
}

export class UploadForm extends React.Component {
  uploadHandler(event) {
    console.log(event.target.files[0]);

    let data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('name', 'csv');
    data.append('headers', {"Access-Control-Allow-Origin": "http://localhost:5000"})
    axios.post('http://localhost:5000', data)
      .then(response => console.log(uploadSuccess(response)))
      .catch(error => console.log(uploadFail(error)));
  }

  render() {
    return (
      <input type="file"
            name="file"
            className="upload-form"
            onChange={this.uploadHandler}
      />
      )
  }
}