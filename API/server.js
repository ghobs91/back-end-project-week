const express = require("express");
const server = express();
server.use(express.json());

// Sanity check
server.get("/", (req, res) => {
	res.status(200).json({ message: "server is operational" });
});
////

//GET Endpoint
server.get("/api/notes", (req, res) => {
  res.status(200).json(notes);
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
    notes.push({ title: title, contents: contents });
    res
    .status(200)
    .json({ title: title, contents: contents });
  }
});
/////

//PUT Endpoint
server.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const edit = req.body;
   notes
      .update(id, edit)
      .then(notesResponse => {
          if (!notesResponse) {
              res.status(404).json({ message: 'Note not found' });
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
  if (id) {
    res.status(200).json({ noteDeleted: `${id}` });
  } else {
    res.status(404).json({ error: "Couldn't locate note to delete" });
  }
});
////
module.exports = server;