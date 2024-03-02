import { FaAngleLeft } from "react-icons/fa6";
function Item({ clickHandler, title, item, style }) {
  return (
    <div
      onClick={() => clickHandler(item)}
      style={
        style
          ? { backgroundColor: "rgb(152, 217, 221)", color: "#0ea5e9" }
          : null
      }
    >
      {title}
      <FaAngleLeft />
    </div>
  );
}

export default Item;
