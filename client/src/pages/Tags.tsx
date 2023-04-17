import React from "react";

const Tags = ({ items, isLoading, onTagClick, setSelectedTag, setReset }) => {
  return (
    <div>

    <ul>
      {items.map((tag, i) => {
        return (
          <div key={i}>
            <li>
              <div onClick={() => onTagClick(tag)}>{tag}</div>
            </li>
            
          </div>
        );
      })}
    </ul>
    <button onClick={() => {
  setSelectedTag(null);
  setReset(true);
}}>Reset tags</button>

      </div>
  );
};

export default Tags;
