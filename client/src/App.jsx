import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // const [petData, setPetData] = useState({
  //   petName: '',
  //   profile: '',
  //   species: '',
  //   friendly: false,
  // });
  function handleSubmit(e){
    e.preventDefault()
    let form = e.target
    let selectedSpecies = form.querySelector('input[name="species"]:checked');
    //"criticScore": 91, "audienceScore": 93, "domestic": 93277026,  "genre": "adventure", "title": "D&D" },
    let pet = {name : form.petName.value, 
      image : form.profile.value, 
      species : selectedSpecies ? selectedSpecies.value : '', 
      isFriendly : form.friendly.value,}
    console.log(pet)
  }

  return (
    <>
      <header>Pet Tracker</header>
      <form onSubmit={handleSubmit}>
        <h3>Add a new Pet!</h3>
        <div>
        <label htmlFor="petName">Pet Name:<sup>*</sup></label>
        <input type="text" id="petName" name="petName" placeholder="Freddy Fazbear" required/>
        </div>
        <div>
        <label htmlFor="profile">Profile Picture<sup>*</sup></label>
        <input type="text" id="profile" name="profile" placeholder="Picture URL" required />
        </div>
        <fieldset id= "lebon"name="lebon">
          <legend  >Species<sup>*</sup></legend>
          <div>
            <input type="radio" id="dog" name="species" value="dog" />
            <label htmlFor="dog">Dog</label>
          </div>
          <div>
            <input type="radio" id="cat" name="species" value="cat" />
            <label htmlFor="cat">Cat</label>
          </div>
          <div>
            <input type="radio" id="bird" name="species" value="bird" />
            <label htmlFor="bird">Bird</label>
          </div>
          
        </fieldset>
        <div>
          <input type="checkbox" id="friendly" name="friendly" />
          <label htmlFor="friendly">Are they friendly?</label>
        </div>
        <button type="submit">Add Pet!</button>
      </form>
      <div id="pet-list">
        <card>
          <p>Pet name</p>
          <img></img>
          <p>Friendly</p>
          <p>Species: <span>Freddy</span></p>
        </card>
      </div>
    </>
  );
}

export default App
