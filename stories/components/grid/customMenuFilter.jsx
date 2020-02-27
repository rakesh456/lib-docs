import React from 'react';
import {
    GridColumnMenuFilter
} from '@progress/kendo-react-grid';
import {
    Input
} from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';

import { DEFAULT_FILTER_OPERATORS } from '../../utils/gridutils'

export class ColumnMenuMultiValueFilter extends React.Component {
    render() {
        return (
            <div>
                <GridColumnMenuFilter {...this.props} expanded={true}/>
            </div>
        );
    }
}

export function customSearchFilter(data, defaultItem) {
    return class extends React.Component {
        render() {
            return (
                <div className="k-filtercell">
                    <DropDownList
                        data={data}
                        onChange={this.onChange}
                        value={this.props.value || defaultItem}
                        defaultItem={defaultItem}
                    />
                    <button
                        className="k-button k-button-icon k-clear-button-visible"
                        title="Clear"
                        disabled={!this.hasValue(this.props.value)}
                        onClick={this.onClearButtonClick}
                    >
                        <span className="k-icon k-i-filter-clear" />
                    </button>
                </div>
            );
        }

        hasValue = value => Boolean(value && value !== defaultItem);

        onChange = event => {
            const hasValue = this.hasValue(event.target.value);
            this.props.onChange({
                value: hasValue ? event.target.value : '',
                operator: hasValue ? 'eq' : '',
                syntheticEvent: event.syntheticEvent
            });
        }

        onClearButtonClick = event => {
            event.preventDefault();
            this.props.onChange({
                value: '',
                operator: '',
                syntheticEvent: event
            });
        }
    };
}

export class ColumnMenuFilter extends React.Component {
    constructor(props) {
        super(props);

        let filterValue = "";
        let filterType = "text";
        let filterOperators = DEFAULT_FILTER_OPERATORS[filterType];
        let searchValue = "";
        let field = "";
        let filters = (this.props.filter && this.props.filter.filters)? this.props.filter.filters : [];
        
        if(this.props && this.props.column){
            filterType = (this.props.column.filter)? this.props.column.filter : filterType;
            field = this.props.column.field;
            filterOperators = DEFAULT_FILTER_OPERATORS[filterType];
        }

        if(filters && filters.length > 0){
            let filterObj = filters.find(x => x.field === field);

            if(filterObj){
                filterValue = filterObj.operator;
                searchValue = filterObj.value;
            }
        }

        this.state = {
            filterValue: filterValue,
            searchValue: searchValue,
            field: (this.props.column && this.props.column.field)? this.props.column.field : field,
            filterType: filterType,
            filterOperators: filterOperators
        };

    }

    setSearchValue = (e) => {
        this.setState({
            searchValue: e.value
        });
    }

    onClick = (event, value) => {
        this.setState({
            filterValue: value
        });
    }

    onClearButtonClick = (event) =>{
        this.props.onFilterChange(null);
        this.props.onCloseMenu(null);
    }

    onFilterButtonClick = (event) =>{
        
        // this.props.onFilterChange({filterValue: this.state.filterValue, searchValue : this.state.searchValue, field :this.state.field});
        this.props.onFilterChange({field: this.state.field, operator: this.state.filterValue, value: this.state.searchValue});
        this.props.onCloseMenu(event);
        // this.props.customeFilterChange(false, this.props.field, this.state.filterValue, this.state.searchValue);
    }

    renderOperator(item, index) {
        const { filterValue } = this.state;
        return (
            <span key={'operator'+index} className={`${(filterValue === item.operator)? 'VS-FilterItemSelected' : ''}`} onClick={(e) => this.onClick(e, item.operator)}>{item.displayText}</span>
        )
    }

    render() {
        const { filterValue, searchValue, filterOperators } = this.state;

        return (
            <div className="VS-FilterWrapper">
                <div className="col-xs-12">
                    <Input className="VS-GlobalSearch" type="text" placeholder="Search" value={searchValue} onChange={(e) => this.setSearchValue(e) } />
                </div>

                {
                    filterOperators.map((item, index) => this.renderOperator(item, index))
                }

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <p>
                        <button className="k-button VS-FilterClearButton " onClick={(e) => this.onClearButtonClick(e)}>Clear</button>
                        <button className={"k-button k-primary VS-FilterButton " + ((!filterValue || !searchValue)? 'k-state-disabled' : '')} onClick={(e) => this.onFilterButtonClick(e)}>Filter</button>
                    </p>
                </div>
            </div>
        );
    }
}