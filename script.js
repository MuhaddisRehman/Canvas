const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = [];
let hue = 0;

// Create the audio context and oscillator
const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
oscillator.frequency.value = 440; // Set the initial frequency
oscillator.start();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined,
    down: false // Track whether the mouse button is down or not
};

canvas.addEventListener('mousedown', () => {
    mouse.down = true;
});

canvas.addEventListener('mouseup', () => {
    mouse.down = false;
});

canvas.addEventListener('mousemove', (e) => {
    if (mouse.down) {
        mouse.x = e.x;
        mouse.y = e.y;
        for (let i = 0; i < 2; i++) {
            particleArray.push(new Particle());
        }
        playSound();
    }
});

canvas.addEventListener('touchstart', () => {
    mouse.down = true;
});

canvas.addEventListener('touchend', () => {
    mouse.down = false;
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Prevent scrolling on touch devices
    if (mouse.down) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        for (let i = 0; i < 2; i++) {
            particleArray.push(new Particle());
        }
        playSound();
    }
});

ctx.lineWidth = 4;
ctx.fillStyle = 'white';

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 10 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${hue}, 100%, 50%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.3) this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
}

const connectParticles = () => {
    for (let i = 0; i < particleArray.length; i++) {
        for (let j = i; j < particleArray.length; j++) {
            const dx = particleArray[j].x - particleArray[i].x;
            const dy = particleArray[j].y - particleArray[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
                const opacityValue = 1 - distance / 100;
                ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${opacityValue})`;
                ctx.lineWidth = particleArray[j].size / 10;
                ctx.beginPath();
                ctx.moveTo(particleArray[j].x, particleArray[j].y);
                ctx.lineTo(particleArray[i].x, particleArray[i].y);
                ctx.stroke();
            }
        }
    }
};

const handleParticles = () => {
    for (let i = 0; i < particleArray.length; i++) {
        const particle = particleArray[i];
        if (particle.size < 0.9) {
            particleArray.splice(i, 1);
            i--;
        }
        particle.update();
        particle.draw();
    }
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    connectParticles();
    hue++;
    requestAnimationFrame(animate);
};

animate();

// Function to play the sound
function playSound() {
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    setTimeout(() => {
        oscillator.stop();
    }, 1000);
}//ssas
