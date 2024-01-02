export default function Cell({ cell, allcells, setcells }) {
    function handleClick() {
        var newarr = [...allcells];
        for (var i = 0; i < newarr.length; i++) {
            for (var j = 0; j < newarr[0].length; j++) {
                if (newarr[i][j].id == cell.id) {
                    newarr[i][j].alive = !newarr[i][j].alive;
                }
            }
        }
        setcells(newarr);
    }

    return (
        <a
            onClick={handleClick}
            className={`cell ${cell.alive && "selected"}`}
        ></a>
    );
}
