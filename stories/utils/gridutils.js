export const DEFAULT_COLUMNS_OPTIONS = { "reorderable": false, "resizable": false, "groupable": false, "lockedColumns":[] };

export const DEFAULT_ROWS_OPTIONS = { "rowInEditMode": false,  "allowNewRow": false, "selectedRowPrimaryKey": -1 };

export const DEFAULT_GROUPING_OPTIONS = { "expandField": true, "defaultColumns": [] };

export const DEFAULT_FILTER_OPTIONS = { "filterable": false, "filterMode": "menu", "multiValue": false };

export const DEFAULT_EXPORT_OPTIONS = { "toExcel": false, "toPDF": false, "allPages": false };

export const DEFAULT_DATA_STATE = {
    "skip": 0,
    "take": 10,
    "sort": [],
    "group": []
};
export const DEFAULT_CELL_OPTIONS = {"showToolTip": false}

export const DEFAULT_PAGEABLE = null

export const DEFAULT_INFINITESCROLL = {
    "infiniteScroll": true
};

export const DEFAULT_EDITING_OPTIONS = {
    "allEditable": false,
    "externalForm": false
};

export const DEFAULT_SORTABLE = {
    "allowed": false, "mode": "multiple", "allowUnsort": true
};

export const DEFAULT_STYLE = {
    "gridStyle": {"height": "700px"},
    "customizedRow": null,
    "stripedPattern": true
};

export const DEFAULT_FILTER_OPERATORS = {
    'text': [
        { text: 'grid.filterContainsOperator', operator: 'contains', displayText: 'Contains' },
        { text: 'grid.filterNotContainsOperator', operator: 'doesnotcontain', displayText: 'Does not contain' },
        { text: 'grid.filterEqOperator', operator: 'eq', displayText: 'Is equal to' },
        { text: 'grid.filterNotEqOperator', operator: 'neq', displayText: 'Is not equal to' },
        { text: 'grid.filterStartsWithOperator', operator: 'startswith', displayText: 'Starts with' },
        { text: 'grid.filterEndsWithOperator', operator: 'endswith', displayText: 'Ends with' },
        { text: 'grid.filterIsNullOperator', operator: 'isnull', displayText: 'Is null' },
        { text: 'grid.filterIsNotNullOperator', operator: 'isnotnull', displayText: 'Is not null' },
        { text: 'grid.filterIsEmptyOperator', operator: 'isempty', displayText: 'Is empty' },
        { text: 'grid.filterIsNotEmptyOperator', operator: 'isnotempty', displayText: 'Is not empty' }
    ],
    'numeric': [
        { text: 'grid.filterEqOperator', operator: 'eq', displayText: 'Is equal to' },
        { text: 'grid.filterNotEqOperator', operator: 'neq', displayText: 'Is not equal to' },
        { text: 'grid.filterGteOperator', operator: 'gte', displayText: 'Is greater than or equal to' },
        { text: 'grid.filterGtOperator', operator: 'gt', displayText: 'Is greater than' },
        { text: 'grid.filterLteOperator', operator: 'lte', displayText: 'Is less than or equal to' },
        { text: 'grid.filterLtOperator', operator: 'lt', displayText: 'Is less than' },
        { text: 'grid.filterIsNullOperator', operator: 'isnull', displayText: 'Is null' },
        { text: 'grid.filterIsNotNullOperator', operator: 'isnotnull', displayText: 'Is not null' }
    ],
    'date': [
        { text: 'grid.filterEqOperator', operator: 'eq', displayText: 'Is equal to' },
        { text: 'grid.filterNotEqOperator', operator: 'neq', displayText: 'Is not equal to' },
        { text: 'grid.filterAfterOrEqualOperator', operator: 'gte', displayText: 'Is greater than or equal to' },
        { text: 'grid.filterAfterOperator', operator: 'gt', displayText: 'Is greater than' },
        { text: 'grid.filterBeforeOperator', operator: 'lt', displayText: 'Is less than' },
        { text: 'grid.filterBeforeOrEqualOperator', operator: 'lte', displayText: 'Is less than or equal to' },
        { text: 'grid.filterIsNullOperator', operator: 'isnull', displayText: 'Is null' },
        { text: 'grid.filterIsNotNullOperator', operator: 'isnotnull', displayText: 'Is not null' }
    ],
    'boolean': [
        { text: 'grid.filterEqOperator', operator: 'eq', displayText: 'Is equal to' }
    ]
};

export const SHOW_MODES = ["All", "UnSelected", "Selected"];

export const isShowModeAll = (mode) => {
    return mode === 'All'
}

export const isShowModeSelected = (mode) => {
    return mode === 'Selected'
}

export const isShowModeUnselected = (mode) => {
    return mode === 'UnSelected'
}

// Function to reset options with default options
export const resetColumnsOptions = (options) => {
    return { ...DEFAULT_COLUMNS_OPTIONS, ...options };
}

// Function to reset options with default options
export const resetRowsOptions = (options) => {
    return { ...DEFAULT_ROWS_OPTIONS, ...options };
}

// Function to reset options with default options
export const resetGroupingOptions = (options) => {
    return { ...DEFAULT_GROUPING_OPTIONS, ...options };
}

export const resetCellOptions = (options) => {
    return { ...DEFAULT_CELL_OPTIONS, ...options };
}

// Function to reset options with default editing options
export const resetEditingOptions = (options) => {
    return { ...DEFAULT_EDITING_OPTIONS, ...options };
}

// Function to reset filter options with default options
export const resetFilterOptions = (options) => {
    return { ...DEFAULT_FILTER_OPTIONS, ...options };
}

// Function to reset export options with default options
export const resetExportOptions = (options) => {
    return { ...DEFAULT_EXPORT_OPTIONS, ...options };
}

// Function to reset data state with default data state
export const resetDataState = (options) => {
    return { ...DEFAULT_DATA_STATE, ...options };
}

// Function to reset pageable with default pageable
export const resetPageable = (options) => {
    return { ...DEFAULT_PAGEABLE, ...options };
}

// Function to reset sortable with default pageable
export const resetSortable = (options) => {
    return { ...DEFAULT_SORTABLE, ...options };
}

// Function to reset style with default style
export const resetStyle = (options) => {
    return { ...DEFAULT_STYLE, ...options };
}

export const cloneData = (data) => {
    return JSON.parse(JSON.stringify(data));
}

export const getShowFromColumn = (columns) => {
    return (columns && columns.show)? columns.show : [];
}

export const reSetColumns = (columns, newShow) => {
    let newColumns = cloneData(columns);
    if(newShow && newShow.length > 0){
        newColumns['show'] = newShow;
    }
    return {...newColumns};
}