namespace Feuerwerk {
    window.addEventListener("load", handleLoad);

    let canvas: HTMLCanvasElement;
    let crc2: CanvasRenderingContext2D;
    let fireworks: Firework[] = [];
    let rect: DOMRect;

    let color: string = "#ff0000";
    let numberOfParticles: number = 50;
    let speed: number = 5;
    let size: number = 2;
    let width: number = 10;

    function updateColor(): void {
        const red = (document.getElementById("red") as HTMLInputElement).value;
        const green = (document.getElementById("green") as HTMLInputElement).value;
        const blue = (document.getElementById("blue") as HTMLInputElement).value;
        color = `rgb(${red}, ${green}, ${blue})`;
        document.getElementById("color")!.style.backgroundColor = color;
    }

    function handleLoad(): void {
        canvas = document.querySelector("canvas") as HTMLCanvasElement;
        rect = canvas.getBoundingClientRect();
        canvas.addEventListener("click", handleClick);
        crc2 = canvas.getContext("2d") as CanvasRenderingContext2D;
        setInterval(update, 20);
        loadFireworkNames();

        document.getElementById("red")!.addEventListener("input", updateColor);
        document.getElementById("green")!.addEventListener("input", updateColor);
        document.getElementById("blue")!.addEventListener("input", updateColor);
        document.getElementById("numberOfParticles")!.addEventListener("input", (e) => numberOfParticles = parseInt((e.target as HTMLInputElement).value));
        document.getElementById("speed")!.addEventListener("input", (e) => speed = parseInt((e.target as HTMLInputElement).value));
        document.getElementById("size")!.addEventListener("input", (e) => size = parseInt((e.target as HTMLInputElement).value));
        document.getElementById("width")!.addEventListener("input", (e) => width = parseInt((e.target as HTMLInputElement).value));
    }

    function handleClick(e: MouseEvent): void {
        let fireworkConfig: FireworkConfig = {
            color: color,
            numberOfParticles: numberOfParticles,
            positionX: e.clientX - rect.left,
            positionY: e.clientY - rect.top,
            speed: speed
        };

        let particleConfig: ParticleConfig = {
            color: color,
            size: size,
            width: width
        };

        fireworks.push(new Firework(fireworkConfig, particleConfig));
        saveFirework(fireworkConfig);
    }

    function drawBackground(): void {
        let gradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "#05050555");
        gradient.addColorStop(0.62, "#00002255");
        gradient.addColorStop(1, "#00003355");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    function update(): void {
        drawBackground();
        fireworks.forEach(firework => {
            firework.draw();
            firework.update();
        });
    }

    function saveFirework(config: FireworkConfig): void {
        let savedFireworks = JSON.parse(localStorage.getItem("fireworks") || "[]");
        savedFireworks.push(config);
        localStorage.setItem("fireworks", JSON.stringify(savedFireworks));
        console.log("Firework saved:", config);
    }

    function loadFireworkNames(): void {
        let savedFireworks = JSON.parse(localStorage.getItem("fireworks") || "[]");
        console.log("Loaded Firework Configurations:", savedFireworks);
    }
}
