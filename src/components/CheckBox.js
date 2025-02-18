import React, { useState, useCallback, useEffect } from "react";

const CustomCheckbox = (props) => {
    // return checked text list ["open pr", "everything"]
    const [options, setOptions] = useState([]);

    const { name, items, parentCallback } = props;

    const update = useCallback(
        (event) => {
            const target = event.target;
            const value = target.value;
            const checked = target.checked ? 1 : 0;
            if (checked) {
                setOptions((prev) => {
                    return prev.concat(value);
                });
            } else {
                setOptions((prev) =>
                    prev ? prev.filter((i) => i !== value) : []
                );
            }
        },
        [options]
    );

    useEffect(() => {
        parentCallback(options, name);
    }, [options, name, parentCallback]);

    if (typeof items !== "object" || !items) {
        return <div>nothing</div>;
    }

    return (
        <div>
            {items.map((item, index) => (
                <label key={index}>
                    <input type="checkbox" value={item} onClick={update} />
                    {item}
                </label>
            ))}
        </div>
    );
};

export default CustomCheckbox;
