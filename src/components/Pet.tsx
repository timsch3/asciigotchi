import { FunctionComponent } from 'react';
import moods from '../lib/moods';
interface PetProps {
  mood: string;
  age: number;
  lastHealthy: number;
}

const Pet: FunctionComponent<PetProps> = ({ mood, age, lastHealthy }) => {
  // set pet size according to age
  const ageInDays = Math.round(age / 86400);
  let size;
  let shadowStyle;
  if (ageInDays < 5) size = 2;
  else if (ageInDays >= 5 && ageInDays < 30) size = ageInDays * 0.2333;
  else size = 7;
  size = 7;
  if (mood === moods.unborn || mood === moods.hatching) {
    size = 4;
    shadowStyle = { width: `${size / 3}rem`, height: `${size / 20}rem` };
  } else {
    shadowStyle = { width: `${size}rem`, height: `${size / 10}rem` };
  }
  // set css class
  let className = 'alive';
  switch (mood) {
    case moods.unborn:
      className = ' ';
      break;
    case moods.hatching:
      className = 'hatching';
      break;
    case moods.sick:
      className = 'sick';
      break;
    case moods.dead:
      className = 'dead';
      break;
    case moods.fed:
      className = 'fed';
      break;
    case moods.petted:
      className = 'petted';
      break;
    case moods.cleaned:
      className = 'cleaned';
      break;
  }
  return (
    <div className="petContainer">
      <div id="pet" className={className} style={{ fontSize: `${size}rem` }}>
        {mood}
      </div>
      <div id="petShadow" style={shadowStyle}></div>
    </div>
  );
};

export default Pet;
