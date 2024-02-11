import Phaser from "phaser";

export interface Padding {
    x: number;
    y: number;
}

/**
 * Container holding text and a rectangle around it.
 */
export default class BorderedText extends Phaser.GameObjects.Container {
    /** Game object for holding the text */
    public readonly text: Phaser.GameObjects.Text;
    /** Game object for holding the border */
    public readonly box: Phaser.GameObjects.Rectangle;

    private padding: Padding;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        text: string,
        style?: Phaser.Types.GameObjects.Text.TextStyle,
        padding: Padding = { x: 20, y: 10 }
    ) {
        super(scene, x, y, []);
        scene.add.existing(this);

        this.text = this.scene.add.text(0, 0, text, style);
        this.text.setOrigin(0.5, 0.5).setColor("white");

        this.padding = padding;

        this.box = this.scene.add
            .rectangle(
                0,
                0,
                this.text.width + padding.x,
                this.text.height + padding.y,
                0x000000
            )
            .setStrokeStyle(5, 0xfff)
            .setOrigin(0.5, 0.5)
            .setDepth(this.text.depth - 1);
        this.add(this.box);
        this.add(this.text);
    }

    /**
     * Set the text of this BorderedText object.
     * @param text The new text to display
     */
    setText(text: string) {
        this.text.setText(text);
        this.box.setSize(
            this.text.width + this.padding.x,
            this.text.height + this.padding.y
        );
        //this.box.setPosition(this.text.x, this.text.y);
        this.text.setPosition(this.box.getCenter().x, this.box.getCenter().y);
    }

    setOrigin(x: number, y: number) {
        //this.text.setOrigin(x, y);
        this.box.setOrigin(x, y);
    }
}
