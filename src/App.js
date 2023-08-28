import "./styles.css";
import { usStates } from "./countries.js";
import { useEffect, useState, useRef } from "react";

export default function App() {
  const dropRef = useRef(null);
  const [selectedstate, setSelectedState] = useState([]);
  const [isDisplay, setIsDisplay] = useState(false);
  const [abv, setabv] = useState(
    usStates.reduce((acc, curr) => ({ ...acc, [curr.code]: false }), {})
  );
  console.log(selectedstate);
  const handleSelected = (e) => {
    selectedstate.includes(e.target.value)
      ? setSelectedState(
          selectedstate.filter((state) => state !== e.target.value)
        )
      : setSelectedState([...selectedstate, e.target.value]);
  };

  useEffect(() => {
    const onClick = (e) => {
      if (e.target !== dropRef.current) {
        console.log(e.target.value);
        setIsDisplay(false);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div>
      {selectedstate.length > 0 && (
        <h1 style={{ color: "red" }}>
          The selected states are {`${selectedstate}`}
        </h1>
      )}
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDisplay((prev) => !prev);
          }}
          className="drop-down"
        >
          {selectedstate.length > 0
            ? `${selectedstate.length} states`
            : "---select state--"}
        </button>
        {isDisplay && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="panel"
            ref={dropRef}
          >
            {usStates.map((state) => (
              <div
                key={state.name}
                className={
                  selectedstate.includes(state.name) ? `panel__input` : ""
                }
              >
                <input
                  onChange={handleSelected}
                  id={state.code}
                  type="checkbox"
                  value={state.name}
                />
                <label htmlFor={state.code}>{state.name}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
