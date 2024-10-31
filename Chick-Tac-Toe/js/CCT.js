var player, 
		computer, 
		plays = [0, 0, 0, 0, 0, 0, 0, 0, 0], 
		endGame = false;

/* Reset the game */
function reset() {
	$(".reset").css("visibility", "hidden");
	$(".initial").css("visibility", "visible");
	for (var i = 0; i <= 8; i++) {
		$("#a" + i).text("");
	}
	plays = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	endGame = false;
	$("#result").text("");
}

/* After player chooses X or O, set variables; if player is O, computer takes first turn*/
function initialize(selection) {
	player = selection;
	player === "X" ? (computer = "O") : (computer = "X");
	$(".initial").css("visibility", "hidden");
	if (player === "O") computerChoice();
}

/* Places selection on grid; player may be X or O, but player and computer colors 
are always black and red, respectively*/
function showSelection(select, symbol, color) {
	$("#a" + select).text(symbol);
	$("#a" + select).css("color", color);
}

/* Game cycle: Checks to see if position is available; if so, call to place selection on grid, add to played item array, then check for win; computer then takes a turn and checks for win */
function runGame(position, symbol) {
	if (plays[position] === 0) {
		showSelection(position, symbol, "black");
		addtoPlays(position, symbol);
		checkWin();
		computerChoice();
		checkWin();
	}
}

/* Populate played items array with positions already chosen*/
function addtoPlays(x, symbol) {
	plays[x] = symbol;
}

/* Computer's check for possible win or block */
function bestMove(arr) {
	var winMove, blockMove;
	var def = [
		[0, 3, 6],[1, 4, 7],[2, 5, 8],[3, 6, 0],[4, 7, 1],[5, 8, 2],
		[0, 1, 2],[3, 4, 5],[6, 7, 8],[1, 2, 0],[4, 5, 3],[7, 8, 6],
		[0, 4, 8],[4, 8, 0],[2, 4, 6],[4, 6, 2],[0, 8, 4],[2, 6, 4],
		[0, 6, 3],[1, 7, 4],[2, 8, 5],[0, 2, 1],[3, 5, 4],[6, 8, 7]
	];

	for (var k = 0; k < def.length; k++) {
		if (
			arr[def[k][0]] === computer &&
			arr[def[k][1]] === computer &&
			arr[def[k][2]] === 0
		)
			winMove = def[k][2];
		if (
			arr[def[k][0]] === player &&
			arr[def[k][1]] === player &&
			arr[def[k][2]] === 0
		)
			blockMove = def[k][2];
	}

	if (!isNaN(winMove)) return winMove;
	if (!isNaN(blockMove)) return blockMove;
	return null;
}

/* Computer order of play if there is no win or block */
function playCtrCorner(arr) {
	var playOrder = [4, 0, 2, 6, 8, 1, 3, 5, 7], choice;
	for (i = 0; i < playOrder.length; i++) {
		if (arr[playOrder[i]] === 0) return (choice = playOrder[i]);
	}
}

/* Computer chooses either win, block, or order of play */
function computerChoice() {
	var best = bestMove(plays) !== null ? bestMove(plays) : playCtrCorner(plays);
	showSelection(best, computer, "red");
	addtoPlays(best, computer);
}

/* Check if either player or computer wins */
function win(x) {
	var q = [
		[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]
	];
	for (var j = 0; j < q.length; j++) {
		if (plays[q[j][0]] === x && plays[q[j][1]] === x && plays[q[j][2]] === x)
			return true;
	}
	return false;
}

/* Check for win */
function checkWin() {
	// There's no win yet...
	var message = "Keep Playing!";
	// Computer wins...
	if (win(computer)) {
		message = "The Chicken Wins!";
		endGame = true;
	}
	// Player wins...
	if (win(player)) {
		message = "You Win!";
		endGame = true;
	}
	// If there are no positions left to play, end in a tie.
	if (plays.indexOf(0, 0) === -1) {
		message = "Tied Game!";
		endGame = true;
	}
	// Announce result; reset panel to play again
	$("#result").text(message);
	if (endGame) $(".reset").css("visibility", "visible");
}

/* A list of click events...There might be a more elegant way, but for now... */
$(function() {
$("#a0").click(function() {runGame(0, player)});
$("#a1").click(function() {runGame(1, player)});
$("#a2").click(function() {runGame(2, player)});
$("#a3").click(function() {runGame(3, player)});
$("#a4").click(function() {runGame(4, player)});
$("#a5").click(function() {runGame(5, player)});
$("#a6").click(function() {runGame(6, player)});
$("#a7").click(function() {runGame(7, player)});
$("#a8").click(function() {runGame(8, player)});
$("#yes").click(function() {reset()});
$("#select-o").click(function() {initialize("O")});
$("#select-x").click(function() {initialize("X")});
});