
import React from 'react';
import {
    GridColumnMenuFilter, GridColumnMenuItemGroup, GridColumnMenuItem, GridColumnMenuItemContent
} from '@progress/kendo-react-grid';
// import { ColumnMenuFilter, ColumnMenuMultiValueFilter } from './customMenuFilter.jsx';
import {
    Input
} from '@progress/kendo-react-inputs';
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

export class CustomColumnMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allColumns: this.props.allColumns,
            isMultiValueFilter: this.props.isMultiValueFilter,
            columnsExpanded: false,
            filterExpanded: false
        };
    }

    onToggleColumn = (id) => {
        this.setState({
            allColumns: this.state.allColumns.map((column, idx) => {
                return idx === id ? { ...column, show: !column.show } : column;
            })
        });
    }

    onReset = (event) => {
        event.preventDefault();
        // const allColumns = this.props.allColumns.map(col => {
        //     return {
        //         ...col,
        //         show: true
        //     };
        // });

        // this.setState({ allColumns: allColumns }, () => this.onSubmit());

        this.props.onResetColumnDisplay();
        if (this.props.onCloseMenu) {
            this.props.onCloseMenu();
        }
    }

    onSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        this.props.onColumnsSubmit(this.state.allColumns);
        if (this.props.onCloseMenu) {
            this.props.onCloseMenu();
        }
    }

    onMenuItemClick = () => {
        const value = !this.state.columnsExpanded;
        this.setState({
            columnsExpanded: value,
            filterExpanded: value ? false : this.state.filterExpanded
        });
    }

    onFilterExpandChange = () => {
        const value = !this.state.filterExpanded;
        this.setState({
            filterExpanded: value,
            columnsExpanded: value ? false : this.state.columnsExpanded
        });
    }

    renderColumnMenuMultiValueFilter() {
		return (
			<ColumnMenuMultiValueFilter {...this.props}  />
		);
	}

	renderColumnMenuFilter() {
		return (
			<ColumnMenuFilter {...this.props} />
		);
    }
    
    filterUI = () => {
        return (
             ((this.state.isMultiValueFilter === true)? this.renderColumnMenuMultiValueFilter() :  this.renderColumnMenuFilter())
        )
    }

    render() {
        const oneVisibleColumn = this.state.allColumns.filter(c => c.show).length === 1;
        
        return (
            <div>
                {/* <GridColumnMenuFilter
                    {...this.props}
                    filterUI ={this.filterUI}
                /> */}
                <div className="VS-CustomFilterDiv" onClick={this.onFilterExpandChange}>
                    <span className="k-icon k-i-filter-sm" /> Filter
                </div>
                {(this.state.filterExpanded === true)? this.filterUI() : ""}
                <GridColumnMenuItemGroup>
                    <GridColumnMenuItem
                        title={'Columns'}
                        iconClass={'k-i-columns'}
                        onClick={this.onMenuItemClick}
                    />
                    <GridColumnMenuItemContent show={this.state.columnsExpanded}>
                        <div className={'k-column-list-wrapper'}>
                            <form onSubmit={this.onSubmit} onReset={this.onReset}>
                                <div className={'k-column-list'}>
                                    {this.state.allColumns.map((column, idx) =>
                                        (
                                            <div key={idx} className={'k-column-list-item'}>
                                                <span>
                                                    <input
                                                        id={`column-visiblity-show-${idx}`}
                                                        className="k-checkbox"
                                                        type="checkbox"
                                                        readOnly={true}
                                                        disabled={column.show && oneVisibleColumn}
                                                        checked={column.show}
                                                        onClick={() => { this.onToggleColumn(idx); }}
                                                    />
                                                    <label
                                                        htmlFor={`column-visiblity-show-${idx}`}
                                                        className="k-checkbox-label"
                                                        style={{ userSelect: 'none' }}
                                                    >
                                                        {column.title}
                                                    </label>
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className={'k-columnmenu-actions'}>
                                    <button type={'reset'} className={'k-button'}>Reset</button>
                                    <button className={'k-button k-primary'}>Save</button>
                                </div>
                            </form>
                        </div>
                    </GridColumnMenuItemContent>
                </GridColumnMenuItemGroup>
            </div>
        );
    }
}

