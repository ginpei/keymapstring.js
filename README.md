# keymapstring.js

A JS lib to return key map string like "C-s" for KeyboardEvent.

* It detects key inputs via KeyboardEvent object.
* It returns a string.
* It doesn't handle KeyboardEvent object.
* It doesn't observe key inputs.
* It doesn't run any callbacks.

## Usage

```js
var command = keymapstring(event);
```

## Example

```js
var controller = {
    // prepare command-action mapping
    commands: {
        'C-s'   : 'save',
        'C-w'   : 'closeTab',
        'C-S-w' : 'closeAllTabs',
        'M-f'   : 'showFileMenu',
        'pageup': 'pageUp',
        'del'   : 'delete'
    },

    // listen keyboard operations
    start: function() {
        var onkey = this.onkey.bind(this);
        document.addEventListener('keydown', onkey);
        document.addEventListener('keypress', onkey);
    },

    // get a command from an event and do its action
    onkey: function(event) {

        var command = keymapstring(event);  // <--- This is it!

        var action = this.commands[command];
        if (action) {
            event.preventDefault();
            this[action](event);
        }
    },

    ...
};
```

## Reference

### `keymapstring(event)`

* `event`: KeyboardEvent object.
* returns: Key map string.

Return map strings like `"C-c"`, `"C-S-c"`, `"M-f"` or `"backspace"`.

## String structure

### Example

* `"s"`: S key
* `"C-s"`: Ctrl + S
* `"C-S-s"`: Ctrl + Shift + S
* `"S-C-s"`: (Invalid command because of the modifirers' order!)
* `"C-M-S-s"`: Ctrl + Meta + Shift + S
* `"space"`: Space bar
* `"C-up"`: Ctrl + Up arrow key

### Modifirers

Explain|Windows|Machintosh?
-------|-------|----------
C-     |Ctrl   |controll?
A-     |Alt    |option?
M-     |       |command?
S-     |Shift  |shift?

The order is: C, A, M, S.

`"S-"` isn't used for symbols nor numbers.

### Keys

Write letters or key names with lower case.

* ✔ `"a"`, `"C-return"`, `"S-home"`
* ✘ `"A"`, `"C-RETURN"`, `"C-S-HOME"`

### BNF

```bnf
KeymapString ::= Ctrl? Alt? Meta? (Shift? Key | Number | Symbol)
Ctrl ::= 'C-'
Alt ::= 'A-'
Meta ::= 'M-'
Shift ::= 'S-'
Key ::= Letter | Function | Special
Letter ::= [a-z]
Function ::= 'f' ([0-9] | '1' [0-2])
Special ::= 'backspace' | 'tab' | 'return' | 'space' | 'escape' | 'home' | 'end' | 'pageup' | 'pagedown' | 'delete' | 'insert' | 'up' | 'right' | 'down' | 'left'
Number ::= [0-9]
Symbol ::= [!"#$%&'()*+,./:;<=>?@[\^_`{|}~] | '-' | ']'
```

## Supports

* (Empty) = OK.
* `key`, `key` = Some keys does not work well.
* ✘ = No keys work well.

## Windows

### Letter

C- |A- |S- |Example     |Firefox 36|Chrome 41    |IE 11
---|---|---|------------|----------|-------------|-----
   |   |   |`"x"`       |          |             |
   |   |✔ |`"S-x"`     |          |             |
✔ |   |   |`"C-x"`     |          |`n`, `t`, `w`|`o`, `p`
✔ |   |✔ |`"C-S-x"`   |          |`n`, `t`, `w`|
   |✔ |   |`"A-x"`     |          |             |✘
   |✔ |✔ |`"A-S-x"`   |          |             |`d`
✔ |✔ |   |`"C-A-x"`   |          |             |
✔ |✔ |✔ |`"C-A-S-x"` |          |             |

### Number

C- |A- |S- |Example     |Firefox 36|Chrome 41    |IE 11
---|---|---|------------|----------|-------------|-----
   |   |   |`"0"`       |N/A       |N/A          |N/A
✔ |   |   |`"C-0"`     |N/A       |N/A          |N/A
   |✔ |   |`"A-0"`     |N/A       |N/A          |N/A
✔ |✔ |   |`"C-A-0"`   |N/A       |N/A          |N/A

### Symbol

C- |A- |S- |Example     |Firefox 36|Chrome 41    |IE 11
---|---|---|------------|----------|-------------|-----
   |   |   |`"@"`       |N/A       |N/A          |N/A
✔ |   |   |`"C-@"`     |N/A       |N/A          |N/A
   |✔ |   |`"A-@"`     |N/A       |N/A          |N/A
✔ |✔ |   |`"C-A-@"`   |N/A       |N/A          |N/A

### Special

C- |A- |S- |Example     |Firefox 36|Chrome 41    |IE 11
---|---|---|------------|----------|-------------|-----
   |   |   |`"up"`      |N/A       |N/A          |N/A
   |   |✔ |`"S-up"`    |N/A       |N/A          |N/A
✔ |   |   |`"C-up"`    |N/A       |N/A          |N/A
✔ |   |✔ |`"C-S-up"`  |N/A       |N/A          |N/A
   |✔ |   |`"A-up"`    |N/A       |N/A          |N/A
   |✔ |✔ |`"A-S-up"`  |N/A       |N/A          |N/A
✔ |✔ |   |`"C-A-up"`  |N/A       |N/A          |N/A
✔ |✔ |✔ |`"C-A-S-up"`|N/A       |N/A          |N/A

## Mac

(Comming soon...)

## License

* MIT License

## Contact

* By [Ginpei](https://github.com/ginpei/ginpei)
* Twitter: [@ginpei\_en](https://twitter.com/ginpei_en)(en) / [@ginpei\_jp](https://twitter.com/ginpei_jp)(ja)
