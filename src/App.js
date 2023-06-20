import "./styles.css";

import { useState } from "react";
import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment
} from "@rive-app/react-canvas";

export default function App() {
  const skinMapping = {
    Skin_0: "Plain",
    Skin_1: "Summer",
    Skin_2: "Elvis",
    Skin_3: "Superhero",
    Skin_4: "Astronaut"
  };
  const stateMachineName = "Motion";
  const stateMachineInputName = "Skin";
  const [skinText, setSkinText] = useState(skinMapping["Skin_0"]);
  const { rive, RiveComponent } = useRive({
    src: "skins_demo.riv",
    stateMachines: stateMachineName,
    // TODO: Set stateMachines
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center
    }),
    onStateChange: (event) => {
      const skinName = event.data.filter((data) => data.indexOf("Skin_") > -1);
      const skinTextDisplay = skinMapping[skinName];
      if (skinTextDisplay) {
        setSkinText(skinTextDisplay);
      }
    }
  });

  if (rive) {
    console.log(rive.contents);
  }

  // State machine - "Motion"
  // Trigger input - "Skin"
  // TODO: Get a reference to the state machine input
  const skinInput = useStateMachineInput(
    rive,
    stateMachineName,
    stateMachineInputName
  );
  const onClick = () => {
    skinInput.fire();
  };
  return (
    <div className="App">
      <h1>Choose an Avatar</h1>
      <button className="skin-btn" onClick={onClick}>
        Swap Skin
      </button>
      <div className="container">
        <RiveComponent />
      </div>
      <div className="skin-container">Skin: {skinText}</div>
    </div>
  );
}
