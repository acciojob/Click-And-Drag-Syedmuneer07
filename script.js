const cubes = document.querySelectorAll(".item");
const area = document.querySelector(".items");

let isDragging = false;
let activeCube = null;
let startX, startY;
let cubeStartLeft, cubeStartTop;

cubes.forEach(cube => {
    
    cube.addEventListener("mousedown", (e) => {
        e.preventDefault();

        isDragging = true;
        activeCube = cube;
        cube.classList.add("dragging");

        // Mouse position at start
        startX = e.clientX;
        startY = e.clientY;

        // Cube's current position
        const rect = cube.getBoundingClientRect();
        const areaRect = area.getBoundingClientRect();

        cubeStartLeft = rect.left - areaRect.left;
        cubeStartTop = rect.top - areaRect.top;
    });
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging || !activeCube) return;

    const areaRect = area.getBoundingClientRect();
    const cubeRect = activeCube.getBoundingClientRect();

    // Calculate movement
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    // New intended position
    let newLeft = cubeStartLeft + dx;
    let newTop = cubeStartTop + dy;

    // Boundary constraints
    newLeft = Math.max(0, Math.min(newLeft, areaRect.width - cubeRect.width));
    newTop = Math.max(0, Math.min(newTop, areaRect.height - cubeRect.height));

    // Apply movement
    activeCube.style.left = newLeft + "px";
    activeCube.style.top = newTop + "px";
});

document.addEventListener("mouseup", () => {
    if (activeCube) activeCube.classList.remove("dragging");
    isDragging = false;
    activeCube = null;
});
