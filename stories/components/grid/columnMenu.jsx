import React from 'react';
import {
    GridColumnMenuSort,
    GridColumnMenuFilter,
    GridColumnMenuCheckboxFilter
} from '@progress/kendo-react-grid';

import {
    Input
} from '@progress/kendo-react-inputs';


export class ColumnMenu extends React.Component {
    constructor(props) {
        super(props);

        let filterValue = "";
        let searchValue = "";
        if(this.props.field && this.props.filters){
            let filterField = this.props.filters.map((item) => {
                return item;
            });
            if(filterField && filterField.length > 0){
                filterValue = filterField[0].operator;
                searchValue = filterField[0].value;
            }
        }

        this.state = {
            filterValue: filterValue,
            searchValue: searchValue
        };
    }
    
    onClick = (event, value) => {
        this.setState({
            filterValue: value
        });
        
        // firstFilterProps.onChange({
        //     value,
        //     operator: 'eq',
        //     syntheticEvent: event.syntheticEvent
        // });
    }

    onClearButtonClick = () =>{
        this.props.customeFilterChange(true);
        this.props.onCloseMenu();
    }
    
    onFilterButtonClick = () =>{
        this.props.customeFilterChange(false, this.props.field, this.state.filterValue, this.state.searchValue);
        this.props.onCloseMenu();
    }

    setSearchValue = (e) => {
        this.setState({
            searchValue: e.value
        });
    }

    filterUI = () => {
        return (
            <div className="VS-FilterButtons">
                <input className="VS-GlobalSearch" type="text" placeholder="Search" />
                <button onClick={(e) => this.onClick(e, 'contains')}>Contains</button>
                <button onClick={(e) => this.onClick(e, 'in')}>In</button>
                <button onClick={(e) => this.onClick(e, 'notcontains')}>Does not contain</button>
                <button onClick={(e) => this.onClick(e, 'equal')}>Is equal to</button>
                <button onClick={(e) => this.onClick(e, 'notequal')}>Is not equal to</button>
                <button onClick={(e) => this.onClick(e, 'startswith')}>Starts with</button>
                <button onClick={(e) => this.onClick(e, 'endswith')}>Ends with</button>
                <button onClick={(e) => this.onClick(e, 'isnull')}>Is null</button>
                <button onClick={(e) => this.onClick(e, 'isnotnull')}>Is not null</button>
                <button onClick={(e) => this.onClick(e, 'isempty')}>Is empty</button>
                <button onClick={(e) => this.onClick(e, 'isnotempty')}>Is not empty</button>
            </div>
        )
    }

    render() {
        const { filterValue, searchValue } = this.state;

        return (
            <div className="VS-FilterButtons">
                <div className="col-xs-12">
                    <Input className="VS-GlobalSearch" type="text" placeholder="Search" value={searchValue} onChange={(e) => this.setSearchValue(e) } />
                </div>
                <button className={`${(filterValue === 'contains')? 'k-button k-primary' : 'k-button'}`} onClick={(e) => this.onClick(e, 'contains')}>Contains</button>
                <button className={`${(filterValue === 'in')? 'k-button k-primary' : 'k-button'}`} onClick={(e) => this.onClick(e, 'in')}>In</button>
                <button className={`${(filterValue === 'notcontains')? 'k-button k-primary' : 'k-button'}`} onClick={(e) => this.onClick(e, 'notcontains')}>Does not contain</button>
                <button className={`${(filterValue === 'equal')? 'k-button k-primary' : 'k-button'}`} onClick={(e) => this.onClick(e, 'equal')}>Is equal to</button>
                <button className={`${(filterValue === 'notequal')? 'k-button k-primary' : 'k-button'}`} onClick={(e) => this.onClick(e, 'notequal')}>Is not equal to</button>
                <button className={`${(filterValue === 'startswith')? 'k-button k-primary' : 'k-button'}`} onClick={(e) => this.onClick(e, 'startswith')}>Starts with</button>
                <button className={`${(filterValue === 'endswith')? 'k-button k-primary' : 'k-button'}`} onClick={(e) => this.onClick(e, 'endswith')}>Ends with</button>
                <button className={`${(filterValue === 'isnull')? 'k-button k-primary' : 'k-button'}`} onClick={(e) => this.onClick(e, 'isnull')}>Is null</button>
                <button className={`${(filterValue === 'isnotnull')? 'k-button k-primary' : 'k-button'}`} onClick={(e) => this.onClick(e, 'isnotnull')}>Is not null</button>
                <button className={`${(filterValue === 'isempty')? 'k-button k-primary' : 'k-button'}`} onClick={(e) => this.onClick(e, 'isempty')}>Is empty</button>
                <button className={`${(filterValue === 'isnotempty')? 'k-button k-primary' : 'k-button'}`} onClick={(e) => this.onClick(e, 'isnotempty')}>Is not empty</button>

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <p>
                        <button className="k-button" onClick={(e) => this.onClearButtonClick(e)}>Clear</button>
                        <button className="k-button k-primary" onClick={(e) => this.onFilterButtonClick(e)}>Filter</button>
                    </p>
                </div>
            </div>
        );
    }
}