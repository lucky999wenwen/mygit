var mask = document.querySelector(".mask");
var list = document.querySelectorAll(".list");
var boxb = document.querySelector(".boxb");
var cardall = boxb.querySelectorAll(".contents .card");
var itemsall = boxb.querySelectorAll(".contents .card .items");
// var gong = document.querySelector('.gong')
var current = 0;
document.querySelector('.gong').onmousemove = function(e) {
	var x = e.pageX - mask.offsetLeft - mask.offsetWidth / 2;
	var y = e.pageY - mask.offsetTop - mask.offsetHeight / 2;

	//boxb项目
	boxb.style.transform =
		"rotateY(" + -x / 30 + "deg) rotateX(" + -y / 30 + "deg)";
	cardall[0].style.backgroundPosition =
		x / 80 + -30 + "px " + (y / 80 + -30) + "px";
	itemsall[0].style.backgroundPosition =
		-x / 100 + 15 + "px " + (-y / 100 + 60) + "px ";
	cardall[1].style.backgroundPosition =
		x / 80 + -10 + "px " + (y / 80 + -10) + "px";
	itemsall[1].style.backgroundPosition =
		-x / 100 + 30 + "px " + (-y / 100 + 60) + "px";
	cardall[2].style.backgroundPosition =
		x / 80 + -30 + "px " + (y / 80 + -30) + "px";
	itemsall[2].style.backgroundPosition =
		-x / 100 + 15 + "px " + (-y / 100 + 60) + "px ";
};
var click = true;
document.body.onclick = function() {
	if (click) {
		click = false;
		var numarr = [];
		for (var j = 0; j < 5; j++) {
			numarr.push(Math.floor(Math.random() * 200));
		}
		// console.log(numarr);

		mask.classList.toggle("active");
		current++;
		if (current % 2 == 1) {
			list.forEach(function(e, index, arr) {
				// console.log(e,index);
				for (var i = 2; i < e.querySelectorAll("li").length; i++) {
					e.querySelectorAll("li")[i].style.height =
						numarr[index] + 100 + "px";
					// console.log(e.querySelectorAll("li")[i]);
					e.querySelectorAll("li")[4].innerText = numarr[index] + 100;

					e.querySelectorAll("li")[1].style.transform =
						"rotateX(" +
						90 +
						"deg) translateZ(" +
						(-numarr[index] - 55) +
						"px)";
				}
			});
		}
		if (current % 2 == 0) {
			list.forEach(function(e, index, arr) {
				for (var i = 2; i < e.querySelectorAll("li").length; i++) {
					e.querySelectorAll("li")[i].style.height = 0 + "px";
				}
				e.querySelectorAll("li")[1].style.transform =
					"rotateX(" + 90 + "deg) translateZ(" + 49 + "px)";
			});
		}
		setTimeout(function() {
			click = true;
		}, 1000);
	}
};
