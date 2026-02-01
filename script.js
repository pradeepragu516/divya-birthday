// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Elements
    const surpriseGate = document.getElementById('surpriseGate');
    const unlockBtn = document.getElementById('unlockBtn');
    const mainExperience = document.getElementById('mainExperience');
    const confettiCanvas = document.getElementById('confettiCanvas');
    const musicPlayer = document.getElementById('musicPlayer');
    const playBtn = document.getElementById('playBtn');
    const vinylRecord = document.querySelector('.vinyl-record');
    const birthdayMusic = document.getElementById('birthdayMusic');
    const candles = document.querySelectorAll('.candle');
    const memoryItems = document.querySelectorAll('.memory-item');
    const wishStars = document.querySelectorAll('.wish-star');
    
    let musicPlaying = false;
    let blownCandles = 0;
    
    // Unlock Surprise
    unlockBtn.addEventListener('click', function() {
        surpriseGate.classList.add('hidden');
        
        setTimeout(() => {
            mainExperience.classList.add('visible');
            createFloatingElements();
            launchConfetti();
            createStarfield();
            drawConstellation();
        }, 1000);
    });
    
    // Music Player
    playBtn.addEventListener('click', function() {
        if (!musicPlaying) {
            birthdayMusic.play();
            vinylRecord.classList.add('spinning');
            playBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
            musicPlaying = true;
        } else {
            birthdayMusic.pause();
            vinylRecord.classList.remove('spinning');
            playBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
            musicPlaying = false;
        }
    });
    
    // Create Floating Elements (Gentle Particles)
    function createFloatingElements() {
        const container = document.querySelector('.floating-elements');
        const colors = ['rgba(212, 175, 55, 0.3)', 'rgba(183, 110, 121, 0.3)', 'rgba(245, 245, 240, 0.2)'];
        
        setInterval(() => {
            const element = document.createElement('div');
            element.style.position = 'absolute';
            element.style.width = Math.random() * 6 + 3 + 'px';
            element.style.height = element.style.width;
            element.style.background = colors[Math.floor(Math.random() * colors.length)];
            element.style.borderRadius = '50%';
            element.style.left = Math.random() * 100 + '%';
            element.style.bottom = '-10px';
            element.style.opacity = '0.5';
            element.style.filter = 'blur(1px)';
            
            container.appendChild(element);
            
            const duration = Math.random() * 15000 + 10000;
            const drift = (Math.random() - 0.5) * 200;
            
            element.animate([
                { transform: 'translateY(0px) translateX(0px)', opacity: 0.5 },
                { transform: `translateY(-100vh) translateX(${drift}px)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'linear'
            });
            
            setTimeout(() => element.remove(), duration);
        }, 1500);
    }
    
    // Enhanced Confetti
    function launchConfetti() {
        const ctx = confettiCanvas.getContext('2d');
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
        
        const confetti = [];
        const confettiCount = 100;
        const colors = ['#D4AF37', '#b76e79', '#f5f5f0', '#ffd700', '#ff6b9d'];
        
        class ConfettiPiece {
            constructor() {
                this.x = Math.random() * confettiCanvas.width;
                this.y = -20;
                this.w = Math.random() * 8 + 4;
                this.h = Math.random() * 4 + 3;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.speed = Math.random() * 2 + 1;
                this.angle = Math.random() * 360;
                this.rotation = Math.random() * 8 - 4;
                this.swing = Math.sin(Math.random() * Math.PI * 2) * 0.5;
                this.swingSpeed = Math.random() * 0.05 + 0.02;
            }
            
            update() {
                this.y += this.speed;
                this.angle += this.rotation;
                this.x += Math.sin(this.y * this.swingSpeed) * this.swing;
                
                if (this.y > confettiCanvas.height + 20) {
                    this.y = -20;
                    this.x = Math.random() * confettiCanvas.width;
                }
            }
            
            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle * Math.PI / 180);
                ctx.fillStyle = this.color;
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 3;
                ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
                ctx.restore();
            }
        }
        
        for (let i = 0; i < confettiCount; i++) {
            confetti.push(new ConfettiPiece());
        }
        
        function animateConfetti() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            
            confetti.forEach(piece => {
                piece.update();
                piece.draw();
            });
            
            requestAnimationFrame(animateConfetti);
        }
        
        animateConfetti();
    }
    
    // Create Starfield Effect
    function createStarfield() {
        const starsContainer = document.querySelector('.stars');
        
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.style.position = 'absolute';
            star.style.width = Math.random() * 3 + 1 + 'px';
            star.style.height = star.style.width;
            star.style.background = '#fff';
            star.style.borderRadius = '50%';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.opacity = Math.random() * 0.5 + 0.3;
            star.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
            star.style.animationDelay = Math.random() * 2 + 's';
            star.style.boxShadow = '0 0 3px rgba(255, 255, 255, 0.8)';
            
            starsContainer.appendChild(star);
        }
    }
    
    // Candle Blowing
    candles.forEach((candle, index) => {
        candle.addEventListener('click', function() {
            if (!this.classList.contains('blown')) {
                this.classList.add('blown');
                blownCandles++;
                
                // Create smoke effect
                createSmoke(this);
                
                // If all candles blown
                if (blownCandles === candles.length) {
                    setTimeout(() => {
                        showWishGranted();
                        createFireworks();
                    }, 500);
                }
            }
        });
    });
    
    function createSmoke(candle) {
        const rect = candle.getBoundingClientRect();
        const particles = 15;
        
        for (let i = 0; i < particles; i++) {
            const smoke = document.createElement('div');
            smoke.style.position = 'fixed';
            smoke.style.left = rect.left + rect.width / 2 + 'px';
            smoke.style.top = rect.top - 20 + 'px';
            smoke.style.width = '4px';
            smoke.style.height = '4px';
            smoke.style.borderRadius = '50%';
            smoke.style.background = 'rgba(150, 150, 150, 0.6)';
            smoke.style.pointerEvents = 'none';
            smoke.style.zIndex = '1000';
            
            document.body.appendChild(smoke);
            
            const angle = (Math.PI * 2 * i) / particles;
            const velocity = Math.random() * 2 + 1;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity - 3;
            
            let frame = 0;
            const animate = () => {
                frame++;
                const left = parseFloat(smoke.style.left) + vx;
                const top = parseFloat(smoke.style.top) + vy;
                
                smoke.style.left = left + 'px';
                smoke.style.top = top + 'px';
                smoke.style.opacity = 0.6 - (frame / 60);
                smoke.style.transform = `scale(${1 + frame / 30})`;
                
                if (frame < 60) {
                    requestAnimationFrame(animate);
                } else {
                    smoke.remove();
                }
            };
            
            animate();
        }
    }
    
    function showWishGranted() {
        const message = document.createElement('div');
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%) scale(0)';
        message.style.fontFamily = "'Cinzel', serif";
        message.style.fontSize = '3rem';
        message.style.color = '#D4AF37';
        message.style.fontWeight = 'bold';
        message.style.textShadow = '0 0 30px rgba(212, 175, 55, 0.8)';
        message.style.zIndex = '10000';
        message.style.textAlign = 'center';
        message.style.padding = '40px';
        message.style.background = 'rgba(10, 6, 18, 0.95)';
        message.style.backdropFilter = 'blur(20px)';
        message.style.border = '2px solid #D4AF37';
        message.style.borderRadius = '30px';
        message.style.transition = 'all 0.6s ease';
        message.innerHTML = '✨ Your Wish is Granted ✨';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);
        
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 600);
        }, 3000);
    }
    
    function createFireworks() {
        const colors = ['#D4AF37', '#b76e79', '#ff6b9d', '#ffd700'];
        
        function launchFirework() {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight / 2);
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            const particles = 40;
            for (let i = 0; i < particles; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.width = '4px';
                particle.style.height = '4px';
                particle.style.borderRadius = '50%';
                particle.style.background = color;
                particle.style.boxShadow = `0 0 10px ${color}`;
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9999';
                
                document.body.appendChild(particle);
                
                const angle = (Math.PI * 2 * i) / particles;
                const velocity = 3 + Math.random() * 4;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                let frame = 0;
                const animate = () => {
                    frame++;
                    const left = parseFloat(particle.style.left) + vx;
                    const top = parseFloat(particle.style.top) + vy + (frame * 0.15);
                    
                    particle.style.left = left + 'px';
                    particle.style.top = top + 'px';
                    particle.style.opacity = 1 - (frame / 80);
                    
                    if (frame < 80) {
                        requestAnimationFrame(animate);
                    } else {
                        particle.remove();
                    }
                };
                
                animate();
            }
        }
        
        for (let i = 0; i < 5; i++) {
            setTimeout(launchFirework, i * 400);
        }
    }
    
    // Draw Constellation Lines
    function drawConstellation() {
        const svg = document.querySelector('.constellation-lines');
        const stars = Array.from(wishStars);
        
        if (stars.length < 2) return;
        
        // Get positions
        const positions = stars.map(star => {
            const rect = star.getBoundingClientRect();
            const svgRect = svg.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2 - svgRect.left,
                y: rect.top + rect.height / 2 - svgRect.top
            };
        });
        
        // Draw lines
        svg.innerHTML = '';
        for (let i = 0; i < positions.length - 1; i++) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', positions[i].x);
            line.setAttribute('y1', positions[i].y);
            line.setAttribute('x2', positions[i + 1].x);
            line.setAttribute('y2', positions[i + 1].y);
            line.setAttribute('stroke', 'rgba(212, 175, 55, 0.3)');
            line.setAttribute('stroke-width', '1');
            line.style.animation = 'fadeIn 2s ease';
            svg.appendChild(line);
        }
        
        // Connect last to first
        const lastLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        lastLine.setAttribute('x1', positions[positions.length - 1].x);
        lastLine.setAttribute('y1', positions[positions.length - 1].y);
        lastLine.setAttribute('x2', positions[0].x);
        lastLine.setAttribute('y2', positions[0].y);
        lastLine.setAttribute('stroke', 'rgba(212, 175, 55, 0.3)');
        lastLine.setAttribute('stroke-width', '1');
        lastLine.style.animation = 'fadeIn 2s ease';
        svg.appendChild(lastLine);
    }
    
    // Scroll Animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const labels = entry.target.querySelectorAll('.section-label');
                const titles = entry.target.querySelectorAll('.section-title');
                
                labels.forEach((label, index) => {
                    setTimeout(() => {
                        label.style.animation = 'fadeIn 0.8s ease forwards';
                    }, index * 100);
                });
                
                titles.forEach((title, index) => {
                    setTimeout(() => {
                        title.style.animation = 'fadeInUp 1s ease forwards';
                    }, index * 100 + 200);
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Parallax effect on scroll
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                
                // Parallax for hero decorative elements
                const heroSection = document.querySelector('.hero-section');
                if (heroSection) {
                    const decorativeTop = heroSection.querySelector('.hero-decorative-top');
                    if (decorativeTop) {
                        decorativeTop.style.transform = `translateX(-50%) translateY(${scrolled * 0.3}px)`;
                    }
                }
                
                // Parallax for message cards
                const messageCards = document.querySelectorAll('.message-card');
                messageCards.forEach((card, index) => {
                    const speed = 0.1 + (index * 0.05);
                    const rect = card.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        card.style.transform = `translateY(${(scrolled - card.offsetTop) * speed}px)`;
                    }
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    // Window resize handler
    window.addEventListener('resize', () => {
        if (confettiCanvas.width > 0) {
            confettiCanvas.width = window.innerWidth;
            confettiCanvas.height = window.innerHeight;
        }
        
        // Redraw constellation on resize
        if (mainExperience.classList.contains('visible')) {
            drawConstellation();
        }
    });
    
    // Add sparkle effect on mouse move
    let lastSparkle = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSparkle > 150) {
            createSparkle(e.clientX, e.clientY);
            lastSparkle = now;
        }
    });
    
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.background = '#D4AF37';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9998';
        sparkle.style.boxShadow = '0 0 8px #D4AF37';
        
        document.body.appendChild(sparkle);
        
        sparkle.animate([
            { opacity: 1, transform: 'scale(0)' },
            { opacity: 0, transform: 'scale(3)' }
        ], {
            duration: 800,
            easing: 'ease-out'
        });
        
        setTimeout(() => sparkle.remove(), 800);
    }
    
    // Easter egg: Double click on name for extra fireworks
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        heroName.addEventListener('dblclick', () => {
            for (let i = 0; i < 10; i++) {
                setTimeout(() => createFireworks(), i * 200);
            }
        });
    }
    
    console.log('%c🎂 Happy Birthday Divya! 🎂', 'font-size: 24px; color: #D4AF37; font-weight: bold;');
    console.log('%cDouble click on the name for a surprise!', 'font-size: 14px; color: #b76e79;');
});