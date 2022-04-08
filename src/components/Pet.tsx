import { FunctionComponent } from 'react';
import { getIsDead } from '../lib/intervals';
import moods from '../lib/moods';
interface PetProps {
  mood: string;
  lastHealthy: number;
}

const Pet: FunctionComponent<PetProps> = ({ mood, lastHealthy }) => {
  let className = 'alive';
  if (mood === moods.sick) className = 'sick';
  if (getIsDead(lastHealthy)) className = 'dead';
  return (
    <div className="petContainer">
      <div id="pet" className={className}>
        {mood}
      </div>
    </div>
  );
};

export default Pet;
