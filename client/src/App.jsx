import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useEffect } from 'react'
import './App.css'

function App() {
  const [pets, setPets] = useState([])
  useEffect(() => {
    const fetchPets = async () => {
        try {
            const res = await fetch(`http://localhost:3007/api/example_resources`)
            const peta =  await res.json()
            setPets(peta)
            console.log(peta)
        } catch (err) {
            console.log(err.message)
        }
    }
    fetchPets()
   }, [])
   async function handleSubmit(e){
    e.preventDefault()
    let form = e.target
    let selectedSpecies = form.querySelector('input[name="species"]:checked');
    //"criticScore": 91, "audienceScore": 93, "domestic": 93277026,  "genre": "adventure", "title": "D&D" },
    let pet = {name : form.petName.value, 
      image : form.profile.value, 
      species : selectedSpecies ? selectedSpecies.value : '', 
      isFriendly : form.friendly.value,}
    console.log(pet)
    form.reset()
    try {
      // POST request to the server
      const response = await fetch('http://localhost:3007/api/add_pet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pet),
      });

      if (!response.ok) {
        throw new Error('Failed to add pet');
      }

      const result = await response.json();
      console.log(result);
      setPets([[...pets], pet])

    } catch (error) {
      console.error('Error adding pet:', error);
    }
    fetchPets()
  }
  async function handleRemove(id) {
    try {
      // DELETE request 
      const response = await fetch(`http://localhost:3007/api/delete_pet/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove pet');
      }

      // Remove the pet from the local state
      setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
    } catch (error) {
      console.error('Error removing pet:', error);
    }
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
        {/* <card>
          <p>Pet name</p>
          <img></img>
          <p>Friendly</p>
          <p>Species: <span>Freddy</span></p>
        </card> */}
        {pets.map((pet) => {
          return (
            <card key={pet.id}>
            <p>{pet.name}</p>
            <img src={pet.image}></img>
            <p>{(!pet.is_Done)? "Friendly" : "Not so Friendly"}</p>
            <p>Species: <span>{pet.species}</span></p>
            <button data-id={pet.id} onClick={(e) => handleRemove(e.currentTarget.dataset.id)}>Remove</button>
          </card>
          )
        })}
      </div>
    </>
  );
}

export default App
