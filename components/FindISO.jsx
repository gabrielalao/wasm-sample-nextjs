
import styles from "../styles/Home.module.css";
import Camera from "./Camera";
import usePrividFaceISO from "../hooks/usePrividFaceISO";


const FindISO = () => {
    const {
        doFaceISO,
        inputImage,
        faceISOImageData,
        faceISOStatus,
        faceISOError,
      } = usePrividFaceISO();

      const handleFaceISO = () => {
        doFaceISO();
      };

  return (
    <div id="canvasInput" className={styles.container}>
      <Camera>
      {/* {faceISOStatus && ( */}
            <div
              style={{
                display: "flex",
                gap: "30px",
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <div> FACE ISO STATUS: {faceISOStatus} </div>
              <div>
                <h2>Input Image:</h2>
                {inputImage && (
                  <img style={{ maxWidth: "400px" }} src={inputImage} />
                )}
              </div>
              <div>
                <h2>Output Image:</h2>
                {faceISOImageData && (
                  <img style={{ maxWidth: "400px" }} src={faceISOImageData} />
                )}
              </div>
            </div>
          {/* )} */}
        </Camera>


      <div id="module_functions" className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleFaceISO}>
          Find ISO
        </button>
      </div>
    </div>
  );
};

export default FindISO;
