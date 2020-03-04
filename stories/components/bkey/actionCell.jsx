
import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';

export function ActionCell({ style, isAdd, plusMinusItem}) {
    return class extends GridCell {
        render() {
            const { dataItem } = this.props;

            return (
                <td className="k-command-cell">
                    {
                        (isAdd)?<span style={(style.plusColor)? {'color': style.plusColor} : '#00ff00'} className="k-icon k-i-plus VS-Cusrsor-Pointer" onClick={() => plusMinusItem(dataItem, true)} />
                        :<span style={(style.plusColor)? {'color': style.crossColor} : '#00ff00'} className="k-icon k-i-close VS-Cusrsor-Pointer" onClick={() => plusMinusItem(dataItem, false)} />
                    }
                </td>
            ) 
        }
    }
};
