import CircularSlider from '@fseehawer/react-circular-slider';


export default function Slider({ balance, onBalanceChange }) {
  return (
    <CircularSlider
      label="savings"
      labelColor="#005a58"
      knobColor="#005a58"
      progressColorFrom="#00bfbd"
      progressColorTo="#009c9a"
      progressSize={24}
      trackColor="#eeeeee"
      trackSize={24}
      value={balance}
      max={100000}
      onChange={onBalanceChange}
    />
  )
}

