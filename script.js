// ============================================
// ORACLES, NOT ORG CHARTS - Enhanced Interactions
// ============================================

// ============================================
// PARTICLE SYSTEM
// ============================================
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.connections = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.config = {
      particleCount: 80,
      particleColor: 'rgba(0, 255, 213, 0.6)',
      lineColor: 'rgba(0, 255, 213, 0.15)',
      particleSize: 2,
      speed: 0.3,
      connectionDistance: 120
    };

    this.init();
    this.bindEvents();
    this.animate();
  }

  init() {
    this.resize();
    this.createParticles();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.config.speed,
        vy: (Math.random() - 0.5) * this.config.speed,
        size: Math.random() * this.config.particleSize + 1,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  drawParticle(p) {
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    this.ctx.fillStyle = this.config.particleColor.replace('0.6', p.opacity.toString());
    this.ctx.fill();
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.config.connectionDistance) {
          const opacity = (1 - distance / this.config.connectionDistance) * 0.3;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(0, 255, 213, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }
  }

  updateParticle(p) {
    // Mouse interaction
    if (this.mouse.x !== null && this.mouse.y !== null) {
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.mouse.radius) {
        const force = (this.mouse.radius - distance) / this.mouse.radius;
        const angle = Math.atan2(dy, dx);
        p.vx += Math.cos(angle) * force * 0.02;
        p.vy += Math.sin(angle) * force * 0.02;
      }
    }

    // Update position
    p.x += p.vx;
    p.y += p.vy;

    // Dampen velocity
    p.vx *= 0.99;
    p.vy *= 0.99;

    // Boundary check with wrap
    if (p.x < 0) p.x = this.canvas.width;
    if (p.x > this.canvas.width) p.x = 0;
    if (p.y < 0) p.y = this.canvas.height;
    if (p.y > this.canvas.height) p.y = 0;

    // Subtle random movement
    p.vx += (Math.random() - 0.5) * 0.01;
    p.vy += (Math.random() - 0.5) * 0.01;

    // Limit velocity
    const maxSpeed = 1;
    const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
    if (speed > maxSpeed) {
      p.vx = (p.vx / speed) * maxSpeed;
      p.vy = (p.vy / speed) * maxSpeed;
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw connections first (behind particles)
    this.drawConnections();

    // Update and draw particles
    this.particles.forEach(p => {
      this.updateParticle(p);
      this.drawParticle(p);
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize particle system
const particleCanvas = document.getElementById('particle-canvas');
if (particleCanvas && window.innerWidth > 768) {
  new ParticleSystem(particleCanvas);
}


// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
class ScrollReveal {
  constructor() {
    this.elements = [];
    this.init();
  }

  init() {
    // Section headers
    document.querySelectorAll('.section__header').forEach((el, i) => {
      el.classList.add('reveal-up', `stagger-${Math.min(i % 3 + 1, 5)}`);
      this.elements.push(el);
    });

    // Diff viewer columns
    document.querySelectorAll('.diff-col--before').forEach(el => {
      el.classList.add('reveal-left');
      this.elements.push(el);
    });
    document.querySelectorAll('.diff-col--after').forEach(el => {
      el.classList.add('reveal-right');
      this.elements.push(el);
    });

    // Control nodes
    document.querySelectorAll('.control-node').forEach((el, i) => {
      el.classList.add('reveal-scale', `stagger-${i + 1}`);
      this.elements.push(el);
    });

    // Constraint cards
    document.querySelectorAll('.constraint-card').forEach((el, i) => {
      el.classList.add('reveal-up', `stagger-${i + 1}`);
      this.elements.push(el);
    });

    // Example cards
    document.querySelectorAll('.example-card').forEach((el, i) => {
      el.classList.add(i === 0 ? 'reveal-left' : 'reveal-right');
      this.elements.push(el);
    });

    // Code blocks
    document.querySelectorAll('.code-block').forEach((el, i) => {
      el.classList.add('reveal-up', `stagger-${i + 1}`, 'code-block--enhanced');
      this.elements.push(el);
    });

    // Funnel viz
    document.querySelectorAll('.funnel-viz').forEach(el => {
      el.classList.add('reveal-scale');
      this.elements.push(el);
    });

    // Close section
    document.querySelectorAll('.close-content').forEach(el => {
      el.classList.add('reveal-up');
      this.elements.push(el);
    });

    // Set up observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    this.elements.forEach(el => this.observer.observe(el));
  }
}

new ScrollReveal();


// ============================================
// FUNNEL ANIMATION
// ============================================
class FunnelAnimation {
  constructor() {
    this.funnelViz = document.querySelector('.funnel-viz');
    if (!this.funnelViz) return;

    this.filterGate = this.funnelViz.querySelector('.filter-gate');
    this.results = this.funnelViz.querySelectorAll('.result');
    this.isAnimating = false;

    this.init();
  }

  init() {
    // Make funnel-viz position relative for particles
    this.funnelViz.style.position = 'relative';

    // Add intersection observer to trigger animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.isAnimating) {
            this.startAnimation();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(this.funnelViz);
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'funnel-particle';

    // Random starting position above funnel items
    const startX = Math.random() * 200 + 100; // Centered range
    particle.style.left = `${startX}px`;
    particle.style.top = '80px';

    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 0.5}s`;

    this.funnelViz.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
      particle.remove();
    }, 2500);
  }

  startAnimation() {
    this.isAnimating = true;

    // Create particles periodically
    const particleInterval = setInterval(() => {
      this.createParticle();
    }, 300);

    // Animate results appearing
    this.results.forEach((result, i) => {
      setTimeout(() => {
        result.classList.add('result--animated');
      }, 800 + i * 400);
    });

    // Stop creating particles after a while
    setTimeout(() => {
      clearInterval(particleInterval);
    }, 5000);
  }
}

new FunnelAnimation();


// ============================================
// CONTROL NODE ANIMATION
// ============================================
class ControlNodeAnimation {
  constructor() {
    this.nodes = document.querySelectorAll('.control-node');
    if (!this.nodes.length) return;

    this.init();
  }

  init() {
    // Cycle through nodes highlighting each
    let activeIndex = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.startCycle();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(this.nodes[0].parentElement);
  }

  startCycle() {
    let activeIndex = 0;

    const cycle = () => {
      // Remove active from all
      this.nodes.forEach(node => {
        node.classList.remove('control-node--active');
        node.style.position = 'relative';
      });

      // Add active to current
      this.nodes[activeIndex].classList.add('control-node--active');

      // Move to next
      activeIndex = (activeIndex + 1) % this.nodes.length;
    };

    cycle();
    setInterval(cycle, 2000);
  }
}

new ControlNodeAnimation();


// ============================================
// MAGNETIC BUTTONS
// ============================================
class MagneticButtons {
  constructor() {
    this.buttons = document.querySelectorAll('.btn');
    this.init();
  }

  init() {
    this.buttons.forEach(btn => {
      btn.classList.add('btn--magnetic');

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }
}

new MagneticButtons();


// ============================================
// COPY-TO-CLIPBOARD (ENHANCED)
// ============================================
const blocks = document.querySelectorAll('[data-copy]');

blocks.forEach((block) => {
  const button = block.querySelector('[data-copy-btn]');
  const code = block.querySelector('pre');
  if (!button || !code) return;

  const textSpan = button.querySelector('.copy-btn__text');
  const iconSpan = button.querySelector('.copy-btn__icon');

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.innerText.trim());
      const originalText = textSpan ? textSpan.textContent : button.textContent;

      if (textSpan) {
        textSpan.textContent = 'Copied!';
      } else {
        button.textContent = 'Copied!';
      }

      if (iconSpan) {
        iconSpan.textContent = '✓';
      }

      button.style.borderColor = 'var(--accent-green)';
      button.style.color = 'var(--accent-green)';

      // Add ripple effect
      button.style.animation = 'none';
      button.offsetHeight; // Trigger reflow
      button.style.animation = null;

      setTimeout(() => {
        if (textSpan) {
          textSpan.textContent = originalText;
        } else {
          button.textContent = originalText;
        }
        if (iconSpan) {
          iconSpan.textContent = '⎘';
        }
        button.style.borderColor = '';
        button.style.color = '';
      }, 1500);
    } catch (err) {
      console.error('Copy failed', err);
    }
  });
});


// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


// ============================================
// HERO ENTRANCE ANIMATION
// ============================================
class HeroAnimation {
  constructor() {
    this.hero = document.querySelector('.hero');
    if (!this.hero) return;

    this.badge = this.hero.querySelector('.hero__badge');
    this.title = this.hero.querySelector('.hero__title');
    this.sub = this.hero.querySelector('.hero__sub');
    this.ctas = this.hero.querySelector('.hero__ctas');
    this.panel = this.hero.querySelector('.hero__panel');

    this.init();
  }

  init() {
    // Set initial states
    const elements = [this.badge, this.title, this.sub, this.ctas, this.panel];
    elements.forEach((el, i) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        el.style.transitionDelay = `${0.2 + i * 0.15}s`;
      }
    });

    // Trigger animation after a brief delay
    setTimeout(() => {
      elements.forEach(el => {
        if (el) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    }, 100);

    // Animate metric bars
    this.animateMetrics();
  }

  animateMetrics() {
    const fills = this.hero.querySelectorAll('.metric__fill');
    fills.forEach(fill => {
      const width = fill.style.getPropertyValue('--width');
      fill.style.width = '0';
      setTimeout(() => {
        fill.style.width = width;
      }, 1200);
    });
  }
}

new HeroAnimation();


// ============================================
// NAV SCROLL EFFECT
// ============================================
class NavScrollEffect {
  constructor() {
    this.nav = document.querySelector('.nav');
    if (!this.nav) return;

    this.init();
  }

  init() {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        this.nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
      } else {
        this.nav.style.boxShadow = 'none';
      }

      lastScroll = currentScroll;
    });
  }
}

new NavScrollEffect();


// ============================================
// DIFF VIEWER LINE ANIMATION
// ============================================
class DiffAnimation {
  constructor() {
    this.diffViewer = document.querySelector('.diff-viewer');
    if (!this.diffViewer) return;

    this.init();
  }

  init() {
    const lines = this.diffViewer.querySelectorAll('.diff-list li');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            lines.forEach((line, i) => {
              setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
              }, i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Set initial states
    lines.forEach(line => {
      line.style.opacity = '0';
      line.style.transform = 'translateX(-10px)';
      line.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });

    observer.observe(this.diffViewer);
  }
}

new DiffAnimation();


// ============================================
// TYPING EFFECT FOR STATUS
// ============================================
class StatusTyping {
  constructor() {
    this.status = document.querySelector('.nav__status .mono');
    if (!this.status) return;

    this.originalText = this.status.textContent;
    this.init();
  }

  init() {
    // Add cursor
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    this.status.appendChild(cursor);

    // Periodically "retype" the status
    setInterval(() => {
      this.typeEffect();
    }, 8000);
  }

  async typeEffect() {
    const text = this.originalText;
    this.status.textContent = '';

    // Add cursor back
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    this.status.appendChild(cursor);

    // Type each character
    for (let i = 0; i < text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      this.status.insertBefore(
        document.createTextNode(text[i]),
        cursor
      );
    }
  }
}

new StatusTyping();


// ============================================
// PARALLAX BACKGROUND IMAGES
// ============================================
class ParallaxBg {
  constructor() {
    this.bgImages = document.querySelectorAll('.section-bg-image, .close-oracle-icon');
    if (!this.bgImages.length || window.innerWidth < 768) return;

    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => this.update());
    });
  }

  update() {
    const scrollY = window.pageYOffset;

    this.bgImages.forEach(img => {
      const section = img.closest('.section, .section--close');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (inView) {
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const offset = (progress - 0.5) * 30;
        img.style.transform = img.classList.contains('close-oracle-icon')
          ? `translate(-50%, calc(-50% + ${offset}px))`
          : `translateY(calc(-50% + ${offset}px))`;
      }
    });
  }
}

new ParallaxBg();


// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log(
  '%c◈ ORACLES, NOT ORG CHARTS %c\n\nIf it doesn\'t run, it doesn\'t exist.\n\nPowered by proof-driven development.',
  'color: #00ffd5; font-size: 20px; font-weight: bold;',
  'color: #8b949e; font-size: 12px;'
);
