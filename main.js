//for andrew
//var textinput = document.getElementById("input");
//textinput.value = "The idea here is that a student could copy and paste a paragraph from their textbook or powerpoint slides. They can then select which words they want to become the blank in their sentences. Below is one of the slides from a history presentation that inspired me to create this.\n\n• Richard Arkwright credited for growth of factories\n\n• Created 1st true factory\n\n• Men, Women and Children employed\n\n• Harsh conditions – fined for whistling or looking out\nthe window, no safety guards, 16 hour work days\n\n• 16 hour work days for children, as young as 3 were\nput to work; expected children to receive a basic\namount of education";

var table = document.getElementById("myTable");
var sentences = [];

	
function processInput(input) {
	input = input.replace(/(\r\n\t|\n|\r\t)/gm," ");
	$("tr").remove();
	sentences = input.split(".").filter(function(el) {return el.length != 0});
	sentences = input.match(/•[^•]+|[^\.!\?•]+[\.!\?]+/g);
	for (var i = 0; i < sentences.length; i++) {
		var row = table.insertRow(-1);
		var cell = row.insertCell(0);
		cell.innerHTML = getSentence(sentences[i].trim().split(" "));
	}
	var element = document.getElementById("section-two");
    element.classList.remove("hide");
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
		var term = "";
		var def = "";
		for (var x = 0; x < words.length; x++) {
			var word = words[x];
			if (word.className === "down") {
				if (term !== "") {
					term += ", " + word.innerText;
				} else {
					term += word.innerText;
				}
				def += "______ ";
			} else {
				def += word.innerText + " ";
			}
		}
		if (term !== "") {
			innerHTML += term + "&nbsp&nbsp&nbsp&nbsp" + def + "<br/>";
		}
	}
	innerHTML = innerHTML.substring(0, innerHTML.lastIndexOf("<br/>"));
	document.getElementById("output").innerHTML = innerHTML;
	var element = document.getElementById("section-three");
    element.classList.remove("hide");
}

function inputChanged() {
   	var element = document.getElementById("section-two");
    element.classList.add("hide");	
	var element = document.getElementById("section-three");
    element.classList.add("hide");
}

$(document).ready(function() {
  $('table').on('click', 'a#button', function() {
	$(this).toggleClass("down");
	 $("#section-three").addClass("hide");
  });
});

// Tooltip

$('button').tooltip({
  trigger: 'click',
  placement: 'bottom'
});

function setTooltip(btn, message) {
  $(btn).tooltip('hide')
    .attr('data-original-title', message)
    .tooltip('show');
}

function hideTooltip(btn) {
  setTimeout(function() {
    $(btn).tooltip('hide');
  }, 1000);
}

// Clipboard

var clipboard = new ClipboardJS('button');

clipboard.on('success', function(e) {
  setTooltip(e.trigger, 'Copied!');
  hideTooltip(e.trigger);
});

clipboard.on('error', function(e) {
  setTooltip(e.trigger, 'Failed!');
  hideTooltip(e.trigger);
});
