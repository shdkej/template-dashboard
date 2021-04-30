import React, { useState, useMemo } from "react";

const Filter = (props) => {
    const { name, data } = props;
    const { items, requestSort } = useSortableData(data);
    return (
        <div>
            <h3>{name}</h3>
            {items
                ? items.map((item, index) => <p key={index}>{item.Tag}</p>)
                : items}
            <button onClick={() => requestSort("UpdatedAt")}>sort</button>
        </div>
    );
};

export const useSortableData = (options, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = useMemo(() => {
        let sortedOptions = [...options];
        if (sortConfig !== null) {
            sortedOptions.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortedOptions;
    }, [options, sortConfig]);

    const requestSort = (key) => {
        let direction = "ascending";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "ascending"
        ) {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort };
};

export default Filter;
