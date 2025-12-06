const container = document.getElementById("items");
const cubes = document.querySelectorAll(".cube");

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// Initial grid positions (optional)
const positions = [
  { x: 10,  y: 10 },
  { x: 110, y: 10 },
  { x: 10,  y: 110 },
  { x: 110, y: 110 }
];

cubes.forEach((cube, index) => {
  cube.style.left = positions[index].x + "px";
  cube.style.top  = positions[index].y + "px";

  cube.addEventListener("mousedown", (e) => {
    activeCube = cube;
    
    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    cube.style.transition = "none"; // disable smooth snap
  });
});

document.addEventListener("mousemove", (e) => {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeRect = activeCube.getBoundingClientRect();

  let newX = e.clientX - containerRect.left - offsetX;
  let newY = e.clientY - containerRect.top - offsetY;

  // BOUNDARY LIMITS
  newX = Math.max(0, Math.min(newX, containerRect.width - cubeRect.width));
  newY = Math.max(0, Math.min(newY, containerRect.height - cubeRect.height));

  activeCube.style.left = newX + "px";
  activeCube.style.top  = newY + "px";
});

document.addEventListener("mouseup", () => {
  if (activeCube) {
    activeCube.style.transition = "0.2s"; // restore smooth feel
  }
  activeCube = null;
});
