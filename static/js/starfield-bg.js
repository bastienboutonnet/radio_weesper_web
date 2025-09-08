// Glowing, twinkling starfield background for landing page
document.addEventListener('DOMContentLoaded', function() {
  // Track which star is the 'super-glow' star
  let superGlowIndex = 0;
  function pickSuperGlow() {
    if (stars.length > 0) {
      superGlowIndex = Math.floor(Math.random() * stars.length);
      // Debug: log which star is glowing
      // console.log('Super-glow star index:', superGlowIndex);
    }
  }
  setInterval(pickSuperGlow, 1200);
  // Pick initial super-glow after stars are created
  setTimeout(pickSuperGlow, 100);
  const STAR_COLOR = '#afdcff';
  const STAR_GLOW = '#afdcff';
  const STAR_MIN_RADIUS = 0.5;
  const STAR_MAX_RADIUS = 1.7;
  // Reduce star count for mobile performance
  const STAR_COUNT = window.innerWidth < 700 ? 32 : 60;
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
    canvas.style.zIndex = 0;
    canvas.style.background = '#000';
    canvas.style.opacity = '1';
    canvas.style.display = 'block';
    document.body.appendChild(canvas);
    // canvas.style.border = '8px solid magenta'; // debug border to see canvas edges
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }
  resizeCanvas();
  window.addEventListener('resize', () => {
    resizeCanvas();
    createStars();
  });


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
      twinkleSpeed: random(TWINKLE_SPEED * 0.5, TWINKLE_SPEED * 1.5),
      superGlowLevel: 0 // for smooth animation
    }));
  }
  createStars();
  window.addEventListener('resize', () => {
    resizeCanvas();
    createStars();
  });

  function draw() {
    const w = canvas.width;
    const h = canvas.height;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset any transforms
    ctx.clearRect(0, 0, w, h);
    // Fill background
    ctx.save();
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    ctx.restore();

    // Draw stars
    const now = performance.now() / 1000;
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      // Animate superGlowLevel toward 1 if super-glow, else toward 0
      const target = (i === superGlowIndex) ? 1 : 0;
      star.superGlowLevel += (target - star.superGlowLevel) * 0.12; // smoothing factor
      // Normal twinkle
      const twinkle = 0.5 + 0.5 * Math.sin(now * star.twinkleSpeed + star.twinklePhase);
      let alpha = star.baseAlpha * twinkle;
      let radius = star.r;
  let shadowBlur = 4;
      // Add super-glow effect smoothly
      if (star.superGlowLevel > 0.01) {
        alpha = alpha * (1 - star.superGlowLevel) + 1.0 * star.superGlowLevel;
        radius = radius * (1 - star.superGlowLevel) + (star.r * 2.1) * star.superGlowLevel;
        shadowBlur = shadowBlur * (1 - star.superGlowLevel) + 24 * star.superGlowLevel;
      }
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.shadowColor = STAR_GLOW;
      ctx.shadowBlur = shadowBlur;
      ctx.beginPath();
      ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = STAR_COLOR;
      ctx.fill();
      ctx.restore();
    }
    requestAnimationFrame(draw);
  }
  draw();
});
