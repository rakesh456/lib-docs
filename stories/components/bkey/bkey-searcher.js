import React from 'react';
import axios from 'axios';
import '../../App.css';
import { filterBy } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import { process } from '@progress/kendo-data-query';
import './bKeySearcher.scss';
import { ActionCell } from './actionCell.jsx';
import { resetGridOptions, resetDataState, resetPageable, resetStyle, cloneData } from '../../utils/bkeyutils'
import { isUndefinedOrNull, isEmpty } from '../../utils/utils';
import { DataLoader } from '../grid/data-loader.jsx';

class BkeySearcher extends React.Component {
    PlusCell;
    MinusCell;

    constructor(props) {
        super(props);
        let { options } = this.props;

        let { dataState, otherGridOptions, filterable, pageable, style, dataUrl, showColumns, primaryKey } = options;

        let newOtherOptions = (isUndefinedOrNull(otherGridOptions)) ? resetGridOptions({}) : resetGridOptions(otherGridOptions);
        let newDataState = (isUndefinedOrNull(dataState)) ? resetDataState({}) : resetDataState(dataState);
        let newPageable = (isUndefinedOrNull(pageable)) ? resetPageable({}) : resetPageable(pageable);
        let newStyle = (isUndefinedOrNull(style)) ? resetStyle({}) : resetStyle(style);

        this.state = {
            showBelowGrid: true,
            otherGridOptions: newOtherOptions,
            loadOnce: (newOtherOptions.loadOnce === true),
            pageable: cloneData(newPageable),
            filterPageable: cloneData(newPageable),
            style: newStyle,
            showColumns: showColumns,
            dataState: cloneData(newDataState),
            filterDataState: cloneData(newDataState),
            defaultDataState: { ...newDataState },
            data: "",
            masterData: [],
            filteredResult: [],
            filterList: [],
            dataUrl: dataUrl,
            dataResult: [],
            dataProducts: [],
            defaultDataResult: [],
            defaultDataProducts: [],
            primaryKey: primaryKey,
            filterable: (filterable === false) ? false : true,
            filter: {
                logic: "and",
                filters: [
                ]
            }
        };

        this.PlusCell = ActionCell({
            style: newStyle,
            isAdd: true,
            plusMinusItem: this.plusMinusItem
        });

        this.MinusCell = ActionCell({
            style: newStyle,
            isAdd: false,
            plusMinusItem: this.plusMinusItem
        });
    }

    // Component lifecycle methods started
    componentDidMount() {
    }

    // Component lifecycle methods end

    getSelectedValues() {
        const { filterList } = this.state;
        return (filterList)? filterList : [];
    }

    getRequest = (url, callback) => {
        axios.get(url)
            .then((response) => {
                callback(null, response);
            })
            .catch((error) => {
                callback(error, null);
            });
    }

    displayTheError = (error) => {
        this.setGridData({}, {});
    }

    getDataByShowColumns = (data, showColumns, callback) => {
        if(data){
            callback(data);
        }

        let result = [];

        data.forEach((item) => {
            let newObj = {};
            for(let key in item){
                const found = showColumns.some(el => el.field === key);
                if(found){
                    newObj[key] = item[key];
                }
            }
            
            result.push(newObj);
        });
        callback(result);
    }

    dataRecieved = (data) => {
        let { loadOnce, dataState, defaultDataState, showColumns } = this.state;

        this.getDataByShowColumns(data.data, showColumns, (results) => {
            this.setGridData((loadOnce === false) ? { data: (process(results, defaultDataState)).data, total: data.total } : { data: results, total: data.total }, (process(results, dataState)));
    
            this.setDefaultList();
        });
    }

    setDefaultList = (currentDataResult, currentDataProducts) => {
        let { dataResult, dataProducts } = this.state;
        let newDataResult = (currentDataResult) ? cloneData(currentDataResult) : cloneData(dataResult);
        let newDataProducts = (currentDataProducts) ? cloneData(currentDataProducts) : cloneData(dataProducts);

        setTimeout(() => {
            this.setState({
                defaultDataResult: cloneData(newDataResult),
                defaultDataProducts: cloneData(newDataProducts)
            });
        }, 10);
    }

    setGridData = (dataResult, secondData) => {
        let { loadOnce } = this.state;

        if (isEmpty(dataResult)) {
            this.setState({
                ...this.state,
                dataProducts: { data: [], total: 0 },
                dataResult: { data: [], total: 0 }
            });
        } else {

            if (loadOnce === true) {
                this.setState({
                    ...this.state,
                    dataProducts: { ...secondData, total: dataResult.total },
                    dataResult: { ...dataResult, total: dataResult.total }
                });
            } else {
                this.setState({
                    ...this.state,
                    dataResult: { ...dataResult, total: dataResult.total }
                });
            }
        }
    }

    toggleBelowGrid = () => {
        this.setState({ showBelowGrid: !this.state.showBelowGrid });
    }

    plusMinusItem = (item, isAdd) => {
        const { filterList, primaryKey } = this.state;

        if (isAdd) {
            let result = filterList.filter((obj) => {
                return obj[primaryKey] === item[primaryKey]
            });

            if (!result || result.length <= 0) {
                let _items = [...filterList];
                _items.push(item);

                this.props.onAddItem(item);
                this.setState({ filterList: _items });
            }
            
        } else {
            let newFilterList = filterList.filter((obj) => {
                return obj[primaryKey] !== item[primaryKey];
            });
            
            this.props.onRemoveItem(item);

            this.setState({ filterList: newFilterList });
        }
    }

    dataStateChange = (e) => {
        const { loadOnce, defaultDataResult } = this.state;

        if(loadOnce === true){
            this.setState({
                ...this.state,
                dataState: { ...e.data },
                dataProducts: (process(defaultDataResult.data, e.data)),
                dataResult: { data: (process(defaultDataResult.data, e.data)).data, total: defaultDataResult.total }
            });
        } else {
            this.setState({
                ...this.state,
                dataState: { ...e.data },
                dataResult: { data: (process(defaultDataResult.data, e.data)).data, total: defaultDataResult.total }
            });
        }
    }

    filterDataStateChange = (e) => {
        const { filterList } = this.state;

        this.setState({
            ...this.state,
            filterDataState: { ...e.data },
            filteredResult: { data: (process(filterList, e.data)).data, total: filterList.total }
        });
    }

    refresh() {
        const dataState = this.props.options.dataState
        if (this.state.filteredResult.data !== undefined) {
            this.state.filteredResult.data.forEach((eachObj) => {
                this.state.data.push(eachObj)
            })
        }

        this.setState({
            showBelowGrid: false,
            data: this.state.data,
            dataState: dataState,
            filteredResult: [],
            filterList: []
        })
    }

    renderGridColumn(column, index) {
        return (
            <GridColumn key={index} field={column.field} width={column.width} title={column.title} filter={column.filter} data={column.data} selectable={index === 0} />
        )
    }

    render() {
        const { otherGridOptions, loadOnce, pageable, style, filterable, showColumns, dataState, dataProducts, dataResult, showBelowGrid, dataUrl, filterList } = this.state;

        return (
            <div className="VS-shape-rounded-fill VS-modal VS-Bkey-Searcher">
                <div>
                    <Grid
                        data={filterBy(filterList, this.state.filter)}
                        filterable
                        filter={this.state.filter}
                        onFilterChange={(e) => {
                            this.setState({
                                filter: e.filter
                            });
                        }}
                        style={style}
                    >
                        {
                            showColumns.map((column, index) => this.renderGridColumn(column, index))
                        }
                        {
                            <GridColumn cell={this.MinusCell} width="80px" filterable={false} />
                        }
                    </Grid>
                    <div className="VS-SelectedDiv" onClick={this.toggleBelowGrid} style={{ height: 30 + 'px', width: style.width }}>{filterList.length} Selected</div>
                    {

                        (showBelowGrid === true) ?
                            <div>
                                <Grid
                                    data={(loadOnce === true) ? dataProducts : dataResult}
                                    {...dataState}
                                    onDataStateChange={e => this.dataStateChange(e)}
                                    filterable={filterable}
                                    pageable={pageable}
                                    onPageChange={this.pageChange}
                                    style={style}
                                >
                                    {
                                        showColumns.map((column, index) => this.renderGridColumn(column, index))
                                    }
                                    {
                                        <GridColumn cell={this.PlusCell} width="80px" filterable={false} />
                                    }
                                </Grid>
                                <DataLoader
                                    dataState={dataState}
                                    onDataRecieved={this.dataRecieved}
                                    displayTheError={this.displayTheError}
                                    options={this.props.options}
                                    dataUrl={dataUrl}
                                    loadOnce={otherGridOptions.loadOnce}
                                />
                            </div> : ''
                    }
                </div>
            </div>
        );
    }
}

export default BkeySearcher;