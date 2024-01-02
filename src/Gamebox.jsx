import { useEffect, useState, useRef } from "react";
import Cellrow from "./Cellrow";
import FrameTicker from "frame-ticker";

export default function Gamebox() {
    const [cells, setcells] = useState([]);
    const [time, settime] = useState(0);
    const [rows, setrows] = useState(10);
    const [fps, setfps] = useState(10);
    var running = useRef(false);

    useEffect(() => {
        if (running.current) {
            setTimeout(() => {
                generation();
                settime(time + 1);
            }, 1000 / fps);
        }
    }, [time]);

    function startAuto() {
        running.current = true;
        settime(time + 1);
    }

    function stopAuto() {
        running.current = false;
    }

    function generation() {
        console.log("gen");
        var nextgen = [];
        var count = 0;

        cells.forEach((row, i) => {
            var newrow = [];
            row.forEach((cell, j) => {
                //check what will happen to cell in next generation
                var neighbors = getNeighbors(cell);
                var alive;
                if (cell.alive) {
                    if (neighbors < 2) {
                        alive = false;
                    } else if (neighbors > 3) {
                        alive = false;
                    } else {
                        alive = true;
                    }
                } else {
                    if (neighbors == 3) {
                        alive = true;
                    }
                }
                newrow.push({ alive: alive, col: j, row: i, id: count });
                count++;
            });
            nextgen.push(newrow);
        });
        setcells(nextgen);
    }

    function getNeighbors(cell) {
        //check all 8 surrounding cells
        var count = 0;

        //check if cell is on edge
        var top = false;
        var right = false;
        var bottom = false;
        var left = false;

        if (cell.row == 0) {
            top = true;
        }
        if (cell.row == rows - 1) {
            bottom = true;
        }
        if (cell.col == 0) {
            left = true;
        }
        if (cell.col == rows - 1) {
            right = true;
        }

        //check surrounding according to edge to avoid error

        if (!top) {
            if (cells[cell.row - 1][cell.col].alive) {
                count++;
            }
        }
        if (!right) {
            if (cells[cell.row][cell.col + 1].alive) {
                count++;
            }
        }

        if (!(top || right)) {
            if (cells[cell.row - 1][cell.col + 1].alive) {
                count++;
            }
        }
        if (!(top || left)) {
            if (cells[cell.row - 1][cell.col - 1].alive) {
                count++;
            }
        }
        if (!left) {
            if (cells[cell.row][cell.col - 1].alive) {
                count++;
            }
        }
        if (!(left || bottom)) {
            if (cells[cell.row + 1][cell.col - 1].alive) {
                count++;
            }
        }
        if (!bottom) {
            if (cells[cell.row + 1][cell.col].alive) {
                count++;
            }
        }
        if (!(bottom || right)) {
            if (cells[cell.row + 1][cell.col + 1].alive) {
                count++;
            }
        }

        return count;
    }

    function clearCells() {
        var cellsarray = [];
        var count = 0;
        for (var i = 0; i < rows; i++) {
            var newrow = [];
            for (var j = 0; j < rows; j++) {
                if (Math.random() > 0.7) {
                    var rand = true;
                } else {
                    var rand = false;
                }
                newrow.push({ alive: rand, col: j, row: i, id: count });
                count++;
            }
            cellsarray.push(newrow);
        }
        setcells(cellsarray);
    }

    useEffect(() => {
        clearCells();
    }, [rows]);

    return (
        <>
            <a
                onClick={clearCells}
                href="#"
                style={{
                    widht: 30,
                    height: 40,
                    backgroundColor: "white",
                    marginRight: 50,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div>Clear</div>
            </a>
            <div className="gamebox">
                {cells.map((row, i) => {
                    return (
                        <Cellrow
                            key={i}
                            cells={row}
                            allcells={cells}
                            setcells={setcells}
                        ></Cellrow>
                    );
                })}
            </div>
            <a
                onClick={generation}
                href="#"
                style={{
                    widht: 30,
                    height: 40,
                    backgroundColor: "white",
                    marginLeft: 50,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div>Generation</div>
            </a>

            <a
                onClick={startAuto}
                href="#"
                style={{
                    position: "absolute",
                    top: 30,
                    left: 500,
                    widht: 30,
                    height: 40,
                    backgroundColor: "white",
                    marginLeft: 50,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div>Start</div>
            </a>
            <a
                onClick={stopAuto}
                href="#"
                style={{
                    position: "absolute",
                    top: 30,
                    left: 600,
                    widht: 30,
                    height: 40,
                    backgroundColor: "white",
                    marginLeft: 50,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div>stop</div>
            </a>
            <input
                type="range"
                style={{ position: "absolute", bottom: 30, left: 300 }}
                onChange={(e) => {
                    setrows(e.target.value);
                }}
                min="1"
                max="150"
                value={rows}
                className="slider"
                id="myRange"
            />
            <input
                type="range"
                style={{ position: "absolute", bottom: 30, left: 600 }}
                onChange={(e) => {
                    setfps(e.target.value);
                }}
                min="1"
                max="150"
                value={fps}
                className="slider"
                id="myRange"
            />
        </>
    );
}
