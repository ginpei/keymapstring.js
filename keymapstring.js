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
	}
	else if (type === 'keypress' && code) {
		command = this.charcodeMap[code];
		if (!command) {
			command = String.fromCharCode(code);
			if (65 <= code && code <= 90) {  // A-Z
				command = command.toLowerCase();
			}
			else if (!(48 <= code && code <= 57) && !(97 <= code && code <= 122)) {  // 0-9 || a-z
				asSymbol = true;
			}
		}
	}

	if (command) {
		if (event.ctrlKey) {
			command = 'C-' + command;
		}
		if (event.altKey) {
			command = 'A-' + command;
		}
		if (event.metaKey) {
			command = 'M-' + command;
		}
		if (!asSymbol && event.shiftKey) {
			command = 'S-' + command;
		}
	}

	return command || null;
};
keymapstring.charcodeMap = {
	13: 'return',
	32: 'space',
};
keymapstring.keycodeMap = {
	8: 'backspace',
	9: 'tab',
	// 16: 'shift',
	// 17: 'control',
	// 18: 'alt',
	27: 'escape',
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
