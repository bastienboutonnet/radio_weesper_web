// Simple animated particles background
// Adds a <canvas> to the body with moving blue dots

(function() {
  const color = '#afdcff';
  const numParticles = 48;
  const maxRadius = 2.5;
  const minRadius = 1.2;
  const maxSpeed = 0.25;
  const minSpeed = 0.07;

  const canvas = document.createElement('canvas');
  canvas.className = 'particle-bg';
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = 0;
  document.body.appendChild(canvas);

  let w = window.innerWidth;
  let h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;

  window.addEventListener('resize', () => {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  });

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  const particles = Array.from({length: numParticles}, () => ({
    x: random(0, w),
    y: random(0, h),
    r: random(minRadius, maxRadius),
    dx: random(-maxSpeed, maxSpeed),
    dy: random(-maxSpeed, maxSpeed),
    alpha: random(0.15, 0.45)
  }));

  function draw() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < -p.r) p.x = w + p.r;
      if (p.x > w + p.r) p.x = -p.r;
      if (p.y < -p.r) p.y = h + p.r;
      if (p.y > h + p.r) p.y = -p.r;
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
