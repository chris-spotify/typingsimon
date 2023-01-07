class Particle {
    constructor(_x, _y, _W, _H, _lifespan, _color, _force, _rotationRate, _gravity){
        this.x = _x;
        this.y = _y;
        this.W = _W;
        this.H = _H;
        this.lifespan = _lifespan;
        this.color = _color;
        this.force = _force;
        this.rotation = 0;
        this.rotationRate = _rotationRate;
        this.gravity = _gravity;
    }

    update(){
        if (this.lifespan > 0){
            const [x,y] = this.force;
            this.x += x;
            this.y += y;
            this.force[1] += this.gravity;
            this.rotation += this.rotationRate;
            this.lifespan--;
        }
    }

    draw(){
        push();
        noStroke();
        fill(...this.color, 200);
        translate(this.x + this.W/2, this.y + this.H/2);
        rotate(radians(this.rotation));
        rect(0, 0, this.W, this.H);
        pop();
    }
}
