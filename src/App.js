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
    e.path ? (e.path = false) : (e.path = true);
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
  };
  const pauseAll = () => {
    playing.map((audio) => {
      audio.audio.pause();
    });
  };
  const playAll = () => {
    console.log("start");
    console.log(playing);
    playing.map((audio) => {
      audio.audio.onended = function () {
        console.log(audio.audio.currentTime, "hiiiii");
        setFinish(finish ? false : true);
      };
      console.log(audio.audio.currentTime, "stop", audio.name);
      audio.audio.currentTime = 0;
      audio.audio.play();
      console.log(audio.audio.currentTime, "start", audio.name);
    });
  };
  return (
    <div className="App">
      <Header />
      {console.log(playing)}
      {audios
        ? audios.map((audio) => {
            return (
              <div
                className={audio.path ? "green" : "red"}
                onClick={() => {
                  addToPlaying(audio);
                }}>
                {audio.path.toString()}
                <div>hi</div>
              </div>
            );
          })
        : ""}
      <button onClick={playAll}>Play</button>
      <button onClick={pauseAll}>pause</button>
      {playing.map((audio) => {
        return audio.name;
      })}
      {/* {audioList.map((audio) => {
        audio.audio.loop = true;
        return (
          <audio controls>
            <source src={audio.path} type="audio/mpeg"></source>
          </audio>
        );
      })} */}
    </div>
  );
}

export default App;
