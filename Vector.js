"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    class Vector {
        x;
        y;
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        copy() {
            return new Vector(this.x, this.y);
        }
    }
    Feuerwerk.Vector = Vector;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Vector.js.map