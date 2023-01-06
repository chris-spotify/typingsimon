class Keyboard {
    constructor(_x,_y,_keyWidth,_keyHeight) {
        this.x = _x;
        this.y = _y;
        this.keyWidth = _keyWidth;
        this.keyHeight = _keyHeight;
        this.frame = 0;
        this._setupKeys();
        this.wave = {
            active: [],
            seen: {},
        };
    }

    _setupKeys(){
        this.keys = {
            'q': {
                key: new Key(this.x+6+((this.keyWidth + 6)*0), this.y+6, this.keyWidth, this.keyHeight, 'Q', 81),
            },
            'w': {
                key: new Key(this.x+6+((this.keyWidth + 6)*1), this.y+6, this.keyWidth, this.keyHeight, 'W', 87),
            },
            'e': {
                key: new Key(this.x+6+((this.keyWidth + 6)*2), this.y+6, this.keyWidth, this.keyHeight, 'E', 69),
            },
            'r': {
                key: new Key(this.x+6+((this.keyWidth + 6)*3), this.y+6, this.keyWidth, this.keyHeight, 'R', 82),
            },
            't': {
                key: new Key(this.x+6+((this.keyWidth + 6)*4), this.y+6, this.keyWidth, this.keyHeight, 'T', 84),
            },
            'y': {
                key: new Key(this.x+6+((this.keyWidth + 6)*5), this.y+6, this.keyWidth, this.keyHeight, 'Y', 89),
            },
            'u': {
                key: new Key(this.x+6+((this.keyWidth + 6)*6), this.y+6, this.keyWidth, this.keyHeight, 'U', 85),
            },
            'i': {
                key: new Key(this.x+6+((this.keyWidth + 6)*7), this.y+6, this.keyWidth, this.keyHeight, 'I', 73),
            },
            'o': {
                key: new Key(this.x+6+((this.keyWidth + 6)*8), this.y+6, this.keyWidth, this.keyHeight, 'O', 79),
            },
            'p': {
                key: new Key(this.x+6+((this.keyWidth + 6)*9), this.y+6, this.keyWidth, this.keyHeight, 'P', 80),
            },
            'a': {
                key: new Key(this.x+6+this.keyWidth/2+((this.keyWidth + 6)*0), this.y+12+this.keyHeight, this.keyWidth, this.keyHeight, 'A', 65),
            },
            's': {
                key: new Key(this.x+6+this.keyWidth/2+((this.keyWidth + 6)*1), this.y+12+this.keyHeight, this.keyWidth, this.keyHeight, 'S', 83),
            },
            'd': {
                key: new Key(this.x+6+this.keyWidth/2+((this.keyWidth + 6)*2), this.y+12+this.keyHeight, this.keyWidth, this.keyHeight, 'D', 68),
            },
            'f': {
                key: new Key(this.x+6+this.keyWidth/2+((this.keyWidth + 6)*3), this.y+12+this.keyHeight, this.keyWidth, this.keyHeight, 'F', 70),
            },
            'g': {
                key: new Key(this.x+6+this.keyWidth/2+((this.keyWidth + 6)*4), this.y+12+this.keyHeight, this.keyWidth, this.keyHeight, 'G', 71),
            },
            'h': {
                key: new Key(this.x+6+this.keyWidth/2+((this.keyWidth + 6)*5), this.y+12+this.keyHeight, this.keyWidth, this.keyHeight, 'H', 72),
            },
            'j': {
                key: new Key(this.x+6+this.keyWidth/2+((this.keyWidth + 6)*6), this.y+12+this.keyHeight, this.keyWidth, this.keyHeight, 'J', 74),
            },
            'k': {
                key: new Key(this.x+6+this.keyWidth/2+((this.keyWidth + 6)*7), this.y+12+this.keyHeight, this.keyWidth, this.keyHeight, 'K', 75),
            },
            'l': {
                key: new Key(this.x+6+this.keyWidth/2+((this.keyWidth + 6)*8), this.y+12+this.keyHeight, this.keyWidth, this.keyHeight, 'L', 76),
            },
            'z': {
                key: new Key(this.x+6+this.keyWidth+((this.keyWidth + 6)*0), this.y+18+this.keyHeight*2, this.keyWidth, this.keyHeight, 'Z', 90),
            },
            'x': {
                key: new Key(this.x+6+this.keyWidth+((this.keyWidth + 6)*1), this.y+18+this.keyHeight*2, this.keyWidth, this.keyHeight, 'X', 88),
            },
            'c': {
                key: new Key(this.x+6+this.keyWidth+((this.keyWidth + 6)*2), this.y+18+this.keyHeight*2, this.keyWidth, this.keyHeight, 'C', 67),
            },
            'v': {
                key: new Key(this.x+6+this.keyWidth+((this.keyWidth + 6)*3), this.y+18+this.keyHeight*2, this.keyWidth, this.keyHeight, 'V', 86),
            },
            'b': {
                key: new Key(this.x+6+this.keyWidth+((this.keyWidth + 6)*4), this.y+18+this.keyHeight*2, this.keyWidth, this.keyHeight, 'B', 66),
            },
            'n': {
                key: new Key(this.x+6+this.keyWidth+((this.keyWidth + 6)*5), this.y+18+this.keyHeight*2, this.keyWidth, this.keyHeight, 'N', 78),
            },
            'm': {
                key: new Key(this.x+6+this.keyWidth+((this.keyWidth + 6)*6), this.y+18+this.keyHeight*2, this.keyWidth, this.keyHeight, 'M', 77),
            },
        };

        this._setupNeighbors();
    }

    _setupNeighbors(){
        this.keys.q.neighbors = [this.keys.w, this.keys.a];
        this.keys.w.neighbors = [this.keys.q, this.keys.e, this.keys.s];
        this.keys.e.neighbors = [this.keys.w, this.keys.r, this.keys.d];
        this.keys.r.neighbors = [this.keys.e, this.keys.t, this.keys.f];
        this.keys.t.neighbors = [this.keys.r, this.keys.y, this.keys.g];
        this.keys.y.neighbors = [this.keys.t, this.keys.u, this.keys.h];
        this.keys.u.neighbors = [this.keys.y, this.keys.i, this.keys.j];
        this.keys.i.neighbors = [this.keys.u, this.keys.o, this.keys.k];
        this.keys.o.neighbors = [this.keys.i, this.keys.p, this.keys.l];
        this.keys.p.neighbors = [this.keys.o];
        this.keys.a.neighbors = [this.keys.q, this.keys.s, this.keys.z];
        this.keys.s.neighbors = [this.keys.a, this.keys.d, this.keys.w, this.keys.x];
        this.keys.d.neighbors = [this.keys.s, this.keys.f, this.keys.e,this.keys.c];
        this.keys.f.neighbors = [this.keys.d, this.keys.g, this.keys.r, this.keys.v];
        this.keys.g.neighbors = [this.keys.f, this.keys.h, this.keys.t, this.keys.b];
        this.keys.h.neighbors = [this.keys.g, this.keys.j, this.keys.y, this.keys.n];
        this.keys.j.neighbors = [this.keys.h, this.keys.k, this.keys.u, this.keys.m];
        this.keys.k.neighbors = [this.keys.j, this.keys.l, this.keys.i];
        this.keys.l.neighbors = [this.keys.k, this.keys.o, this.keys.p];
        this.keys.z.neighbors = [this.keys.a, this.keys.x];
        this.keys.x.neighbors = [this.keys.z, this.keys.c, this.keys.s];
        this.keys.c.neighbors = [this.keys.x, this.keys.v, this.keys.d];
        this.keys.v.neighbors = [this.keys.c, this.keys.b, this.keys.f];
        this.keys.b.neighbors = [this.keys.v, this.keys.n, this.keys.g];
        this.keys.n.neighbors = [this.keys.b, this.keys.m, this.keys.h];
        this.keys.m.neighbors = [this.keys.n, this.keys.j, this.keys.k, this.keys.l];
    }

    update(){
        for (const k of Object.values(this.keys)){
            k.key.update();
        }
        if (this.wave.active.length && this.frame % 5 === 0) this.updateWave();
        this.frame++;
    }

    startWaveFromKeyCode(code){
        const pressed = Object.values(this.keys).filter(k => k.key.keyCode === code);
        if (pressed.length){
            this.wave = {
                active: [pressed[0].key.text.toLowerCase()],
                seen: {},
            };
        }
    }

    startWaveFromLetter(letter){
        this.wave = {
            active: [letter.toLowerCase()],
            seen: {},
        };
    }

    updateWave(){
        const active = [];
        for (const a of this.wave.active){
            if (!this.wave.seen[a]){
                this.keys[a].key.state = 1;
                this.wave.seen[a] = 1;
                for (const n of this.keys[a].neighbors) active.push(n.key.text.toLowerCase());
            }
        }
        this.wave.active = active;
    }

    draw(){
        for (const k of Object.values(this.keys)){
            k.key.draw();
        }
    }

    getKeyFromKeyCode(code){
        const pressed = Object.values(this.keys).filter(k => k.key.keyCode === code);
        return (pressed.length) ? pressed[0].key : null;
    }
}
