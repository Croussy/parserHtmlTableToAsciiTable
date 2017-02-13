//var htmlTable = '<table style="width:100%"> <tr> <th>Firstname</th> <th>Lastname</th> <th>Age</th> </tr> <tr> <td>Jill</td> <td>Smith</td> <td>50</td> </tr> <tr> <td>Eve</td> <td>Jackson</td> <td>94</td> </tr> <tr> <td>John</td> <td>Doe</td> <td>80</td> </tr> </table>';
var htmlTable = ' <table> <tr> <td>Cellule 1</td> <td>Cellule 2</td> <td>Cellule 3</td> <td>Cellule 4</td> </tr> <tr> <td>Cellule 5</td> <td>Cellule 6</td> <td>Cellule 7</td> <td>Cellule 8</td> </tr> <tr> <td>Cellule 9</td> <td>Cellule 10</td> <td>Cellule 11</td> <td>Cellule 12</td> </tr> </table>';

var element;
var numberColumn;
var numberLines;
var max_length_linesHtml = [];
var lines;

var cross = "+";
var pipe = "|";
var tiret = "-";
var space = " ";

function init() {
	element = document.createElement('html');
	element.innerHTML = htmlTable;
	getNumberColumn();
	initMaxLines();
	initLines();
}

function initLines() {
	var linesHtml = element.querySelectorAll('tr');
	numberLines = linesHtml.length;
	var _text = [];
	lines = [];
	for(var i = 0; i < numberLines; i++) {
		_text = linesHtml[i].innerText;
		_text = cleanArrayLines(_text.split( ' ' ));
		countMaxLengthWordlines(_text);
		lines.push(_text);
	}
}

function createAsciiTable() {
	var _toReturn = '';
	for(var i = 0; i < numberLines; i++) {
		_toReturn += createSeperatorLine();
		_toReturn += "\n";
		_toReturn += createEmptyLine();
		_toReturn += createValueLine(lines[i]);
		_toReturn += createEmptyLine();
	}
	_toReturn += createSeperatorLine();
	return _toReturn;
}

function createSeperatorLine() {
	var _toReturn = cross;
	for(var i = 0; i < max_length_linesHtml.length; i++) {
		_toReturn += tiret;
		_toReturn += createDashString(max_length_linesHtml[i]);
		_toReturn += tiret + cross;
	}
	return _toReturn;
}

function cleanArrayLines(arrayToClean) {
	for(var i = 0, size = arrayToClean.length; i < size; i++) {
		if(arrayToClean[i] === ''){
			arrayToClean.splice(i, 1);
		}
	}
	return arrayToClean;
}

function countMaxLengthWordlines(data) {
	for(var i = 0, size = data.length; i < size; i++) {
		if(max_length_linesHtml[i] < data[i].length) {
			max_length_linesHtml[i] = data[i].length;
		}
	}
}

function initMaxLines() {
	for(var i = 0; i < numberColumn; i++) {
		max_length_linesHtml[i] = 0;
	}
}

function createDashString( numberOfDash ) {
	var _toReturn = '';
	var i =0;
	while(i < numberOfDash) {
		_toReturn += tiret;
		i++;
	}
	return _toReturn;
}


function createValueLine( line ) {
	var _toReturn = pipe;
	for(var i = 0; i < numberColumn; i++) {
		_toReturn += space;
		_toReturn += line[i];
		_toReturn += getEmptyString((max_length_linesHtml[i] + 1) -  line[i].length);
		_toReturn += pipe;
	}
	_toReturn += '\n';
	return _toReturn;
}

function createEmptyLine () {
	var _toReturn = pipe;
	for(var i = 0; i < numberColumn; i++) {
		_toReturn += getEmptyString(max_length_linesHtml[i] + 2);
		_toReturn += pipe;
	}
	_toReturn += '\n';
	return _toReturn;
}

function getEmptyString(numberOfSpace) {
	var i = 0;
	var _toReturn = '';
	if( numberOfSpace !== 0) {
		while(i < numberOfSpace) {
			_toReturn += space;
			i++;
		}
	}
	return _toReturn;
}

function getNumberColumn() {
	 numberColumn = element.querySelectorAll('th').length;
	if(numberColumn !== 0 ){
		return numberColumn;
	}else {
		numberColumn = element.querySelectorAll('tr')[0].querySelectorAll('td').length;
	}
}

init();
console.log( createAsciiTable() );