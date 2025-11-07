// P5.js Heart Particle System
let hearts = [];
let particles = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-container');
    canvas.id('p5-canvas');
    
    // Initialize heart particles
    for (let i = 0; i < 50; i++) {
        hearts.push({
            x: random(width),
            y: random(height),
            size: random(10, 30),
            speed: random(0.5, 2),
            opacity: random(0.3, 0.8),
            color: random(['#E8B4B8', '#D4AF37', '#F7E7E6', '#C85A6F'])
        });
    }
}

function draw() {
    clear();
    
    // Draw floating hearts
    for (let heart of hearts) {
        push();
        translate(heart.x, heart.y);
        fill(heart.color + Math.floor(heart.opacity * 255).toString(16));
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(heart.size);
        text('❤️', 0, 0);
        pop();
        
        // Move heart
        heart.y -= heart.speed;
        heart.x += sin(frameCount * 0.01 + heart.y * 0.01) * 0.5;
        
        // Reset position if off screen
        if (heart.y < -50) {
            heart.y = height + 50;
            heart.x = random(width);
        }
    }
    
    // Draw particles for special effects
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        push();
        fill(p.color + Math.floor(p.opacity * 255).toString(16));
        noStroke();
        ellipse(p.x, p.y, p.size);
        pop();
        
        // Update particle
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= 0.02;
        p.size *= 0.98;
        
        // Remove dead particles
        if (p.opacity <= 0) {
            particles.splice(i, 1);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    // Create particle explosion on click
    for (let i = 0; i < 20; i++) {
        particles.push({
            x: mouseX,
            y: mouseY,
            vx: random(-5, 5),
            vy: random(-5, 5),
            size: random(5, 15),
            opacity: 1,
            color: random(['#E8B4B8', '#D4AF37', '#F7E7E6'])
        });
    }
}

// Page Animation Controller
class PageAnimator {
    constructor() {
        this.init();
    }
    
    init() {
        // Animate elements on page load
        this.animateHero();
        this.startCountdown();
        this.setupInteractions();
    }
    
    animateHero() {
        // Animate main title
        anime({
            targets: '#main-title',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1500,
            easing: 'easeOutExpo',
            delay: 500
        });
        
        // Animate subtitle
        anime({
            targets: '#subtitle',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1200,
            easing: 'easeOutExpo',
            delay: 1000
        });
        
        // Animate countdown card
        anime({
            targets: '#countdown-card',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 1000,
            easing: 'easeOutExpo',
            delay: 1500
        });
        
        // Animate cake section
        anime({
            targets: '#cake-section',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1000,
            easing: 'easeOutExpo',
            delay: 2000
        });
        
        // Animate message section
        anime({
            targets: '#message-section',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1000,
            easing: 'easeOutExpo',
            delay: 2500
        });
        
        // Animate navigation buttons
        anime({
            targets: '#nav-buttons',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1000,
            easing: 'easeOutExpo',
            delay: 3000
        });
    }
    
    startCountdown() {
        // Set birthday date to November 8th, 2025
        const birthday = new Date(2025, 10, 8, 0, 0, 0); // Month is 0-indexed (10 = November)
        console.log('Birthday date:', birthday);
        console.log('Current date:', new Date());
        
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = birthday.getTime() - now;
            
            if (distance <= 0) {
                // Countdown finished - show birthday celebration
                this.showBirthdayCelebration();
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            
            // Animate digit changes
            anime({
                targets: '.countdown-digit',
                scale: [1.1, 1],
                duration: 300,
                easing: 'easeOutElastic(1, .8)'
            });
        };
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    showBirthdayCelebration() {
        // Update countdown display
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Change countdown title
        const countdownTitle = document.querySelector('#countdown-card h3');
        countdownTitle.textContent = '🎉 生日快乐！ 🎉';
        countdownTitle.style.color = '#FF69B4';
        countdownTitle.style.fontSize = '2.5rem';
        
        // Create massive celebration effect
        this.createBirthdayExplosion();
        
        // Show special birthday message
        setTimeout(() => {
            this.showSpecialBirthdayMessage();
        }, 2000);
        
        // Auto-light the candle
        setTimeout(() => {
            this.autoLightCandle();
        }, 4000);
    }
    
    createBirthdayExplosion() {
        // Create massive particle explosion
        for (let i = 0; i < 200; i++) {
            particles.push({
                x: windowWidth / 2,
                y: windowHeight / 2,
                vx: random(-15, 15),
                vy: random(-15, 15),
                size: random(10, 30),
                opacity: 1,
                color: random(['#FF69B4', '#FF1493', '#FFD700', '#FFB6C1', '#FF6347', '#FF4500'])
            });
        }
        
        // Add floating hearts
        for (let i = 0; i < 100; i++) {
            hearts.push({
                x: random(width),
                y: height + 50,
                size: random(20, 50),
                speed: random(2, 5),
                opacity: random(0.5, 1),
                color: random(['#FF69B4', '#FF1493', '#FFD700', '#FFB6C1'])
            });
        }
        
        // Animate background color change
        anime({
            targets: 'body',
            backgroundColor: ['#1a1a2e', '#FF69B4'],
            duration: 2000,
            easing: 'easeInOutQuad'
        });
    }
    
    showSpecialBirthdayMessage() {
        const specialMessages = [
            "🎂 生日快乐！愿你的每一天都充满阳光和欢笑！",
            "💝 你是我生命中最珍贵的礼物，生日快乐我的爱人！",
            "✨ 愿你的生日像你一样美丽动人，充满惊喜和快乐！",
            "🎁 生日快乐！愿你的每一个愿望都能实现！",
            "❤️ 爱你比昨天更多，但不及明天！生日快乐！"
        ];
        
        const randomMessage = specialMessages[Math.floor(Math.random() * specialMessages.length)];
        
        // Create floating message
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.95);
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            font-size: 2rem;
            font-weight: bold;
            color: #FF69B4;
            text-align: center;
            z-index: 1000;
            border: 3px solid #FFD700;
        `;
        messageDiv.textContent = randomMessage;
        document.body.appendChild(messageDiv);
        
        // Animate message
        anime({
            targets: messageDiv,
            scale: [0, 1.2, 1],
            rotate: [-10, 10, 0],
            duration: 1500,
            easing: 'easeOutElastic(1, .8)',
            complete: () => {
                setTimeout(() => {
                    anime({
                        targets: messageDiv,
                        opacity: [1, 0],
                        scale: [1, 0.5],
                        duration: 1000,
                        complete: () => {
                            document.body.removeChild(messageDiv);
                        }
                    });
                }, 3000);
            }
        });
    }
    
    autoLightCandle() {
        const candleButton = document.querySelector('#cake-section button');
        if (candleButton && !candleButton.disabled) {
            candleButton.click();
        }
    }
    
    setupInteractions() {
        // Name input interaction
        const nameInput = document.getElementById('name-input');
        nameInput.addEventListener('input', (e) => {
            const name = e.target.value;
            if (name) {
                this.updatePersonalMessage(name);
            }
        });
        
        // Mouse move glow effect
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // Update CSS custom properties for glow effects
            document.documentElement.style.setProperty('--mouse-x', mouseX);
            document.documentElement.style.setProperty('--mouse-y', mouseY);
        });
    }
    
    updatePersonalMessage(name) {
        const messages = [
            `亲爱的${name}，愿你的生日像你一样美丽动人...`,
            `${name}，感谢你让我的世界变得如此美好...`,
            `我的唯一${name}，愿你的每一个愿望都能实现...`,
            `宝贝${name}，你是我生命中最珍贵的礼物...`,
            `${name}，爱你比昨天更多，但不及明天...`
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const messageElement = document.getElementById('personal-message');
        
        // Animate message change
        anime({
            targets: messageElement,
            opacity: [1, 0],
            duration: 300,
            complete: () => {
                messageElement.textContent = randomMessage;
                anime({
                    targets: messageElement,
                    opacity: [0, 1],
                    duration: 300
                });
            }
        });
    }
}

// Global functions for HTML interactions
function lightCandle() {
    // Create candle lighting effect
    const button = event.target;
    button.innerHTML = '🎂 蜡烛已点亮！';
    button.disabled = true;
    
    // Add sparkle particles
    for (let i = 0; i < 30; i++) {
        particles.push({
            x: windowWidth / 2 + random(-200, 200),
            y: windowHeight / 2 + random(-200, 200),
            vx: random(-8, 8),
            vy: random(-8, 8),
            size: random(8, 20),
            opacity: 1,
            color: random(['#FFD700', '#FF69B4', '#FF1493', '#FFB6C1'])
        });
    }
    
    // Animate button
    anime({
        targets: button,
        scale: [1, 1.1, 1],
        backgroundColor: ['#F472B6', '#FBBF24', '#F472B6'],
        duration: 1000,
        easing: 'easeInOutQuad'
    });
    
    // Show birthday message
    setTimeout(() => {
        alert('🎉 生日快乐！愿你的每一个梦想都能实现！🎂');
    }, 1000);
}

function generateMessage() {
    const name = document.getElementById('name-input').value;
    if (!name) {
        alert('请先输入你的名字哦！');
        return;
    }
    
    const messages = [
        `${name}，你是我生命中最美的遇见，愿你的生日充满阳光和笑容...`,
        `亲爱的${name}，每一天醒来能看到你就是我最大的幸福，生日快乐...`,
        `宝贝${name}，你的笑容是我每天的动力，愿你永远快乐如初...`,
        `${name}，爱你不需要理由，只需要一颗真诚的心，生日快乐我的唯一...`,
        `我的${name}，愿你像花儿一样绽放，像星星一样闪耀，生日快乐...`
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const messageElement = document.getElementById('personal-message');
    
    // Animate message generation
    anime({
        targets: messageElement,
        opacity: [1, 0],
        scale: [1, 0.9],
        duration: 500,
        complete: () => {
            messageElement.textContent = randomMessage;
            anime({
                targets: messageElement,
                opacity: [0, 1],
                scale: [0.9, 1],
                duration: 500,
                easing: 'easeOutElastic(1, .8)'
            });
        }
    });
    
    // Create heart particles
    for (let i = 0; i < 15; i++) {
        particles.push({
            x: windowWidth / 2 + random(-100, 100),
            y: windowHeight / 2 + random(-100, 100),
            vx: random(-5, 5),
            vy: random(-5, 5),
            size: random(10, 25),
            opacity: 1,
            color: '#E8B4B8'
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PageAnimator();
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    easing: 'easeOutExpo'
                });
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.glass-card').forEach(card => {
        observer.observe(card);
    });
});

// Add some fun interactions
window.addEventListener('load', () => {
    // Add confetti effect on page load
    setTimeout(() => {
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: random(windowWidth),
                y: -50,
                vx: random(-2, 2),
                vy: random(2, 5),
                size: random(5, 15),
                opacity: 1,
                color: random(['#E8B4B8', '#D4AF37', '#F7E7E6', '#C85A6F'])
            });
        }
    }, 3000);
});
