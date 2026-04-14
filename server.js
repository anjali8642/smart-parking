const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let slots = [
  { id: 1, status: "free" },
  { id: 2, status: "free" },
  { id: 3, status: "free" },
  { id: 4, status: "free" }
];

// Get slots
app.get("/slots", (req, res) => {
  res.json(slots);
});

// Book slot
app.post("/book/:id", (req, res) => {
  const slot = slots.find(s => s.id == req.params.id);

  if (slot && slot.status === "free") {
    slot.status = "occupied";
    res.json({ message: "Booked successfully" });
  } else {
    res.json({ message: "Already occupied" });
  }
});

// Reset slots
app.post("/reset", (req, res) => {
  slots.forEach(s => s.status = "free");
  res.json({ message: "Reset Done" });
});

// Fake AI auto update
setInterval(() => {
  slots.forEach(s => {
    if (Math.random() > 0.7) {
      s.status = "free";
    }
  });
}, 5000);

app.listen(PORT, () => console.log("Server running on port 3000"));
