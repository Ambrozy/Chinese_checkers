var step_x = 30, step_y = 27;
var colors = [
	'blue',
	'green',
	'pink',
	'red',
	'teal',
	'yellow',
]
var map = [
	[0,0,0,0,0,0,2,0,0,0,0,0,0],
	 [0,0,0,0,0,2,2,0,0,0,0,0,0],
	[0,0,0,0,0,2,2,2,0,0,0,0,0],
	 [0,0,0,0,2,2,2,2,0,0,0,0,0],
	[3,3,3,3,1,1,1,1,1,7,7,7,7],
	 [3,3,3,1,1,1,1,1,1,7,7,7,0],
	[0,3,3,1,1,1,1,1,1,1,7,7,0],
	 [0,3,1,1,1,1,1,1,1,1,7,0,0],
	[0,0,1,1,1,1,1,1,1,1,1,0,0],
	 [0,4,1,1,1,1,1,1,1,1,6,0,0],
	[0,4,4,1,1,1,1,1,1,1,6,6,0],
	 [4,4,4,1,1,1,1,1,1,6,6,6,0],
	[4,4,4,4,1,1,1,1,1,6,6,6,6],
	 [0,0,0,0,5,5,5,5,0,0,0,0,0],
	[0,0,0,0,0,5,5,5,0,0,0,0,0],
	 [0,0,0,0,0,5,5,0,0,0,0,0,0],
	[0,0,0,0,0,0,5,0,0,0,0,0,0],
];
var height = map.length;
var width = map[0].length;
var player_count = 6;
var current_player = 0;
var beads = [];
$(document).ready(function(e){
	// инициализация игры
	for(var i = 0; i < height; i++)
		for(var j = 0; j < width; j++)
			if(map[i][j] > 0){
				addShadow(calc_x(i, j), calc_y(i, j));
				if(map[i][j] > 1)
					addBead(i, j, map[i][j] - 2);
			}
	print_who();
	$('.bead').on('click', function(){
		$('.bead').removeClass('active');
		if($(this).data('player_id') == current_player){
			$(this).addClass('active');
		}
	});
});
function addShadow(x, y){
	var item = $('<div class="item"><img src="img/shadow.png"/></div>');
	item.css({top:y, left:x});
	$('#content').append(item);
}
function addBead(i, j, color){
	var x = calc_x(i, j), y = calc_y(i, j);
	var item = $('<div class="item bead" data-i="'+i+'" data-j="'+j+'" data-player_id="'+color+'">\
		<img src="img/bead-' + colors[color] + '.png"/>\
	</div>');
	item.css({top:y, left:x});
	$('#content').append(item);
	if(!beads[color])
		beads[color] = [];
	beads[color].push({
		i: i,
		j: j,
		player_id: color,
		elem: item,
	});
}
function calc_x(i, j){
	return j * step_x + (i % 2) * step_x / 2;
}
function calc_y(i, j){
	return i * step_y;
}
function print_who(){
	$('#who').empty().append('Сейчас ходит: <img src="img/bead-' + colors[current_player] + '.png"/>');
}