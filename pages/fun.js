import React from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import { useState } from "react";
import styles from "./fun.module.css";

const Fun = () => {
  const [images, setImages] = useState(null);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const imgArray = [
    "/images/cat.png",
    "/images/dog.png",
    "/images/person.png",
    "/images/test.png",
  ];
  const uploadImage = async (e) => {
    setImages(null);
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    setOpenModal(true);
    setSelectedImage(e.target.files[0]);

    e.target.value = null;
    //send image to backend
    try {
      const options = {
        method: "POST",
        body: formData,
      };
      const response = await fetch("/api/upload", options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const generateVariations = async () => {
    console.log("Inside generate variations function:");
    console.log(selectedImage);

    setImages(null);
    if (selectedImage === null) {
      setError("Error! No file selected");
      setOpenModal(false);
      return;
    }
    try {
      console.log("Sending post request");
      const options = {
        method: "POST",
        body: JSON.stringify(selectedImage),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("api/variations", options);
      const data = await response.json();
      console.log(data);
      setImages(data);
      setError(null);
      setOpenModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  const clickHandler = (e) => {
    e.preventDefault();
    console.log(e.target.src);
    setSelectedImage(e.target.src);
  };

  return (
    <div className={styles.fun}>
      <Navbar />
      <div className={styles.funContainer}>
        <h1>Fun Page</h1>
        <h3>Choose one image:</h3>
        <div className={styles.imageSection}>
          {imgArray.map((el, index) => {
            return (
              <img src={el} alt={"Image"} key={index} onClick={clickHandler} />
            );
          })}
        </div>
        <button className={styles.button} onClick={generateVariations}>
          Generate Variations
        </button>
      </div>
      <div className={styles.resultSection}>
        {images
          ? images.map((image, index) => {
              return (
                <img
                  key={index}
                  src={image.url}
                  alt={`Generated image of ${value}`}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Fun;

{
  /* <section className="uploadSection">
        <p className="extra-info">
          Or,
          <span>
            <label htmlFor="files"> upload an image </label>
            <input
              onChange={uploadImage}
              type="file"
              id="files"
              accept="image/*"
              hidden
            />
          </span>
          to edit.
        </p>
        {error && <p>{error}</p>}
        {openModal && (
          <div className={styles.overlay}>
            <Modal
              setOpenModal={setOpenModal}
              setSelectedImage={setSelectedImage}
              selectedImage={selectedImage}
              generateVariations={generateVariations}
            />
          </div>
        )}
      </section> */
}
