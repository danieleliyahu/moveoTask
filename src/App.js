import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import audioList from "./audioList";
import { useEffect, useState } from "react";
function App() {
  //  let audioList = [{
  //    num:1
  //  }]
  // audioList.map((audio) => {
  //   console.log(audio.audio.loop);
  // });
  const [playing, setPlaying] = useState([]);
  const [audios, setAudios] = useState(audioList);
  const [finish, setFinish] = useState(true);
  useEffect(() => {
    console.log("finishhh");
    playAll();
  }, [finish]);
  const addToPlaying = (e) => {
    e.onOrOff ? (e.onOrOff = false) : (e.onOrOff = true);
    setAudios([...audios]);
    console.log(
      playing.find((audio) => e === audio),
      9
    );
    if (playing.find((audio) => e === audio)) {
      setPlaying(playing.filter((audio) => e !== audio));
      e.audio.pause();

      // setPlaying([...playing, e]);
    } else {
      setPlaying([...playing, e]);
      console.log(playing, "sss");
    }
    if (playing.find((audio) => e === audio)) {
      setPlaying(playing.filter((audio) => e !== audio));
      e.audio.pause();

      // setPlaying([...playing, e]);
    } else {
      setPlaying([...playing, e]);
      console.log(playing, "sss");
    }
  };
  const pauseAll = () => {
    audios.map((audio) => {
      audio.audio.pause();
    });
  };
  const playAll = () => {
    console.log("start");
    console.log(playing);

    // playing.map((audio) => {
    //   audio.audio.onended = function () {
    //     setFinish(finish ? false : true);
    //   };
    //   audio.audio.currentTime = 0;

    //   audio.audio.play();
    // });
    audios.map((audio) => {
      if (!audio.onOrOff) return;
      audio.audio.onended = function () {
        setFinish(finish ? false : true);
      };
      audio.audio.currentTime = 0;

      audio.audio.play();
    });
  };
  // navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  //   const mediaRecorder = new MediaRecorder(stream);
  //   mediaRecorder.start();

  //   const audioChunks = [];
  //   mediaRecorder.addEventListener("dataavailable", (event) => {
  //     audioChunks.push(event.data);
  //   });

  //   mediaRecorder.addEventListener("stop", () => {
  //     const audioBlob = new Blob(audioChunks);
  //     const audioUrl = URL.createObjectURL(audioBlob);
  //     const audio = new Audio(audioUrl);
  //     audio.play();
  //   });

  //   setTimeout(() => {
  //     mediaRecorder.stop();
  //   }, 3000);
  // });

  // const mediaStreamDestination = audioContext.createMediaStreamDestination();

  // yourSourceNode.connect(mediaStreamDestination);
  // const mediaRecorder = new MediaRecorder(mediaStreamDestination.stream);

  // mediaRecorder.addEventListener('dataavailable', (e) => {
  //   // Recorded data is in `e.data`
  // });

  // mediaREcorder.start();

  return (
    <div className="App">
      <Header />
      <div className="playBar">
        {" "}
        <button onClick={playAll}>Play</button>
        <button onClick={pauseAll}>pause</button>
      </div>
      <div className="allAudios container">
        {audios
          ? audios.map((audio) => {
              return (
                <div
                  className={audio.onOrOff ? "audioDiv on" : "red audioDiv off"}
                  onClick={() => {
                    addToPlaying(audio);
                  }}>
                  <div className="audioName">{audio.name}</div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default App;
