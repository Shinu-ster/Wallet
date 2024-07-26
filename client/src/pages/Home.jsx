// import { useState } from "react";
import Navbar from "../components/Navbar";
// import Slider from "../components/Slider";

export default function Home() {
  // const [balance, setBalance] = useState(0);

  // const handleInputChange = (event) => {
  //   const newValue = Number(event.target.value);
  //   setBalance(newValue);
  // };

  // const handleSliderChange = (value) => {
  //   setBalance(value);
  // };

  return (
    <>
      <Navbar />
      {/* <Slider balance={balance} onBalanceChange={handleSliderChange} /> */}
      {/* <input type="number" value={balance} onChange={handleInputChange} /> */}
    </>
  );
}
