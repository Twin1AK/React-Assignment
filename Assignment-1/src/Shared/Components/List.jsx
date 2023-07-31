import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';

const ListComponent = (props) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const height = 300;
    const width = 500;

    const handleItemClick = (item) => {
        console.log(item, "I am clickec")
        setSelectedItem(item);
        if (props.view === 'address') {
            //handle address click
            props.handleDropdownAddress(item);
        }
        else if (props.view === 'chain') {
            //handle chain item click
            props.handleDropdownChange(item);
        }
    };
    const renderRow = ({ index, style }) => {
        const item = props.data[index];
        return (
            <div style={style}>
                <Dropdown.Item onClick={() => handleItemClick(item)}>
                    {item}
                </Dropdown.Item>
            </div>
        );
    };

    return (
        <AutoSizer style={{ height, width }}>
            {({ height, width }) => (
                <Dropdown>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        {selectedItem || 'Select an item'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <List
                            height={height}
                            itemCount={props.data.length}
                            itemSize={30}
                            width={width}
                        >
                            {renderRow}
                        </List>
                    </Dropdown.Menu>
                </Dropdown>
            )}
        </AutoSizer>
    );
}

export default ListComponent;
