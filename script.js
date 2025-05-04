// DOM Elements
const themeSelect = document.getElementById('theme');
const animationSpeedSelect = document.getElementById('animation-speed');
const animatedBox = document.getElementById('animatedBox');
const startButton = document.getElementById('startAnimation');
const resetButton = document.getElementById('resetAnimation');

// Animation types
const animations = ['bounce', 'rotate', 'pulse'];
let currentAnimationIndex = 0;

// Load saved preferences
function loadPreferences() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedSpeed = localStorage.getItem('animationSpeed') || 'normal';
    
    themeSelect.value = savedTheme;
    animationSpeedSelect.value = savedSpeed;
    
    applyTheme(savedTheme);
    applyAnimationSpeed(savedSpeed);
}

// Save preferences
function savePreferences() {
    localStorage.setItem('theme', themeSelect.value);
    localStorage.setItem('animationSpeed', animationSpeedSelect.value);
}

// Apply theme
function applyTheme(theme) {
    document.body.className = theme + '-theme';
}

// Apply animation speed
function applyAnimationSpeed(speed) {
    animatedBox.className = 'animated-box animation-' + speed;
}

// Start animation
function startAnimation() {
    const currentAnimation = animations[currentAnimationIndex];
    const speed = animationSpeedSelect.value;
    
    animatedBox.style.animation = `${currentAnimation} 1s infinite`;
    animatedBox.className = `animated-box animation-${speed}`;
    
    currentAnimationIndex = (currentAnimationIndex + 1) % animations.length;
}

// Reset animation
function resetAnimation() {
    animatedBox.style.animation = 'none';
    animatedBox.offsetHeight; // Trigger reflow
    animatedBox.style.animation = null;
}

// Event Listeners
themeSelect.addEventListener('change', () => {
    applyTheme(themeSelect.value);
    savePreferences();
});

animationSpeedSelect.addEventListener('change', () => {
    applyAnimationSpeed(animationSpeedSelect.value);
    savePreferences();
});

startButton.addEventListener('click', startAnimation);
resetButton.addEventListener('click', resetAnimation);

animatedBox.addEventListener('click', () => {
    startAnimation();
});

// Initialize
loadPreferences(); 