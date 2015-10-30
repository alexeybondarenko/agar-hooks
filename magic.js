
// wsHandler. WebSocket Handler.

var wsHandler = function (onSend, onRecv) {
    var self = this;
    WebSocket.prototype._send = WebSocket.prototype.send;
    WebSocket.prototype.send = function(data) {
        onSend(data);
        // add message subscriber
        self.addMessageCallback (this, onRecv);
        return this._send(data);
    };
};
wsHandler.prototype = {
    addMessageCallback : (function () {
        var ran = false;
        return function (ws, cb) {
            if ( ran ) return;
            ran = true;
            ws.addEventListener('message', cb, false);
        };
    }())
};

// Packet
// Easy reading ArrayBuffer. Withot thinking about offset. It is ideal for linear protocols
function Packet(buffer) {

    this.data   = new DataView(buffer);
    this.length = this.data.byteLength;

    this.offset = 0;
}

Packet.prototype = {
    readUInt8: function(p) {
        var offset = (typeof p) == 'number' ? p : this.offset;
        var ret;
        if(this.data.getUint8) {
            ret = this.data.getUint8(offset);
        }else{
            ret = this.data.readUInt8(offset);
        }
        if(p === undefined) this.offset += 1;

        return ret;
    },

    readUInt16BE: function(p) {
        var offset = (typeof p) == 'number' ? p : this.offset;
        var ret;
        if(this.data.getUint16) {
            ret = this.data.getUint16(offset, false);
        }else{
            ret = this.data.readUInt16BE(offset);
        }
        if(p === undefined) this.offset += 2;

        return ret;
    },

    readUInt16LE: function(p) {
        var offset = (typeof p) == 'number' ? p : this.offset;
        var ret;
        if(this.data.getUint16) {
            ret = this.data.getUint16(offset, true);
        }else{
            ret = this.data.readUInt16LE(offset);
        }
        if(p === undefined) this.offset += 2;

        return ret;
    },

    readSInt16LE: function(p) {
        var offset = (typeof p) == 'number' ? p : this.offset;
        var ret;
        if(this.data.getInt16) {
            ret = this.data.getInt16(offset, true);
        }else{
            ret = this.data.readInt16LE(offset);
        }
        if(p === undefined) this.offset += 2;

        return ret;
    },

    readUInt32LE: function(p) {
        var offset = (typeof p) == 'number' ? p : this.offset;
        var ret;
        if(this.data.getUint32) {
            ret = this.data.getUint32(offset, true);
        }else{
            ret = this.data.readUInt32LE(offset);
        }
        if(p === undefined) this.offset += 4;

        return ret;
    },

    readUInt32BE: function(p) {
        var offset = (typeof p) == 'number' ? p : this.offset;
        var ret;
        if(this.data.getUint32) {
            ret = this.data.getUint32(offset, false);
        }else{
            ret = this.data.readUInt32BE(offset);
        }
        if(p === undefined) this.offset += 4;

        return ret;
    },

    readSInt32LE: function(p) {
        var offset = (typeof p) == 'number' ? p : this.offset;
        var ret;
        if(this.data.getInt32) {
            ret = this.data.getInt32(offset, true);
        }else{
            ret = this.data.readInt32LE(offset);
        }
        if(p === undefined) this.offset += 4;

        return ret;
    },

    readSInt32BE: function(p) {
        var offset = (typeof p) == 'number' ? p : this.offset;
        var ret;
        if(this.data.getInt32) {
            ret = this.data.getInt32(offset, false);
        }else{
            ret = this.data.readInt32BE(offset);
        }
        if(p === undefined) this.offset += 4;

        return ret;
    },

    readFloat32LE: function(p) {
        var offset = (typeof p) == 'number' ? p : this.offset;
        var ret;
        if(this.data.getFloat32) {
            ret = this.data.getFloat32(offset, true);
        }else{
            ret = this.data.readFloatLE(offset);
        }
        if(p === undefined) this.offset += 4;

        return ret;
    },

    readFloat32BE: function(p) {
        var offset = (typeof p) == 'number' ? p : this.offset;
        var ret;
        if(this.data.getFloat32) {
            ret = this.data.getFloat32(offset, false);
        }else{
            ret = this.data.readFloatBE(offset);
        }
        if(p === undefined) this.offset += 4;

        return ret;
    },

    readFloat64LE: function(p) {
        var offset = (typeof p) == 'number' ? p : this.offset;
        var ret;
        if(this.data.getFloat64) {
            ret = this.data.getFloat64(offset, true);
        }else{
            ret = this.data.readDoubleLE(offset);
        }
        if(p === undefined) this.offset += 8;

        return ret;
    },

    readFloat64BE: function(p) {
        var offset = (typeof p) == 'number' ? p : this.offset;
        var ret;
        if(this.data.getFloat64) {
            ret = this.data.getFloat64(offset, false);
        }else{
            ret = this.data.readDoubleBE(offset);
        }
        if(p === undefined) this.offset += 8;

        return ret;
    },

    toString: function() {
        var out = '';
        for(var i=0;i<this.length;i++) {
            if(out) out += ' ';
            var char = this.readUInt8(i).toString(16);
            if(char.length == 1) out += '0';
            out += char;
        }

        return out;
    }
};

function Client (client_name, ctx) {
    //you can change this values
    this.client_name      = client_name; //name used for log
    this.debug            = 1;           //debug level, 0-5 (5 will output extremely lot of data)
    this.inactive_destroy = 5*60*1000;   //time in ms when to destroy inactive balls
    this.inactive_check   = 10*1000;     //time in ms when to search inactive balls
    this.spawn_interval   = 200;	 //time in ms for respawn interval. 0 to disable (if your custom server don't have spawn problems)
    this.spawn_attempts   = 25;		 //how much attempts to spawn before give up (official servers do have unstable spawn problems)

    //don't change things below if you don't understand what you're doing

    this.tick_counter      = 0;    //number of ticks (packet ID 16 counter)
    this.inactive_interval = 0;    //ID of setInterval()
    this.balls             = {};   //all balls
    this.my_balls          = [];   //IDs of my balls
    this.score             = 0;    //my score
    this.leaders           = [];   //IDs of leaders in FFA mode
    this.teams_scores      = [];   //scores of teams in Teams mode
    this.facebook_key      = '';   //facebook key. Check README.md how to get it
    this.spawn_attempt     = 0;    //attempt to spawn
    this.spawn_interval_id = 0;    //ID of setInterval()


    this.ctx = ctx;
    this.screen = {
        width: window.innerWidth,
        height: window.innerHeight,
        center: {
            x: null,
            y: null
        }
    };

    this.map = {
        min_x: null,
        max_x: null,
        min_y: null,
        max_y: null,
        width: 14000,
        height: 14000
    };
}


var Ball = function (client, id) {
    if (client.balls[id]) return client.balls[id];

    this.id    = id;
    this.name  = null;
    this.x     = 0;
    this.y     = 0;
    this.size  = 0;
    this.mass  = 0;
    this.virus = false;
    this.mine  = false;

    this.client      = client;
    this.destroyed   = false;
    this.visible     = false;
    this.last_update = (+new Date);
    this.update_tick = 0;

    client.balls[id] = this;
    return this;

};

Ball.prototype = {
    draw: function () {
        if (this.mine) {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.client.screen.width / 2, this.client.screen.height / 2, 10, 10);
        }
        console.log('draw', this.x, this.y, this.mine);
    },
    destroy: function(reason) {
        this.destroyed = reason;
        delete this.client.balls[this.id];
        var mine_ball_index = this.client.my_balls.indexOf(this.id);
        if(mine_ball_index > -1) {
            this.client.my_balls.splice(mine_ball_index, 1);
        }

    },
    setCords: function(new_x, new_y) {
        if(this.x == new_x && this.y == new_y) return;
        var old_x = this.x;
        var old_y = this.y;
        this.x    = new_x;
        this.y    = new_y;

        if(!old_x && !old_y) return;
    },

    setSize: function(new_size) {
        if(this.size == new_size) return;
        var old_size = this.size;
        this.size    = new_size;
        this.mass    = parseInt(Math.pow(new_size/10, 2));

        if(!old_size) return;
    },

    setName: function(name) {
        if(this.name == name) return;
        var old_name = this.name;
        this.name    = name;
    },

    update: function() {
        var old_time     = this.last_update;
        this.last_update = (+new Date);
    },

    appear: function() {
        if(this.visible) return;
        this.visible = true;
    },

    disappear: function() {
        if(!this.visible) return;
        this.visible = false;
    },

    toString: function() {
        if(this.name) return this.id + '(' + this.name + ')';
        return this.id.toString();
    }
};


// Protocol parsing function
function parseBuffer(client, buffer) {
    var packet = new Packet(buffer);
    switch (packet.readUInt8()) {
        case 16: {
            var balls = parsePacketUpdate(client, packet) || [];
            break;
        }
        case 32: {
            parsePacketMyBalls (client, packet);
            break;
        }
        case 64:
            parseMapSize (client, packet);
            break;

    }
}


function parseMapSize (client, packet) {
    client.map.min_x = packet.readFloat64LE();
    client.map.min_y = packet.readFloat64LE();
    client.map.max_x = packet.readFloat64LE();
    client.map.max_y = packet.readFloat64LE();
}

function parsePacketMyBalls (client, packet) {
    var ball_id = packet.readUInt32LE();
    var ball    = client.balls[ball_id] || new Ball(client, ball_id);

    ball.mine   = true;
    client.my_balls.push(ball_id);
}
function parsePacketUpdate (client, packet) {

    var eaters_count = packet.readUInt16LE();

    client.tick_counter++;

    //reading eat events
    for(var i=0;i<eaters_count;i++) {
        var eater_id = packet.readUInt32LE();
        var eaten_id = packet.readUInt32LE();

        if(!client.balls[eater_id]) new Ball(client, eater_id);
        client.balls[eater_id].update();
        if(client.balls[eaten_id]) client.balls[eaten_id].destroy({'reason':'eaten', 'by':eater_id});

    }


    //reading actions of balls
    while(1) {
        var is_virus = false;
        var ball_id;
        var coordinate_x;
        var coordinate_y;
        var size;
        var color;
        var nick = null;

        ball_id = packet.readUInt32LE();
        if(ball_id == 0) break;
        coordinate_x = packet.readSInt32LE();
        coordinate_y = packet.readSInt32LE();
        size = packet.readSInt16LE();

        var color_R = packet.readUInt8();
        var color_G = packet.readUInt8();
        var color_B = packet.readUInt8();

        color = (color_R << 16 | color_G << 8 | color_B).toString(16);
        color = '#' + ('000000' + color).substr(-6);

        var opt = packet.readUInt8();
        is_virus = !!(opt & 1);

        //reserved for future use?
        if (opt & 2) {
            packet.offset += 4;
        }
        if (opt & 4) {
            packet.offset += 8;
        }
        if (opt & 8) {
            packet.offset += 16;
        }

        while(1) {
            var char = packet.readUInt16LE();
            if(char == 0) break;
            if(!nick) nick = '';
            nick += String.fromCharCode(char);
        }

        var ball = client.balls[ball_id] || new Ball(client, ball_id);
        ball.color = color;
        ball.virus = is_virus;
        ball.setCords(coordinate_x, coordinate_y);
        ball.setSize(size);
        if(nick) ball.setName(nick);
        ball.update_tick = client.tick_counter;
        ball.appear();
        ball.update();

        ball.draw();
        //client.emit('ballAction', ball_id, coordinate_x, coordinate_y, size, is_virus, nick);
    }

    var balls_on_screen_count = packet.readUInt32LE();

    //disappear events
    for(i=0;i<balls_on_screen_count;i++) {
        ball_id = packet.readUInt32LE();

        ball = client.balls[ball_id] || new Ball(client, ball_id);
        ball.update_tick = client.tick_counter;
        ball.update();
        if(ball.mine) {
            ball.destroy({reason: 'merge'});
            //client.emit('merge', ball.id);
        }else{
            ball.disappear();
        }
    }

}

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

var client = new Client (null, ctx);

function parse (msg) {
    parseBuffer(client, msg.data);
}

var handler = new wsHandler (function onSend (data) {}, parse);