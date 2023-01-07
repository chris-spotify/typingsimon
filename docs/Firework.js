const fireworkStates = {
    ROCKET: 0,
    BOOM: 1,
    EXPLODING: 2,
    DONE: 3,
};

class Firework {
    constructor(_x, _y, _lifespan, _velocity, _gravity){
        this.x = _x;
        this.y = _y;
        this.originalX = _x;
        this.originalY = _y;
        this.lifespan = _lifespan;
        this.velocity = _velocity;
        this.gravity = _gravity;
        this.particles = [];
        this.state = fireworkStates.ROCKET;
    }

    update(){
        switch(this.state){
            case fireworkStates.ROCKET:
                this.y += this.velocity;
                this.velocity += this.gravity;
                console.log(this.velocity);
                this.lifespan--;
                if (this.lifespan <= 0) {
                    this._createParticles();
                    this.state = fireworkStates.BOOM;
                }
                break;
            case fireworkStates.BOOM: // one frame of BOOM state
                this.state = fireworkStates.EXPLODING;
                break;
            case fireworkStates.EXPLODING:
                for (const p of this.particles){
                    p.update();
                }
                this.particles = this.particles.filter(p => p.lifespan > 0);
                if (!this.particles.length) this.state = fireworkStates.DONE;
                break;
        };
    }

    draw(){
        switch(this.state){
            case fireworkStates.ROCKET:
                push();
                stroke(0,0,0,50);
                strokeWeight(1);
                line(this.originalX, this.originalY, this.x, this.y);
                noStroke();
                fill(0,0,0,50);
                circle(this.x, this.y, 10);
                pop();
                break;
            case fireworkStates.EXPLODING:
            case fireworkStates.BOOM:
                for (const p of this.particles){
                    p.draw();
                }
                break;
        };
    }

    _createParticles(){
        for (let i=0;i<100;i++){
            this.particles.push(
                new Particle(
                    this.x,
                    this.y,
                    Math.floor(random(2,8)),
                    Math.floor(random(2,8)),
                    Math.floor(random(30,75)),
                    [Math.floor(random(0,255)),Math.floor(random(0,255)),Math.floor(random(0,255))],
                    [random(-10,10), random(-10,10)],
                    Math.floor(random(0,8)),
                    0.5
                )
            );
        }
    }
}
