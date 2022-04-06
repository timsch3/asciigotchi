import { FunctionComponent } from 'react';
import moods from '../lib/moods';
import { reset } from '../lib/storage';

interface TopBarProps {
  setMood: (a: string) => void;
  age: number;
  setBirthTime: (a: number | undefined) => void;
}

const TopBar: FunctionComponent<TopBarProps> = ({ setMood, age, setBirthTime }) => {
  return (
    <div className="topBar">
      <span id="age">Age: {(age / 86400).toFixed(1)} days</span>
      <button
        id="resetButton"
        onClick={() => {
          setBirthTime(undefined);
          setMood(moods.unborn);
          reset();
        }}
      >
        RESET
      </button>
    </div>
  );
};

export default TopBar;
