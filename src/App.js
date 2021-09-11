import FileSaver from "file-saver";
import "./App.css";
import Header from "./components/Header";
import audioList from "./audioList";
import { useEffect, useState } from "react";
import Pad from "./components/Pad";
import Buttons from "./components/Buttons";
function App() {
  const [audios, setAudios] = useState(audioList);
  const [finish, setFinish] = useState(true);

  useEffect(() => {
    playAll();
  }, [finish]);
  // when the app uploaded first it check if we have some thing at the local storage
  // if we have it use that information
  useEffect(async () => {
    localStorage.getItem("audiosList")
      ? setAudios(
          JSON.parse(localStorage.getItem("audiosList")).map((audio) => {
            audio.audio = new Audio(audio.path);
            return audio;
          })
        )
      : setAudios(
          audios.map((audio) => {
            audio.audio = new Audio(audio.path);
            return audio;
          })
        );
  }, []);
  // pause all the on audios
  const pauseAll = () => {
    audios.map((audio) => {
      if (!audio.onOrOff) return;

      audio.audio.pause();
    });
  };
  // play all songs that on
  const playAll = () => {
    audios.map((audio) => {
      if (!audio.onOrOff) return;
      // check if the audio finish to be played change the
      //  state to finish the react fill the change and execute the playAll function again
      audio.audio.onended = function () {
        setFinish(finish ? false : true);
      };
      // restart the time of all songs to make them start together
      audio.audio.currentTime = 0;

      audio.audio.play();
    });
  };

  // change the state of the audio and save it on local storage
  const turnOnOrOf = (audio) => {
    audio.onOrOff ? (audio.onOrOff = false) : (audio.onOrOff = true);
    audio.audio.pause();
    setAudios([...audios]);
    localStorage.setItem("audiosList", JSON.stringify(audios));
  };
  // function that executed when the save butten clicked it save txt file that
  // contain in it the object with all of the choice that the client made
  const save = async () => {
    let audioList = JSON.stringify(audios);
    var blob = new Blob([audioList], { type: "text/plain;charset=utf-8" });

    FileSaver.saveAs(blob, "audiosList.txt");
  };

  const changeHandler = async (event) => {
    new Promise((res, rej) => {
      res(event.target.files[0]);
    })
      .then(async (file) => {
        pauseAll();
        var text = await file.text();

        handleSubmission(JSON.parse(text));
        localStorage.setItem("audiosList", text);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleSubmission = async (file) => {
    console.log(file);

    file = file.map((audio) => {
      audio.audio = new Audio(audio.path);
      return audio;
    });
    setAudios(file);
    localStorage.setItem("audiosList", JSON.stringify(file));
  };
  return (
    <div className="App">
      <Header />
      <Buttons
        save={save}
        playAll={playAll}
        pauseAll={pauseAll}
        changeHandler={changeHandler}
      />
      <Pad
        turnOnOrOf={turnOnOrOf}
        playAll={playAll}
        pauseAll={pauseAll}
        audios={audios}
        setAudios={setAudios}
        finish={finish}
        setFinish={setFinish}></Pad>
    </div>
  );
}

export default App;
