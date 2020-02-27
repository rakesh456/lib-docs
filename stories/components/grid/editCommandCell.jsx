
import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';

export function EditCommandCell({ primaryKey, edit, remove, add, update, discard, cancel, editField }) {
    return class extends GridCell {
        render() {
            const { dataItem } = this.props;
            const inEdit = dataItem[editField];
            const isNewItem = dataItem['isNew'] === true;
            const isGroupRow = (dataItem['field'] || dataItem['items'])? true : false;

            return (isGroupRow) ? "" : inEdit ? (
                <td className="k-command-cell">
                    <button
                        className="k-button k-primary k-grid-save-command"
                        onClick={() => isNewItem ? add(dataItem) : update(dataItem)}
                    >
                        {isNewItem ? 'Add' : 'Update'}
                    </button>
                    <button
                        className="k-button k-grid-cancel-command"
                        onClick={() => isNewItem ? discard(dataItem) : cancel(dataItem)}
                    >
                        {isNewItem ? 'Discard' : 'Cancel'}
                    </button>
                </td>
            ) : (
                <td className="k-command-cell">
                    <button
                        className="k-primary k-button k-grid-edit-command"
                        onClick={() => edit(dataItem)}
                    >
                        Edit
                    </button>
                    {
                        (dataItem['isNew'] === true)? "" :
                        <button
                            className="k-button k-grid-remove-command"
                            onClick={() => remove(dataItem)
                            }
                        >
                            Remove
                        </button> 
                    }
                </td>
            );
        }
    }
};
