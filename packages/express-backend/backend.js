// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
app.use(cors());

//app.use(express.json());



app.use((req, res, next) => {
    if (req.method !== "DELETE") {
      express.json()(req, res, next);
    } else {
      next();
    }
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "BAD BUNNY",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "OZUNA",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

  function generateID(){
    var num = Math.random();
    var id = num.toString();
    return (id);
}
  const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };
  
  app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
  });

  const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});




const addUser = (user) => {
    user["id"] = generateID();
    users["users_list"].push(user);
    return user;
  };

const RemoveUser = (id) => {
    var index = users["users_list"].findIndex(
    (user) => user["id"] === id
  );
  if (index !== -1) {
    users["users_list"].splice(index,1);
    return true;
  }
  else {
    return false
  }
};
  
  app.post("/users", (req, res) => {
    const userToAdd = req.body;
    var user = addUser(userToAdd);
    res.status(201).send(user); //added 201 here
    
  });

  app.delete("/users/:id", (req, res) => {
    const iDToDelete = req.params.id;
    const result = RemoveUser(iDToDelete);
    //res.send();
   //added 201 here
   if (result) {
        res.status(204).send(); // No content, successful deletion
    } else {
        res.status(404).send("Resource not found."); // User not found
    }
  }
  );