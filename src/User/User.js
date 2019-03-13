import React, { Component } from "react";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import * as tf from "@tensorflow/tfjs";

import * as mobilenet from "@tensorflow-models/mobilenet";

import "./User.css";

class User extends Component {
  state = {
    camera: true,
    photo: "",
    predictions: []
  };

  convertURIToImageData(URI) {
    return new Promise(function(resolve, reject) {
      if (URI == null) return reject();
      var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        image = new Image();
      image.addEventListener(
        "load",
        function() {
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(context.getImageData(0, 0, canvas.width, canvas.height));
        },
        false
      );
      image.src = URI;
    });
  }

  onTakePhoto(dataUri) {
    this.setState({ camera: false, photo: dataUri });

    this.convertURIToImageData(dataUri).then(imageData => {
      mobilenet
        .load()
        .then(model => {
          return model.classify(imageData);
        })
        .then(predictions => {
          this.setState({ predictions: predictions });
        });
    });
  }

  render() {
    return (
      <div className="camera-view">
        {this.state.camera ? (
          <Camera
            idealFacingMode={FACING_MODES.ENVIRONMENT}
            imageType={IMAGE_TYPES.JPG}
            onTakePhoto={dataUri => {
              this.onTakePhoto(dataUri);
            }}
          />
        ) : (
          <>
            <p>Camera:</p>
            <img
              ref="photoImage"
              className="photo-img"
              src={this.state.photo}
            />

            <ul className="prediction-list">
              {this.state.predictions.map(prediction => {
                return (
                  <li key={`prediction-${prediction.className}`}>
                    Predicted thing: {prediction.className}
                    <br />
                    Predicted percent {prediction.probability.toFixed(2)}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    );
  }
}

export default User;
