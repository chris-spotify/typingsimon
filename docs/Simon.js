const simonStates = {
    PREGAME: 0,
    DEMONSTRATION: 1,
    GUESS: 2,
    WIN: 3,
};

class Simon {
    constructor(_x, _y, _keyWidth, _keyHeight){
        this.keyboard = new Keyboard(_x, _y, _keyWidth, _keyHeight);
        this.keyWidth = _keyWidth;
        this.keyHeight = _keyHeight;
        this.state = simonStates.PREGAME;
        this.animationCounter = 0;
        this.answer = '';
        this.needed = []; // array of answer letters still needed to guess
        this.firework = null;
        this.startX = Math.floor(this.keyWidth * 4);
        this.startY = Math.floor(this.keyHeight * 6);
        this.resetX = Math.floor(this.keyWidth * 7);
        this.resetY = Math.floor(this.keyHeight * 6);
    }

    update(){
        this.keyboard.update();
        switch(this.state){
            case simonStates.DEMONSTRATION:
                if (this.animationCounter <= 0){
                    if (this.needed.length){
                        const letter = this.needed.shift().toLowerCase();
                        this.keyboard.keys[letter].key.state = 1;
                        this.animationCounter = 75;
                    } else {
                        this.needed = this.answer.split('');
                        this.state = simonStates.GUESS;
                    }
                }
                this.animationCounter--;
                break;
            case simonStates.WIN:
                if (this.firework){
                    this.firework.update();
                    if (this.firework.state === 1) {
                        const key = this._closestKey(this.firework.x, this.firework.y);
                        this.keyboard.startWaveFromLetter(key.text.toLowerCase());
                    }
                    if (this.firework.state === 3) this.firework = null;
                } else {
                    this.firework = new Firework(random(0, this.keyWidth*12), this.keyHeight * 5, Math.floor(random(20,35)), random(-20, -10), 0.5);
                }
                break;
        };
    }

    draw(){
        this.keyboard.draw();
        push();
        textSize(48);
        textAlign(CENTER,CENTER);
        text(this.answer, Math.floor(this.keyWidth*5.5), this.keyHeight*4 + 50);
        switch(this.state){
            case simonStates.PREGAME:
                textSize(24);
                text('Hey there! Start by typing your answer.', Math.floor(this.keyWidth*5.5), this.keyHeight*4);
                textSize(32);
                fill(10,160,10);
                text('START', this.startX, this.startY);
                fill(220,10,10);
                text('RESET', this.resetX, this.resetY);
                break;
            case simonStates.DEMONSTRATION:
                textSize(24);
                text(`Okay, now watch closely -- I'll type it first!`, Math.floor(this.keyWidth*5.5), this.keyHeight*4);
                break;
            case simonStates.GUESS:
                textSize(24);
                text(`Your turn! You're looking for the ${this.needed[0]} key.`, Math.floor(this.keyWidth*5.5), this.keyHeight*4);
                break;
            case simonStates.WIN:
                if (this.firework) this.firework.draw();
                textSize(24);
                text('You did it! Congratulations!!! Try another one.', Math.floor(this.keyWidth*5.5), this.keyHeight*4);
                textSize(32);
                fill(220,10,10);
                text('RESET', this.resetX, this.resetY);
                break;
        };
        pop();
    }

    keyPressed(code){
        switch(this.state){
            case simonStates.PREGAME:
                // set answer
                if (code === 8) { // backspace
                    this.answer = this.answer.substring(0,this.answer.length-1);
                } else if (code === 13) { // enter
                    if (this.answer.length){
                        this.needed = this.answer.split('');
                        this.state = simonStates.DEMONSTRATION;
                        this.animationCounter = 100; // we don't want the demonstration to start immediately
                    }
                } else if (this.keyboard.getKeyFromKeyCode(code)){ // is this a valid key to add?
                    const key = this.keyboard.getKeyFromKeyCode(code);
                    key.state = 1;
                    this.answer += key.text; // uppercase
                }
                break;
            case simonStates.GUESS:
                // check input against needed[0]
                const key = this.keyboard.getKeyFromKeyCode(code);
                if (key){
                    const want = this.needed[0];
                    if (key.text === want){
                        key.state = 3; // noice
                        this.needed.shift();
                        if (!this.needed.length){
                            this.animationCounter = 50;
                            this.answer = '';
                            this.resetX = Math.floor(this.keyWidth*5.5);
                            this.resetY = this.keyHeight * 5;
                            this.state = simonStates.WIN;
                        }
                    } else {
                        key.state = 4; // wrong-o
                    }
                }
                break;
            case simonStates.WIN:
                // show some woo woo and offer a reset
                if (code === 13) { // enter
                    this.answer = '';
                    this.needed = [];
                    this.resetX = this.keyWidth*7;
                    this.resetY = this.keyHeight*6;
                    this.state = simonStates.PREGAME;
                }
                break;
        };
    }

    _closestKey(x,y){
        let lowest = Infinity;
        let lowestKey = null;
        Object.values(this.keyboard.keys).forEach(k => {
            const dist = Math.abs(k.key.x - x) + Math.abs(k.key.y - y);
            if (dist < lowest) {
                lowestKey = k.key;
                lowest = dist;
            }
        });
        return lowestKey;
    }

    handleClick(x,y){
        if (this.state === simonStates.PREGAME){
            push();
            textSize(32);
            // START
            if (
                x >= this.startX - textWidth('START')/2 &&
                x <= this.startX + textWidth('START')/2 &&
                y >= this.startY - 16 &&
                y <= this.startY + 16
            ) {
                this.keyPressed(13);
            }
            pop();
        }
        if (this.state === simonStates.PREGAME || this.state === simonStates.WIN){
            push();
            textSize(32);
            // RESET
            if (
                x >= this.resetX - textWidth('RESET')/2&&
                x <= this.resetX + textWidth('RESET')/2 &&
                y >= this.resetY - 16 &&
                y <= this.resetY + 16
            ) {
                this.answer = '';
                this.needed = [];
                this.state = simonStates.PREGAME;
                this.resetX = this.keyWidth*7;
                this.resetY = this.keyHeight*6;
            }
            pop();
        }
        for (const k of Object.values(this.keyboard.keys)){
            const { key } = k;
            if (key.isClicked(x,y)){
                this.keyPressed(key.keyCode);
                break;
            }
        }
    }
}
