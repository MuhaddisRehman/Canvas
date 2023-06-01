//////////////CANVAS::DEFAULT::SETTINGS/////////////



const  canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width =  window.innerWidth;
canvas.height = window.innerHeight;
const particleArray = [];
window.addEventListener('resize', ()=>{
    canvas.width =  window.innerWidth;
    canvas.height = window.innerHeight;
    
})
const mouse = {
    x:undefined,
    y:undefined
}
canvas.addEventListener('click', (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 10; i++) {
        particleArray.push(new Particle())
    }
    // drawCircle();
})
canvas.addEventListener('mousemove', (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 10; i++) {
        particleArray.push(new Particle())
    }
})
ctx.strokeStyle = 'white';
ctx.lineWidth = 4
ctx.fillStyle = 'white';




class Particle {
    constructor(){
        this.x =  mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 10 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2)this.size-= 0.2
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI *2);
        ctx.fill()
        ctx.stroke()
    }
}

//////////////////////INITIALIZE::PARTICLE::ARRAY::START////////////////////

// const init = ()=>{
//     for (let i = 0; i < 100; i++) {
//         particleArray.push(new Particle())
//     }
// }
// init()
//////////////////////INITIALIZE::PARTICLE::ARRAY::END////////////////////

const handleParticles = () =>{
    for (let i = 0; i < particleArray.length; i++) {
        const particle = particleArray[i];
        if (particle.size < 0.3) {
            particleArray.splice(i, 1)
            i--;
        }
        particle.update()
        particle.draw()
    }
}

const animate = () =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    handleParticles()
    requestAnimationFrame(animate)
}
animate()