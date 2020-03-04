import React from 'react';
import { isHTML, isUndefinedOrNull } from '../../utils/utils';
import { GridCell } from '@progress/kendo-react-grid';

export function HeaderCell(column) {
    return class HeaderCell extends React.Component {
        render() {
            return (
                <span className="k-link" onClick={this.props.onClick}>
                    <span title={column.title}>{this.props.title}</span>
                    {this.props.children}
                </span>
            );
        }
    }
}

export function TooltipCell(column, showTooltip) {
    return class TooltipCell extends React.Component {
        render() {
            const value = (this.props.dataItem) ? this.props.dataItem[column.field] : "";
            return (
                <td title={(showTooltip === true) ? value : ''}>
                    {(!isUndefinedOrNull(value) || value === false || value === 0)? value.toString() : ''}
                </td>
            );
        }
    }
}

export function EditCustomCell({ htmlElementObject, title }) {

    return class extends GridCell {
        render() {
            const value = (this.props.dataItem && htmlElementObject.field) ? this.props.dataItem[htmlElementObject.field] : "";
            return (
                (value &&
                    isHTML(value.toString())) ?
                    <td><div dangerouslySetInnerHTML={{ __html: value }}></div></td> :
                    <td title={title}>{value}</td>
            );
        }
    }
}
