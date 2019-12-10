var M = Math,
	PI = M.PI,
	TWOPI = PI * 2,
	HALFPI = PI / 2,
	canvas = document.querySelector("canvas"),
	ctx = canvas.getContext("2d"),
	width = (canvas.width = 350),
	height = (canvas.height = 350),
	cx = width / 2,
	cy = height / 2,
	count = 40,
	sizeBase = 0.1,
	sizeDiv = 5,
	tick = 0;

ctx.translate(cx, cy);

(function loop() {
	requestAnimationFrame(loop);
	ctx.clearRect(-width / 2, -height / 2, width, height);
	ctx.fillStyle = "#fff";
	var angle = tick / 8,
		radius = -50 + M.sin(tick / 15) * 100,
		size;

	for (var i = 0; i < count; i++) {
		angle += PI / 64;
		radius += i / 30;
		size = sizeBase + i / sizeDiv;

		ctx.beginPath();
		ctx.arc(
			M.cos(angle) * radius,
			M.sin(angle) * radius,
			size,
			0,
			TWOPI,
			false
		);
		ctx.fillStyle = "hsl(200, 70%, 50%)";
		ctx.fill();

		ctx.beginPath();
		ctx.arc(
			M.cos(angle) * -radius,
			M.sin(angle) * -radius,
			size,
			0,
			TWOPI,
			false
		);
		ctx.fillStyle = "hsl(320, 70%, 50%)";
		ctx.fill();

		ctx.beginPath();
		ctx.arc(
			M.cos(angle + HALFPI) * radius,
			M.sin(angle + HALFPI) * radius,
			size,
			0,
			TWOPI,
			false
		);
		ctx.fillStyle = "hsl(60, 70%, 50%)";
		ctx.fill();

		ctx.beginPath();
		ctx.arc(
			M.cos(angle + HALFPI) * -radius,
			M.sin(angle + HALFPI) * -radius,
			size,
			0,
			TWOPI
		);
		ctx.fillStyle = "hsl(0, 0%, 100%)";
		ctx.fill();
	}

	tick++;
})();

// document.body.appendChild( canvas );
var P = {};

P.Particle = function(opt) {
	this.radius = 7;
	this.x = opt.x;
	this.y = opt.y;
	this.angle = opt.angle;
	this.speed = opt.speed;
	this.accel = opt.accel;
	this.decay = 0.01;
	this.life = 1;
};

P.Particle.prototype.step = function(i) {
	this.speed += this.accel;
	this.x += Math.cos(this.angle) * this.speed;
	this.y += Math.sin(this.angle) * this.speed;
	this.angle += P.PI / 64;
	this.accel *= 1.01;
	this.life -= this.decay;

	if (this.life <= 0) {
		P.particles.splice(i, 1);
	}
};

P.Particle.prototype.draw = function(i) {
	P.ctx.fillStyle = P.ctx.strokeStyle =
		"hsla(" +
		(P.tick + this.life * 120) +
		", 100%, 60%, " +
		this.life +
		")";
	P.ctx.beginPath();
	if (P.particles[i - 1]) {
		P.ctx.moveTo(this.x, this.y);
		P.ctx.lineTo(P.particles[i - 1].x, P.particles[i - 1].y);
	}
	P.ctx.stroke();

	P.ctx.beginPath();
	P.ctx.arc(
		this.x,
		this.y,
		Math.max(0.001, this.life * this.radius),
		0,
		P.TWO_PI
	);
	P.ctx.fill();

	var size = Math.random() * 1.25;
	P.ctx.fillRect(
		~~(this.x + (Math.random() - 0.5) * 35 * this.life),
		~~(this.y + (Math.random() - 0.5) * 35 * this.life),
		size,
		size
	);
};

P.step = function() {
	P.particles.push(
		new P.Particle({
			x: P.width / 2 + (Math.cos(P.tick / 20) * P.min) / 2,
			y: P.height / 2 + (Math.sin(P.tick / 20) * P.min) / 2,
			angle: P.globalRotation + P.globalAngle,
			speed: 0,
			accel: 0.01
		})
	);

	P.particles.forEach(function(elem, index) {
		elem.step(index);
	});

	P.globalRotation += P.PI / 6;
	P.globalAngle += P.PI / 6;
};

P.draw = function() {
	P.ctx.clearRect(0, 0, P.width, P.height);

	P.particles.forEach(function(elem, index) {
		elem.draw(index);
	});
};

P.init = function() {
	P.canvas = document.createElement("canvas");
	P.ctx = P.canvas.getContext("2d");
	P.width = 300;
	P.height = 300;
	P.canvas.width = P.width * window.devicePixelRatio;
	P.canvas.height = P.height * window.devicePixelRatio;
	P.canvas.style.width = P.width + "px";
	P.canvas.style.height = P.height + "px";
	P.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
	P.min = P.width * 0.5;
	P.particles = [];
	P.globalAngle = 0;
	P.globalRotation = 0;
	P.tick = 0;
	P.PI = Math.PI;
	P.TWO_PI = P.PI * 2;
	P.ctx.globalCompositeOperation = "lighter";
	document.body.appendChild(P.canvas);
	P.loop();
};

P.loop = function() {
	requestAnimationFrame(P.loop);
	P.step();
	P.draw();
	P.tick++;
};

P.init();
//充电
	/** @type {HTMLCanvasElement} */
	var canva = document.querySelector(".canva");
	var stage = document.querySelector(".icon");
	var ctxx = canva.getContext("2d");
	class Boll {
		constructor(x, y, r) {
			this.x = x;
			this.y = y;
			this.r = r;
			this.arr = [];
		}
		draw() {
			ctxx.beginPath();
			ctxx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
			ctxx.closePath();
			ctxx.fillStyle = "#00f400";
			ctxx.fill();
		}

		//球球的速度
		speed() {
			let bollspeed = 1;
			this.speedx = -randomSpeed(0, bollspeed);
			this.speedy = randomSpeed(-2, 0);
		}
		//球球移动
		move() {
			this.x = this.x + this.speedx;
			this.y = this.y + this.speedy;
		}
	}
	//随机数函数
	function randomSpeed(m, n) {
		return Math.random() * (n - m) + m;
	}

	//画长条
	function drawStrip() {
		ctxx.beginPath();
		ctxx.closePath();
		ctxx.strokeStyle = "#00f400";
		ctxx.strokeRect(100, 80, 200, 25);
	}
	//画竖直线
	var l = 100;
	var over = false;
	function drawtrip() {
		if (n % 1 == 0 && l < 300) {
			l += 0.2;
			if(l>= 300){
				over=true
			}
		}
		ctxx.beginPath();
		ctxx.closePath();
		ctxx.strokeStyle = "#00f400";
		ctxx.strokeRect(l, 80, 0, 25);
	}
	//电量
	var power = 0;
	function poWer() {
		if (n % 4 == 0 && power < 100) {
			power = Math.floor((l - 100) / 2);
		}
		ctxx.font = "14px Arial";
		ctxx.fillStyle = "#00f400";
		ctxx.fillText(power + "%", 180, 98);
	}

	//帧数
	var n = 0;
	//装球球数组
	var Bollarr = [];
	function start() {
		n++;
		if (n % 1 == 0 && !over) {
			var b = new Boll(
				l,
				randomSpeed(80, 105),
				randomSpeed(1, 2)
			);
			b.speed();
			Bollarr.push(b);
		}
		Bollarr.forEach(function(boll, index) {
			boll.r -= 0.01;
			if (boll.r <= 0.1) {
				boll.r = 0.1;
				if (boll.r == 0.1) {
					Bollarr.splice(index, 1);
				}
			}
			boll.speedy += 0.02;

			boll.draw();
			boll.move();
		});
		//画长条
		drawStrip();
		//画竖直线
		drawtrip();
		//写出电量百分比
		//画出电量百分比
		poWer();
	}

	setInterval(function() {
		ctxx.clearRect(0, 0, 400, 200);
		start();
	}, 30);