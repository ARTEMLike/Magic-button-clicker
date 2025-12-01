document.addEventListener('DOMContentLoaded', function() {
    const magicButton = document.getElementById('magicButton');
    const clickCounter = document.getElementById('clickCounter');
    const totalCounter = document.getElementById('counter');
    const backgroundOverlay = document.getElementById('backgroundOverlay');
    const glowEffect = document.getElementById('glowEffect');
    const historyContainer = document.getElementById('historyContainer');
    const colorCount = document.getElementById('colorCount');
    const streakElement = document.getElementById('streak');
    const autoClickerBtn = document.getElementById('autoClicker');
    const resetBtn = document.getElementById('resetBtn');
    
    let clickCount = 0;
    let usedColors = new Set();
    let lastClickTime = Date.now();
    let streak = 0;
    let maxStreak = 0;
    let autoClickInterval = null;
    
    function getRandomColor() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 70 + Math.floor(Math.random() * 30);
        const lightness = 40 + Math.floor(Math.random() * 30);
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    
    function isLightColor(color) {
        const [h, s, l] = color.match(/\d+/g).map(Number);
        return l > 50;
    }
    
    function getContrastColor(color) {
        return isLightColor(color) ? '#000000' : '#FFFFFF';
    }
    
    function addColorToHistory(color) {
        const colorCircle = document.createElement('div');
        colorCircle.className = 'color-circle';
        colorCircle.style.backgroundColor = color;
        colorCircle.title = color;
        
        colorCircle.addEventListener('click', function() {
            applyColorToButton(color);
        });
        
        historyContainer.appendChild(colorCircle);
        
        if (historyContainer.children.length > 30) {
            historyContainer.removeChild(historyContainer.firstChild);
        }
    }
    
    function applyColorToButton(color) {
        magicButton.style.backgroundColor = color;
        
        const textColor = getContrastColor(color);
        clickCounter.style.color = textColor;
        
        if (!usedColors.has(color)) {
            usedColors.add(color);
            colorCount.textContent = usedColors.size;
        }
        
        glowEffect.style.backgroundColor = color;
        glowEffect.style.opacity = '0.7';
        
        setTimeout(() => {
            glowEffect.style.opacity = '0';
        }, 1000);
        
        backgroundOverlay.style.backgroundColor = color;
        backgroundOverlay.style.opacity = '0.1';
        
        setTimeout(() => {
            backgroundOverlay.style.opacity = '0';
        }, 800);
    }
    
    function handleButtonClick() {
        clickCount++;
        clickCounter.textContent = clickCount;
        totalCounter.textContent = clickCount;
        
        const randomColor = getRandomColor();
        
        applyColorToButton(randomColor);
        
        addColorToHistory(randomColor);
        
        document.body.classList.add('shake');
        setTimeout(() => {
            document.body.classList.remove('shake');
        }, 500);
        
        const currentTime = Date.now();
        if (currentTime - lastClickTime < 1000) {
            streak++;
            if (streak > maxStreak) {
                maxStreak = streak;
            }
        } else {
            streak = 1;
        }
        
        streakElement.textContent = streak;
        lastClickTime = currentTime;
        
        magicButton.classList.add('pulse');
        setTimeout(() => {
            magicButton.classList.remove('pulse');
        }, 300);
        
        const buttonText = document.querySelector('.button-text');
        if (clickCount === 10) {
            buttonText.textContent = 'EXCELLENT!';
            setTimeout(() => {
                buttonText.textContent = 'KEEP GOING!';
            }, 1500);
        } else if (clickCount === 25) {
            buttonText.textContent = 'AMAZING!';
            setTimeout(() => {
                buttonText.textContent = 'KEEP GOING!';
            }, 1500);
        } else if (clickCount === 50) {
            buttonText.textContent = 'UNBELIEVABLE!';
            setTimeout(() => {
                buttonText.textContent = 'KEEP GOING!';
            }, 1500);
        } else if (clickCount === 100) {
            buttonText.textContent = 'LEGENDARY!';
            setTimeout(() => {
                buttonText.textContent = 'KEEP GOING!';
            }, 2000);
        }
    }
    
    magicButton.addEventListener('click', handleButtonClick);
    
    const initialColor = getRandomColor();
    applyColorToButton(initialColor);
    addColorToHistory(initialColor);
    
    setInterval(() => {
        const currentTime = Date.now();
        if (currentTime - lastClickTime > 2000 && streak > 0) {
            streak = 0;
            streakElement.textContent = streak;
        }
    }, 1000);
    
    autoClickerBtn.addEventListener('click', function() {
        if (autoClickInterval) {
            clearInterval(autoClickInterval);
            autoClickInterval = null;
            autoClickerBtn.innerHTML = '<i class="fas fa-robot"></i> Auto-Clicker (10x)';
            return;
        }
        
        autoClickerBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Auto-Click';
        let autoClicks = 0;
        
        autoClickInterval = setInterval(() => {
            handleButtonClick();
            autoClicks++;
            
            if (autoClicks >= 10) {
                clearInterval(autoClickInterval);
                autoClickInterval = null;
                autoClickerBtn.innerHTML = '<i class="fas fa-robot"></i> Auto-Clicker (10x)';
            }
        }, 200);
    });
    
    resetBtn.addEventListener('click', function() {
        clickCount = 0;
        streak = 0;
        clickCounter.textContent = '0';
        totalCounter.textContent = '0';
        streakElement.textContent = '0';
        
        const buttonText = document.querySelector('.button-text');
        buttonText.textContent = 'CLICK ME!';
        
        const newColor = getRandomColor();
        applyColorToButton(newColor);
        
        magicButton.classList.add('pulse');
        setTimeout(() => {
            magicButton.classList.remove('pulse');
        }, 300);
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            event.preventDefault();
            handleButtonClick();
        }
    });
});