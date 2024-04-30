// src/MyApp.jsx


import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";


  
  function MyApp() {
    const [characters, setCharacters] = useState([]);
    console.log(characters)
  
    
    function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
    
        return promise;
      }

      function updateList(person) { 
        postUser(person)
            .then(res => {
                if (res.status === 201) {
                    return res.json();
                }
            })
            .then(newperson => { 
                setCharacters([...characters, newperson]);
            })
            .catch(error => {
                console.log(error);
            });
    }
    
      function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }
   

      function deleteUser(id) {
        const promise = fetch(`Http://localhost:8000/users/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          
        });
    
        return promise;
      }

      function removeOneCharacter(index) {


        const person = characters[index]
        
      
        deleteUser(person._id).then((res) => {  
            if (res.status == 204)
            {const updated = characters.filter((_, i) => {
                return i !== index;
              });
              setCharacters(updated);
            }
              
        })
       
      }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => { console.log(error); });
      }, [] );

      return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
          />
          <Form handleSubmit={updateList} />
          
        </div>
        
      );
    
      
  }
  
  


export default MyApp;