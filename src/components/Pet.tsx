import { FunctionComponent } from 'react';

interface PetProps {
  mood: string;
}

const Pet: FunctionComponent<PetProps> = ({ mood }) => {
  return (
    <div className="petContainer">
      <div id="pet">{mood}</div>
    </div>
  );
};

export default Pet;
