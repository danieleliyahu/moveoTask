import React from "react";

const Pad = ({
  turnOnOrOf,

  audios,
}) => {
  return (
    <div>
      <div className="allAudios container">
        {audios
          ? // if we have audios it show them on the screen

            audios.map((audio) => {
              return (
                <div
                  className={audio.onOrOff ? "audioDiv on" : "red audioDiv off"}
                  onClick={() => {
                    turnOnOrOf(audio);
                  }}>
                  <div className="audioName">{audio.name}</div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Pad;
