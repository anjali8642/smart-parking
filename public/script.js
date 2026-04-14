async function loadSlots() {
  try {
    const res = await fetch("/slots");
    const data = await res.json();

    const container = document.getElementById("slots");
    container.innerHTML = "";

    let free = 0;
    let occupied = 0;

    data.forEach(slot => {
      const div = document.createElement("div");
      div.className = "slot " + slot.status;
      div.innerText = "Slot " + slot.id;

      if (slot.status === "free") {
        free++;

        div.onclick = async () => {
          await fetch(`/book/${slot.id}`, { method: "POST" });
          showToast("Booked!");
          loadSlots();
        };
      } else {
        occupied++;
      }

      container.appendChild(div);
    });

    document.getElementById("total").innerText = data.length;
    document.getElementById("free").innerText = free;
    document.getElementById("occupied").innerText = occupied;

  } catch (err) {
    showToast("Server error ❌");
  }
}

async function resetSlots() {
  await fetch("/reset", { method: "POST" });
  showToast("Reset Done 🔄");
  loadSlots();
}

// Cool popup
function showToast(msg) {
  const t = document.createElement("div");
  t.innerText = msg;

  t.style.position = "fixed";
  t.style.bottom = "20px";
  t.style.right = "20px";
  t.style.background = "#000";
  t.style.color = "#fff";
  t.style.padding = "10px";
  t.style.borderRadius = "10px";

  document.body.appendChild(t);

  setTimeout(() => t.remove(), 2000);
}

// Auto refresh (AI feel)
setInterval(loadSlots, 5000);

loadSlots();
