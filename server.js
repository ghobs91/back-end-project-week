const express = require("express");
const server = express();
const db = require ("./model/notes");
server.use(express.json());

// Sanity check
server.get("/", (req, res) => {
	res.status(200).json({ message: "server is operational" });
});
////

//GET Endpoints
server.get('/api/notes', (req, res) => {
  db
      .find()
      .then(notes => {
          res.status(200).json(notes);
      })
      .catch(err => res.status(500).json(err));
});
// GET note by specific id//
server.get("/api/notes/:id", async (req, res) => {
  db
      .findById()
      .then(notes => {
          res.status(200).json(notes);
      })
      .catch(err => res.status(500).json(err));
});
////

//POST Endpoint
server.post("/api/notes", (req, res) => {
  const { title, contents } = req.body;
  //if request body is missing any of those components
  if (!title || !contents) {
    return res
      .status(422)
      .json({ error: "Must include title and contents" });
  }
  else {
    db.add({ title: title, contents: contents });
    res
    .status(200)
    .json({ title: title, contents: contents });
  }
});
/////

//PUT Endpoint
server.put("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const edit = req.body;
   db
      .update(id, edit)
      .then(notesResponse => {
          if (!notesResponse) {
              res.status(404).json({ message: 'Note does not exist' });
          } else {
              res.status(200).json(notesResponse);
          }
          
      })
      .catch(err => res.status(500).json(err));
});
////

//Delete Endpoint
server.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
   db
      .remove(id)
      .then(notesResponse => {
          if (!notesResponse) {
              res.status(404).json({ message: 'Note does not exist' });
          } else {
              res.status(200).json(notesResponse);
          }
      })
      .catch(err => res.status(500).json(err));
});
////
module.exports = server;