import { FunctionComponent } from 'react';
import moods from '../lib/moods';
import { reset } from '../lib/storage';
import { getHunger, getLoneliness, getDirtiness } from '../lib/intervals';

interface TopBarProps {
  setMood: (a: string) => void;
  age: number;
  setBirthTime: (a: number | undefined) => void;
  lastFed: number;
  lastPetted: number;
  lastCleaned: number;
}

const TopBar: FunctionComponent<TopBarProps> = ({
  setMood,
  age,
  setBirthTime,
  lastFed,
  lastCleaned,
  lastPetted,
}) => {
  let hungerLevel = [];
  for (let i = 0.0; i < getHunger(lastFed); i++) {
    hungerLevel.push('█');
  }
  let lonelinessLevel = [];
  for (let i = 0.0; i < getLoneliness(lastPetted); i++) {
    lonelinessLevel.push('█');
  }
  let dirtinessLevel = [];
  for (let i = 0.0; i < getDirtiness(lastCleaned); i++) {
    dirtinessLevel.push('█');
  }
  return (
    <div id="topBar">
      <span id="uiContainer">
        <table cellSpacing={0}>
          <tr>
            <th>Age:</th>
            <td>{(age / 86400).toFixed(1)} days</td>
          </tr>
          <tr>
            <th>Hunger:</th>
            <td>{hungerLevel.join(' ')}</td>
          </tr>
          <tr>
            <th>Loneliness:</th>
            <td>{lonelinessLevel.join(' ')}</td>
          </tr>
          <tr>
            <th>Dirtiness:</th>
            <td>{dirtinessLevel.join(' ')}</td>
          </tr>
        </table>
      </span>
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
