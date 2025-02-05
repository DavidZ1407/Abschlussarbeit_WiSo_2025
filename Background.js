"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    class Background {
        crc2;
        snowflakes = [];
        numberOfSnow = 50;
        snowSpeed = 2;
        constructor(crc2) {
            this.crc2 = crc2;
            this.initSnowflakes();
        }
        setSnowSpeed(speed) {
            this.snowSpeed = speed;
        }
        initSnowflakes() {
            for (let i = 0; i < this.numberOfSnow; i++) {
                this.snowflakes.push({
                    x: Math.random() * this.crc2.canvas.width,
                    y: Math.random() * this.crc2.canvas.height,
                    radius: Math.random() * 2,
                    speedY: Math.random() * 1 + 0.5,
                    opacity: Math.random() * 0.5 + 0.3
                });
            }
        }
        draw() {
            // Hintergrund zeichnen
            let gradient = this.crc2.createLinearGradient(0, 0, 0, this.crc2.canvas.height);
            gradient.addColorStop(0, "#05050555");
            gradient.addColorStop(0.62, "#00002255");
            gradient.addColorStop(1, "#00003355");
            this.crc2.fillStyle = gradient;
            this.crc2.fillRect(0, 0, this.crc2.canvas.width, this.crc2.canvas.height);
            // Schneeflocken aktualisieren und zeichnen
            this.updateSnowflakes();
            this.drawSnowflakes();
        }
        updateSnowflakes() {
            for (let snowflake of this.snowflakes) {
                snowflake.y += snowflake.speedY * this.snowSpeed;
                // Schneeflocken wieder oben erscheinen lassen, wenn sie den unteren Rand erreichen
                if (snowflake.y > this.crc2.canvas.height) {
                    snowflake.y = 0;
                    snowflake.x = Math.random() * this.crc2.canvas.width;
                }
            }
        }
        drawSnowflakes() {
            for (let snowflake of this.snowflakes) {
                this.crc2.beginPath();
                this.crc2.arc(snowflake.x, snowflake.y, snowflake.radius, 0, 2 * Math.PI);
                this.crc2.fillStyle = `rgba(255, 255, 255, ${snowflake.opacity})`;
                this.crc2.fill();
                this.crc2.closePath();
            }
        }
    }
    Feuerwerk.Background = Background;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Background.js.map