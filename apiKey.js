document.addEventListener('DOMContentLoaded', (event) => {
  const emoji = document.getElementById('emoji');

  document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Offset the emoji slightly so it doesn't sit directly under the cursor
      const offsetX = 10;
      const offsetY = 10;

      emoji.style.transform = `translate(${mouseX + offsetX}px, ${mouseY + offsetY}px)`;
  });
});