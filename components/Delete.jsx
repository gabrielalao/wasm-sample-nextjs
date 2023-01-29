
import styles from "../styles/Home.module.css";
import Camera from "./Camera";
import { usePredictOneFa, useDelete } from "../hooks";
import { useEffect, useState } from "react";

const Delete = () => {
    const [currentAction, setCurrentAction] = useState(null);
    const [deletionStatus, setDeletionStatus] = useState(null);
    const handlePredictSuccess = (result) => {
        console.log("======PREDICT SUCCESS========");
      };
      const {
        predictOneFaData,
        predictUserOneFa,
      } = usePredictOneFa("userVideo", handlePredictSuccess);
      const handlePredictOneFa = async () => {
        predictUserOneFa();
      };

      const handleDelete = async () => {
        setDeletionStatus(null);
        setCurrentAction("useDelete");
        predictUserOneFa();
      };

      const useDeleteCallback = (deleteStatus) => {
        setDeletionStatus(deleteStatus);
      };
      const { loading, onDeleteUser } = useDelete(useDeleteCallback);

        // deleting
  useEffect(() => {
    if (currentAction === "useDelete") {
      if (predictOneFaData) {
        onDeleteUser(predictOneFaData.PI.uuid);
      }
    }
  }, [currentAction, predictOneFaData]);

  return (
    <div id="canvasInput" className={styles.container}>
      <Camera>
      {currentAction === "useDelete" && (
            <div>
              <div>{`Deletion Status: ${deletionStatus}`}</div>
              <div>{`User UUID: ${
                predictOneFaData ? predictOneFaData?.PI?.uuid : ""
              }`}</div>
            </div>
          )}
        </Camera>


      <div id="module_functions" className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Delete;
