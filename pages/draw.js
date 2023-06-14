import React from "react";
import Navbar from "../components/Navbar";
import styles from "./draw.module.css";
import { useState } from "react";

const Draw = () => {
  const [images, setImages] = useState(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [result, setResult] = useState();

  const surpriseOptions = [
    "A blue lion on a beach",
    "A matisse style shark on the telephone",
    "A rainbow icecream",
  ];

  const surpriseFunc = () => {
    setImages(null);
    const randomValue = Math.floor(Math.random() * surpriseOptions.length);
    setValue(surpriseOptions[randomValue]);
  };
  const getImages = async () => {
    setImages(null);
    if (value === null) {
      setError("Error! You must write a search term");
      return;
    }
    console.log(value);
    ///////////////from Anja
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: value,
        }),
      };
      const response = await fetch("/api/drawserver", options);
      const data = await response.json();
      console.log(data);
      setImages(data.result);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(images);

  return (
    <div className={styles.draw}>
      <Navbar />
      <div className={styles.introSection}>
        <h1>Drawing page</h1>
        <h3>
          Did you know DALL.E can draw the craziest things for you?Let your
          imagination run wild!
        </h3>
      </div>
      <div className={styles.drawingContainer}>
        <h3>Start with a detailed description of what you want:</h3>
        <h3>Or if you feel lucky press the Surprise button!</h3>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={value}
            placeholder="An impresionist oil painting of sunflower in a purple vase ..."
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <div className={styles.surprise} onClick={surpriseFunc}>
            Surprise me!
          </div>
        </div>

        <button className={styles.button} onClick={getImages}>
          Generate
        </button>
      </div>
      <div className={styles.imageSection}>
        {images &&
          images.map((element, index) => {
            return (
              <img src={element.url} key={index} alt="Generated AI image" />
            );
          })}
      </div>
      {/* {openModal && (
        <div className={styles.overlay}>
          <Modal
            setOpenModal={setOpenModal}
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
            generateVariations={generateVariations}
          />
        </div>
      )} */}
    </div>
  );
};

export default Draw;
