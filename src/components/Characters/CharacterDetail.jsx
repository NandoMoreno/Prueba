import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './CharacterList.css';

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetch('https://api.sampleapis.com/futurama/characters')
      .then(res => res.json())
      .then(data => {
        const char = data[parseInt(id)];
        setCharacter(char);
      });
  }, [id]);

  if (!character) return <div>Cargando...</div>;

  const { name, images, species, gender, occupation, sayings, age, homePlanet, relatives } = character;
  const fullName = `${name.first} ${name.middle || ''} ${name.last}`.trim();

  return (
    <div className="character-detail">
      <h2>{fullName}</h2>
      <img src={images.main} alt={fullName} className="character-detail-image" />
      <p><strong>Especie:</strong> {species}</p>
      <p><strong>Género:</strong> {gender}</p>
      <p><strong>Ocupación:</strong> {occupation}</p>
      {homePlanet && <p><strong>Planeta de origen:</strong> {homePlanet}</p>}
      {age && <p><strong>Edad:</strong> {age}</p>}
      
      {relatives && relatives.length > 0 && (
        <div>
          <h4>👪 Familiares:</h4>
          <ul>
            {relatives.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      )}

      {sayings && sayings.length > 0 && (
        <div>
          <h4>🗣 Frases Célebres:</h4>
          <ul>
            {sayings.slice(0, 5).map((s, i) => <li key={i}>“{s}”</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CharacterDetail;
