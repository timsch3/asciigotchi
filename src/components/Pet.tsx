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
  if (ageInDays < 5) size = 2;
  else if (ageInDays >= 5 && ageInDays < 30) size = ageInDays * 0.2333;
  else size = 7;
  if (mood === moods.unborn || mood === moods.hatching) size = 4;
  // set css class
  let className = 'alive';
  if (mood === moods.unborn) className = '';
  else if (mood === moods.hatching) className = 'hatching';
  else if (mood === moods.sick) className = 'sick';
  else if (mood === moods.dead) className = 'dead';
  return (
    <div className="petContainer">
      <div id="pet" className={className} style={{ fontSize: `${size}rem` }}>
        {mood}
        <div id="petShadow" style={{ width: `${size}rem`, height: `${size / 10}rem` }}></div>
      </div>
    </div>
  );
};

export default Pet;
