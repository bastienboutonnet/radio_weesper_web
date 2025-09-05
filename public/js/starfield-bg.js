// Glowing, twinkling starfield background for landing page
document.addEventListener('DOMContentLoaded', function() {
  const STAR_COLOR = '#afdcff';
  const STAR_GLOW = '#afdcff';
  const STAR_MIN_RADIUS = 0.5;
  const STAR_MAX_RADIUS = 1.7;
  const STAR_COUNT = 90;
  const TWINKLE_SPEED = 0.025;

  // Use existing canvas if present, else create one
  let canvas = document.querySelector('canvas.starfield-bg');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.className = 'starfield-bg';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = 99999;
    canvas.style.background = 'magenta';
    canvas.style.opacity = '1';
    canvas.style.display = 'block';
    document.body.appendChild(canvas);
    canvas.style.border = '8px solid magenta'; // debug border to see canvas edges
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);


  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  let stars = [];
  function createStars() {
    const w = canvas.width;
    const h = canvas.height;
    stars = Array.from({length: STAR_COUNT}, () => ({
      x: random(0, w),
      y: random(0, h),
      r: random(STAR_MIN_RADIUS, STAR_MAX_RADIUS),
      baseAlpha: random(0.5, 1),
      twinklePhase: random(0, Math.PI * 2),
      twinkleSpeed: random(TWINKLE_SPEED * 0.5, TWINKLE_SPEED * 1.5)
    }));
  }
  createStars();
  window.addEventListener('resize', () => {
    resizeCanvas();
    createStars();
  });

  function draw() {
    resizeCanvas();
  const w = canvas.width;
  const h = canvas.height;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset any transforms
  ctx.clearRect(0, 0, w, h);
  // ...existing code...
  // Minimal test: fill canvas with magenta
  ctx.save();
  ctx.globalAlpha = 1.0;
  ctx.fillStyle = 'magenta';
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
    console.log('starfield draw loop running');
    requestAnimationFrame(draw);
  }
  draw();
});
