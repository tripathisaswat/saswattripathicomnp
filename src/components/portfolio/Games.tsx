import { useMemo, useState } from "react";
import { AppDialog } from "@/components/apps/AppDialog";
import { useAllScores } from "@/hooks/use-high-score";
import TicTacToeApp from "@/components/apps/games/TicTacToeApp";
import ConnectFourApp from "@/components/apps/games/ConnectFourApp";
import SnakeApp from "@/components/apps/games/SnakeApp";
import ConnectDotsApp from "@/components/apps/games/ConnectDotsApp";
import DinoApp from "@/components/apps/games/DinoApp";
import MemoryApp from "@/components/apps/games/MemoryApp";
import Game2048App from "@/components/apps/games/Game2048App";
import MinesweeperApp from "@/components/apps/games/MinesweeperApp";
import BreakoutApp from "@/components/apps/games/BreakoutApp";
import TetrisApp from "@/components/apps/games/TetrisApp";
import FlappyApp from "@/components/apps/games/FlappyApp";
import WhackAMoleApp from "@/components/apps/games/WhackAMoleApp";
import SimonApp from "@/components/apps/games/SimonApp";
import HangmanApp from "@/components/apps/games/HangmanApp";
import WordScrambleApp from "@/components/apps/games/WordScrambleApp";
import RpsApp from "@/components/apps/games/RpsApp";
import PongApp from "@/components/apps/games/PongApp";
import ReactionApp from "@/components/apps/games/ReactionApp";
import TypingApp from "@/components/apps/games/TypingApp";
import SudokuApp from "@/components/apps/games/SudokuApp";

type Cat = "Arcade" | "Puzzle" | "Word" | "Brain" | "Classic";

type Game = {
  name: string;
  icon: string;
  desc: string;
  label: string;
  cat: Cat;
  Comp: React.ComponentType;
  scoreKey?: string;
  suffix?: string;
};

const games: Game[] = [
  { name: "2048", icon: "🔢", desc: "Merge the tiles", label: "games/2048", cat: "Puzzle", Comp: Game2048App, scoreKey: "2048" },
  { name: "Tetris", icon: "🟦", desc: "Stack and clear lines", label: "games/tetris", cat: "Arcade", Comp: TetrisApp, scoreKey: "Tetris" },
  { name: "Minesweeper", icon: "💣", desc: "Clear the field", label: "games/minesweeper", cat: "Puzzle", Comp: MinesweeperApp, scoreKey: "Minesweeper", suffix: "s" },
  { name: "Breakout", icon: "🧱", desc: "Brick breaker", label: "games/breakout", cat: "Arcade", Comp: BreakoutApp, scoreKey: "Breakout" },
  { name: "Flappy", icon: "🐤", desc: "Tap to fly", label: "games/flappy", cat: "Arcade", Comp: FlappyApp, scoreKey: "Flappy" },
  { name: "Snake", icon: "🐍", desc: "Classic arcade", label: "games/snake", cat: "Arcade", Comp: SnakeApp },
  { name: "Pong", icon: "🏓", desc: "Paddle duel", label: "games/pong", cat: "Classic", Comp: PongApp, scoreKey: "Pong" },
  { name: "Dino Runner", icon: "🦕", desc: "Endless runner", label: "games/dino", cat: "Arcade", Comp: DinoApp },
  { name: "Whack-a-Mole", icon: "🔨", desc: "Fast reflexes", label: "games/whack-a-mole", cat: "Arcade", Comp: WhackAMoleApp, scoreKey: "Whack-a-Mole" },
  { name: "Simon Says", icon: "🎵", desc: "Repeat the sequence", label: "games/simon", cat: "Brain", Comp: SimonApp, scoreKey: "Simon Says" },
  { name: "Memory Match", icon: "🧠", desc: "Memory cards", label: "games/memory", cat: "Brain", Comp: MemoryApp },
  { name: "Reaction Test", icon: "⚡", desc: "How fast are you?", label: "games/reaction", cat: "Brain", Comp: ReactionApp, scoreKey: "Reaction Test", suffix: "ms" },
  { name: "Typing Speed", icon: "⌨️", desc: "Words per minute", label: "games/typing", cat: "Word", Comp: TypingApp, scoreKey: "Typing Speed", suffix: " wpm" },
  { name: "Hangman", icon: "🔤", desc: "Guess the word", label: "games/hangman", cat: "Word", Comp: HangmanApp, scoreKey: "Hangman" },
  { name: "Word Scramble", icon: "🔠", desc: "Unscramble fast", label: "games/word-scramble", cat: "Word", Comp: WordScrambleApp, scoreKey: "Word Scramble" },
  { name: "Sudoku", icon: "🧩", desc: "Number logic", label: "games/sudoku", cat: "Puzzle", Comp: SudokuApp },
  { name: "Connect Four", icon: "🔴", desc: "Classic strategy", label: "games/connect-four", cat: "Classic", Comp: ConnectFourApp },
  { name: "Tic Tac Toe", icon: "❌", desc: "Traditional 3x3 grid", label: "games/tic-tac-toe", cat: "Classic", Comp: TicTacToeApp },
  { name: "Connect Dots", icon: "⚫", desc: "Dots & boxes", label: "games/connect-dots", cat: "Classic", Comp: ConnectDotsApp },
  { name: "Rock Paper Scissors", icon: "✊", desc: "Best of streaks", label: "games/rps", cat: "Classic", Comp: RpsApp, scoreKey: "Rock Paper Scissors" },
];

const cats: ("All" | Cat)[] = ["All", "Arcade", "Puzzle", "Brain", "Word", "Classic"];

export const Games = () => {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<"All" | Cat>("All");
  const scores = useAllScores();

  const list = useMemo(
    () =>
      games.filter(
        (g) =>
          (cat === "All" || g.cat === cat) &&
          (g.name.toLowerCase().includes(q.toLowerCase()) ||
            g.desc.toLowerCase().includes(q.toLowerCase()))
      ),
    [q, cat]
  );

  const best = games.filter((g) => g.scoreKey && typeof scores[g.scoreKey] === "number");

  return (
    <section id="games" className="py-32 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <p className="section-label mb-4">play.now()</p>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-4 max-w-3xl">
          Interactive arcade<span className="text-primary">.</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mb-10">
          {games.length} browser games — play instantly in a popup. Scores stay on your device.
        </p>

        {best.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {best.map((g) => (
              <span
                key={g.name}
                className="font-mono text-[11px] uppercase tracking-wider border border-border px-3 py-1 text-muted-foreground"
              >
                {g.icon} {g.name}{" "}
                <span className="text-primary">
                  {scores[g.scoreKey!]}
                  {g.suffix ?? ""}
                </span>
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search games…"
            aria-label="Search games"
            className="bg-card border border-border px-4 py-2 font-mono text-sm w-full sm:max-w-xs focus:outline-none focus:border-primary"
          />
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`font-mono text-[11px] uppercase tracking-wider px-3 py-2 border transition-colors ${
                  cat === c
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {list.map((g) => {
            const Comp = g.Comp;
            const score = g.scoreKey ? scores[g.scoreKey] : undefined;
            return (
              <AppDialog
                key={g.name}
                label={g.label}
                title={g.name}
                trigger={
                  <button className="bg-background p-6 group hover:bg-card transition-colors flex flex-col text-left w-full h-full">
                    <div className="text-4xl mb-5 group-hover:scale-110 transition-transform origin-left">
                      {g.icon}
                    </div>
                    <h3 className="text-base font-bold group-hover:text-primary transition-colors">
                      {g.name}
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground mt-1">{g.desc}</p>
                    <div className="mt-auto pt-5 flex items-center justify-between w-full">
                      <span className="font-mono text-xs uppercase tracking-wider text-primary">
                        [ play ]
                      </span>
                      {typeof score === "number" && (
                        <span className="font-mono text-[10px] text-muted-foreground">
                          best {score}
                          {g.suffix ?? ""}
                        </span>
                      )}
                    </div>
                  </button>
                }
              >
                <Comp />
              </AppDialog>
            );
          })}
        </div>

        {list.length === 0 && (
          <p className="font-mono text-sm text-muted-foreground mt-8">No games match “{q}”.</p>
        )}
      </div>
    </section>
  );
};
