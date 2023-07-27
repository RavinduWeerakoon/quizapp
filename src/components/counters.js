import React, { useState } from "react";
import { GiPhone } from "react-icons/gi";
import { LuFileAudio } from "react-icons/lu";
import myImage from "../images/telephone-gb610ef38d_1280.png";

import guess from "../sounds/guess.mp3";
import s0 from "../sounds/0.mp3";
import s1 from "../sounds/1.mp3";
import s2 from "../sounds/2.mp3";
import s3 from "../sounds/3.mp3";
import s4 from "../sounds/4.mp3";
import s5 from "../sounds/5.mp3";
import s6 from "../sounds/6.mp3";
import s7 from "../sounds/7.mp3";
import s8 from "../sounds/8.mp3";
import s9 from "../sounds/9.mp3";

const Counters = ({setUserAnswer, userAnswer, url}) => {
  const [p, setP] = useState("");
  const audioFiles = {
    0: s0,
    1: s1,
    2: s2,
    3: s3,
    4: s4,
    5: s5,
    6: s6,
    7: s7,
    8: s8,
    9: s9,
  };

  const handNumPad = (e) => {
    const newP = p + e.target.id;
    setP(newP);
    setUserAnswer(newP);
    console.log(userAnswer);
    new Audio(audioFiles[e.target.id]).play();
  };


  const handdeleteNum = () => {
    const newP = p;
    const upP = newP.slice(0, -1);
    setP(upP);
  };

  const playAudio = () => {
    const audioEl = document.getElementsByClassName("audio-element")[0];
    audioEl.pause();
    audioEl.play();
  };

  const buttonStyle = {
    padding: "20px 40px",
    fontSize: "16px",
    backgroundColor: "rgba(0, 190, 190, 0.1) !important",
    border: "1px solid #00bebe",
  };

  const inputTextStyle = {
    width: "100%",
    fontSize: "2rem",
    textAlign: "center",
    backgroundColor: "#00dcdc22",
    borderRadius: "3px",
    color: "white",
    border: "1px #00bebe solid",
    padding: "0.5rem",
    paddingInline: "1.5rem",
  };

  const playButtonStyle = {
    fontSize: "3rem",
    border: "0px",
    aspectRatio: "1/1",
    backgroundColor: "rgba(0, 190, 190, 0.1)",
    filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)",
    borderRadius: "80%",
  };

  return (
    <div>
      {/* <button
        onClick={handAudioFile}
        className="btn btn-primary btn-sm m-2">
        <LuFileAudio />
      </button>  */}

      <div>
      <div><iframe width="300" height="60" src={url.replace("https://voca.ro", "https://vocaroo.com/embed")} frameborder="0" allow="autoplay"></iframe><br/><a href="https://voca.ro/1aMjzvOZEEPV" title="Vocaroo Voice Recorder" target="_blank">View on Vocaroo &gt;&gt;</a></div>
      </div>
      <div class="mx-auto">
        <input
          type="text"
          name="topicBox"
          placeholder="Enter Tray Number..."
          value={p}
          style={inputTextStyle}
        />

        <div class="d-flex justify-content-center">
          <button
            id={1}
            onClick={handNumPad}
            className="btn btn-primary btn-sm m-2"
            style={buttonStyle}
          >
            1
          </button>
          <button
            id={2}
            onClick={handNumPad}
            className="btn btn-primary btn-sm m-2"
            style={buttonStyle}
          >
            2
          </button>
          <button
            id={3}
            onClick={handNumPad}
            className="btn btn-primary btn-sm m-2"
            style={buttonStyle}
          >
            3
          </button>
        </div>

        <div class="d-flex justify-content-center">
          <button
            id={4}
            onClick={handNumPad}
            className="btn btn-primary btn-sm m-2"
            style={buttonStyle}
          >
            4
          </button>
          <button
            id={5}
            onClick={handNumPad}
            className="btn btn-primary btn-sm m-2"
            style={buttonStyle}
          >
            5
          </button>
          <button
            id={6}
            onClick={handNumPad}
            className="btn btn-primary btn-sm m-2"
            style={buttonStyle}
          >
            6
          </button>
        </div>

        <div class="d-flex justify-content-center">
          <button
            id={7}
            onClick={handNumPad}
            className="btn btn-primary btn-sm m-2"
            style={buttonStyle}
          >
            7
          </button>
          <button
            id={8}
            onClick={handNumPad}
            className="btn btn-primary m-2"
            style={buttonStyle}
          >
            8
          </button>
          <button
            id={9}
            onClick={handNumPad}
            className="btn btn-primary m-2"
            style={buttonStyle}
          >
            9
          </button>
        </div>
        <div class="d-flex justify-content-center">
        <button
          onClick={handdeleteNum}
          className="btn btn-primary m-2"
          style={buttonStyle}
        >
          X
        </button>
        <button
          id={0}
          onClick={handNumPad}
          className="btn btn-primary m-2"
          style={buttonStyle}
        >
          0
        </button>
        <button className="btn btn-primary m-2" style={buttonStyle}></button>
        </div>
      </div>
    </div>
  );
};

export default Counters;
