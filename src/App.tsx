import './App.css';
import { useState, useEffect } from 'react';
import ActionsMenu from './components/ActionsMenu';
import Pet from './components/Pet';
import moods from './lib/moods';
import { getNow, getIsHungry, getIsLonely, getIsDirty } from './lib/intervals';
import { save, load } from './lib/storage';
import { useElapsedTime } from 'use-elapsed-time';
import TopBar from './components/TopBar';

function App() {
  const [birthTime, setBirthTime] = useState(load('birthTime'));
  const [age, setAge] = useState(0);
  const [mood, setMood] = useState(moods.unborn);
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
    // check if already hatched
    if (birthTime === undefined) return;
    // track age
    setAge(getNow() - birthTime);
    // just reveived cooldown
    if (justReceived) {
      setJustReceived(false);
      return;
    }
    document.getElementById('pet')!.removeAttribute('style'); // reset hatching animation
    // set mood
    setMood(moods.happy);
    if (getIsHungry(lastFed)) {
      setMood(moods.hungry);
      if (getIsLonely(lastPetted) && getIsDirty(lastFed)) setMood(moods.hungryLonelyAndDirty);
      else if (getIsLonely(lastPetted)) setMood(moods.hungryAndLonely);
      else if (getIsDirty(lastCleaned)) setMood(moods.hungryAndDirty);
    } else if (getIsLonely(lastPetted)) {
      setMood(moods.lonely);
      if (getIsDirty(lastCleaned)) setMood(moods.lonelyAndDirty);
    } else if (getIsDirty(lastCleaned)) {
      setMood(moods.dirty);
    }
    // save states
    save('lastFed', lastFed);
    save('lastPetted', lastPetted);
    save('lastCleaned', lastCleaned);
  }, [elapsedTime]);

  return (
    <div className="App">
      <TopBar
        mood={mood}
        setBirthTime={setBirthTime}
        setMood={setMood}
        age={age}
        lastFed={lastFed}
        lastPetted={lastPetted}
        lastCleaned={lastCleaned}
      />
      <Pet mood={mood} />
      <ActionsMenu
        mood={mood}
        setBirthTime={setBirthTime}
        setAge={setAge}
        setMood={setMood}
        setJustReceived={setJustReceived}
        setLastFed={setLastFed}
        setLastPetted={setLastPetted}
        setLastCleaned={setLastCleaned}
      />
    </div>
  );
}

export default App;
