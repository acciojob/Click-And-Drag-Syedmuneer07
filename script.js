const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let activeItem = null;
let offsetX = 0;
let offsetY = 0;

// Grid configuration
const gridSize = 120; // distance between cells
const cols = 5;       // number of columns
const rows = 5;       // number of rows

// Initialize items in a grid
items.forEach((item, index) => {
  const col = index % cols;
  const row = Math.floor(index / cols);

  item.style.left = (col * gridSize) + "px";
  item.style.top  = (row * gridSize) + "px";

  // Mouse down
  item.addEventListener("mousedown", (e) => {
    activeItem = item;

    const rect = item.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    item.style.transition = "none"; 
  });
});

// Mouse move
document.addEventListener("mousemove", (e) => {
  if (!activeItem) return;

  const containerRect = container.getBoundingClientRect();
  const itemRect = activeItem.getBoundingClientRect();

  // Calculate new position relative to container
  let newX = e.clientX - containerRect.left - offsetX;
  let newY = e.clientY - containerRect.top - offsetY;

  // Boundary constraints
  newX = Math.max(0, Math.min(newX, containerRect.width - itemRect.width));
  newY = Math.max(0, Math.min(newY, containerRect.height - itemRect.height));

  activeItem.style.left = newX + "px";
  activeItem.style.top  = newY + "px";
});

// Mouse up
document.addEventListener("mouseup", () => {
  if (activeItem) {
    // Snap to nearest grid
    const left = parseInt(activeItem.style.left);
    const top = parseInt(activeItem.style.top);

    const snapX = Math.round(left / gridSize) * gridSize;
    const snapY = Math.round(top / gridSize) * gridSize;

    activeItem.style.transition = "0.2s";
    activeItem.style.left = snapX + "px";
    activeItem.style.top  = snapY + "px"; 
  }

  activeItem = null;
});
