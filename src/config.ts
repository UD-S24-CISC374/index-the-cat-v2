import MainScene from "./scenes/mainScene";
import PreloadScene from "./scenes/preloadScene";

const DEFAULT_WIDTH = 865;
const DEFAULT_HEIGHT = 600;
export const DEFAULT_FONT_SETTINGS = {
    fontSize: 32,
    color: "black",
    highlight: "red",
};

export const CONFIG = {
    title: "Index the Cat",
    version: "2.0.0",
    type: Phaser.AUTO,
    backgroundColor: "#000000",
    scale: {
        parent: "phaser-game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    },
    scene: [PreloadScene, MainScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
    input: {
        keyboard: false,
        mouse: true,
        touch: true,
        gamepad: false,
    },
    render: {
        pixelArt: false,
        antialias: true,
    },
};
