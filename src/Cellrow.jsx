import Cell from "./Cellbox";

export default function Cellrow({ cells, allcells, setcells }) {
    return (
        <div className={"cellrow"}>
            {cells.map((cell, i) => {
                return (
                    <Cell
                        key={i}
                        cell={cell}
                        allcells={allcells}
                        setcells={setcells}
                    ></Cell>
                );
            })}
        </div>
    );
}
