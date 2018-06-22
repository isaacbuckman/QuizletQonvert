var table = document.getElementById("myTable");
var sentences = [];

	
function processInput(input) {
	this.input = input;
	$("tr").remove();
	sentences = input.split(".").filter(function(el) {return el.length != 0});
	console.log(sentences.length);
	for (var i = 0; i < sentences.length; i++) {
		var row = table.insertRow(-1);
		var cell = row.insertCell(0);
		cell.innerHTML = getSentence(sentences[i].trim().split(" "));
	}
	var row = table.insertRow(-1);
	var cell = row.insertCell(0);
	cell.innerHTML = "<button onClick=\"processResults()\">Process</button>";
}

function getSentence(sentence) {
	var innerHTML = "";
	for (var i = 0; i < sentence.length; i++) {
		innerHTML += "<a id=\"button\">" + sentence[i] + "</a>";
	}
	return innerHTML;
}

function processResults() {
	var innerHTML = "";
	var table = document.getElementById("myTable");
	var cells = table.getElementsByTagName("td");
	for (var i = 0; i < cells.length; i++) {
		var words = cells[i].getElementsByTagName("a");
		console.log(words);
		var term = "";
		var def = "";
		for (var x = 0; x < words.length; x++) {
			var word = words[x];
			console.log(word);
			if (word.className === "down") {
				if (term != "") {
					term += ", " + word.innerText;
				} else {
					term += word.innerText;
				}
				def += "______ ";
			} else {
				def += word.innerText + " ";
			}
		}
		innerHTML += term + "&nbsp&nbsp&nbsp&nbsp" + def + "<br/>";
	}
/* 	for (var i = 0; i < sentences.length; i++) {
		innerHTML += sentences[i] + "<br/>";
	} */
	document.getElementById("output").innerHTML = innerHTML;
}

$(document).ready(function() {
  $('table').on('click', 'a#button', function() {
	$(this).toggleClass("down");
  });
});