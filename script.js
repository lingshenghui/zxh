document.addEventListener('DOMContentLoaded', () => {
    // 获取所有需要的DOM元素
    const giftBox = document.querySelector('.gift-box');
    const message = document.querySelector('.message');
    const container = document.querySelector('.container');
    const clickHint = document.querySelector('.click-hint');
    const moreBtn = document.querySelector('.more-btn');
    const modal = document.querySelector('.modal');
    const closeBtn = document.querySelector('.close-btn');

    // 创建星星背景
    function createStars() {
        const stars = document.querySelector('.stars');
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            stars.appendChild(star);
        }
    }

    // 创建漂浮元素
    function createFloatingElements() {
        const elements = ['🎈', '✨', '🎁', '💝', '🎉', '🌟', '💫', '🎀'];
        const floatingContainer = document.querySelector('.floating-elements');
        
        for (let i = 0; i < 30; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.textContent = elements[Math.floor(Math.random() * elements.length)];
            element.style.left = Math.random() * 100 + 'vw';
            element.style.top = Math.random() * 100 + 'vh';
            element.style.animationDuration = (Math.random() * 3 + 2) + 's';
            element.style.animationDelay = (Math.random() * 2) + 's';
            floatingContainer.appendChild(element);
        }
    }

    // 创建礼花
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        container.appendChild(confetti);
        
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }

    // 创建简单的音效函数
    function createClickSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    function createGiftSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
    }

    // 创建音频元素
    const bgMusic = new Audio('mmm/mm.m4a');
    bgMusic.volume = 0.5; // 设置音量为50%

    // 点击礼物盒子的效果
    giftBox.addEventListener('click', () => {
        createGiftSound();
        message.classList.remove('hidden');
        message.classList.add('show');
        createFloatingElements();
        
        // 隐藏点击提示和脉冲效果
        clickHint.style.display = 'none';
        document.querySelector('.pulse').style.display = 'none';
        
        // 添加礼花效果
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                createConfetti();
            }, i * 50);
        }
    });

    // 打开模态框
    moreBtn.addEventListener('click', () => {
        // 重置音频到开始位置并播放
        bgMusic.currentTime = 0;
        bgMusic.play().catch(err => console.log('播放音频失败:', err));
        modal.classList.add('show');
    });

    // 关闭模态框时暂停音乐
    closeBtn.addEventListener('click', () => {
        bgMusic.pause();
        modal.classList.remove('show');
    });

    // 点击模态框外部关闭时也暂停音乐
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            bgMusic.pause();
            modal.classList.remove('show');
        }
    });

    // ESC键关闭模态框时也暂停音乐
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            bgMusic.pause();
            modal.classList.remove('show');
        }
    });

    // 添加全局点击音效
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.gift-box') && 
            !e.target.closest('.more-btn') && 
            !e.target.closest('.close-btn')) {
            createClickSound();
        }
    });

    // 初始化星星背景
    createStars();
}); 