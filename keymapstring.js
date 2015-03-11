keymapstring = function(event) {
	return keymapstring.getCommand(event);
};
keymapstring.getCommand = function(event) {
	var command;
	var asSymbol = false;
	var type = event.type;
	var code = event.which;

	if (type === 'keydown') {
		command = this.keycodeMap[code];
		if (!command && (this.isLowerAlphabet(code) || this.isUpperAlphabet(code) || (this.isNumber(code) && !event.shiftKey))) {
			command = String.fromCharCode(code).toLowerCase();
		}
	}
	else if (type === 'keypress' && code) {
		command = String.fromCharCode(code);
		if (this.isUpperAlphabet(code)) {
			command = command.toLowerCase();
		}
		else if (!this.isNumber(code) && !this.isLowerAlphabet(code)) {
			asSymbol = true;
		}
	}

	if (command) {
		if (!asSymbol && event.shiftKey) {
			command = 'S-' + command;
		}
		if (event.metaKey) {
			command = 'M-' + command;
		}
		if (event.altKey) {
			command = 'A-' + command;
		}
		if (event.ctrlKey) {
			command = 'C-' + command;
		}
	}

	return command || null;
};
keymapstring.isLowerAlphabet = function(code) {
	return (97 <= code && code <= 122);
};
keymapstring.isUpperAlphabet = function(code) {
	return (65 <= code && code <= 90);
};
keymapstring.isNumber = function(code) {
	return (48 <= code && code <= 57);
};
keymapstring.keycodeMap = {
	8: 'backspace',
	9: 'tab',
	10: 'return',
	13: 'return',
	// 16: 'shift',
	// 17: 'control',
	// 18: 'alt',
	27: 'escape',
	32: 'space',
	33: 'pageup',
	34: 'pagedown',
	35: 'end',
	36: 'home',
	37: 'left',
	38: 'up',
	39: 'right',
	40: 'down',
	46: 'del',
	112: 'f1',
	113: 'f2',
	114: 'f3',
	115: 'f4',
	116: 'f5',
	117: 'f6',
	118: 'f7',
	119: 'f8',
	120: 'f9',
	121: 'f10',
	122: 'f11',
	123: 'f12',
};
