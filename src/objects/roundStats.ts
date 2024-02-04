import { DEFAULT_FONT_SETTINGS } from "../config";
import BorderedText from "./borderedText";

/**
 * Simple Group for holding information about the Round, mostly win/loss statistics,
 * but also some descriptive text like the round name.
 */
export class RoundStats extends Phaser.GameObjects.Group {
    /** Stats to keep track of correct/wrong for overall/per round */
    private overallCorrect: number;
    private overallWrong: number;
    private roundCorrect: number;
    private roundWrong: number;
    /** The threshold for (corrects-wrongs) before you win the round */
    private ROUND_WIN_THRESHOLD: number = 3;
    /** The name of this round. */
    private roundName: string;
    /** The text objects on the screen */
    private roundText: BorderedText;
    private overallText: BorderedText;

    constructor(scene: Phaser.Scene) {
        super(scene, []);
        this.overallCorrect = 0;
        this.overallWrong = 0;
        this.roundCorrect = 0;
        this.roundWrong = 0;
        this.setupTextObjects();
    }

    /**
     * Create and position the Round's text objects on the screen.
     */
    private setupTextObjects() {
        const EDGE_PADDING: number = 10;
        const TEXT_TOP: number = this.scene.scale.height / 5;
        // The statistics for the Round on the left side
        this.roundText = new BorderedText(
            this.scene,
            EDGE_PADDING,
            TEXT_TOP,
            "Round Score",
            DEFAULT_FONT_SETTINGS
        );
        this.roundText.setOrigin(0, 0);
        // The statistics for the Overall game on the right side
        this.overallText = new BorderedText(
            this.scene,
            this.scene.scale.width - EDGE_PADDING,
            TEXT_TOP,
            "Overall Score",
            DEFAULT_FONT_SETTINGS
        );
        this.overallText.setOrigin(1, 0);
        this.overallText.text.setAlign("right");
    }

    /**
     * Mark that they got a round correct, and update the stats accordingly.
     */
    correct() {
        this.roundCorrect += 1;
        this.overallCorrect += 1;
        this.updateStats();
    }

    /**
     * Mark that they got a round wrong, and update the stats accordingly.
     */
    wrong() {
        this.roundWrong += 1;
        this.overallWrong += 1;
        this.updateStats();
    }

    /**
     * Reset this round and its score, update the stats accordingly.
     * @param name The name of this round.
     */
    newRound(name: string) {
        this.roundCorrect = 0;
        this.roundWrong = 0;
        this.roundName = name;
        this.updateStats();
    }

    /**
     * Determine if they have finished this level, based on the number of correct
     * rounds minus the number of wrong rounds (must be strictly greater than the
     * ROUND_WIN_THRESHOLD).
     */
    checkRound(): boolean {
        return this.roundCorrect - this.roundWrong > this.ROUND_WIN_THRESHOLD;
    }

    /**
     * Update the text in the text objects based on the current stats.
     */
    updateStats() {
        this.roundText.setText(
            `${this.roundName} Score\n` +
                `Correct: ${this.roundCorrect}\n` +
                `Wrong: ${this.roundWrong}`
        );
        this.overallText.setText(
            `Overall Score\n` +
                `Correct: ${this.overallCorrect}\n` +
                `Wrong: ${this.overallWrong}`
        );
    }
}
