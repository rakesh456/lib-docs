import React from 'react';
import { Grid, GridColumn, GridDetailRow, GridToolbar } from '@progress/kendo-react-grid';
// import { CustomFilterUI } from './customFilterUI';
import { ColumnMenu } from './columnMenu.jsx';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { GridPDFExport } from '@progress/kendo-react-pdf';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { IntlProvider, load, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import likelySubtags from '../../utils/supplemental/likelySubtags.json';
import currencyData from '../../utils/supplemental/currencyData.json';
import weekData from '../../utils/supplemental/weekData.json';
import numbers from '../../utils/es-AR/numbers.json';
import currencies from '../../utils/es-AR/currencies.json';
import caGregorian from '../../utils/es/ca-gregorian.json';
import dateFields from '../../utils/es/dateFields.json';
import timeZoneNames from '../../utils/es/timeZoneNames.json';
import '@progress/kendo-theme-default/dist/all.css';
import orders from './../orders.json';
import esMessages from './../es.json';
import { process } from '@progress/kendo-data-query';
import { locales, isEmpty, isUndefinedOrNull, formatter } from '../../utils/utils'
import { resetGridOptions, resetDataState, resetPageable, resetStyle, DEFAULT_FILTER_OPERATORS } from '../../utils/gridutils'
loadMessages(esMessages, 'es-ES');
load(
	likelySubtags,
	currencyData,
	weekData,
	numbers,
	currencies,
	caGregorian,
	dateFields,
	timeZoneNames
);
orders.forEach(o => {
	o.orderDate = new Date(o.orderDate);
	o.shippedDate = o.shippedDate === 'NULL' ? undefined : new Date(o.shippedDate);
});

class DetailComponent extends GridDetailRow {
	// renderdetailedColumn=(column, Index)=>{
	//   return(
	//     <p><strong>Street:</strong> {dataItem.shipAddress.street}</p>
	//   )
	// }
	render() {
		const dataItem = this.props.dataItem;
		return (
			<div>
				<Grid style={{ width: "500px" }} data={dataItem.details}></Grid>
			</div>
		);
	}
}

class FxGrid extends React.Component {
	init = {};
	constructor(props) {
		super(props);
		let { options } = this.props;

		let { dataState, otherGridOptions, pageable, style, aggregates, dataUrl, showColumns } = options;
		let newDataState = (isUndefinedOrNull(dataState)) ? resetDataState({}) : resetDataState(dataState);
		let newOtherOptions = (isUndefinedOrNull(otherGridOptions)) ? resetGridOptions({}) : resetGridOptions(otherGridOptions);
		let newPageable = (isUndefinedOrNull(pageable)) ? resetPageable({}) : resetPageable(pageable);
		let newStyle = (isUndefinedOrNull(style)) ? resetStyle({}) : resetStyle(style);

		this.state = {
			dataUrl: dataUrl,
			dataResult: process(orders, newDataState),
			dataState: newDataState,
			otherGridOptions: newOtherOptions,
			pageable: newPageable,
			style: newStyle,
			currentLocale: locales[0],
			aggregates: (aggregates) ? aggregates : [],
			filter: {
				logic: "and",
				filters: [
				]
			},
			totalRecords: 0,
			showColumns: showColumns
		};
	}

	// Component lifecycle methods started
	componentDidMount() {
		// this.updateGridList({}, this.state.dataState.skip, this.state.dataState.take);
	}

	componentDidUpdate(prevProps, prevState) {

	}
	// Component lifecycle methods end

	expandChange = (event) => {
		const isExpanded =
			event.dataItem.expanded === undefined ?
				event.dataItem.aggregates : event.dataItem.expanded;
		event.dataItem.expanded = !isExpanded;

		this.setState({ ...this.state });
	}

	_export;
	_pdfExport;
	exportExcel = () => {
		let { otherGridOptions } = this.state;
		if (otherGridOptions && otherGridOptions.exportRecords === "all") {
			this._export.save();
		} else {
			this._export.save(this.state.dataResult.data, null);
		}
	}

	exportPDF = () => {
		let { otherGridOptions } = this.state;
		if (otherGridOptions && otherGridOptions.exportRecords === "all") {
			this._pdfExport.save(orders, null);
		} else {
			this._pdfExport.save(this.state.dataResult.data, null);
		}
	}

	customeFilterChangeHandler = (isClear, field, operator, value) => {
		console.log(field, 'operator ', operator, value);
		let _filter = {
			logic: "and",
			filters: [
			]
		};
		if(isClear === false && field && operator && value){
			_filter = {
				logic: "and",
				filters: [
					{ field: field, operator: operator, value: value }
				]
			};
		}

		this.setState({
			filter: _filter
		});

		this.updateDataState(0, 10);
		// this.updateGridList(_filter, 0, 10);
	}

	onFilterChange = (e) => {
		let _filter = (e.filter) ? e.filter : {
			logic: "and",
			filters: [
				{ field: "title", operator: "contains", value: "" }
			]
		};

		this.setState({
			filter: _filter
		});

		this.updateDataState(0, 10);
		// this.updateGridList(_filter, 0, 10);
	}

	dataStateChange = (event) => {
		this.setState({
			// dataResult: process(this.state.json, event.data),
			dataResult: process(orders, event.data),
			dataState: event.data
		});
	}

	pageChange = (event) => {
		this.updateDataState(event.page.skip, event.page.take);
		// this.updateGridList({}, event.page.skip, event.page.take);
	}

	updateDataState = (skip, take) => {
		let { dataState } = this.state;
		dataState['skip'] = skip;
		dataState['take'] = take;
		this.setState({
			dataState: { ...dataState }
		});
	}

	globalSearch = (event) => {
		let Standard = (value) => {
			var date = value.toString();
			return new Date(date);
		}
		let columnField = this.props.options.showColumns.map(function (item) {
			return item.field;
		});

		let filters = (value) => {
			let filterArray = [];
			for (var i = 0; i < columnField.length; i++) {
				if (this.props.options.showColumns[i].filter === "text") {
					filterArray.push({
						"field": columnField[i],
						"operator": "contains",
						"value": value
					})
				}
				if (this.props.options.showColumns[i].filter === "numeric") {
					filterArray.push({
						"field": columnField[i],
						"operator": "eq",
						"value": value
					})
				}
				if (this.props.options.showColumns[i].filter === "date") {
					filterArray.push({
						"field": columnField[i],
						"operator": "eq",
						"value": Standard(value)
					})
				}
				if (this.props.options.showColumns[i].filter === "boolean") {
					filterArray.push({
						"field": columnField[i],
						"operator": "contains",
						"value": value
					})
				}
			}
			return filterArray
		};

		const eventData = {
			"filter": {
				"logic": "or",
				"filters": filters(event.target.value)
			},
			"skip": 0,
			"take": 20,
			"sort": [
				{ "field": "orderDate", "dir": "desc" }
			],
			"group": [
				{ "field": "orderDate" }
			]
		}

		this.setState({
			// dataResult: process(this.state.json, eventData),
			dataResult: process(orders, eventData),
		})
	}

	updateGridList = (filterParam, skip, take) => {
		let { dataUrl, filter, dataState } = this.state;

		let _filters = (!isEmpty(filterParam) && filterParam.filters) ? filterParam.filters : filter.filters;
		let _skip = (skip) ? skip : dataState.skip;
		let _take = (take) ? take : dataState.take;

		if (_filters) {
			this.init = { method: 'POST', accept: 'application/json', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ 'filters': _filters, 'skip': _skip, 'take': _take }) };
		} else {
			this.init = { method: 'POST', accept: 'application/json', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ 'skip': _skip, 'take': _take }) };
		}

		fetch(dataUrl, this.init)
			.then(response => response.json())
			.then((json) => {
				this.setState({ dataResult: { 'data': json.result }, totalRecords: json.totalRecords })
			});
	}

	renderGrid(column, index) {
		let { aggregates, filter } = this.state;

		if (aggregates && aggregates.length > 0) {
			let obj = aggregates.find(o => o.field === column.field);
			if (obj || index === 0) {

				const aggregatesCell = (props) => {
					let total = this.state.dataResult.data.reduce((prev, next) => prev + next['value'], 0);
					total = formatter.format(total);
					return (
						(index === 0) ?
							<td colSpan={props.colSpan} style={(props.style) ? props.style : { 'color': '#dd4a68' }}>
								Grand Total
							</td> :
							<td colSpan={obj.colSpan} style={(obj.style) ? obj.style : { 'color': '#dd4a68' }}>
								{total}
							</td>
					);
				}

				return (
					<GridColumn key={index} field={column.field} width={column.width} title={column.title} filter={column.filter} data={column.data} footerCell={aggregatesCell} />
				)
			} else {
				return (
					<GridColumn key={index} field={column.field} width={column.width} title={column.title} filter={column.filter} data={column.data} />
				)
			}
		} else {
			return (
				<GridColumn key={index} field={column.field} width={column.width} title={column.title} filter={column.filter} data={column.data} columnMenu={
					props =>
						<ColumnMenu
							{...props}
							field={column.field}
							filters={this.state.filter.filters}
							customeFilterChange={this.customeFilterChangeHandler}
						/>
				} />
			)
		}
	}

	render() {
		let options = this.props.options;
		let { otherGridOptions, pageable, style, totalRecords } = this.state;
		return (
			<LocalizationProvider language={this.state.currentLocale.language}>
				<IntlProvider locale={this.state.currentLocale.locale} >
					<div className="VS-Parent">
						{(options.globalSearch) ?
							<label className="VS-SearchLabel" >Search:&nbsp;
								<input className="VS-GlobalSearch" type="text" placeholder="Search in entire columns" data={this.state.dataResult}
									{...this.state.dataState} onChange={this.globalSearch}
								></input></label> : ""}
						<ExcelExport
							data={orders}
							ref={(exporter) => { this._export = exporter; }}
						>
							<Grid
								style={style}
								pageable={pageable}
								{...otherGridOptions}
								selectedField="selected"
								total={totalRecords}

								data={this.state.dataResult}
								{...this.state.dataState}
								detail={DetailComponent}
								filterOperators={DEFAULT_FILTER_OPERATORS}

								onFilterChange={this.onFilterChange}
								onDataStateChange={this.dataStateChange}
								onPageChange={this.pageChange}
								// onSelectionChange={this.selectionChange}
								// onHeaderSelectionChange={this.headerSelectionChange}
								onRowClick={this.rowClick}
								onExpandChange={this.expandChange}
							>
								<GridToolbar>
									Locale:&nbsp;&nbsp;
									<DropDownList
										value={this.state.currentLocale}
										textField="language"
										onChange={(e) => { this.setState({ currentLocale: e.target.value }); }}
										data={this.locales} />&nbsp;&nbsp;&nbsp;

									{(otherGridOptions.exportToExcel) ? <button
										title="Export to Excel"
										className="k-button k-primary"
										onClick={this.exportExcel}
									> Export to Excel
									</button> : ""}

									{(otherGridOptions.exportToPdf) ?
										<button className="k-button k-primary" onClick={this.exportPDF}>Export to PDF</button> : ""}
								</GridToolbar>
								{
									options.showColumns.map((column, Index) => this.renderGrid(column, Index))
								}
							</Grid>
						</ExcelExport>
						<GridPDFExport ref={(element) => { this._pdfExport = element; }}
						>
							{
								<Grid
									style={style}
									pageable={pageable}
									{...otherGridOptions}
									selectedField="selected"

									data={this.state.dataResult}
									{...this.state.dataState}
									detail={DetailComponent}

									filterOperators={DEFAULT_FILTER_OPERATORS}

									onDataStateChange={this.dataStateChange}
									// onSelectionChange={this.selectionChange}
									// onHeaderSelectionChange={this.headerSelectionChange}
									onRowClick={this.rowClick}
									onExpandChange={this.expandChange}
								>
								</Grid>
							}
						</GridPDFExport>
					</div>
				</IntlProvider>
			</LocalizationProvider>
		);
	}
}

export default FxGrid;
