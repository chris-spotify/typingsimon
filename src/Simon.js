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
    }

    update(){
        this.keyboard.update();
        switch(this.state){
            case simonStates.WIN:
            case simonStates.PREGAME:
                // random wave stuff
                if (this.animationCounter <= 0){
                    const rand = Math.floor(Math.random() * 25) + 65; // 65-90, A-Z
                    this.keyboard.startWaveFromKeyCode(rand);
                    this.animationCounter = 100;
                }
                this.animationCounter--;
                break;
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
        };
    }

    draw(){
        this.keyboard.draw();
        textSize(48);
        textAlign(CENTER,CENTER);
        text(this.answer, Math.floor(this.keyWidth*5.5), this.keyHeight*4 + 50);
        switch(this.state){
            case simonStates.PREGAME:
                textSize(24);
                text('Hey! Start by typing an answer, then press ENTER:', Math.floor(this.keyWidth*5.5), this.keyHeight*4);
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
                textSize(24);
                text('You did it! Congratulations!!! Press ENTER to try another.', Math.floor(this.keyWidth*5.5), this.keyHeight*4);
                break;
        };
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
                    this.state = simonStates.PREGAME;
                }
                break;
        };
    }
}
