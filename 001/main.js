class BirthdayCountdown {
    constructor() {
        this.init();
    }

    init() {
        // 初始化页面加载动画
        this.animatePageLoad();
        
        // 开始倒计时
        this.startCountdown();
        
        // 添加交互效果
        this.addInteractions();
    }

    animatePageLoad() {
        // 页面加载动画
        anime({
            targets: '.hero-content',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutCubic'
        });

        // 标题动画
        anime({
            targets: '.birthday-title',
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 800,
            delay: 300,
            easing: 'easeOutElastic(1, .8)'
        });

        // 倒计时数字动画
        anime({
            targets: '.countdown-digit',
            scale: [0, 1],
            opacity: [0, 1],
            duration: 600,
            delay: anime.stagger(100),
            easing: 'easeOutBack'
        });
    }

    startCountdown() {
        // ========== 倒计时计算逻辑 ==========
        // 设置目标生日日期：2025年11月8日
        // 注意：JavaScript中月份是0索引的（0=1月，10=11月）
        const birthday = new Date(2025, 10, 8, 0, 0, 0); // Month is 0-indexed (10 = November)
        console.log('Birthday date:', birthday);
        console.log('Current date:', new Date());
        console.log('Birthday timestamp:', birthday.getTime());
        console.log('Current timestamp:', new Date().getTime());
        
        const updateCountdown = () => {
            // 获取当前时间戳（毫秒）
            const now = new Date();
            const nowTime = now.getTime();
            // 计算距离生日的时间差（毫秒）
            const distance = birthday.getTime() - nowTime;
            
            console.log('Current date:', now.toString());
            console.log('Birthday date:', birthday.toString());
            console.log('Time difference (ms):', distance);
            console.log('Time difference (days):', Math.floor(distance / (1000 * 60 * 60 * 24)));
            
            // 如果倒计时结束，显示生日庆祝
            if (distance <= 0) {
                // Countdown finished - show birthday celebration
                this.showBirthdayCelebration();
                return;
            }
            
            // ========== 时间差分解计算 ==========
            // 计算天数：总毫秒数 ÷ (1000毫秒 × 60秒 × 60分钟 × 24小时)
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            // 计算小时数：剩余毫秒数 ÷ (1000毫秒 × 60秒 × 60分钟)
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            // 计算分钟数：剩余毫秒数 ÷ (1000毫秒 × 60秒)
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            // 计算秒数：剩余毫秒数 ÷ 1000毫秒
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // 更新倒计时显示（两位数格式）
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            
            // 数字变化动画效果
            anime({
                targets: '.countdown-digit',
                scale: [1.1, 1],
                duration: 300,
                easing: 'easeOutElastic(1, .8)'
            });
        };
        
        // 初始化倒计时并每秒更新一次
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    showBirthdayCelebration() {
        // 生日庆祝效果
        document.querySelector('.countdown-container').innerHTML = `
            <div class="celebration">
                <h2>🎉 生日快乐！ 🎉</h2>
                <p>今天是你的特别日子！</p>
                <div class="confetti"></div>
            </div>
        `;

        // 庆祝动画
        anime({
            targets: '.celebration',
            scale: [0, 1],
            rotate: [-180, 0],
            duration: 1000,
            easing: 'easeOutElastic(1, .8)'
        });

        // 彩纸效果
        this.createConfetti();
    }

    createConfetti() {
        const confettiContainer = document.querySelector('.confetti');
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confettiContainer.appendChild(confetti);
        }
    }

    addInteractions() {
        // 添加鼠标悬停效果
        const countdownItems = document.querySelectorAll('.countdown-item');
        
        countdownItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                anime({
                    targets: item,
                    scale: 1.1,
                    duration: 300,
                    easing: 'easeOutBack'
                });
            });
            
            item.addEventListener('mouseleave', () => {
                anime({
                    targets: item,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutBack'
                });
            });
        });

        // 添加点击导航效果
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.navigateToPage(targetId);
            });
        });
    }

    navigateToPage(pageId) {
        // 页面切换动画
        anime({
            targets: '.hero-content',
            translateY: [0, -50],
            opacity: [1, 0],
            duration: 500,
            easing: 'easeInCubic',
            complete: () => {
                window.location.href = pageId + '.html';
            }
        });
    }
}

// 页面加载完成后初始化倒计时
document.addEventListener('DOMContentLoaded', () => {
    new BirthdayCountdown();
});
