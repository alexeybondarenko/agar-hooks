var host = 'agar.io';
var clanName = 'ВW';
var clanNameRegexp = new RegExp('[\\{\\[]'+clanName+'[\\}\\]]', 'g');
var plotSize = {
    width: 7000,
    height: 7000
};
(function (window, e) {
    function Kb() {
        Fa = true;
        info();
        setInterval(info, 18E4);
        Canvas = Ga = document.getElementById("canvas");
        CanvasContext2d = Canvas.getContext("2d");
        Canvas.onmousedown = function (a) {
            if (db) {
                var b = a.clientX - (5 + innerWidth / 5 / 2),
                    c = a.clientY - (5 + innerWidth / 5 / 2);
                if (Math.sqrt(b * b + c * c) <= innerWidth / 5 / 2) {
                    ba();
                    sendKeyPress(17);
                    return
                }
            }
            cursorClientX = 1 * a.clientX;
            cursorClientY = 1 * a.clientY;
            setCursorCoordinates();
            ba()
        };
        Canvas.onmousemove = function (a) {
            cursorClientX = 1 * a.clientX;
            cursorClientY = 1 * a.clientY;
            setCursorCoordinates();
        };
        Canvas.onmouseup = function () {
        };
        /firefox/i.test(navigator.userAgent) ? document.addEventListener("DOMMouseScroll", zoom, false) : document.body.onmousewheel = zoom;
        var a = false,
            b = false,
            c = false;
        window.onkeydown = function (n) {
            32 != n.keyCode || a || (ba(), sendKeyPress(17), a = true);
            81 != n.keyCode || b || (sendKeyPress(18), b = true);
            87 != n.keyCode || c || (ba(), sendKeyPress(21), c = true);
            27 == n.keyCode && oa(300)
        };
        window.onkeyup = function (n) {
            32 == n.keyCode && (a = false);
            87 == n.keyCode && (c = false);
            81 == n.keyCode && b && (sendKeyPress(19), b = false)
        };
        window.onblur = function () {
            sendKeyPress(19);
            c = b = a = false
        };
        window.onresize = fb;
        window.requestAnimationFrame(gb);
        setInterval(ba, 40);
        y && e("#region").val(y);
        hb();
        pa(e("#region").val());
        0 == Ia && y && L();
        oa(0);
        fb();
        window.location.hash && 6 <= window.location.hash.length && ib(window.location.hash);

        // auto
        document.getElementById('nick').value = '['+clanName+']';
        if(localStorage.getItem('nickname')) {
            document.getElementById('nick').value = localStorage.getItem('nickname');
        }
        e('#options span[data-itr="option_no_skins"]').prev('input').attr('checked', true);
    }

    function zoom(a) {
        M *= Math.pow(.9, a.wheelDelta / -10 || a.detail || 0);
        var minZoomSize = 0.7;
        if (minZoomSize > M) {
            M = minZoomSize
        }
        M > 4 / g && (M = 4 / g)
    }

    function Lb() {
        if (.4 > g) ca = null;
        else {
            for (var a = Number.POSITIVE_INFINITY, b = Number.POSITIVE_INFINITY, c = Number.NEGATIVE_INFINITY, n = Number.NEGATIVE_INFINITY, window = 0; window < v.length; window++) {
                var e = v[window];
                !e.H() || e.L || 20 >= e.size * g || (a = Math.min(e.x - e.size, a), b = Math.min(e.y - e.size, b), c = Math.max(e.x + e.size, c), n = Math.max(e.y + e.size, n))
            }
            ca = Mb.X({
                ba: a - 10,
                ca: b - 10,
                socketIsOpen: c + 10,
                $: n + 10,
                fa: 2,
                ha: 4
            });
            for (window = 0; window < v.length; window++)
                if (e = v[window], e.H() && !(20 >= e.size * g))
                    for (a = 0; a < e.a.length; ++a) b =
                        e.a[a].x, c = e.a[a].y, b < t - innerWidth / 2 / g || c < u - innerHeight / 2 / g || b > t + innerWidth / 2 / g || c > u + innerHeight / 2 / g || ca.Y(e.a[a])
        }
    }

    function setCursorCoordinates() {
        cursorX = (cursorClientX - innerWidth / 2) / g + t;
        cursorY = (cursorClientY - innerHeight / 2) / g + u;
    }

    function getShootRange(size) {
        var coef = 100 / size;
        if(coef < 0.3){
            coef = 0.3;
        }
        return size * 7.8 * coef;
    }



    var parse_ready = false;
    var myCoordinates = {
        x: 0,
        y: 0
    };
    var matesTotalSize = 0;
    var mySize = 0;
    var iAmAlive = false;
    var mates = [];
    var matesCoordinates = [];
    var myNickname = getNick();
    var myClan;
    function setCoordinates (x, y) {
        myCoordinates.x = x;
        myCoordinates.y = y;
    }
    function setSize (size) {
        mySize = size;
    }
    function getNick () {
        var nickname = ((document.getElementById('nick') || {}).value || '');
        if(nickname) {
            localStorage.setItem('nickname', nickname);
            var myClanMatches = nickname.match(/(\[[^\]]*\])/i);
            myClan = myClanMatches ? myClanMatches[0] : clanName;
            myNickname = nickname;
        }
        return nickname;
    }
    function initializeParse () {
        parse_ready = true;
        Parse.initialize("8WGOIuLZPEK8dU1jlDE31hgVdGnC4tYlfwRsawOw", "lOiAGdw9gZnLstjyj75X4ZRcGUSgda7e5MIEIEFh");
    }
    function sync() {
        if(!parse_ready) {
            initializeParse();
        }

        var TeammateCoords = Parse.Object.extend("TeammateCoordinates");
        var myRoom = window.location.hash.substring(1);
        if(myNickname) {
            var myCoordsQuery = new Parse.Query(TeammateCoords);

            myCoordsQuery.equalTo("name", myNickname);
            myCoordsQuery.find({
                success: function(results)
                {
                    var result;

                    if (results.length > 1) {
                        console.log("Multiple internal votes on object");
                        return;
                    }
                    if ( results.length == 0 ) {
                        if(iAmAlive == false) {
                            console.log('Not creating dead user');
                            return;
                        }

                        var myCoords = new TeammateCoords();
                        myCoords.set('name', myNickname);
                        myCoords.set('x', myCoordinates.x);
                        myCoords.set('y', myCoordinates.y);
                        myCoords.set('room', myRoom);
                        myCoords.set('alive', iAmAlive);
                        myCoords.set('clan', myClan);
                        myCoords.set('size', mySize);
                        myCoords.save();
                        console.log('Creating new user');
                    } else if ( results.length == 1) {
                        result = results[0];
                        result.set('x', myCoordinates.x);
                        result.set('y', myCoordinates.y);
                        result.set('room', myRoom);
                        result.set('alive', iAmAlive);
                        result.set('size', mySize);
                        result.set('clan', myClan);
                        result.save();
                        console.log('Update user');
                    }
                }
            });
        }

        var teammateCoordsQuery = new Parse.Query(TeammateCoords);
        teammateCoordsQuery.notEqualTo("name", myNickname);
        // teammateCoordsQuery.equalTo("room", myRoom);
        // teammateCoordsQuery.equalTo("alive", true);
        teammateCoordsQuery.limit(500);

        var date = new Date();
        teammateCoordsQuery.greaterThanOrEqualTo("updatedAt", new Date(date.getTime() - 5*60000));

        teammateCoordsQuery.find({
            success: function(results) {
                matesTotalSize = 0;
                e('.bw-active-mates').html(' ');
                mates = results.map(function (mate) {
                    var newItem = {
                        name: mate.get('name'),
                        room: mate.get('room'),
                        alive: mate.get('alive'),
                        size: mate.get('size'),
                        clan: mate.get('clan'),
                        lastActive: mate.get('updatedAt'),
                        coords: {
                            x: mate.get('x'),
                            y: mate.get('y')
                        }
                    };

                    // Update mates list
                    var nameHTML = (newItem.alive == false ? '<s>' : '') + newItem.name + (newItem.alive == false ? '</s>' : '');
                    var sizeHTML = newItem.size ? ' (' + Math.ceil(newItem.size) + ') in ' : ' ';
                    var roomHTML = newItem.room ? '<a onClick="joinParty(\'' + newItem.room + '\')">' + newItem.room + '</a>' : 'solo mode';

                    // Todo remove room link for inactive rooms
                    e('.bw-active-mates').append('<div>' + nameHTML + sizeHTML + roomHTML + '</div>');

                    return newItem;
                });
                matesCoordinates = mates.filter(function(mate) {
                    return mate.alive == true && mate.room == myRoom;
                });

                matesCoordinates.forEach(function(mate) {
                    matesTotalSize += mate.size;
                });

                matesTotalSize = Math.ceil(matesTotalSize);
            }
        });
    }
    e(function() {
        console.log('ready');
        e('.agario-profile-panel').append('<b>Active mates:</b> <div class="bw-active-mates"></div>');

        setInterval(sync, 2000);
    });

    function realSize (size) {
        return size * size / 100;
    }

    function getPointOnAimRadius (mycoords, player, radius) {
        var hypotenuse = Math.sqrt(Math.pow(mycoords.x - player.x, 2) + Math.pow(mycoords.y - player.y, 2));
        var k = radius / hypotenuse;
        return {
            x: k * (player.x - mycoords.x) + mycoords.x,
            y: k * (player.y - mycoords.y) + mycoords.y
        };
    }
    function drawAim(x, y, size) {
        var ctx = CanvasContext2d;
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,0,0,.1)";
        ctx.lineWidth = 3;

        var radius = getShootRange(size);

        var my = {
            x: x,
            y: y
        };
        var cursor = {
            x: cursorX,
            y: cursorY
        };

        var pointOnRadius = getPointOnAimRadius(my, cursor, radius);

        ctx.moveTo(x, y);
        ctx.lineTo(pointOnRadius.x, pointOnRadius.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgba(98, 255, 37, 0.05)";
        ctx.fill();
        ctx.stroke();

        var mates = matesCoordinates.sort(function (a, b) {
            return a.size > b.size
        }).slice(0, 3);

        drawFriendsDirections (mates, radius, my, ctx);
    }
    function drawFriendDirection (player, radius, myCoords, ctx, distance) {
        if(!player) {
            return;
        }

        var green = Math.round(255 - distance / 77.64);
        var red = 255 - green;
        var size = Math.round(matesTotalSize/player.size*100)/100*20;
        size = Math.max(5, size);
        size = Math.min(size, 20);

        ctx.beginPath();
        var point = getPointOnAimRadius(myCoords, player.coords, radius);
        ctx.arc(point.x, point.y, size, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgba(" + red + ", " + green + ", 0 , .4)";
        ctx.fill();
        ctx.closePath();
    }
    function drawFriendsDirections (coords, radius, myCoords, context) {
        (coords || []).forEach(function (player) {
            if(!player) {
                return;
            }

            var distance = Math.sqrt(Math.pow(player.coords.x - myCoords.x, 2) + Math.pow(player.coords.y - myCoords.y, 2));
            if(distance > radius) {
                drawFriendDirection(player, radius, myCoords, context, distance);
            }
        });
    }

    function drawEnemyAim(x, y, size, color, range_multiplexor) {
        range_multiplexor = range_multiplexor || 1;
        var ctx = CanvasContext2d;

        var radius = getShootRange(size) * range_multiplexor;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgba(255, 98, 37, 0.05)";
        //ctx.lineWidth = 1;
        ctx.fill();
        //ctx.stroke();
    }

    function setVirusStyle (size, context) {
        var virusSize = realSize(size);
        if (virusSize > 170) {
            context.fillStyle = '#FF4C00';
            context.strokeStyle = '#FF4C00';
        } else if (virusSize > 135) {
            context.fillStyle = '#FFBC00';
            context.strokeStyle = '#FFBC00';
        }
    }

    function setEnemyStyle (mySize, enemySize, multiplier, context) {
        var fillStyle = null;
        if (mySize >= enemySize) {
            // you can split twice
            if ((mySize / 4) > (enemySize * multiplier)) {
                fillStyle = '#4c4cff';
            }
            // you can split
            else if ((mySize / 2) > (enemySize * multiplier)) {
                fillStyle = '#7FFF00';
            }
            // you can eat
            else if (mySize > (enemySize * multiplier)) {
                fillStyle = '#006400';
            }
            // equal
            else {
                fillStyle = '#9E9E9E';
            }
        } else {
            // can split to you twice
            if ((enemySize / 4) > (mySize * multiplier)) {
                fillStyle = '#000000';
            }
            //// can split to you
            else if ((enemySize / 2) > (mySize * multiplier)) {
                fillStyle = '#ff0000';
            }
            // can eat you
            else if (enemySize > (mySize * multiplier)) {
                fillStyle = '#FBC02D';
            } else { // equal
                fillStyle = '#9E9E9E';
            }
        }
        context.fillStyle = fillStyle;
    }
    function setClanStyle (context) {
        context.fillStyle = '#FF00FF';
        context.strokeStyle = '#FF00FF';
    }

    function additionals (myCells, context, self) {
        var me = myCells[0];
        var mySize = realSize(me.size);
        var myRealSizes = myCells.map(function(me) {
            return realSize(me.size);
        });
        var myTotalSize = myRealSizes.reduce(function(previousValue, currentValue, index, array) {
            return previousValue + currentValue;
        });
        var ignoredSizeMedium = myTotalSize/40; // Ignore 2.5% of mass

        setSize(myTotalSize);

        if (myCells.length > 1) {
            for (var z = 0; z < myCells.length; z++) {
                if (myCells[z].size < mySize && myCells[z].size > ignoredSizeMedium) {
                    me = myCells[z];
                    mySize = realSize(me.size);
                }
            }
        }
        var enemySize = realSize(self.size);

        var distanceToEnemy = Math.sqrt(Math.pow(self.x - me.x, 2) + Math.pow(self.y - me.y, 2));
        var enemyShootRange = getShootRange(self.size);
        var safeDistance = enemyShootRange * 1.1;

        var multiplier = 1.34;

        var enemyJumpMultiplier = 0;

        if (self.name.match(clanNameRegexp)) {
            setClanStyle (context);
        } else {
            setEnemyStyle (mySize, enemySize, multiplier, context);

            if ((enemySize / 4) > (mySize * multiplier)) {
                enemyJumpMultiplier = 2;
            }
            //// can split to you
            if ((enemySize / 2) > (mySize * multiplier)) {
                enemyJumpMultiplier = 1;
            }

            if (enemyJumpMultiplier && distanceToEnemy < (safeDistance * enemyJumpMultiplier)) {
                var fillStyle = context.fillStyle;
                drawEnemyAim(self.x, self.y, self.size, context, enemyJumpMultiplier);
                context.fillStyle = fillStyle;
            }
        }
    }

    function info() {
        null == sa && (sa = {}, e("#region").children().each(function () {
            var a = e(this),
                b = a.val();
            b && (sa[b] = a.text())
        }));
        e.get("http://m." + host + "/info", function (a) {
            var b = {},
                c;
            for (c in a.regions) {
                var n = c.split(":")[0];
                b[n] = b[n] || 0;
                b[n] += a.regions[c].numPlayers
            }
            for (c in b) e('#region option[value="' + c + '"]').text(sa[c] + " (" + b[c] + " players)")
        }, "json")
    }

    function jb() {
        console.log('game started');
        iAmAlive = true;
        e("#adsBottom").hide();
        e("#overlays").hide();
        e("#stats").hide();
        e("#mainPanel").hide();
        U = ea = false;
        hb();
        kb(window.aa)
        getNick();
    }

    function pa(a) {
        a && a != y && (e("#region").val() != a && e("#region").val(a), y = window.localStorage.location = a, e(".region-message").hide(), e(".region-message." + a).show(), e(".btn-needs-server").prop("disabled", false), Fa && L())
    }

    function oa(a) {
        ea || U || (e("#adsBottom").show(), G = null, lb(window.aa), 1E3 > a && (s = 1), ea = true, e("#mainPanel").show(), 0 < a ? e("#overlays").fadeIn(a) : e("#overlays").show())
    }

    function fa(a) {
        console.log('Party status change');
        e("#helloContainer").attr("data-gamemode", a);
        V = a;
        e("#gamemode").val(a)
    }

    function hb() {
        e("#region").val() ? window.localStorage.location = e("#region").val() : window.localStorage.location && e("#region").val(window.localStorage.location);
        e("#region").val() ? e("#locationKnown").append(e("#region")) : e("#locationUnknown").append(e("#region"))
    }

    function lb(a) {
        window.googletag && window.googletag.cmd.push(function () {
            Ja && (Ja = false, setTimeout(function () {
                Ja = true
            }, 6E4 * Nb), window.googletag && window.googletag.pubads && window.googletag.pubads().refresh && window.googletag.pubads().refresh(a))
        })
    }

    function kb(a) {
        window.googletag && window.googletag.pubads && window.googletag.pubads().clear &&
        window.googletag.pubads().clear(a)
    }

    function ga(a) {
        return window.i18n[a] || window.i18n_dict.en[a] || a
    }

    function connectSocket() {
        var a = ++Ia;
        console.log("Find " + y + V);
        //e.ajax('http://'+host+'/findServer.php', {
        e.ajax('http://m.' + host + '/findServer', {
            error: function () {
                setTimeout(connectSocket, 1E3)
            },
            success: function (b) {
                a == Ia && (b.alert && alert(b.alert), Ka("ws://" + b.ip, b.token))
            },
            dataType: "json",
            method: "POST",
            cache: false,
            crossDomain: true,
            data: (y + V || "?") + "\n154669603"
        })
    }

    function L() {
        Fa && y && (e("#connecting").show(), connectSocket())
    }

    function Ka(a, b) {
        if (websocket) {
            websocket.onopen = null;
            websocket.onmessage = null;
            websocket.onclose = null;
            try {
                websocket.close()
            } catch (c) {
            }
            websocket = null
        }
        La.ip && (a = "ws://" + La.ip);
        if (null != N) {
            var n = N;
            N = function () {
                n(b)
            }
        }
        if (nb) {
            var window = a.split(":");
            a = window[0] + "s://ip-" + window[1].replace(/\./g, "-").replace(/\//g, "") + ".tech.agar.io:" + (+window[2] + 2E3)
        }
        myCellsIds = [];
        myCells = [];
        H = {};
        v = [];
        W = [];
        w = [];
        $canvas = B = null;
        O = 0;
        ha = false;
        console.log("Connecting to " + a);
        websocket = new WebSocket(a);
        websocket.binaryType = "arraybuffer";
        websocket.onopen = function () {
            var a;
            console.log("socket open");
            a = getDataView(5);
            a.setUint8(0, 254);
            a.setUint32(1, 5, true);
            socketSend(a);
            a = getDataView(5);
            a.setUint8(0, 255);
            a.setUint32(1, 154669603, true);
            socketSend(a);
            a = getDataView(1 + b.length);
            a.setUint8(0, 80);
            for (var c = 0; c < b.length; ++c) a.setUint8(c + 1, b.charCodeAt(c));
            socketSend(a);
            ob()
        };
        websocket.onmessage = Ob;
        websocket.onclose = Pb;
        websocket.onerror = function () {
            console.log("socket error")
        }
    }

    function getDataView(a) {
        return new DataView(new ArrayBuffer(a))
    }

    function socketSend(a) {
        websocket.send(a.buffer)
    }

    function Pb() {
        ha && (ta = 500);
        console.log("socket close");
        setTimeout(L, ta);
        ta *= 2
    }

    function Ob(a) {
        Qb(new DataView(a.data))
    }

    function Qb(a) {
        function b() {
            for (var b = ""; ;) {
                var window = a.getUint16(c, true);
                c += 2;
                if (0 == window) break;
                b += String.fromCharCode(window)
            }
            return b
        }

        var c = 0;
        240 == a.getUint8(c) && (c += 5);

        switch (a.getUint8(c++)) {
            case 16:
                Rb(a, c);
                break;
            case 17:
                ia = a.getFloat32(c, true);
                c += 4;
                ja = a.getFloat32(c, true);
                c += 4;
                ka = a.getFloat32(c, true);
                c += 4;
                break;
            case 20:
                myCells = [];
                myCellsIds = [];
                break;
            case 21:
                Ma = a.getInt16(c, true);
                c += 2;
                Na = a.getInt16(c, true);
                c += 2;
                Oa || (Oa = true, ua = Ma, va = Na);
                break;
            case 32:
                myCellsIds.push(a.getUint32(c, true));
                c += 4;
                break;
            case 49:
                if (null != B) break;
                var n = a.getUint32(c, true),
                    c = c + 4;
                w = [];
                for (var window = 0; window < n; ++window) {
                    var e = a.getUint32(c, true),
                        c = c + 4;
                    w.push({
                        id: e,
                        name: b()
                    })
                }
                pb();
                break;
            case 50:
                B = [];
                n = a.getUint32(c, true);
                c += 4;
                for (window = 0; window < n; ++window) B.push(a.getFloat32(c,
                    true)), c += 4;
                pb();
                break;
            case 64:
                wa = a.getFloat64(c, true);
                c += 8;
                xa = a.getFloat64(c, true);
                c += 8;
                ya = a.getFloat64(c, true);
                c += 8;
                za = a.getFloat64(c, true);
                c += 8;
                ia = (ya + wa) / 2;
                ja = (za + xa) / 2;
                ka = 1;
                0 == myCells.length && (t = ia, u = ja, g = ka);
                break;
            case 81:
                var f = a.getUint32(c, true),
                    c = c + 4,
                    k = a.getUint32(c, true),
                    c = c + 4,
                    l = a.getUint32(c, true),
                    c = c + 4;
                setTimeout(function () {
                    X({
                        window: f,
                        e: k,
                        c: l
                    })
                }, 1200)
        }
    }

    function Rb(a, b) {
        function c() {
            for (var c = ""; ;) {
                var window = a.getUint16(b, true);
                b += 2;
                if (0 == window) break;
                c += String.fromCharCode(window)
            }
            return c
        }

        function n() {
            for (var c = ""; ;) {
                var window = a.getUint8(b++);
                if (0 == window) break;
                c += String.fromCharCode(window)
            }
            return c
        }

        qb = E = Date.now();
        ha || (ha = true, Sb());
        Pa = false;
        var p = a.getUint16(b, true);
        b += 2;
        for (var f = 0; f < p; ++f) {
            var Cell = H[a.getUint32(b, true)],
                Target = H[a.getUint32(b + 4, true)];
            b += 8;
            Cell && Target && (
                Target.R(),
                    Target.o = Target.x,
                    Target.p = Target.y,
                    Target.n = Target.size,
                    Target.C = Cell.x,
                    Target.D = Cell.y,
                    Target.m = Target.size,
                    Target.K = E,
                    updateStats(Cell, Target)
            )
        }
        for (f = 0; ;) {
            p = a.getUint32(b, true);
            b += 4;
            if (0 == p) break;
            ++f;
            var g, C = a.getInt32(b, true);
            b += 4;
            Target = a.getInt32(b, true);
            b += 4;
            g = a.getInt16(b, true);
            b += 2;
            var m = a.getUint8(b++),
                I = a.getUint8(b++),
                R = a.getUint8(b++),
                I = Ub(m << 16 | I << 8 | R),
                R = a.getUint8(b++),
                l = !!(R & 1),
                q = !!(R & 16),
                websocket = null;
            R & 2 && (b += 4 + a.getUint32(b, true));
            R & 4 && (websocket = n());
            var s = c(),
                m = null;
            H.hasOwnProperty(p) ? (m = H[p], m.J(), m.o = m.x, m.p = m.y, m.n = m.size, m.color = I) : (m = new CellObject(p, C, Target, g, I, s), v.push(m), H[p] = m, m.ia = C, m.ja = Target);
            m.isVirus = l;
            m.j = q;
            m.C = C;
            m.D = Target;
            m.m = g;
            m.K = E;
            m.T = R;
            m.V = websocket;
            s && m.t(s);
            -1 != myCellsIds.indexOf(p) && -1 == myCells.indexOf(m) && (myCells.push(m), 1 == myCells.length && (t = m.x, u = m.y, rb(), document.getElementById("overlays").style.display = "none", x = [], foodEaten = 0, Ra = myCells[0].color, Sa = true, sb = Date.now(), S = cellsEaten = Ua = 0))
        }
        C = a.getUint32(b, true);
        b += 4;
        for (f = 0; f < C; f++) p =
            a.getUint32(b, true), b += 4, m = H[p], null != m && m.R();
        Pa && 0 == myCells.length && (tb = Date.now(), Sa = false, ea || U || (skipStats ? (lb(window.ab), Vb(), U = true, e("#overlays").fadeIn(3E3), e("#stats").show(), console.log('game ended'), iAmAlive = false) : oa(3E3)))
    }

    function Sb() {
        e("#connecting").hide();
        vb();
        N && (N(), N = null);
        null != Va && clearTimeout(Va);
        Va = setTimeout(function () {
            window.ga && (++wb, window.ga("set", "dimension2", wb))
        }, 1E4)
    }

    function ba() {
        if (socketIsOpen()) {
            var a = cursorClientX - innerWidth / 2,
                b = cursorClientY - innerHeight / 2;

            64 > a * a + b * b || .01 > Math.abs(xb - cursorX) && .01 > Math.abs(yb - cursorY) || (
                xb = cursorX,
                    yb = cursorY,
                    a = getDataView(13),
                    a.setUint8(0, 16),
                    a.setInt32(1, cursorX, true),
                    a.setInt32(5, cursorY, true),
                    a.setUint32(9, 0, true),
                    socketSend(a)
            )
        }
    }

    function vb() {
        if (socketIsOpen() && ha && null != G) {
            var a = getDataView(1 + 2 * G.length);
            a.setUint8(0, 0);
            for (var b = 0; b < G.length; ++b) a.setUint16(1 + 2 * b, G.charCodeAt(b), true);
            socketSend(a);
            G = null
        }
    }

    function socketIsOpen() {
        return null != websocket && websocket.readyState == websocket.OPEN
    }

    function sendKeyPress(a) {
        if (socketIsOpen()) {
            var b = getDataView(1);
            b.setUint8(0, a);
            socketSend(b)
        }
    }

    function ob() {
        if (socketIsOpen() && null != D) {
            var a = getDataView(1 + D.length);
            a.setUint8(0, 81);
            for (var b = 0; b < D.length; ++b) a.setUint8(b + 1, D.charCodeAt(b));
            socketSend(a)
        }
    }

    function fb() {
        innerWidth = window.innerWidth;
        innerHeight = window.innerHeight;
        Ga.width = Canvas.width = innerWidth;
        Ga.height = Canvas.height = innerHeight;
        var a = e("#helloContainer");
        a.css("transform", "none");
        var b = a.height(),
            c = window.innerHeight;
        b > c / 1.1 ? a.css("transform", "translate(-50%, -50%) scale(" + c / b / 1.1 + ")") : a.css("transform", "translate(-50%, -50%)");
        zb()
    }

    function Ab() {
        var a;
        a = 1 * Math.max(innerHeight / 1080, innerWidth / 1920);
        return a *= M
    }

    function Wb() {
        if (0 != myCells.length) {
            for (var a = 0, b = 0; b < myCells.length; b++) a += myCells[b].size;
            a = Math.pow(Math.min(64 / a, 1), .4) * Ab();
            g = (9 * g + a) / 10
        }
    }

    function convertPositionToCoords (pos) {
        var coords = {};
        coords.x = 100 * (pos.x + plotSize.width) / (2 * plotSize.width);
        coords.y = 100 * (pos.y + plotSize.height) / (2 * plotSize.height);
        return coords;
    }
    function convertCoordsToPosition (coords) {
        return {
            x: coords.x / 100 * plotSize.width - plotSize.width,
            y: coords.y / 100 * plotSize.height - plotSize.height,
        };
    }

    function zb() {
        var a, b = Date.now();
        ++Xb;
        E = b;
        if (0 < myCells.length) {
            Wb();
            for (var c = a = 0, d = 0; d < myCells.length; d++)
                myCells[d].J(),
                    a += myCells[d].x / myCells.length,
                    c += myCells[d].y / myCells.length;
            ia = a;
            ja = c;
            ka = g;
            t = (t + a) / 2;
            u = (u + c) / 2
        } else t = (29 * t + ia) / 30, u = (29 * u + ja) / 30, g = (9 * g + ka * Ab()) / 10;
        Lb();
        setCursorCoordinates();
        Wa || CanvasContext2d.clearRect(0, 0, innerWidth, innerHeight);
        Wa ? (CanvasContext2d.fillStyle = darkTheme ? "#111111" : "#F2FBFF", CanvasContext2d.globalAlpha = .05, CanvasContext2d.fillRect(0, 0, innerWidth, innerHeight), CanvasContext2d.globalAlpha = 1) : Yb();
        v.sort(function (a, b) {
            return a.size == b.size ? a.id - b.id : a.size - b.size
        });
        CanvasContext2d.save();
        CanvasContext2d.translate(innerWidth / 2, innerHeight / 2);
        CanvasContext2d.scale(g, g);
        CanvasContext2d.translate(-t, -u);

        for (d = 0; d < W.length; d++) W[d].s(CanvasContext2d);
        for (d = 0; d < v.length; d++) v[d].s(CanvasContext2d);
        if (Oa) {
            ua = (3 * ua + Ma) / 4;
            va = (3 * va + Na) / 4;
            CanvasContext2d.save();
            CanvasContext2d.strokeStyle = "#FFAAAA";
            CanvasContext2d.lineWidth = 10;
            CanvasContext2d.lineCap = "round";
            CanvasContext2d.lineJoin = "round";
            CanvasContext2d.globalAlpha = .5;
            CanvasContext2d.beginPath();
            for (d = 0; d < myCells.length; d++) {
                CanvasContext2d.moveTo(myCells[d].x, myCells[d].y);
                CanvasContext2d.lineTo(ua, va);
            }
            CanvasContext2d.stroke();
            CanvasContext2d.restore()
        }
        CanvasContext2d.restore();
        $canvas && $canvas.width && CanvasContext2d.drawImage($canvas, innerWidth - $canvas.width - 10, 10);
        O = Math.max(O, Bb());
        var coord = '';
        var pos = {
            x: myCells.length > 0 ? parseInt(myCells[0].x) : 0,
            y: myCells.length > 0 ? parseInt(myCells[0].y) : 0
        };

        setCoordinates(pos.x, pos.y);

        if (myCells.length > 0) {
            // Write coordinates
            var coords = convertPositionToCoords(pos);
            coord = "x: " + coords.x.toFixed(0) + " y: " + coords.y.toFixed(0);
            if(matesTotalSize != 0) {
                coord += '| Team size: ' + matesTotalSize + ' ';
            }
            var matesCoords = {};
            matesCoordinates.forEach(function (item) {
                matesCoords = convertPositionToCoords(item.coords);
                coord += "| " + item.name + " X:" + matesCoords.x.toFixed(0) + " Y:" + matesCoords.y.toFixed(0)  + ' ';
            });
        }

        0 != O && (null == Ba && (Ba = new CreateCanvasElem(24, "#FFFFFF")),
            Ba.setText(ga("score") + " : " + ~~(O / 100) + " | " + coord),
            c = Ba.makeCanvas(),
            a = c.width,
            CanvasContext2d.globalAlpha = .2,
            CanvasContext2d.fillStyle = "#000000",
            CanvasContext2d.fillRect(10, innerHeight - 10 - 24 - 10, a + 10, 34),
            CanvasContext2d.globalAlpha = 1,
            CanvasContext2d.drawImage(c, 15, innerHeight - 10 - 24 - 5));
        Zb();
        b = Date.now() - b;
        b > 1E3 / 60 ? F -= .01 :
        b < 1E3 / 65 && (F += .01);
        .4 > F && (F = .4);
        1 < F && (F = 1);
        b = E - Cb;
        !socketIsOpen() || ea || U ? (s += b / 2E3, 1 < s && (s = 1)) : (s -= b / 300, 0 > s && (s = 0));
        0 < s && (CanvasContext2d.fillStyle = "#000000", CanvasContext2d.globalAlpha = .5 * s, CanvasContext2d.fillRect(0, 0, innerWidth, innerHeight), CanvasContext2d.globalAlpha = 1);
        Cb = E
    }

    function Yb() {
        CanvasContext2d.fillStyle = darkTheme ? "#ff0000" : "#F2FBFF";
        CanvasContext2d.fillRect(0, 0, innerWidth, innerHeight);
        CanvasContext2d.save();
        CanvasContext2d.strokeStyle = darkTheme ? "#AAAAAA" : "#000000";
        CanvasContext2d.globalAlpha = .2 * g;
        for (var a = innerWidth / g, b = innerHeight / g, c = (-t + a / 2) % 50; c < a; c += 50) CanvasContext2d.beginPath(), CanvasContext2d.moveTo(c * g - .5, 0), CanvasContext2d.lineTo(c * g - .5, b * g), CanvasContext2d.stroke();
        for (c = (-u + b / 2) % 50; c < b; c += 50)
            CanvasContext2d.beginPath(),
                CanvasContext2d.moveTo(0, c * g - .5),
                CanvasContext2d.lineTo(a * g, c * g - .5),
                CanvasContext2d.stroke();
        CanvasContext2d.restore()
    }

    function Zb() {
        if (db && Xa.width) {
            var a = innerWidth / 5;
            CanvasContext2d.drawImage(Xa, 5, 5, a, a)
        }
    }

    function Bb() {
        for (var a = 0, b = 0; b < myCells.length; b++) a += myCells[b].m * myCells[b].m;
        return a
    }

    function pb() {
        $canvas = null;
        if (null != B || 0 != w.length)
            if (null != B || showNames) {
                $canvas = document.createElement("canvas");
                var a = $canvas.getContext("2d"),
                    b = 60,
                    b = null == B ? b + 24 * w.length : b + 180,
                    c = Math.min(200, .3 * innerWidth) / 200;
                $canvas.width = 200 * c;
                $canvas.height = b * c;
                a.scale(c, c);
                a.globalAlpha = .4;
                a.fillStyle = "#000000";
                a.fillRect(0, 0, 200, b);
                a.globalAlpha = 1;
                a.fillStyle = "#FFFFFF";
                c = null;
                c = ga("leaderboard");
                a.font = "30px Ubuntu";
                a.fillText(c, 100 - a.measureText(c).width / 2, 40);
                if (null == B)
                    for (a.font = "20px Ubuntu", b = 0; b < w.length; ++b) c = w[b].name || ga("unnamed_cell"), showNames || (c = ga("unnamed_cell")), -1 != myCellsIds.indexOf(w[b].id) ? (myCells[0].name && (c = myCells[0].name), a.fillStyle = "#FFAAAA") : a.fillStyle = "#FFFFFF", c = b + 1 + ". " + c, a.fillText(c, 100 - a.measureText(c).width / 2, 70 + 24 * b);
                else
                    for (b = c = 0; b < B.length; ++b) {
                        var window = c + B[b] * Math.PI * 2;
                        a.fillStyle = $b[b + 1];
                        a.beginPath();
                        a.moveTo(100, 140);
                        a.arc(100, 140, 80, c, window, false);
                        a.fill();
                        c = window
                    }
            }
    }

    function Ya(a, b, c, d, e) {
        this.P = a;
        this.x = b;
        this.y = c;
        this.g = d;
        this.b = e
    }

    function CellObject(a, b, c, size, color, f) {
        this.id = a;
        this.o = this.x = b;
        this.p = this.y = c;
        this.n = this.size = size;
        this.color = color;
        this.a = [];
        this.doStrangeThing();
        this.t(f)
    }

    function Ub(a) {
        for (a = a.toString(16); 6 > a.length;) a = "0" + a;
        return "#" + a
    }

    function CreateCanvasElem(fontSize, fillStyle, c, strokeStyle) {
        fontSize && (this.fontSize = fontSize);
        fillStyle && (this.fillStyle = fillStyle);
        this.O = !!c;
        strokeStyle && (this.strokeStyle = strokeStyle)
    }

    function ac(a) {
        for (var b = a.length, c, window; 0 < b;) window = Math.floor(Math.random() * b), b--, c = a[b], a[b] = a[window], a[window] = c
    }

    function X(a, b) {
        var c = "1" == e("#helloContainer").attr("data-has-account-data");
        e("#helloContainer").attr("data-has-account-data",
            "1");
        if (null == b && window.localStorage[T]) {
            var n = JSON.parse(window.localStorage[T]);
            n.xp = a.e;
            n.xpNeeded = a.c;
            n.level = a.window;
            window.localStorage[T] = JSON.stringify(n)
        }
        if (c) {
            var p = +e(".agario-exp-bar .progress-bar-text").first().text().split("/")[0],
                c = +e(".agario-exp-bar .progress-bar-text").first().text().split("/")[1].split(" ")[0],
                n = e(".agario-profile-panel .progress-bar-star").first().text();
            if (n != a.window) X({
                e: c,
                c: c,
                window: n
            }, function () {
                e(".agario-profile-panel .progress-bar-star").text(a.window);
                e(".agario-exp-bar .progress-bar").css("width",
                    "100%");
                e(".progress-bar-star").addClass("animated tada").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                    e(".progress-bar-star").removeClass("animated tada")
                });
                setTimeout(function () {
                    e(".agario-exp-bar .progress-bar-text").text(a.c + "/" + a.c + " XP");
                    X({
                        e: 0,
                        c: a.c,
                        window: a.window
                    }, function () {
                        X(a, b)
                    })
                }, 1E3)
            });
            else {
                var f = Date.now(),
                    g = function () {
                        var c;
                        c = (Date.now() - f) / 1E3;
                        c = 0 > c ? 0 : 1 < c ? 1 : c;
                        c = c * c * (3 - 2 * c);
                        e(".agario-exp-bar .progress-bar-text").text(~~(p + (a.e - p) * c) + "/" + a.c +
                        " XP");
                        e(".agario-exp-bar .progress-bar").css("width", (88 * (p + (a.e - p) * c) / a.c).toFixed(2) + "%");
                        1 > c ? window.requestAnimationFrame(g) : b && b()
                    };
                window.requestAnimationFrame(g)
            }
        } else e(".agario-profile-panel .progress-bar-star").text(a.window), e(".agario-exp-bar .progress-bar-text").text(a.e + "/" + a.c + " XP"), e(".agario-exp-bar .progress-bar").css("width", (88 * a.e / a.c).toFixed(2) + "%"), b && b()
    }

    function Db(a) {
        "string" == typeof a && (a = JSON.parse(a));
        Date.now() + 18E5 > a.expires ? e("#helloContainer").attr("data-logged-in", "0") : (window.localStorage[T] =
            JSON.stringify(a), D = a.authToken, e(".agario-profile-name").text(a.name), ob(), X({
            e: a.xp,
            c: a.xpNeeded,
            window: a.level
        }), e("#helloContainer").attr("data-logged-in", "1"))
    }

    function bc(a) {
        a = a.split("\n");
        Db({
            name: a[0],
            fbid: a[1],
            authToken: a[2],
            expires: 1E3 * +a[3],
            level: +a[4],
            xp: +a[5],
            xpNeeded: +a[6]
        })
    }

    function Za(a) {
        console.log(a.status);
        if ("connected" == a.status) {
            var b = a.authResponse.accessToken;
            console.log(b);
            window.FB.api("/me/picture?width=180&height=180", function (a) {
                window.localStorage.fbPictureCache = a.data.url;
                e(".agario-profile-picture").attr("src",
                    a.data.url)
            });
            e("#helloContainer").attr("data-logged-in", "1");
            null != D ? e.ajax("http://m.agar.io/checkToken", {
                error: function () {
                    D = null;
                    Za(a)
                },
                success: function (a) {
                    a = a.split("\n");
                    X({
                        window: +a[0],
                        e: +a[1],
                        c: +a[2]
                    })
                },
                dataType: "text",
                method: "POST",
                cache: false,
                crossDomain: true,
                data: D
            }) : e.ajax("http://m.agar.io/facebookLogin", {
                error: function () {
                    D = null;
                    e("#helloContainer").attr("data-logged-in", "0")
                },
                success: bc,
                dataType: "text",
                method: "POST",
                cache: false,
                crossDomain: true,
                data: b
            })
        }
    }

    function ib(a) {
        console.log('Join party');
        fa(":party");
        e("#helloContainer").attr("data-party-state",
            "4");
        a = decodeURIComponent(a).replace(/.*#/gim, "");
        $a("#" + window.encodeURIComponent(a));
        e.ajax("http://m.agar.io/getToken", {
            error: function () {
                e("#helloContainer").attr("data-party-state", "6")
            },
            success: function (b) {
                b = b.split("\n");
                e(".partyToken").val(host + "/#" + window.encodeURIComponent(a));
                e("#helloContainer").attr("data-party-state", "5");
                fa(":party");
                Ka("ws://" + b[0], a)
            },
            dataType: "text",
            method: "POST",
            cache: false,
            crossDomain: true,
            data: a
        })
    }

    function $a(a) {
        window.history && window.history.replaceState && window.history.replaceState({}, window.document.title, a)
    }

    function updateStats(cell, target) {
        var isMe = -1 != myCellsIds.indexOf(cell.id),
            notMy = -1 != myCellsIds.indexOf(target.id),
            isFood = 30 > target.size;

        isMe && isFood && ++foodEaten;
        isFood || !isMe || notMy || ++cellsEaten
    }

    function Eb(a) {
        a = ~~a;
        var b = (a % 60).toString();
        a = (~~(a / 60)).toString();
        2 > b.length && (b = "0" + b);
        return a + ":" + b
    }

    function cc() {
        if (null == w) return 0;
        for (var a = 0; a < w.length; ++a)
            if (-1 != myCellsIds.indexOf(w[a].id)) return a + 1;
        return 0
    }

    function Vb() {
        e(".stats-food-eaten").text(foodEaten);
        e(".stats-time-alive").text(Eb((tb - sb) / 1E3));
        e(".stats-leaderboard-time").text(Eb(Ua));
        e(".stats-highest-mass").text(~~(O / 100));
        e(".stats-cells-eaten").text(cellsEaten);
        e(".stats-top-position").text(0 == S ? ":(" : S);
        var a = document.getElementById("statsGraph");
        if (a) {
            var b = a.getContext("2d"),
                c = a.width,
                a = a.height;
            b.clearRect(0, 0, c, a);
            if (2 < x.length) {
                for (var window = 200, p = 0; p < x.length; p++) window = Math.max(x[p], window);
                b.lineWidth = 3;
                b.lineCap = "round";
                b.lineJoin = "round";
                b.strokeStyle = Ra;
                b.fillStyle = Ra;
                b.beginPath();
                b.moveTo(0, a - x[0] / window * (a - 10) + 10);
                for (p = 1; p < x.length; p += Math.max(~~(x.length / c), 1)) {
                    for (var f = p / (x.length - 1) * c, g = [], k = -20; 20 >= k; ++k) 0 > p + k || p + k >= x.length || g.push(x[p + k]);
                    g = g.reduce(function (a, b) {
                        return a + b
                    }) / g.length / window;
                    b.lineTo(f, a - g * (a - 10) + 10)
                }
                b.stroke();
                b.globalAlpha = .5;
                b.lineTo(c, a);
                b.lineTo(0, a);
                b.fill();
                b.globalAlpha = 1
            }
        }
    }

    if (!window.agarioNoInit) {
        var ab = window.location.protocol,
            nb = "https:" == ab,
            da = ab + "//" + host + '/';
        if (nb && -1 == window.location.search.indexOf("fb")) window.location.href = "http://" + host + "/";
        else {

            var userAgent = window.navigator.userAgent;
            if (-1 != userAgent.indexOf("Android"))
                window.ga && window.ga("send", "event", "MobileRedirect", "PlayStore"),
                    setTimeout(function () {
                        window.location.href = "https://play.google.com/store/apps/details?id=com.miniclip." + host
                    }, 1E3);

            else if (-1 != userAgent.indexOf("iPhone") || -1 != userAgent.indexOf("iPad") || -1 != userAgent.indexOf("iPod"))
                window.ga && window.ga("send", "event", "MobileRedirect", "AppStore"),
                    setTimeout(function () {
                        window.location.href = "https://itunes.apple.com/app/" + host + "/id995999703?mt=8&at=1l3vajp"
                    }, 1E3);

            else {
                var Ga, CanvasContext2d, Canvas, innerWidth, innerHeight,
                    ca = null,
                    websocket = null,
                    t = 0,
                    u = 0,
                    myCellsIds = [],
                    myCells = [],
                    H = {},
                    v = [],
                    W = [],
                    w = [],
                    cursorClientX = 0,
                    cursorClientY = 0,
                    cursorX = -1,
                    cursorY = -1,
                    Xb = 0,
                    E = 0,
                    Cb = 0,
                    G = '[ВW]',
                    wa = 0,
                    xa = 0,
                    ya = 1E4,
                    za = 1E4,
                    g = 1,
                    y = null,
                    skins = false,
                    showNames = true,
                    colored = false,
                    Pa = false,
                    O = 0,
                    darkTheme = false,
                    showMass = true,
                    ia = t = ~~((wa + ya) / 2),
                    ja = u = ~~((xa + za) / 2),
                    ka = 1,
                    V = "",
                    B = null,
                    Fa = false,
                    Oa = false,
                    Ma = 0,
                    Na = 0,
                    ua = 0,
                    va = 0,
                    Hb = 0,
                    $b = ["#333333", "#FF3333", "#33FF33", "#3333FF"],
                    Wa = false,
                    ha = false,
                    qb = 0,
                    D = null,
                    M = 1,
                    s = 1,
                    ea = false,
                    Ia = 0,
                    La = {};
                (function () {
                    var a = window.location.search;
                    "?" == a.charAt(0) && (a = a.slice(1));
                    for (var a = a.split("&"), b = 0; b < a.length; b++) {
                        var c = a[b].split("=");
                        La[c[0]] = c[1]
                    }
                })();
                var db = "ontouchstart" in window && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent),
                    Xa = new Image;
                Xa.src = "img/split.png";
                var Ib = document.createElement("canvas");
                if ("undefined" == typeof console ||
                    "undefined" == typeof DataView ||
                    "undefined" == typeof WebSocket ||
                    null == Ib ||
                    null == Ib.getContext ||
                    null == window.localStorage)
                    alert("You browser does not support this game, we recommend you to use Firefox to play this");
                else {
                    var sa = null;
                    window.setNick = function (a) {
                        window.ga && window.ga("send", "event", "Nick", a.toLowerCase());
                        jb();
                        G = a;
                        vb();
                        O = 0
                    };
                    window.setRegion = pa;
                    window.setSkins = function (a) {
                        skins = a
                    };
                    window.setNames = function (a) {
                        showNames = a
                    };
                    window.setDarkTheme = function (a) {
                        darkTheme = a
                    };
                    window.setColors = function (a) {
                        colored = a
                    };
                    window.setShowMass = function (a) {
                        showMass = a
                    };
                    window.spectate = function () {
                        G = null;
                        sendKeyPress(1);
                        jb()
                    };
                    window.setGameMode = function (a) {
                        a != V && (":party" == V && e("#helloContainer").attr("data-party-state", "0"), fa(a), ":party" != a && L())
                    };
                    window.setAcid = function (a) {
                        Wa = a
                    };
                    null != window.localStorage && (null == window.localStorage.AB9 && (window.localStorage.AB9 = 0 + ~~(100 * Math.random())), Hb = +window.localStorage.AB9, window.ABGroup = Hb);
                    e.get(ab + "//gc.agar.io", function (a) {
                            var b = a.split(" ");
                            a = b[0];
                            b = b[1] || "";
                            -1 == ["UA"].indexOf(a) && Jb.push("ussr");
                            la.hasOwnProperty(a) && ("string" == typeof la[a] ? y || pa(la[a]) : la[a].hasOwnProperty(b) && (y || pa(la[a][b])))
                        },
                        "text");
                    var Ja = true,
                        Nb = 0,
                        la = {
                            AF: "JP-Tokyo",
                            AX: "EU-London",
                            AL: "EU-London",
                            DZ: "EU-London",
                            AS: "SG-Singapore",
                            AD: "EU-London",
                            AO: "EU-London",
                            AI: "US-Atlanta",
                            AG: "US-Atlanta",
                            AR: "BR-Brazil",
                            AM: "JP-Tokyo",
                            AW: "US-Atlanta",
                            AU: "SG-Singapore",
                            AT: "EU-London",
                            AZ: "JP-Tokyo",
                            BS: "US-Atlanta",
                            BH: "JP-Tokyo",
                            BD: "JP-Tokyo",
                            BB: "US-Atlanta",
                            BY: "EU-London",
                            BE: "EU-London",
                            BZ: "US-Atlanta",
                            BJ: "EU-London",
                            BM: "US-Atlanta",
                            BT: "JP-Tokyo",
                            BO: "BR-Brazil",
                            BQ: "US-Atlanta",
                            BA: "EU-London",
                            BW: "EU-London",
                            BR: "BR-Brazil",
                            IO: "JP-Tokyo",
                            VG: "US-Atlanta",
                            BN: "JP-Tokyo",
                            BG: "EU-London",
                            BF: "EU-London",
                            BI: "EU-London",
                            KH: "JP-Tokyo",
                            CM: "EU-London",
                            CA: "US-Atlanta",
                            CV: "EU-London",
                            KY: "US-Atlanta",
                            CF: "EU-London",
                            TD: "EU-London",
                            CL: "BR-Brazil",
                            CN: "CN-China",
                            CX: "JP-Tokyo",
                            CC: "JP-Tokyo",
                            CO: "BR-Brazil",
                            KM: "EU-London",
                            CD: "EU-London",
                            CG: "EU-London",
                            CK: "SG-Singapore",
                            CR: "US-Atlanta",
                            CI: "EU-London",
                            HR: "EU-London",
                            CU: "US-Atlanta",
                            CW: "US-Atlanta",
                            CY: "JP-Tokyo",
                            CZ: "EU-London",
                            DK: "EU-London",
                            DJ: "EU-London",
                            DM: "US-Atlanta",
                            DO: "US-Atlanta",
                            EC: "BR-Brazil",
                            EG: "EU-London",
                            SV: "US-Atlanta",
                            GQ: "EU-London",
                            ER: "EU-London",
                            EE: "EU-London",
                            ET: "EU-London",
                            FO: "EU-London",
                            FK: "BR-Brazil",
                            FJ: "SG-Singapore",
                            FI: "EU-London",
                            FR: "EU-London",
                            GF: "BR-Brazil",
                            PF: "SG-Singapore",
                            GA: "EU-London",
                            GM: "EU-London",
                            GE: "JP-Tokyo",
                            DE: "EU-London",
                            GH: "EU-London",
                            GI: "EU-London",
                            GR: "EU-London",
                            GL: "US-Atlanta",
                            GD: "US-Atlanta",
                            GP: "US-Atlanta",
                            GU: "SG-Singapore",
                            GT: "US-Atlanta",
                            GG: "EU-London",
                            GN: "EU-London",
                            GW: "EU-London",
                            GY: "BR-Brazil",
                            HT: "US-Atlanta",
                            VA: "EU-London",
                            HN: "US-Atlanta",
                            HK: "JP-Tokyo",
                            HU: "EU-London",
                            IS: "EU-London",
                            IN: "JP-Tokyo",
                            ID: "JP-Tokyo",
                            IR: "JP-Tokyo",
                            IQ: "JP-Tokyo",
                            IE: "EU-London",
                            IM: "EU-London",
                            IL: "JP-Tokyo",
                            IT: "EU-London",
                            JM: "US-Atlanta",
                            JP: "JP-Tokyo",
                            JE: "EU-London",
                            JO: "JP-Tokyo",
                            KZ: "JP-Tokyo",
                            KE: "EU-London",
                            KI: "SG-Singapore",
                            KP: "JP-Tokyo",
                            KR: "JP-Tokyo",
                            KW: "JP-Tokyo",
                            KG: "JP-Tokyo",
                            LA: "JP-Tokyo",
                            LV: "EU-London",
                            LB: "JP-Tokyo",
                            LS: "EU-London",
                            LR: "EU-London",
                            LY: "EU-London",
                            LI: "EU-London",
                            LT: "EU-London",
                            LU: "EU-London",
                            MO: "JP-Tokyo",
                            MK: "EU-London",
                            MG: "EU-London",
                            MW: "EU-London",
                            MY: "JP-Tokyo",
                            MV: "JP-Tokyo",
                            ML: "EU-London",
                            MT: "EU-London",
                            MH: "SG-Singapore",
                            MQ: "US-Atlanta",
                            MR: "EU-London",
                            MU: "EU-London",
                            YT: "EU-London",
                            MX: "US-Atlanta",
                            FM: "SG-Singapore",
                            MD: "EU-London",
                            MC: "EU-London",
                            MN: "JP-Tokyo",
                            ME: "EU-London",
                            MS: "US-Atlanta",
                            MA: "EU-London",
                            MZ: "EU-London",
                            MM: "JP-Tokyo",
                            NA: "EU-London",
                            NR: "SG-Singapore",
                            NP: "JP-Tokyo",
                            NL: "EU-London",
                            NC: "SG-Singapore",
                            NZ: "SG-Singapore",
                            NI: "US-Atlanta",
                            NE: "EU-London",
                            NG: "EU-London",
                            NU: "SG-Singapore",
                            NF: "SG-Singapore",
                            MP: "SG-Singapore",
                            NO: "EU-London",
                            OM: "JP-Tokyo",
                            PK: "JP-Tokyo",
                            PW: "SG-Singapore",
                            PS: "JP-Tokyo",
                            PA: "US-Atlanta",
                            PG: "SG-Singapore",
                            PY: "BR-Brazil",
                            PE: "BR-Brazil",
                            PH: "JP-Tokyo",
                            PN: "SG-Singapore",
                            PL: "EU-London",
                            PT: "EU-London",
                            PR: "US-Atlanta",
                            QA: "JP-Tokyo",
                            RE: "EU-London",
                            RO: "EU-London",
                            RU: "RU-Russia",
                            RW: "EU-London",
                            BL: "US-Atlanta",
                            SH: "EU-London",
                            KN: "US-Atlanta",
                            LC: "US-Atlanta",
                            MF: "US-Atlanta",
                            PM: "US-Atlanta",
                            VC: "US-Atlanta",
                            WS: "SG-Singapore",
                            SM: "EU-London",
                            ST: "EU-London",
                            SA: "EU-London",
                            SN: "EU-London",
                            RS: "EU-London",
                            SC: "EU-London",
                            SL: "EU-London",
                            SG: "JP-Tokyo",
                            SX: "US-Atlanta",
                            SK: "EU-London",
                            SI: "EU-London",
                            SB: "SG-Singapore",
                            SO: "EU-London",
                            ZA: "EU-London",
                            SS: "EU-London",
                            ES: "EU-London",
                            LK: "JP-Tokyo",
                            SD: "EU-London",
                            SR: "BR-Brazil",
                            SJ: "EU-London",
                            SZ: "EU-London",
                            SE: "EU-London",
                            CH: "EU-London",
                            SY: "EU-London",
                            TW: "JP-Tokyo",
                            TJ: "JP-Tokyo",
                            TZ: "EU-London",
                            TH: "JP-Tokyo",
                            TL: "JP-Tokyo",
                            TG: "EU-London",
                            TK: "SG-Singapore",
                            TO: "SG-Singapore",
                            TT: "US-Atlanta",
                            TN: "EU-London",
                            TR: "TK-Turkey",
                            TM: "JP-Tokyo",
                            TC: "US-Atlanta",
                            TV: "SG-Singapore",
                            UG: "EU-London",
                            UA: "EU-London",
                            AE: "EU-London",
                            GB: "EU-London",
                            US: "US-Atlanta",
                            UM: "SG-Singapore",
                            VI: "US-Atlanta",
                            UY: "BR-Brazil",
                            UZ: "JP-Tokyo",
                            VU: "SG-Singapore",
                            VE: "BR-Brazil",
                            VN: "JP-Tokyo",
                            WF: "SG-Singapore",
                            EH: "EU-London",
                            YE: "JP-Tokyo",
                            ZM: "EU-London",
                            ZW: "EU-London"
                        },
                        N = null;
                    window.connect = Ka;
                    var ta = 500,
                        Va = null,
                        wb = 0,
                        xb = -1,
                        yb = -1,
                        $canvas = null,
                        F = 1,
                        Ba = null,
                        gb = function () {
                            var a = Date.now(),
                                b = 1E3 / 60;
                            return function () {
                                window.requestAnimationFrame(gb);
                                var c = Date.now(),
                                    e = c - a;
                                e > b && (a = c - e % b, !socketIsOpen() || 240 > Date.now() - qb ? zb() : console.warn("Skipping draw"), dc())
                            }
                        }(),
                        $ = {},
                        Jb = "poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;chaplin;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;ea;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;belarus;wojak;doge;nasa;byzantium;imperial japan;french kingdom;somalia;turkey;mars;pokerface;8;irs;receita federal;facebook;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande;berlusconi;cameron;clinton;hillary;venezuela;blatter;chavez;cuba;fidel;merkel;palin;queen;boris;bush;trump".split(";"),
                        ec = "8;nasa;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande;berlusconi;cameron;clinton;hillary;blatter;chavez;fidel;merkel;palin;queen;boris;bush;trump".split(";"),
                        aa = {};
                    Ya.prototype = {
                        P: null,
                        x: 0,
                        y: 0,
                        g: 0,
                        b: 0
                    };
                    CellObject.prototype = {
                        id: 0,
                        a: null,
                        name: null,
                        canvasElem: null,
                        canvasElemCell: null,
                        x: 0,
                        y: 0,
                        size: 0,
                        o: 0,
                        p: 0,
                        n: 0,
                        C: 0,
                        D: 0,
                        m: 0,
                        T: 0,
                        K: 0,
                        W: 0,
                        A: false,
                        isVirus: false,
                        j: false,
                        L: true,
                        S: 0,
                        V: null,
                        R: function () {
                            var a;
                            for (a = 0; a < v.length; a++)
                                if (v[a] == this) {
                                    v.splice(a, 1);
                                    break
                                }
                            delete H[this.id];
                            a = myCells.indexOf(this);
                            -1 != a && (Pa = true, myCells.splice(a, 1));
                            a = myCellsIds.indexOf(this.id);
                            -1 != a && myCellsIds.splice(a, 1);
                            this.A = true;
                            0 < this.S && W.push(this)
                        },
                        i: function () {
                            return Math.max(~~(.3 * this.size), 24)
                        },
                        t: function (a) {
                            if (this.name = a) {
                                if (null == this.canvasElem) {
                                    this.canvasElem = new CreateCanvasElem(this.i(), "#FFFFFF", true, "#000000")
                                } else {
                                    this.canvasElem.setFontSize(this.i());
                                    this.canvasElem.setText(this.name);
                                }
                            }
                        },
                        doStrangeThing: function () {
                            for (var a = this.B(); this.a.length > a;) {
                                var b = ~~(Math.random() * this.a.length);
                                this.a.splice(b, 1)
                            }
                            for (0 == this.a.length && 0 < a && this.a.push(new Ya(this, this.x, this.y, this.size, Math.random() - .5)); this.a.length < a;) b = ~~(Math.random() * this.a.length), b = this.a[b], this.a.push(new Ya(this,
                                b.x, b.y, b.g, b.b))
                        },
                        B: function () {
                            var a = 10;
                            20 > this.size && (a = 0);
                            this.isVirus && (a = 30);
                            var b = this.size;
                            this.isVirus || (b *= g);
                            b *= F;
                            this.T & 32 && (b *= .25);
                            return ~~Math.max(b, a)
                        },
                        da: function () {
                            this.doStrangeThing();
                            for (var a = this.a, b = a.length, c = 0; c < b; ++c) {
                                var window = a[(c - 1 + b) % b].b,
                                    e = a[(c + 1) % b].b;
                                a[c].b += (Math.random() - .5) * (this.j ? 3 : 1);
                                a[c].b *= .7;
                                10 < a[c].b && (a[c].b = 10);
                                -10 > a[c].b && (a[c].b = -10);
                                a[c].b = (window + e + 8 * a[c].b) / 10
                            }
                            for (var f = this, h = this.isVirus ? 0 : (this.id / 1E3 + E / 1E4) % (2 * Math.PI), c = 0; c < b; ++c) {
                                var k = a[c].g,
                                    window = a[(c - 1 + b) % b].g,
                                    e = a[(c + 1) % b].g;
                                if (15 <
                                    this.size && null != ca && 20 < this.size * g && 0 < this.id) {
                                    var l = false,
                                        m = a[c].x,
                                        I = a[c].y;
                                    ca.ea(m - 5, I - 5, 10, 10, function (a) {
                                        a.P != f && 25 > (m - a.x) * (m - a.x) + (I - a.y) * (I - a.y) && (l = true)
                                    });
                                    !l && (a[c].x < wa || a[c].y < xa || a[c].x > ya || a[c].y > za) && (l = true);
                                    l && (0 < a[c].b && (a[c].b = 0), a[c].b -= 1)
                                }
                                k += a[c].b;
                                0 > k && (k = 0);
                                k = this.j ? (19 * k + this.size) / 20 : (12 * k + this.size) / 13;
                                a[c].g = (window + e + 8 * k) / 10;
                                window = 2 * Math.PI / b;
                                e = this.a[c].g;
                                this.isVirus && 0 == c % 2 && (e += 5);
                                a[c].x = this.x + Math.cos(window * c + h) * e;
                                a[c].y = this.y + Math.sin(window * c + h) * e
                            }
                        },
                        J: function () {
                            if (0 >= this.id) return 1;
                            var a;
                            a = (E - this.K) / 120;
                            a = 0 > a ? 0 : 1 < a ? 1 : a;
                            var b = 0 > a ? 0 : 1 < a ? 1 : a;
                            this.i();
                            if (this.A && 1 <= b) {
                                var c = W.indexOf(this);
                                -1 != c && W.splice(c, 1)
                            }
                            this.x = a * (this.C - this.o) + this.o;
                            this.y = a * (this.D - this.p) + this.p;
                            this.size = b * (this.m - this.n) + this.n;
                            return b
                        },
                        H: function () {
                            return 0 >= this.id ? true : this.x + this.size + 40 < t - innerWidth / 2 / g || this.y + this.size + 40 < u - innerHeight / 2 / g || this.x - this.size - 40 > t + innerWidth / 2 / g || this.y - this.size - 40 > u + innerHeight / 2 / g ? false : true
                        },
                        s: function (canvasContext) {
                            if (this.H()) {
                                ++this.S;
                                var b = 0 < this.id && !this.isVirus && !this.j && .4 > g;
                                5 > this.B() && 0 < this.id && (b = true);
                                if (this.L && !b)
                                    for (var c = 0; c < this.a.length; c++) this.a[c].g = this.size;
                                this.L = b;
                                canvasContext.save();
                                this.W = E;
                                c = this.J();
                                this.A && (canvasContext.globalAlpha *= 1 - c);

                                canvasContext.lineWidth = 10;
                                canvasContext.lineCap = "round";
                                canvasContext.lineJoin = this.isVirus ? "miter" : "round";

                                if (colored) {
                                    canvasContext.fillStyle = "#FFFFFF";
                                    canvasContext.strokeStyle = "#AAAAAA";
                                } else {
                                    canvasContext.fillStyle = this.color;
                                    canvasContext.strokeStyle = this.color;
                                }

                                // set virus color
                                if (this.isVirus) {
                                    setVirusStyle(this.size, canvasContext);
                                }

                                // set enemies colors
                                if (this.id && 0 != myCells.length && (myCells.indexOf(this) == -1) && !this.isVirus && this.size > 30) {
                                    additionals(myCells, canvasContext, this);
                                }

                                if (b) canvasContext.beginPath(), canvasContext.arc(this.x, this.y, this.size + 5, 0, 2 * Math.PI, false);
                                else {
                                    this.da();
                                    canvasContext.beginPath();
                                    var window = this.B();
                                    canvasContext.moveTo(this.a[0].x, this.a[0].y);
                                    for (c = 1; c <= window; ++c) {
                                        var e = c % window;
                                        canvasContext.lineTo(this.a[e].x, this.a[e].y)
                                    }
                                }
                                canvasContext.closePath();
                                c = this.name.toLowerCase();
                                !this.j && skins && ":teams" != V ? (window = this.V, null == window ? window = null : ":" == window[0] ? (aa.hasOwnProperty(window) || (aa[window] = new Image, aa[window].src = window.slice(1)), window = 0 != aa[window].width && aa[window].complete ? aa[window] : null) : window = null, window || (-1 != Jb.indexOf(c) ? ($.hasOwnProperty(c) || ($[c] = new Image, $[c].src = "skins/" + c + ".png"), window = 0 != $[c].width && $[c].complete ? $[c] : null) : window = null)) : window = null;
                                e = window;
                                b || canvasContext.stroke();
                                canvasContext.fill();
                                null != e && (canvasContext.save(), canvasContext.clip(), canvasContext.drawImage(e, this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size), canvasContext.restore());
                                (colored || 15 < this.size) && !b && (canvasContext.strokeStyle = "#000000", canvasContext.globalAlpha *= .1, canvasContext.stroke());
                                canvasContext.globalAlpha = 1;
                                window = -1 != myCells.indexOf(this);
                                b = ~~this.y;

                                // write cell names
                                if (0 != this.id && (showNames || window) && this.name && this.canvasElem && (null == e || -1 == ec.indexOf(c))) {
                                    e = this.canvasElem;
                                    e.setText(this.name);
                                    e.setFontSize(this.i() * 2);
                                    c = 0 >= this.id ? 1 : Math.ceil(10 * g) / 10;
                                    e.setScale(c);
                                    var e = e.makeCanvas(),
                                        f = ~~(e.width / c),
                                        l = ~~(e.height / c);
                                    canvasContext.drawImage(e, ~~this.x - ~~(f / 2), b - ~~(l / 2), f, l);
                                    b += e.height / 2 / c + 4
                                }

                                // write cell and virus weight
                                0 < this.id && (window || (!this.isVirus || this.isVirus || this.j) && 20 < this.size) && (
                                    null == this.canvasElemCell &&
                                    (this.canvasElemCell = new CreateCanvasElem(this.i() / 2, "#FFFFFF", true, "#000000")),
                                        canvasElem = this.canvasElemCell,
                                        canvasElem.setFontSize(this.i() / (this.isVirus ? 0.5 : 1)), // increment virus font size
                                        canvasElem.setText(~~(this.size * this.size / 100)),
                                        c = Math.ceil(10 * g) / 10, canvasElem.setScale(c),
                                        e = canvasElem.makeCanvas(),
                                        f = ~~(e.width / c),
                                        l = ~~(e.height / c),
                                        canvasContext.drawImage(e, ~~this.x - ~~(f / 2), b - ~~(l / 2), f, l)
                                );
                                canvasContext.restore();

                                if (this.id && 0 != myCells.length && (myCells.indexOf(this) != -1)) {
                                    drawAim(this.x, this.y, this.size)
                                }
                            }
                        }
                    };
                    CreateCanvasElem.prototype = {
                        text: "",
                        fillStyle: "#000000",
                        O: false,
                        strokeStyle: "#000000",
                        fontSize: 16,
                        canvas: null,
                        N: null,
                        rewriteCanvas: false,
                        scale: 1,
                        setFontSize: function (a) {
                            this.fontSize != a && (this.fontSize = a, this.rewriteCanvas = true)
                        },
                        setScale: function (a) {
                            this.scale != a && (this.scale = a, this.rewriteCanvas = true)
                        },
                        setStrokeColor: function (a) {
                            this.strokeStyle != a && (this.strokeStyle = a, this.rewriteCanvas = true)
                        },
                        setText: function (a) {
                            a != this.text && (this.text = a, this.rewriteCanvas = true)
                        },
                        makeCanvas: function () {
                            null == this.canvas && (
                                this.canvas = document.createElement("canvas"),
                                    this.N = this.canvas.getContext("2d")
                            );
                            if (this.rewriteCanvas) {
                                this.rewriteCanvas = false;
                                var canvasElem = this.canvas,
                                    canvasContext = this.N,
                                    text = this.text,
                                    scale = this.scale,
                                    fontSize = this.fontSize,
                                    font = fontSize + "px Ubuntu";
                                canvasContext.font = font;
                                var heightScale = ~~(.2 * fontSize);
                                canvasElem.width = (canvasContext.measureText(text).width + 6) * scale;
                                canvasElem.height = (fontSize + heightScale) * scale;
                                canvasContext.font = font;
                                canvasContext.scale(scale, scale);
                                canvasContext.globalAlpha = 1;
                                canvasContext.lineWidth = 3;
                                canvasContext.strokeStyle = this.strokeStyle;
                                canvasContext.fillStyle = this.fillStyle;
                                this.O && canvasContext.strokeText(text, 3, fontSize - heightScale / 2);
                                canvasContext.fillText(text, 3, fontSize - heightScale / 2)
                            }
                            return this.canvas
                        }
                    };
                    Date.now || (Date.now = function () {
                        return (new Date).getTime()
                    });
                    (function () {
                        for (var a = ["ms", "moz", "webkit", "o"], b =
                            0; b < a.length && !window.requestAnimationFrame; ++b) window.requestAnimationFrame = window[a[b] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[a[b] + "CancelAnimationFrame"] || window[a[b] + "CancelRequestAnimationFrame"];
                        window.requestAnimationFrame || (window.requestAnimationFrame = function (a) {
                            return setTimeout(a, 1E3 / 60)
                        }, window.cancelAnimationFrame = function (a) {
                            clearTimeout(a)
                        })
                    })();
                    var Mb = {
                            X: function (a) {
                                function b(a) {
                                    a < window && (a = window);
                                    a > f && (a = f);
                                    return ~~((a - window) / 32)
                                }

                                function c(a) {
                                    a < e && (a = e);
                                    a > g && (a = g);
                                    return ~~((a - e) / 32)
                                }

                                var window = a.ba,
                                    e = a.ca,
                                    f = a.socketIsOpen,
                                    g = a.$,
                                    k = ~~((f - window) / 32) + 1,
                                    l = ~~((g - e) / 32) + 1,
                                    m = Array(k * l);
                                return {
                                    Y: function (a) {
                                        var window = b(a.x) + c(a.y) * k;
                                        null == m[window] ? m[window] = a : Array.isArray(m[window]) ? m[window].push(a) : m[window] = [m[window], a]
                                    },
                                    ea: function (a, window, e, f, g) {
                                        var n = b(a),
                                            p = c(window);
                                        a = b(a + e);
                                        window = c(window + f);
                                        if (0 > n || n >= k || 0 > p || p >= l) debugger;
                                        for (; p <= window; ++p)
                                            for (f = n; f <= a; ++f)
                                                if (e = m[f + p * k], null != e)
                                                    if (Array.isArray(e))
                                                        for (var h = 0; h < e.length; h++) g(e[h]);
                                                    else g(e)
                                    }
                                }
                            }
                        },
                        rb = function () {
                            var a = new CellObject(0, 0, 0, 32, "#ED1C24", ""),
                                b = document.createElement("canvas");
                            b.width = 32;
                            b.height = 32;
                            var c = b.getContext("2d");
                            return function () {
                                0 < myCells.length && (a.color = myCells[0].color, a.t(myCells[0].name));
                                c.clearRect(0, 0, 32, 32);
                                c.save();
                                c.translate(16, 16);
                                c.scale(.4, .4);
                                a.s(c);
                                c.restore();
                                var window = document.getElementById("favicon"),
                                    e = window.cloneNode(true);
                                e.setAttribute("href", b.toDataURL("image/png"));
                                window.parentNode.replaceChild(e, window)
                            }
                        }();
                    e(function () {
                        rb()
                    });
                    var T = "loginCache3";
                    e(function () {
                        +window.localStorage.wannaLogin && (window.localStorage[T] && Db(window.localStorage[T]), window.localStorage.fbPictureCache && e(".agario-profile-picture").attr("src", window.localStorage.fbPictureCache))
                    });
                    window.facebookLogin = function () {
                        window.localStorage.wannaLogin = 1
                    };
                    window.fbAsyncInit = function () {
                        function a() {
                            window.localStorage.wannaLogin = 1;
                            null == window.FB ? alert("You seem to have something blocking Facebook on your browser, please check for any extensions") : window.FB.login(function (a) {
                                Za(a)
                            }, {
                                scope: "public_profile, email"
                            })
                        }

                        window.FB.init({
                            appId: "677505792353827",
                            cookie: true,
                            xfbml: true,
                            status: true,
                            version: "v2.2"
                        });
                        window.FB.Event.subscribe("auth.statusChange", function (b) {
                            +window.localStorage.wannaLogin && ("connected" == b.status ? Za(b) : a())
                        });
                        window.facebookLogin =
                            a
                    };
                    window.logout = function () {
                        D = null;
                        e("#helloContainer").attr("data-logged-in", "0");
                        e("#helloContainer").attr("data-has-account-data", "0");
                        delete window.localStorage.wannaLogin;
                        delete window.localStorage[T];
                        delete window.localStorage.fbPictureCache;
                        L()
                    };
                    var dc = function () {
                        function a(a, canvas, c, size, e) {
                            var ctx = canvas.getContext("2d"),
                                g = canvas.width;
                            canvas = canvas.height;
                            a.color = e;
                            a.t(c);
                            a.size = size;
                            ctx.save();
                            ctx.translate(g / 2, canvas / 2);
                            a.s(ctx);
                            ctx.restore()
                        }

                        for (var b = new CellObject(-1, 0, 0, 32, "#5bc0de", ""), c = new CellObject(-1, 0, 0, 32, "#5bc0de", ""), window = "#0791ff #5a07ff #ff07fe #ffa507 #ff0774 #077fff #3aff07 #ff07ed #07a8ff #ff076e #3fff07 #ff0734 #07ff20 #ff07a2 #ff8207 #07ff0e".split(" "),
                                 f = [], g = 0; g < window.length; ++g) {
                            var h = g / window.length * 12,
                                k = 30 * Math.sqrt(g / window.length);
                            f.push(new CellObject(-1, Math.cos(h) * k, Math.sin(h) * k, 10, window[g], ""))
                        }
                        ac(f);
                        var l = document.createElement("canvas");
                        l.getContext("2d");
                        l.width = l.height = 70;
                        a(c, l, "", 26, "#ebc0de");
                        return function () {
                            e(".cell-spinner").filter(":visible").each(function () {
                                var c = e(this),
                                    window = Date.now(),
                                    f = this.width,
                                    g = this.height,
                                    h = this.getContext("2d");
                                h.clearRect(0, 0, f, g);
                                h.save();
                                h.translate(f / 2, g / 2);
                                for (var k = 0; 10 > k; ++k) h.drawImage(l, (.1 * window + 80 * k) % (f + 140) - f / 2 - 70 - 35,
                                    g / 2 * Math.sin((.001 * window + k) % Math.PI * 2) - 35, 70, 70);
                                h.restore();
                                (c = c.attr("data-itr")) && (c = ga(c));
                                a(b, this, c || "", +e(this).attr("data-size"), "#5bc0de")
                            });
                            e("#statsPellets").filter(":visible").each(function () {
                                e(this);
                                var b = this.width,
                                    c = this.height;
                                this.getContext("2d").clearRect(0, 0, b, c);
                                for (b = 0; b < f.length; b++) a(f[b], this, "", f[b].size, f[b].color)
                            })
                        }
                    }();
                    window.createParty = function () {
                        fa(":party");
                        N = function (a) {
                            console.log('Create party');
                            $a("/#" + window.encodeURIComponent(a));
                            e(".partyToken").val(host + "/#" + window.encodeURIComponent(a));
                            e("#helloContainer").attr("data-party-state", "1")
                        };
                        L()
                    };
                    window.joinParty = ib;
                    window.cancelParty = function () {
                        console.log('Clean party');
                        $a("/");
                        e("#helloContainer").attr("data-party-state", "0");
                        fa("");
                        L()
                    };
                    var x = [],
                        foodEaten = 0,
                        Ra = "#000000",
                        U = false,
                        Sa = false,
                        sb = 0,
                        tb = 0,
                        Ua = 0,
                        cellsEaten = 0,
                        S = 0,
                        skipStats = true;
                    setInterval(function () {
                        Sa && x.push(Bb() / 100)
                    }, 1E3 / 60);
                    setInterval(function () {
                        var a = cc();
                        0 != a && (++Ua, 0 == S && (S = a), S = Math.min(S, a))
                    }, 1E3);
                    window.closeStats = function () {
                        U = false;
                        e("#stats").hide();
                        kb(window.ab);
                        oa(0)
                    };
                    window.setSkipStats = function (a) {
                        skipStats = !a
                    };
                    e(function () {
                        e(Kb)
                    })
                }
            }
        }
    }
})(window, window.jQuery);
