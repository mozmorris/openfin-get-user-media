/**
 *
 * AudioCapture component
 *
 */

import React from "react";

class AudioCapture extends React.Component {
  state = {
    audioURL: undefined,
    chunks: [],
    mediaRecorder: undefined
  };

  handleStartClick = () => {
    const constraints = { video: false, audio: true };

    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.addEventListener("dataavailable", this.handleAudioData);
      mediaRecorder.addEventListener("stop", this.handleStop);

      mediaRecorder.start();

      this.setState({ mediaRecorder, audioURL: undefined });
    });
  };

  handleStopClick = () => {
    const {
      state: { mediaRecorder }
    } = this;

    mediaRecorder.stop();
  };

  handleAudioData = event => this.setState(prevState => ({
    chunks: prevState.chunks.concat(event.data)
  }));

  handleStop = () => {
    const {
      state: { chunks }
    } = this;

    const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
    const audioURL = URL.createObjectURL(blob);

    this.setState({
      chunks: [],
      mediaRecorder: undefined,
      audioURL
    });
  };

  render() {
    const {
      state: { mediaRecorder, audioURL }
    } = this;

    return (
      <div>
        {!!mediaRecorder || (
          <button onClick={this.handleStartClick} type="button">
            Start Capture
          </button>
        )}
        {!!mediaRecorder && (
          <button onClick={this.handleStopClick} type="button">
            Stop Capture
          </button>
        )}
        <div>
          {audioURL && <audio src={audioURL} controls />}
        </div>
      </div>
    );
  }
}

export default AudioCapture;
