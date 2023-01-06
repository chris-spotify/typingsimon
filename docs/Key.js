const keyStates = {
    NEUTRAL: 0,
    GROW: 1,
    SHRINK: 2,
    GREEN: 3,
    RED: 4,
    FADE_TO_NEUTRAL: 5,
};

class Key {
    constructor(_x, _y, _W, _H, _text, _keyCode){
        this.x = _x;
        this.y = _y;
        this.originalX = _x;
        this.originalY = _y;
        this.W = _W;
        this.H = _H;
        this.originalW = _W;
        this.originalH = _H;
        this.keyCode = _keyCode;
        this.text = _text;
        this.alpha = 255;
        this.color = [200,200,200];
        this.state = keyStates.NEUTRAL;
        this.frame = 0;
    }

    draw(){
        noStroke();
        fill(...this.color, this.alpha);
        rect(this.x, this.y, this.W, this.H, 5, 5, 5, 5);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(32);
        text(this.text, this.x + this.W / 2, this.y + this.H / 2);
    }

    update(){
        switch(this.state){
            case keyStates.NEUTRAL:
                break;
            case keyStates.GROW:
                if (this.frame % 5 === 0){ // animation rate
                    if (this.W - this.originalW >= 6) {
                        // switch to shrink
                        this.state = keyStates.SHRINK;
                    } else {
                        this.W+=2;
                        this.H+=2;
                        this.x--;
                        this.y--;
                        this.color[2]+=20;
                        this.alpha-=10;
                    }
                }
                break;
            case keyStates.SHRINK:
                if (this.frame % 5 === 0){
                    if (this.W - this.originalW <= 0) {
                        this.state = keyStates.NEUTRAL;
                    } else {
                        this.W-=2;
                        this.H-=2;
                        this.x++;
                        this.y++;
                        this.color[2]-=20;
                        this.alpha+=10;
                    }
                }
                break;
            case keyStates.GREEN:
                // reset dimensions/location in case we're switched here while animating
                this.W = this.originalW;
                this.H = this.originalH;
                this.x = this.originalX;
                this.y = this.originalY;
                this.alpha = 255;

                if (this.color[0] > 50){
                    this.color[0]-=10;
                    this.color[2]-=10;
                } else {
                    this.state = keyStates.FADE_TO_NEUTRAL;
                }

                break;
            case keyStates.RED:
                this.W = this.originalW;
                this.H = this.originalH;
                this.x = this.originalX;
                this.y = this.originalY;
                this.alpha = 255;

                if (this.color[1] > 50){
                    this.color[1]-=10;
                    this.color[2]-=10;
                } else {
                    this.state = keyStates.FADE_TO_NEUTRAL;
                }

                break;
            case keyStates.FADE_TO_NEUTRAL:
                if (this.color[0] >= 200 && this.color[1] >= 200 && this.color[2] >= 200) {
                    this.color = [200, 200, 200];
                    this.state = keyStates.NEUTRAL;
                } else {
                    this.color[0] += (this.color[0] >= 200) ? 0 : 10;
                    this.color[1] += (this.color[1] >= 200) ? 0 : 10;
                    this.color[2] += (this.color[2] >= 200) ? 0 : 10;
                }
                break;
        };
        this.frame++;
    }
}
