export const DEFAULT_OPTIONS = { "sortable": true, "loadOnce": false };

export const DEFAULT_EXPORT_OPTIONS = { "toExcel": false, "toPDF": false, "allPages": false };

export const DEFAULT_DATA_STATE = {
    "skip": 0,
    "take": 5,
    "sort": [],
    "group": []
};

export const DEFAULT_PAGEABLE = { "buttonCount": 3, "type": "numeric" };

export const DEFAULT_INFINITESCROLL = {
    "infiniteScroll": true
};

export const DEFAULT_STYLE = {
    "height": "400px",
    "width": "400px",
    "plusColor": "#00ff00",
    "crossColor": "#ff0000"
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
export const resetGridOptions = (options) => {
    return { ...DEFAULT_OPTIONS, ...options };
}

// Function to reset pageable with default pageable
export const resetPageable = (options) => {
    return { ...DEFAULT_PAGEABLE, ...options };
}

// Function to reset data state with default data state
export const resetDataState = (options) => {
    return { ...DEFAULT_DATA_STATE, ...options };
}

// Function to reset style with default style
export const resetStyle = (options) => {
    return { ...DEFAULT_STYLE, ...options };
}

export const cloneData = (data) => {
    return JSON.parse(JSON.stringify(data));
}