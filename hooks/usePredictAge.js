import { useState } from "react";
import { predictAge } from "@privateid/cryptonets-web-sdk";

const usePredictAge = () => {
  const [age, setAge] = useState(null);

  const predictAgeCallback = (response) => {
    console.log("RESPONSE USEPREDICT FE: ", response);
    const { faces } = response.returnValue;
    if (faces.length === 0) {
      setAge(null);
    } else {
      for (let index = 0; faces.length > index; index++) {
        const { status, age } = faces[index];

        if (age > 0) {
          setAge(age);
          index = faces.length;
        }

        if (index + 1 === faces.length && age <= 0) {
          setAge(null);
        }
      }
    }
    doPredictAge();
  };

  const doPredictAge = async () => {
    const data = await predictAge(null, predictAgeCallback);
  };

  return { doPredictAge, age };
};

export default usePredictAge;
