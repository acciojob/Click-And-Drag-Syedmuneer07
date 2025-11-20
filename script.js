const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  cube.style.position = "absolute";

  cube.addEventListener("mousedown", (e) => {
    activeCube = cube;
    offsetX = e.clientX - cube.offsetLeft;
    offsetY = e.clientY - cube.offsetTop;

    cube.style.zIndex = 9999;
  });
});

document.addEventListener("mousemove", (e) => {
  if (!activeCube) return;

  let x = e.clientX - offsetX;
  let y = e.clientY - offsetY;

  // boundaries
  x = Math.max(0, Math.min(x, container.clientWidth - activeCube.clientWidth));
  y = Math.max(0, Math.min(y, container.clientHeight - activeCube.clientHeight));

  activeCube.style.left = x + "px";
  activeCube.style.top = y + "px";
});

document.addEventListener("mouseup", () => {
  if (activeCube) activeCube.style.zIndex = 1;
  activeCube = null;
});
