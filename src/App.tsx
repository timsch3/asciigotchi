import './App.css';
import { useState, useEffect } from 'react';
import ActionsMenu from './components/ActionsMenu';
import Pet from './components/Pet';
import moods from './lib/moods';
import { intervals, getNow } from './lib/intervals';
import { save, load } from './lib/storage';
import { useElapsedTime } from 'use-elapsed-time';

function App() {
  const [mood, setMood] = useState(moods.happy);
  const [justReceived, setJustReceived] = useState(false);
  const [lastFed, setLastFed] = useState(load('lastFed') || getNow());
  const [lastPetted, setLastPetted] = useState(load('lastPetted') || getNow());
  const [lastCleaned, setLastCleaned] = useState(load('lastCleaned') || getNow());

  // use to trigger useEffect every second
  const { elapsedTime } = useElapsedTime({
    isPlaying: true,
    updateInterval: 1,
  });

  useEffect(() => {
    // just reveived cooldown
    if (justReceived) {
      setJustReceived(false);
      return;
    }
    // check needs and set mood
    setMood(moods.happy);
    let hungry = false,
      lonely = false,
      dirty = false;
    if (getNow() - lastFed > intervals.hunger) hungry = true;
    if (getNow() - lastPetted > intervals.loneliness) lonely = true;
    if (getNow() - lastCleaned > intervals.dirtiness) dirty = true;
    if (hungry) {
      setMood(moods.hungry);
      if (lonely && dirty) setMood(moods.hungryLonelyAndDirty);
      else if (lonely) setMood(moods.hungryAndLonely);
      else if (dirty) setMood(moods.hungryAndDirty);
    } else if (lonely) {
      setMood(moods.lonely);
      if (dirty) setMood(moods.lonelyAndDirty);
    } else if (dirty) {
      setMood(moods.dirty);
    }
    // save states
    save('lastFed', lastFed);
    save('lastPetted', lastPetted);
    save('lastCleaned', lastCleaned);
  }, [elapsedTime]);

  return (
    <div className="App">
      <Pet mood={mood}></Pet>
      <ActionsMenu
        setMood={setMood}
        setJustReceived={setJustReceived}
        setLastFed={setLastFed}
        setLastPetted={setLastPetted}
        setLastCleaned={setLastCleaned}
      ></ActionsMenu>
    </div>
  );
}

export default App;
