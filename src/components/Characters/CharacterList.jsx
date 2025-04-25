import { useEffect, useState } from 'react';
import CharacterCard from './CharacterCard';
import './CharacterList.css';

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(() => {
    return localStorage.getItem('selectedSpecies') || 'all';
  });

  useEffect(() => {
    fetch('https://api.sampleapis.com/futurama/characters')
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedSpecies', selectedSpecies);

    if (selectedSpecies === 'all') {
      setFilteredCharacters(characters);
    } else {
      const filtered = characters.filter(
        (char) =>
          char.species &&
          char.species.toLowerCase().includes(selectedSpecies.toLowerCase())
      );
      setFilteredCharacters(filtered);
    }
  }, [selectedSpecies, characters]);

  return (
    <div className="character-list-container">
      <h2>Personajes</h2>

      {/* Filtro por especie */}
      <select
        value={selectedSpecies}
        onChange={(e) => setSelectedSpecies(e.target.value)}
        className="filter-select"
      >
        <option value="all">Todos</option>
        <option value="human">Human</option>
        <option value="robot">Robot</option>
        <option value="alien">Alien</option>
      </select>

      <div className="character-grid">
        {filteredCharacters.map((char, index) => (
          <CharacterCard key={index} character={char} index={index} />
        ))}
      </div>
    </div>
  );
}

export default CharacterList;
