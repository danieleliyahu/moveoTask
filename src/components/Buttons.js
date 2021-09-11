import React from "react";

const Buttons = ({ save, playAll, pauseAll, changeHandler }) => {
  return (
    <div>
      <div className="playBar">
        {/* save the client choices */}
        <button className="save" onClick={save}>
          Save
        </button>
        {/* load the file that save the player choice */}
        <label for="files">Load</label>
        <input
          className="hidden"
          type="file"
          id="files"
          name="file"
          onChange={changeHandler}
        />
        {/* play all the audio that in on state */}
        <button onClick={playAll}>Play</button>
        {/* pause all the audio that in off state */}
        <button onClick={pauseAll}>Pause</button>
      </div>
    </div>
  );
};

export default Buttons;
