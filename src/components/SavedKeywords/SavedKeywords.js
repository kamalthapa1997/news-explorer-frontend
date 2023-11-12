import React from "react";

const SavedKeywords = ({ items }) => {
  const MAX_VISIBLE_ITEMS = 2;

  if (items.length === 0) {
    return (
      <p className="newscards__keywords">
        By keywords:{" "}
        <span className="newscards__keyword">No items to display</span>
      </p>
    );
  }

  const uniqueItemsSet = new Set(items);
  const uniqueItems = Array.from(uniqueItemsSet);

  if (uniqueItems.length <= MAX_VISIBLE_ITEMS) {
    return (
      <p className="newscards__keywords">
        By keywords:{" "}
        <span className="newscards__keyword">{uniqueItems.join(" and ")}</span>
      </p>
    );
  } else {
    const firstTwoItems = uniqueItems.slice(0, MAX_VISIBLE_ITEMS);
    const othersCount = uniqueItems.length - MAX_VISIBLE_ITEMS;
    return (
      <p className="newscards__keywords">
        By keywords:{" "}
        <span className="newscards__keyword">
          {firstTwoItems.join(" , ")} and {othersCount} other
          {othersCount > 1 ? "s" : ""}
        </span>
      </p>
    );
  }
};

export default SavedKeywords;
