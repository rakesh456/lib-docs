import React from 'react';
import axios from 'axios';
import { toODataString } from '@progress/kendo-data-query';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { DialogContainer } from './dialogContainer.jsx';
import { EditCustomCell, HeaderCell, TooltipCell } from './customCell.jsx';
import { DataLoader } from './data-loader.jsx';
import { Loader } from './loader.jsx';
import { EditCommandCell } from './editCommandCell.jsx';
import { CustomColumnMenu } from './customColumnMenu.jsx';
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
import { detailColumn } from './detailColumn.jsx';
import esMessages from './../es.json';
import { process } from '@progress/kendo-data-query';
import { locales, isEmpty, isUndefinedOrNull } from '../../utils/utils'
import { resetGridOptions, resetFilterOptions, resetDataState, resetPageable, resetStyle, DEFAULT_FILTER_OPERATORS, resetSortable, cloneData, isShowModeAll, isShowModeSelected, resetExportOptions } from '../../utils/gridutils'
import $ from 'jquery';
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

class DragCell extends React.Component {
	render() {
		return (
			<td onDragOver={(e) => {
				DragCell.reorder(this.props.dataItem);
				e.preventDefault();
				e.dataTransfer.dropEffect = "copy";
			}}>
				<span
					className="k-icon k-i-reorder"
					draggable="true"
					style={{ cursor: 'move' }}
					onDragStart={(e) => {
						DragCell.dragStart(this.props.dataItem);
						e.dataTransfer.setData("dragging", "");
					}}
				/>
			</td>
		);
	}
}

class FxGrid extends React.Component {
	init = {};
	editField = "inEdit";
	CommandCell;
	CustomCellUI;

	constructor(props) {
		super(props);
		let { options } = this.props;

		let { dataState, otherGridOptions, filterOptions, pageable, style, aggregates, showColumns, dataOperations, selectedRowPrimaryKey, sortable, advanced, exportOptions, lockedColumns, htmlColumns } = options;
		let newDataState = (isUndefinedOrNull(dataState)) ? resetDataState({}) : resetDataState(dataState);
		let newOtherOptions = (isUndefinedOrNull(otherGridOptions)) ? resetGridOptions({}) : resetGridOptions(otherGridOptions);
		let newExportOptions = (isUndefinedOrNull(exportOptions)) ? resetExportOptions({}) : resetExportOptions(exportOptions);
		let newFilterOptions = (isUndefinedOrNull(filterOptions)) ? resetFilterOptions({}) : resetFilterOptions(filterOptions);
		let newPageable = (isUndefinedOrNull(pageable)) ? resetPageable({}) : resetPageable(pageable);
		let newStyle = (isUndefinedOrNull(style)) ? resetStyle({}) : resetStyle(style);
		let newSortable = (isUndefinedOrNull(sortable)) ? resetSortable({}) : resetSortable(sortable);

		newDataState['group'] = (newOtherOptions.groupable === true) ? newDataState['group'] : [];


		this.state = {
			activeItem: null,
			selectionMode: false,
			gridData: [],
			headerAllSelection: false,
			showDataMode: "All",
			dataUrl: (dataOperations && dataOperations.dataUrl),
			allowUnsort: this.props.options.allowUnsort,
			multiple: this.props.options.multipleSort,
			scrollCounter: 1,
			pdfDataResult: [],
			pdfDataProducts: [],
			isExporting: false,
			allServerData: [],
			dataResult: [],
			dataProducts: [],

			defaultDataResult: [],
			defaultDataProducts: [],
			dataState: { ...newDataState },
			defaultDataState: { ...newDataState },
			otherGridOptions: newOtherOptions,
			filterOptions: newFilterOptions,
			exportOptions: newExportOptions,
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
			advanced: (advanced) ? advanced : {},
			loadOnce: (newOtherOptions.loadOnce === true),
			allowNewRow: (newOtherOptions.allowNewRow === true),
			rowInEditMode: (newOtherOptions.rowInEditMode === true),
			externalEditMode: (newOtherOptions.externalEditMode === true),
			groupable: (newOtherOptions.groupable === true),
			allEditable: (newOtherOptions.allEditable === true),
			filterMode: (newFilterOptions.filterMode === "row") ? newFilterOptions.filterMode : "menu",
			filterable: (newFilterOptions.filterable === true),
			sortable: { ...newSortable },
			isMultiValueFilter: (newFilterOptions.isMultiValueFilter === true),
			showColumns: showColumns,
			showExportExcelColumns: [],
			showExportPdfColumns: [],

			allColumns: [],
			primaryKey: (dataOperations.primaryKey) ? dataOperations.primaryKey : "",
			dataOperations: dataOperations,
			changedData: { 'newAdded': [], 'updated': [], 'removed': [], 'isChanged': false },
			isSavingChanges: false,
			isLoadingData: false,
			addEditRows: [],
			externalEditItem: undefined,
			lockedColumns: (lockedColumns && lockedColumns.length > 0) ? lockedColumns : [],
			htmlColumns: (htmlColumns && htmlColumns.length > 0) ? htmlColumns : [],
			selectedRowPrimaryKey: (selectedRowPrimaryKey) ? selectedRowPrimaryKey : null,
			isSelectedRow: false
		};

		this.CommandCell = EditCommandCell({
			primaryKey: this.state.primaryKey,
			edit: this.enterEdit,
			remove: this.remove,

			add: this.add,
			discard: this.discard,

			update: this.update,
			cancel: this.cancel,

			editField: this.editField
		});
		DragCell.reorder = this.reorder.bind(this);
		DragCell.dragStart = this.dragStart.bind(this);

	}

	// Component lifecycle methods started
	componentDidMount() {
		const { loadOnce, dataUrl } = this.state;

		if (loadOnce === false && dataUrl) {
			this.getRequest(dataUrl, (error, response) => {
				if (!error && response && response.data) {
					this.setState({
						allServerData: response.data.value
					});
				}
			});
		}

		// Code to set default selection
		// if (selectedRowPrimaryKey && primaryKey) {
			
		// 	if (isSelectedRow === false && this.state.dataResult) {
		// 		setTimeout(() => {
		// 			const originalItem = this.state.dataResult.data.find(p => p[primaryKey] === selectedRowPrimaryKey);
		// 			console.log(isSelectedRow, selectedRowPrimaryKey, 'originalItem', originalItem)
		// 			if(originalItem){
		// 				this.setDefaultSeletedItem({ dataItem: originalItem });
		// 			}
		// 		}, 2000);
		// 	}
		// }

		this.updateExportColumns();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.style.stripedPattern === false) {
			$("tr.k-alt").removeClass("k-alt");
		}
	}
	// Component lifecycle methods end

	updateExportColumns = () => {
		const { showColumns } = this.state;

		let newExportColumns = cloneData(showColumns);

		newExportColumns.forEach((element) => {
			element.isExport = true;
		});

		this.setState({
			showExportExcelColumns: cloneData(newExportColumns),
			showExportPdfColumns: cloneData(newExportColumns)
		});
	}

	expandChange = (event) => {
		const isExpanded =
			event.dataItem.expanded === undefined ?
				event.dataItem.aggregates : event.dataItem.expanded;
		event.dataItem.expanded = !isExpanded;

		this.setState({ ...this.state });
	}

	toggleIsExporting = (isExporting) => {
		this.setState({
			isExporting: isExporting
		});
	}

	exportExcel = (selectedOnly) => {
		let { exportOptions, dataResult, dataState, showExportExcelColumns, dataUrl, loadOnce } = this.state;

		let expColumns = cloneData(showExportExcelColumns).filter(item => (item.isExport === true));

		if (expColumns && expColumns.length > 0) {

			if (selectedOnly === true && dataResult.data) {
				let exportList = cloneData(dataResult.data).filter(item => (item.selected === true));
				if (exportList && exportList.length > 0) {
					this.toggleIsExporting(true);
					this._export.save(exportList, expColumns);
					this.toggleIsExporting(false);
				}
			} else {
				this.toggleIsExporting(true);
				if (loadOnce === false && exportOptions && exportOptions.allPages === true) {
					this.getRequest(dataUrl, (error, response) => {
						if (response.data && response.data.value) {
							this._export.save(response.data.value, expColumns);
						}
						this.toggleIsExporting(false);
					});

				} else {
					if (exportOptions && exportOptions.allPages === true) {
						this._export.save(dataResult.data, expColumns);
					} else {
						this._export.save((process(dataResult.data, dataState)).data, expColumns);
					}
					this.toggleIsExporting(false);
				}
			}
		}
	}

	exportPDF = (selectedOnly) => {
		let { exportOptions, dataResult, dataState, showExportPdfColumns, dataUrl, loadOnce } = this.state;

		let expColumns = cloneData(showExportPdfColumns).filter(item => (item.isExport === true));

		if (expColumns) {

			if (selectedOnly === true && dataResult.data) {
				let exportList = cloneData(dataResult.data).filter(item => (item.selected === true));

				if (exportList && exportList.length > 0) {
					this.toggleIsExporting(true);
					this.setState({
						pdfDataResult: cloneData({ data: exportList, total: exportList.length })
					});

					this._pdfExport.save(exportList, expColumns);
					this.toggleIsExporting(false);
				}
			} else {
				this.toggleIsExporting(true);

				if (loadOnce === false && exportOptions && exportOptions.allPages === true) {
					this.getRequest(dataUrl, (error, response) => {
						if (response.data && response.data.value) {
							this.setState({
								pdfDataResult: cloneData({ data: response.data.value, total: response.data.value.length })
							});

							this._pdfExport.save(response.data.value, expColumns);
						}
						this.toggleIsExporting(false);
					});

				} else {
					this.setState({
						pdfDataResult: cloneData(dataResult)
					});

					if (exportOptions && exportOptions.allPages === true) {
						this._pdfExport.save(dataResult.data, expColumns);
					} else {
						this._pdfExport.save((process(dataResult.data, dataState)).data, expColumns);
					}
					this.toggleIsExporting(false);
				}
			}
		}
	}

	onItemChange = (event) => {
		let { loadOnce, dataResult, dataProducts, primaryKey } = this.state;
		let dataItem = { ...event.dataItem };
		dataItem[event.field] = event.value;


		if (loadOnce === true) {
			const result1 = [...dataProducts.data];
			const result2 = [...dataResult.data];

			const data1 = result1.map((item, index) => ((dataItem.isNew === true && index === 0) || (item[primaryKey] === dataItem[primaryKey] && !dataItem.isNew)) ? dataItem : item);
			const data2 = result2.map((item, index) => ((dataItem.isNew === true && index === 0) || (item[primaryKey] === dataItem[primaryKey] && !dataItem.isNew)) ? dataItem : item);
			this.setGridData({ data: [...data2], total: dataResult.total }, { data: [...data1], total: dataProducts.total });
		} else {
			const result2 = [...dataResult.data];
			const data = result2.map((item, index) => ((dataItem.isNew === true && index === 0) || (item[primaryKey] === dataItem[primaryKey] && !dataItem.isNew)) ? dataItem : item);
			this.setGridData({ data: [...data], total: dataResult.total }, {});
		}
	}

	pushAddEditRow = (id) => {
		let { addEditRows } = this.state;
		let newAddEditRows = [...addEditRows];
		newAddEditRows.push(id);

		this.setState({
			addEditRows: newAddEditRows
		});
	}

	pullAddEditRow = (id) => {
		let { addEditRows } = this.state;
		let newAddEditRows = [...addEditRows];

		var index = newAddEditRows.indexOf(id);
		if (index !== -1) newAddEditRows.splice(index, 1);

		this.setState({
			addEditRows: newAddEditRows
		});
	}

	remove = (dataItem) => {

		let { loadOnce, dataResult, dataProducts, primaryKey } = this.state;

		if (loadOnce === true) {
			const result1 = [...dataProducts.data];
			const result2 = [...dataResult.data];

			let index1 = result1.findIndex(p => (p === dataItem) || (dataItem[primaryKey] && p[primaryKey] === dataItem[primaryKey]));
			if (index1 >= 0) {
				result1.splice(index1, 1);
			}

			let index2 = result2.findIndex(p => (p === dataItem) || (dataItem[primaryKey] && p[primaryKey] === dataItem[primaryKey]));
			if (index2 >= 0) {
				result2.splice(index2, 1);
			}

			this.setGridData({ data: [...result2], total: dataResult.total - 1 }, { data: [...result1], total: dataProducts.total - 1 });
		} else {
			const result2 = [...dataResult.data];

			let index2 = result2.findIndex(p => (p === dataItem) || (dataItem[primaryKey] && p[primaryKey] === dataItem[primaryKey]));
			if (index2 >= 0) {
				result2.splice(index2, 1);
			}
			this.setGridData({ data: [...result2], total: dataResult.total - 1 }, {});
		}

		this.pullAddEditRow(dataItem[primaryKey]);
		this.updateChangedDataState(dataItem, 'removed');
	}

	discard = (dataItem) => {
		if (this.state.loadOnce === true) {
			const result1 = [...this.state.dataProducts.data];
			const result2 = [...this.state.dataResult.data];
			result1.splice(0, 1);
			result2.splice(0, 1);

			this.setGridData({ data: [...result2], total: this.state.dataResult.total }, { data: [...result1], total: this.state.dataProducts.total });
		} else {
			const result2 = [...this.state.dataResult.data];
			result2.splice(0, 1);
			this.setGridData({ data: [...result2], total: this.state.dataResult.total }, {});
		}
		this.pullAddEditRow(-1);
	}

	cancel = (dataItem) => {

		let { primaryKey } = this.state;

		let result1 = [...this.state.dataResult.data];

		const originalItem = result1.find(p => p[primaryKey] === dataItem[primaryKey]);

		delete originalItem['inEdit'];

		if (this.state.loadOnce === true) {
			let result2 = [...this.state.dataProducts.data];
			const data = result2.map(item => item[primaryKey] === originalItem[primaryKey] ? originalItem : item);
			this.setState({
				dataProducts: { data: [...data], total: this.state.dataProducts.total }
			});

			this.setGridData(this.state.dataResult, { data: [...data], total: this.state.dataProducts.total });
		} else {
			const data = result1.map(item => item[primaryKey] === originalItem[primaryKey] ? originalItem : item);

			this.setGridData({ data: [...data], total: this.state.dataResult.total }, {});
		}

		this.pullAddEditRow(dataItem[primaryKey]);
	}

	update = (dataItem) => {
		let updateDataItem = { ...dataItem };
		delete updateDataItem['inEdit'];
		delete updateDataItem['isNew'];

		let { loadOnce, dataResult, dataProducts, primaryKey } = this.state;

		if (loadOnce === true) {
			const result1 = [...dataProducts.data];
			const result2 = [...dataResult.data];
			const data1 = result1.map((item, index) => (item[primaryKey] === updateDataItem[primaryKey]) ? updateDataItem : item);
			const data2 = result2.map((item, index) => (item[primaryKey] === updateDataItem[primaryKey]) ? updateDataItem : item);
			this.setGridData({ data: [...data2], total: dataResult.total }, { data: [...data1], total: dataProducts.total });
		} else {
			const result2 = [...dataResult.data];
			const data = result2.map((item, index) => (item[primaryKey] === updateDataItem[primaryKey]) ? updateDataItem : item);
			this.setGridData({ data: [...data], total: dataResult.total }, {});
		}

		this.pullAddEditRow(dataItem[this.state.primaryKey]);
		this.updateChangedDataState(updateDataItem, 'updated');
	}

	enterEdit = (dataItem) => {
		const { externalEditMode } = this.state;

		if (externalEditMode === true) {
			this.setState({
				externalEditItem: dataItem
			});
		} else {

			let result1 = (this.state.loadOnce === true) ? [...this.state.dataProducts.data] : [...this.state.dataResult.data];
			let data = result1.map(item =>
				item[this.state.primaryKey] === dataItem[this.state.primaryKey] ?
					{ ...item, inEdit: true } : item
			);

			if (this.state.loadOnce === true) {
				this.setGridData(this.state.dataResult, { data: [...data], total: this.state.dataProducts.total });
			} else {
				this.setGridData({ data: [...data], total: this.state.dataResult.total }, {});
			}

			this.pushAddEditRow(dataItem[this.state.primaryKey]);
		}
	}

	cancelExternalForm = () => {
		this.setState({ externalEditItem: undefined });
	}

	saveExternalForm = () => {
		if (this.state.externalEditItem.isNew === true) {
			this.add(this.state.externalEditItem);
		} else {
			this.updateChangedDataState(this.state.externalEditItem, 'updated');
		}
		this.setState({ externalEditItem: undefined });
	}

	add = (dataItem) => {
		let newDataItem = { ...dataItem };
		delete newDataItem['inEdit'];
		delete newDataItem['isNew'];

		let { loadOnce, dataResult, dataProducts } = this.state;

		if (loadOnce === true) {
			const result1 = [...dataProducts.data];
			const result2 = [...dataResult.data];
			const data1 = result1.map((item, index) => (index === 0) ? newDataItem : item);
			const data2 = result2.map((item, index) => (index === 0) ? newDataItem : item);
			this.setGridData({ data: [...data2], total: dataResult.total + 1 }, { data: [...data1], total: dataProducts.total + 1 });

		} else {
			const result2 = [...dataResult.data];
			const data = result2.map((item, index) => (index === 0) ? newDataItem : item);
			this.setGridData({ data: [...data], total: dataResult.total + 1 }, {});
		}

		this.pullAddEditRow(-1);
		this.updateChangedDataState(newDataItem, 'newAdded');
	}

	addNewRow = () => {
		const { externalEditMode, showColumns, primaryKey } = this.state;
		let newDataItem = { inEdit: true, isNew: true };

		if (externalEditMode === true) {
			showColumns.forEach((column, index) => {
				if (isUndefinedOrNull(column.isParent) && !isUndefinedOrNull(column.filter) && column.field !== primaryKey) {
					newDataItem[column.field] = (column.filter === 'text') ? "" : (column.filter === 'numeric') ? 0 : (column.filter === 'boolean') ? false : "";
				}
			});

			this.setState({
				externalEditItem: newDataItem
			});
		} else {

			if (this.state.loadOnce === true) {
				this.setGridData({ data: [newDataItem, ...this.state.dataResult.data], total: this.state.dataResult.total }, { data: [newDataItem, ...this.state.dataProducts.data], total: this.state.dataProducts.total });

			} else {
				this.setGridData({ data: [newDataItem, ...this.state.dataResult.data], total: this.state.dataResult.total }, {});
			}
			this.pushAddEditRow(-1);
		}
	}

	updateChangedDataState = (dataItem, operation) => {
		let { changedData } = this.state;
		let newChangedData = { ...changedData };
		let changed = newChangedData[operation];
		changed.push(dataItem);
		newChangedData[operation] = [...changed];
		newChangedData['isChanged'] = true;

		this.setState({
			changedData: { ...newChangedData }
		});
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

	postRequest = (url, body, callback) => {
		axios.post(url, body)
			.then((response) => {
				callback(null, response);
			})
			.catch((error) => {
				callback(error, null);
			});
	}

	saveChanges = () => {
		let { changedData, dataOperations } = this.state;
		this.setState({
			isSavingChanges: true
		});

		let counter = 0;

		if (changedData && dataOperations.addUrl && changedData.newAdded.length > 0) {
			this.postRequest(dataOperations.addUrl, changedData.newAdded, (error, response) => {
				counter++;
				this.saveChangesSuccess(counter);
			});
		} else {
			counter++;
			this.saveChangesSuccess(counter);
		}

		if (changedData && dataOperations.updateUrl && changedData.updated.length > 0) {
			this.postRequest(dataOperations.updateUrl, changedData.updated, (error, response) => {
				counter++;
				this.saveChangesSuccess(counter);
			});
		} else {
			counter++;
			this.saveChangesSuccess(counter);
		}

		if (changedData && dataOperations.deleteUrl && changedData.removed.length > 0) {
			this.postRequest(dataOperations.deleteUrl, changedData.removed, (error, response) => {
				counter++;
				this.saveChangesSuccess(counter);
			});
		} else {
			counter++;
			this.saveChangesSuccess(counter);
		}
	}

	saveChangesSuccess = (counter) => {
		if (counter === 3) {
			this.setState({
				isSavingChanges: false,
				changedData: { 'newAdded': [], 'updated': [], 'removed': [], 'isChanged': false }
			});
		}
	}

	cancelChanges = () => {
		this.setState({
			...this.state,
			changedData: { 'newAdded': [], 'updated': [], 'removed': [], 'isChanged': false }
		});
	}

	customeFilterChangeHandler = (isClear, field, operator, value) => {
		let _filter = {
			logic: "and",
			filters: [
			]
		};
		if (isClear === false && field && operator && value) {
			_filter = {
				logic: "and",
				filters: [
					{ field: field, operator: operator, value: value }
				]
			};
		}

		let dataState = {
			filter: _filter,
			sort: [],
			skip: 0,
			take: 10,
			group: []
		};

		this.setState({
			// dataState: dataState,
			filter: _filter
		});

		this.dataStateChange({ data: dataState });
	}

	onCloseMenu = (e) => {
		// this.onFilterChange(e);
	}

	onFilterChange = (e) => {
		const {isMultiValueFilter} = this.state;

		let { filter } = e;
		let currentFilter = (!filter) ? undefined : this.state.filter;
		let _filter = (isUndefinedOrNull(currentFilter)) ? undefined : currentFilter;
		console.log(' filter ', JSON.stringify(filter));

		if(isMultiValueFilter === true){
			_filter = filter;
		} else {
			if (filter) {
				// let _data = _filter['filters'].find(o => (o.field === o.filter));
				const updatedFilter = _filter['filters'].filter((item) => item.field !== filter.field);
				updatedFilter.push(filter);
				console.log(updatedFilter, 'updatedFilter ');
	
				_filter['filters'] = updatedFilter;
			}
		}

		let dataState = {
			filter: _filter,
			sort: [],
			skip: 0,
			take: 10,
			group: []
		};

		this.setState({
			// dataState: dataState,
			filter: _filter
		});

		this.dataStateChange({ data: dataState });
	}

	dataStateChange = (e) => {

		console.log(' dataState ', e);
		this.setState({
			...this.state,
			dataState: { ...e.data },
			defaultDataState: { ...e.data },
			dataProducts: (process(this.state.defaultDataResult.data, e.data)),
			dataResult: { data: (process(this.state.defaultDataResult.data, e.data)).data, total: this.state.defaultDataResult.total }
		});
	}

	pageChange = (event) => {
		console.log(' event ', event);
		this.updateDataState(event.page.skip, event.page.take);
	}

	updateDataState = (skip, take) => {
		let { dataState } = this.state;
		dataState['skip'] = skip;
		dataState['take'] = take;
		this.setState({
			dataState: { ...dataState },
			dataProducts: (process(this.state.dataResult.data, dataState))
		});
	}

	displayTheError = (error) => {
		this.setGridData({}, {});
	}

	onColumnsSubmit = (columnsState) => {
		console.log(' columnsState ', columnsState);
		let newShowColumns = columnsState.filter((item) => (item.show === true));
		this.setState({
			allColumns: columnsState,
			showColumns: [...newShowColumns]
		});
	}

	onResetColumnDisplay = () => {
		this.setState({
			showColumns: (this.props.options && this.props.options.showColumns) ? this.props.options.showColumns : []
		});
		this.setAllColumns();
	}

	setAllColumns = () => {
		const { dataResult, showColumns } = this.state;
		const obj = (dataResult.data && dataResult.data.length > 0) ? dataResult.data[0] : null;
		if (obj) {
			let allColumns = [];
			for (let key in obj) {
				let typeOfObj = typeof obj[key];
				if (typeOfObj !== 'object' && typeOfObj !== 'array') {
					let columnField = showColumns.find(o => o.field === key);
					if (columnField) {
						allColumns.push({ ...columnField, "show": true });
					} else {
						allColumns.push({
							"field": key,
							"title": key,
							"filter": (typeOfObj === 'string') ? 'text' : (typeOfObj === 'number') ? 'numeric' : (typeOfObj === 'boolean') ? 'boolean' : 'text',
							"show": false,
							"width": "100px"
						});
					}
				}
			}

			this.setState({
				allColumns: allColumns
			});
		}
	}

	expandCollapseGroupedField = () => {
		// let { loadOnce, dataResult, dataProducts, groupable, expandField } = this.state;

		// if (groupable === true && expandField === true) {

		// 	if (loadOnce === true) {
		// 		const result1 = [...dataProducts.data];
		// 		const result2 = [...dataResult.data];

		// 		const data1 = result1.map(obj => ({ ...obj, expanded: expandField }));
		// 		const data2 = result2.map(obj => ({ ...obj, expanded: expandField }));

		// 		this.setGridData({ data: [...data2], total: dataResult.total }, { data: [...data1], total: dataProducts.total });
		// 	} else {
		// 		const result2 = [...dataResult.data];
		// 		const data = result2.map(obj => ({ ...obj, expanded: expandField }));
		// 		this.setGridData({ data: [...data], total: dataResult.total }, { ...dataProducts });
		// 	}
		// }
	}

	dataRecieved = (data) => {
		let { loadOnce, groupable, headerAllSelection } = this.state;

		if (headerAllSelection === true) {
			const newData = data.data.map((item, index) => ({ ...item, selected: true }));

			this.setGridData((loadOnce === false && groupable === true) ? { data: (process(newData, this.state.defaultDataState)).data, total: data.total } : data, (process(newData, this.state.dataState)));

			this.setDefaultList();

			this.setState({
				headerAllSelection: true
			});

		} else {
			const newData = data.data.map((item, index) => ({ ...item, HtmlField: "<p><progress value='50' max='100'>50%</progress> A progress displaying 50%.</p>" }));

			this.setGridData((loadOnce === false && groupable === true) ? { data: (process(newData, this.state.defaultDataState)).data, total: data.total } : data, (process(newData, this.state.dataState)));

			// if (selectedRowPrimaryKey && primaryKey) {
			// 	// const data1 = data.data.map((item, index) => ({ ...item, selected: item[primaryKey] === selectedRowPrimaryKey }));
			// 	this.setDefaultList();
				
			// 	if (isSelectedRow === false && this.state.dataResult) {
			// 		setTimeout(() => {
			// 			const originalItem = this.state.dataResult.data.find(p => p[primaryKey] === selectedRowPrimaryKey);
			// 			console.log(isSelectedRow, selectedRowPrimaryKey, 'originalItem', originalItem)
			// 			if(originalItem){
			// 				console.log(' ---------------------- ')
			// 				this.setDefaultSeletedItem({ dataItem: originalItem });
			// 			}
			// 		}, 2000);
			// 	}
			// } else {
			// }
			this.setDefaultList();

			this.setState({
				headerAllSelection: false
			});
		}


		this.setAllColumns();
		this.expandCollapseGroupedField();
	}

	setGridData = (dataResult, secondData) => {
		let { allEditable, loadOnce } = this.state;

		if (isEmpty(dataResult)) {
			this.setState({
				...this.state,
				dataProducts: { data: [], total: 0 },
				dataResult: { data: [], total: 0 }
			});

		} else {

			if (allEditable === true) {
				let data1 = dataResult.data.map((item) => Object.assign({ inEdit: true }, item));

				if (loadOnce === true) {
					let data2 = secondData.data.map((item) => Object.assign({ inEdit: true }, item));
					this.setState({
						...this.state,
						dataProducts: { data: data2, total: secondData.total },
						dataResult: { data: data1, total: dataResult.total }
					});
					// this.setDefaultList();
				} else {
					this.setState({
						...this.state,
						dataResult: { data: data1, total: dataResult.total }
					});
					// this.setDefaultList();
				}
			} else {
				if (loadOnce === true) {
					this.setState({
						...this.state,
						dataProducts: { ...secondData, total: dataResult.total },
						dataResult: { ...dataResult, total: dataResult.total }
					});


					// this.setDefaultList();
				} else {
					this.setState({
						...this.state,
						dataResult: { ...dataResult, total: dataResult.total }
					});

					// this.setDefaultList();
				}
			}
		}

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


	updateDataResultByDataMode = (showDataMode) => {
		let { loadOnce, defaultDataResult, defaultDataProducts } = this.state;

		if (isShowModeAll(showDataMode)) {
			if (loadOnce === true) {
				this.setState({
					dataProducts: cloneData(defaultDataProducts),
					dataResult: cloneData(defaultDataResult)
				});
			} else {
				this.setState({
					dataResult: cloneData(defaultDataResult)
				});
			}
		} else {
			let flag = isShowModeSelected(showDataMode) ? true : false;

			if (loadOnce === true) {
				let data1 = cloneData(defaultDataResult.data).filter(item => (item.selected === flag));
				let data2 = cloneData(defaultDataProducts.data).filter(item => (item.selected === flag));
				this.setState({
					...this.state,
					dataProducts: { data: data2, total: defaultDataProducts.total },
					dataResult: { data: data1, total: defaultDataResult.total }
				});
			} else {
				let data1 = (cloneData(defaultDataResult.data)).filter(item => (item.selected === flag));

				this.setState({
					...this.state,
					dataResult: { data: data1, total: defaultDataResult.total }
				});
			}
		}
	}

	globalSearch = (event) => {
		const filterValue = (event && event.target.value) ? event.target.value : "";
		const { showColumns, defaultDataResult, dataState, dataUrl, loadOnce } = this.state;
		if (filterValue) {
			let Standard = (value) => {
				var date = value.toString();
				return new Date(date);
			}

			let columnField = showColumns.map((item) => {
				return item.field;
			});

			let filters = (value) => {
				let filterArray = [];
				for (var i = 0; i < columnField.length; i++) {
					if (showColumns[i].filter === "text") {
						filterArray.push({
							"field": columnField[i],
							"operator": "contains",
							"value": value
						})
					}
					if (!isNaN(value) && showColumns[i].filter === "numeric") {
						filterArray.push({
							"field": columnField[i],
							"operator": "eq",
							"value": parseInt(value)
						})
					}
					if (showColumns[i].filter === "date") {
						filterArray.push({
							"field": columnField[i],
							"operator": "eq",
							"value": Standard(value)
						})
					}
					if ((value === 'true' || value === 'false') && showColumns[i].filter === "boolean") {
						filterArray.push({
							"field": columnField[i],
							"operator": "eq",
							"value": (value === 'true') ? true : false
						})
					}
				}
				return filterArray
			};


			const eventData = {
				"filter": {
					"logic": "or",
					"filters": filters(filterValue)
				},
				"skip": dataState.skip,
				"take": dataState.take,
				"sort": dataState.sort,
				"group": dataState.group
			}


			let pending = toODataString(eventData);

			if (loadOnce === false) {
				this.setState({
					isLoadingData: true
				});

				this.getRequest(dataUrl + pending, (error, response) => {
					this.setState({
						isLoadingData: false
					});
					if (!error && response.data && response.data.value) {
						this.setState({
							dataResult: (process(response.data.value, eventData)),
							dataProducts: (process(response.data.value, eventData))
						});
					} else {
						this.setState({
							dataResult: (process([], eventData)),
							dataProducts: (process([], eventData))
						});
					}
				});
			} else {
				this.setState({
					dataResult: (process(defaultDataResult.data, eventData)),
					dataProducts: (process(defaultDataResult.data, eventData))
				})
			}

		} else {
			this.setState({
				dataResult: ({ data: process(defaultDataResult.data, dataState).data, total: defaultDataResult.total }),
				dataProducts: ({ data: process(defaultDataResult.data, dataState).data, total: defaultDataResult.total })
			})
		}
	}

	renderExportExcel(column, index) {
		return (

			<div className="VS-Grid-Export-Column" key={index}>
				<label className="VS-checkboxContainer">
					<input type="checkbox" />
					{column.title}
					<span className="VS-checkmark"></span>
				</label>
				<button className="VS-clearButton">clear</button ><button className="VS-okButton" onClick={this.exportExcel}>filter</button>
			</div>
		)

	}

	renderExportPdf(column, index) {
		return (

			<div className="VS-Grid-Export-Column" key={index}>
				<label className="VS-checkboxContainer">
					<input type="checkbox" />
					{column.title}
					<span className="VS-checkmark"></span>
				</label>
				<button className="VS-clearButton">clear</button ><button className="VS-okButton" onClick={this.exportPDF}>filter</button>
			</div>
		)

	}

	getChangedButtonClasses = () => {
		let { changedData } = this.state;
		return (changedData && changedData.isChanged === false) ? "k-button k-primary k-state-disabled VS-PullRight" : "k-button k-primary VS-PullRight";
	}

	getDisplayData = () => {
		let { loadOnce, primaryKey, selectedRowPrimaryKey, dataProducts, dataResult } = this.state;
		return !isUndefinedOrNull(dataProducts.data) && !isUndefinedOrNull(dataResult.data) && (loadOnce === true) ? dataProducts.data.map(
			(item) => ({ ...item, selected: item[primaryKey] === selectedRowPrimaryKey })) :
			dataResult.data.map(
				(item) => ({ ...item, selected: item[primaryKey] === selectedRowPrimaryKey }))
	}

	renderParentColumn(parentColumn, index, results) {
		return (
			<GridColumn key={'parent' + (index)} title={parentColumn.title}>
				{
					results.map((childColumn, subIndex) => this.renderChildColumn(parentColumn, childColumn, subIndex))
				}
			</GridColumn>
		);
	}

	renderChildColumn(parentColumn, childColumn, index) {
		let { isMultiValueFilter, showColumns, allColumns, addEditRows, allEditable, filterMode, filterable, otherGridOptions } = this.state;

		if (childColumn.isParent === true) {
			let results = showColumns.filter(item => (item.parentName === childColumn.name));

			if (results && results.length > 0) {
				return this.renderParentColumn(childColumn, index, results);
			} else {
				return "";
			}
		} else {
			let htmlElementObject = showColumns.find(o => o.field === childColumn.field);
			// let columnObject = (dataResult && dataResult.data) ? dataResult.data.map(a => a[childColumn.field]) : {};
			let editable = (htmlElementObject && htmlElementObject.editable === false) ? false : true;
			let isLocked = this.isLockedField(childColumn);

			if (htmlElementObject && addEditRows.length <= 0 && allEditable === false) {
				this.CustomCellUI = EditCustomCell({
					htmlElementObject: htmlElementObject,
					title: (otherGridOptions.cellToolTip === true)? childColumn.title : ''
				});

				return (
					<GridColumn key={index} field={childColumn.field} width={childColumn.width} locked={isLocked} title={childColumn.title} filter={childColumn.filter} data={childColumn.data} editor="text" editable={editable} headerCell={HeaderCell(childColumn)} cell={(this.isHtmlField(childColumn)) ? this.CustomCellUI : ((!isLocked)? TooltipCell(childColumn, otherGridOptions.cellToolTip) : null)} columnMenu={(filterMode === 'menu' && filterable === false) ?
						props =>
							<CustomColumnMenu
								{...props}
								allColumns={allColumns}
								isMultiValueFilter={isMultiValueFilter}
								onResetColumnDisplay={this.onResetColumnDisplay}
								onColumnsSubmit={this.onColumnsSubmit}
							/>
						: null} />)
			} else {
				this.CustomCellUI = EditCustomCell({
					htmlElementObject: { "field": childColumn.field },
					title: (otherGridOptions.cellToolTip === true)? childColumn.title : ''
				});


				return (
					<GridColumn key={index} field={childColumn.field} width={childColumn.width} locked={isLocked} title={childColumn.title} filter={childColumn.text} data={childColumn.data} editor="text" editable={editable} cell={(this.isHtmlField(childColumn)) ? this.CustomCellUI : ((!isLocked)? TooltipCell(childColumn, otherGridOptions.cellToolTip) : null)} headerCell={HeaderCell(childColumn)} columnMenu={(filterMode === 'menu' && filterable === false) ?
						props =>
							<CustomColumnMenu
								{...props}
								allColumns={allColumns}
								isMultiValueFilter={isMultiValueFilter}
								onResetColumnDisplay={this.onResetColumnDisplay}
								onColumnsSubmit={this.onColumnsSubmit}
							/>
						: null} />)
			}

		}
	}

	clearExportCheckboxes = (type) => {
		let { showExportColumns } = this.state;

		let newShowExportColumns = cloneData(showExportColumns);

		newShowExportColumns.forEach((element) => {
			element.isExport = false;
		});

		if (type === 'pdf') {
			this.setState({
				showExportColumns: cloneData(newShowExportColumns)
			});
		} else {
			this.setState({
				showExportColumns: cloneData(newShowExportColumns)
			});
		}
	}

	handleExportColumnCheckChange = (isChecked, column, type) => {
		// let isChecked = event.target.checked;
		let { showExportExcelColumns, showExportPdfColumns } = this.state;

		
		if (type === 'pdf') {
			let index = showExportPdfColumns.findIndex((x) => x.field === column.field);

			let newShowExportPdfColumns = cloneData(showExportPdfColumns);
			newShowExportPdfColumns.forEach((element, i) => {
				if (i === index) {
					newShowExportPdfColumns[i].isExport = isChecked;
				}
			});

			this.setState({
				showExportPdfColumns: cloneData(newShowExportPdfColumns)
			});
		} else {
			let index = showExportExcelColumns.findIndex((x) => x.field === column.field);

			let newShowExportExcelColumns = cloneData(showExportExcelColumns);

			newShowExportExcelColumns.forEach((element, i) => {
				if (i === index) {
					newShowExportExcelColumns[i].isExport = isChecked;
				}
			});
			
			this.setState({
				showExportExcelColumns: cloneData(newShowExportExcelColumns)
			});
		}

	}

	columnCheckbox = (column, index, type) => {
		return (
			<div className="" key={index}>
				<label
					htmlFor={`column-visiblity-show-${type}-${index}`}
					className="k-checkbox-label"
					style={{ userSelect: 'none' }}
				>
					<input
						id={`column-visiblity-show-${type}-${index}`}
						className="k-checkbox"
						type="checkbox"
						checked={column.isExport}
						onChange={(e) => this.handleExportColumnCheckChange(!column.isExport, column, type)}
					/>
					{column.title}
				</label>
			</div>
		);
	}

	renderExportColumns(type) {
		const { showExportExcelColumns, showExportPdfColumns, isExporting } = this.state;
		let columns = (type === 'pdf') ? cloneData(showExportPdfColumns) : cloneData(showExportExcelColumns);

		if (!columns) {
			return ("")
		} else {
			return (
				<div className="VS-Grid-Export-Column">
					{columns.map((column, index) => this.columnCheckbox(column, index, type))}

					{
						(isExporting === false) ?
							<div>
								<button className="k-button k-default VS-PullLeft" onClick={(e) => this.clearExportCheckboxes(type)}>clear </button>
								{
									(type === 'excel') ?
										<button className="k-button k-primary VS-PullRight" onClick={() => this.exportExcel(false)}>ok</button> :
										<button className="k-button k-primary VS-PullRight" onClick={() => this.exportPDF(false)}>ok</button>
								}
							</div>
							: 'Exporting'
					}
				</div>
			)
		}
	}

	setShowDataMode = (value) => {
		const { dataResult } = this.state;

		if (isShowModeAll(value)) {

			this.setState({
				showDataMode: value
			});

			this.updateDataResultByDataMode(value);
		} else {
			let _data = dataResult.data.find(o => (o.selected === true));
			console.log(' _data ', _data);

			if (_data) {
				this.setState({
					showDataMode: value
				});

				this.updateDataResultByDataMode(value);
			}
		}
	}

	getSelectedClass(val) {
		const { showDataMode } = this.state;
		return (val === showDataMode) ? 'selected' : '';
	}

	renderShowHideSelection() {
		return (
			<div className="VS-Grid-Selection-Items">
				<span className={(this.state.showDataMode === 'Selected') ? 'selected' : ''} onClick={() => this.setShowDataMode('Selected')}>Show Selected</span>
				<span className={(this.state.showDataMode === 'UnSelected') ? 'selected' : ''} onClick={() => this.setShowDataMode('UnSelected')}>Show Unselected</span>
				<span className={(this.state.showDataMode === 'All') ? 'selected' : ''} onClick={() => this.setShowDataMode('All')}>Show All</span>
			</div>
		)
	}

	isLockedField = (column) => {
		const { lockedColumns } = this.state;
		return (lockedColumns && lockedColumns.includes(column.field));
	}

	isHtmlField = (column) => {
		const { htmlColumns } = this.state;
		return (htmlColumns && htmlColumns.includes(column.field));
	}

	renderGrid(column, index) {
		let { aggregates, showColumns, dataResult, loadOnce, allServerData, filterMode, filterable, isMultiValueFilter,  allColumns, otherGridOptions } = this.state;

		if (column.isParent === true) {
			let results = showColumns.filter(item => (item.parentName === column.name));
			if (results && results.length > 0) {
				return this.renderParentColumn(column, index, results);
			} else {
				return "";
			}
		} else if (!isUndefinedOrNull(column.parentName)) {
			return "";
		} else {
			if (aggregates && aggregates.length > 0) {
				let obj = aggregates.find(o => o.field === column.field);
				if (obj || index === 0) {

					const aggregatesCell = (props) => {
						let total = 0;
						if (loadOnce === true) {
							total = (dataResult && dataResult.data) ? dataResult.data.reduce((prev, next) => prev + next[column.field], 0) : 0;
							// total = formatter.format(total);
							return (
								(index === 0) ?
									<td colSpan={props.colSpan} style={(props.style) ? props.style : { 'color': '#dd4a68' }}>
										Total
									</td> :
									<td colSpan={obj.colSpan} style={(obj.style) ? obj.style : { 'color': '#dd4a68' }}>
										{total}
									</td>
							);
						} else {
							if (allServerData) {
								total = (allServerData && allServerData.length > 0) ? allServerData.reduce((prev, next) => prev + next[column.field], 0) : 0;
								return (
									(index === 0) ?
										<td colSpan={props.colSpan} style={(props.style) ? props.style : { 'color': '#dd4a68' }}>
											Total
										</td> :
										<td colSpan={obj.colSpan} style={(obj.style) ? obj.style : { 'color': '#dd4a68' }}>
											{total}
										</td>
								);
							} else {
								return (
									(index === 0) ?
										<td colSpan={props.colSpan} style={(props.style) ? props.style : { 'color': '#dd4a68' }}>
											Total
										</td> :
										<td colSpan={obj.colSpan} style={(obj.style) ? obj.style : { 'color': '#dd4a68' }}>
											{total}
										</td>
								);
							}
						}
					}

					return (
						<GridColumn key={index} field={column.field} width={column.width} locked={this.isLockedField(column)} title={column.title} filter={column.filter} data={column.data} footerCell={aggregatesCell} headerCell={HeaderCell(column)} cell={TooltipCell(column, otherGridOptions.cellToolTip)} columnMenu={(filterMode === 'menu' && filterable === false) ?
						props =>
							<CustomColumnMenu
								{...props}
								allColumns={allColumns}
								isMultiValueFilter={isMultiValueFilter}
								onResetColumnDisplay={this.onResetColumnDisplay}
								onColumnsSubmit={this.onColumnsSubmit}
							/>
						: null} />
					)
				} else {
					return (
						this.renderChildColumn("", column, index)
					)
				}
			} else {
				return (
					this.renderChildColumn("", column, index)
				)
			}
		}
	}

	rendePdfExportColumns = (column, index) => {
		if (column && column.isExport === true) {
			return (
				<GridColumn key={"pdf-column-" + (index)} field={column.field} title={column.title} />
			)
		} else {
			return ("")
		}
	}

	setDefaultSeletedItem = (event) => {
		let { loadOnce, primaryKey, dataProducts, dataResult, defaultDataResult, defaultDataProducts } = this.state;
		let selectedRowPrimaryKey = event.dataItem[primaryKey];

		console.log(defaultDataResult, ' selectedRowPrimaryKey ', selectedRowPrimaryKey)

		this.setState({
			isSelectedRow: true,
			selectedRowPrimaryKey: null
		});

		if (loadOnce === true) {
			const result1 = cloneData(dataProducts.data);
			const result2 = cloneData(dataResult.data);
			const data1 = result1.map((item, index) => ({ ...item, selected: (item[primaryKey] === selectedRowPrimaryKey) ? true : false }));
			const data2 = result2.map((item, index) => ({ ...item, selected: (item[primaryKey] === selectedRowPrimaryKey) ? true : false }));

			const defaultData = defaultDataResult.data.map((item, index) => ({ ...item, selected: (item[primaryKey] === selectedRowPrimaryKey) ? true : false }));
			const productData= defaultDataProducts.data.map((item, index) => ({ ...item, selected: (item[primaryKey] === selectedRowPrimaryKey) ? true : false }));

			this.setGridData({ data: [...data2], total: dataResult.total }, { data: [...data1], total: dataProducts.total });

			this.setDefaultList({ data: [...defaultData], total: defaultDataResult.total }, { data: [...productData], total: defaultDataProducts.total });
		} else {
			const result2 = cloneData(dataResult.data);
			const data2 = result2.map((item, index) => ({ ...item, selected: (item[primaryKey] === selectedRowPrimaryKey) ? true : false }));
			
			const defaultData = defaultDataResult.data.map((item, index) => ({ ...item, selected: (item[primaryKey] === selectedRowPrimaryKey) ? true : false }));
			
			this.setGridData({ data: [...data2], total: dataResult.total }, {});

			this.setDefaultList({ data: [...defaultData], total: defaultDataResult.total }, defaultDataProducts);
		}
	}

	selectionChange = (event) => {
		let { loadOnce, primaryKey, dataProducts, dataResult, defaultDataResult, defaultDataProducts } = this.state;
		let selectedRowPrimaryKey = event.dataItem[primaryKey];

		if(selectedRowPrimaryKey && primaryKey){

			if (loadOnce === true) {
				const result1 = cloneData(dataProducts.data);
				const result2 = cloneData(dataResult.data);
				const data1 = result1.map((item, index) => ({ ...item, selected: ((item[primaryKey] === selectedRowPrimaryKey && !item.selected) || (item[primaryKey] !== selectedRowPrimaryKey && item.selected)) ? true : false }));
				const data2 = result2.map((item, index) => ({ ...item, selected: ((item[primaryKey] === selectedRowPrimaryKey && !item.selected) || (item[primaryKey] !== selectedRowPrimaryKey && item.selected)) ? true : false }));
	
	
				const defaultData = defaultDataResult.data.map((item, index) => ({ ...item, selected: ((item[primaryKey] === selectedRowPrimaryKey && !item.selected) || (item[primaryKey] !== selectedRowPrimaryKey && item.selected)) ? true : false }));
				const productData= defaultDataProducts.data.map((item, index) => ({ ...item, selected: ((item[primaryKey] === selectedRowPrimaryKey && !item.selected) || (item[primaryKey] !== selectedRowPrimaryKey && item.selected)) ? true : false }));
	
				this.setGridData({ data: [...data2], total: dataResult.total }, { data: [...data1], total: dataProducts.total });
				
	
				this.setDefaultList({ data: [...defaultData], total: defaultDataResult.total }, { data: [...productData], total: defaultDataProducts.total });
	
				this.setHeaderAllSelection(data1);
			} else {
				const result2 = cloneData(dataResult.data);
	
				console.log(selectedRowPrimaryKey, event,' loadOnce ', loadOnce)
	
				const data2 = result2.map((item, index) => ({ ...item, selected: ((item[primaryKey] === selectedRowPrimaryKey && !item.selected) || (item[primaryKey] !== selectedRowPrimaryKey && item.selected)) ? true : false }));
	
				
				const defaultData = defaultDataResult.data.map((item, index) => ({ ...item, selected: ((item[primaryKey] === selectedRowPrimaryKey && !item.selected) || (item[primaryKey] !== selectedRowPrimaryKey && item.selected)) ? true : false }));
				
				this.setGridData({ data: [...data2], total: dataResult.total }, {});
	
				this.setDefaultList({ data: [...defaultData], total: defaultDataResult.total }, defaultDataProducts);
	
				this.setHeaderAllSelection(data2);
			}
		}

	}

	rowClick = (event) => {
		const { loadOnce, primaryKey, dataProducts, dataResult } = this.state;
		let selectedRowPrimaryKey = event.dataItem[primaryKey];

		if (loadOnce === true) {
			const result1 = [...dataProducts.data];
			const result2 = [...dataResult.data];
			const data1 = result1.map((item, index) => ({ ...item, selected: ((item[primaryKey] === selectedRowPrimaryKey && item.selected === false) || (item[primaryKey] !== selectedRowPrimaryKey && item.selected === true)) }));
			const data2 = result2.map((item, index) => ({ ...item, selected: ((item[primaryKey] === selectedRowPrimaryKey && item.selected === false) || (item[primaryKey] !== selectedRowPrimaryKey && item.selected === true)) }));

			this.setGridData({ data: [...data2], total: dataResult.total }, { data: [...data1], total: dataProducts.total });
			this.setHeaderAllSelection(data1);
		} else {
			const result2 = [...dataResult.data];
			const data2 = result2.map((item, index) => ({ ...item, selected: ((item[primaryKey] === selectedRowPrimaryKey && item.selected === false) || (item[primaryKey] !== selectedRowPrimaryKey && item.selected === true)) }));
			this.setGridData({ data: [...data2], total: dataResult.total }, {});

			this.setHeaderAllSelection(data2);
		}
	};

	setHeaderAllSelection = (_data) => {
		let flag = true;

		_data = cloneData(_data);
		if (isUndefinedOrNull(_data)) {
			flag = false;
		} else {
			let obj = _data.find(o => (isUndefinedOrNull(o.selected) || o.selected === false));
			if (obj) {
				flag = false;
			}
		}

		this.setState({
			headerAllSelection: flag
		});
	}

	headerSelectionChange = (event) => {
		const { loadOnce, dataProducts, dataResult, headerAllSelection, defaultDataResult, defaultDataProducts } = this.state;
		let isSelected = !headerAllSelection;

		if (loadOnce === true) {
			const result1 = [...dataProducts.data];
			const result2 = [...dataResult.data];
			const data1 = result1.map((item, index) => ({ ...item, selected: isSelected }));
			const data2 = result2.map((item, index) => ({ ...item, selected: isSelected }));

			const defaultData = defaultDataResult.data.map((item, index) => ({ ...item, selected: isSelected, hidden: true }));
			const productData = defaultDataProducts.data.map((item, index) => ({ ...item, selected: isSelected, hidden: true }));

			this.setGridData({ data: [...data2], total: dataResult.total }, { data: [...data1], total: dataProducts.total });

			this.setDefaultList({ data: [...defaultData], total: defaultDataResult.total },  { data: [...productData], total: defaultDataProducts.total });

		} else {
			const result2 = [...dataResult.data];
			const data2 = result2.map((item, index) => ({ ...item, selected: isSelected, hidden: true }));
			const defaultData = defaultDataResult.data.map((item, index) => ({ ...item, selected: isSelected, hidden: true }));

			this.setGridData({ data: [...data2], total: dataResult.total }, { data: dataProducts.data, total: dataProducts.total });

			this.setDefaultList({ data: [...defaultData], total: defaultDataResult.total }, defaultDataProducts);
		}

		this.setState({
			headerAllSelection: !headerAllSelection
		});
	}

	toSelectionMode = () => {
		this.setState({
			selectionMode: true
		})
	}

	exitSelectionMode = () => {
		this.setState({
			selectionMode: false
		})
	}

	scrollHandler = (event) => {
		const e = event.nativeEvent;
		if (e.target.scrollTop + 10 >= e.target.scrollHeight - e.target.clientHeight) {
			let { scrollCounter, loadOnce } = this.state;
			if (loadOnce === true) {
				const moreData = this.state.dataResult.data.splice((scrollCounter * 10), 10);
				if (moreData.length > 0) {
					let _data = (this.state.dataProducts.data).concat(moreData)
					this.setState({ dataProducts: { data: [..._data], total: this.state.dataResult.total }, scrollCounter: scrollCounter + 1 });
				}

			} else {
				this.updateDataState(0, ((scrollCounter + 1) * 10));
				this.setState({
					scrollCounter: scrollCounter + 1
				});
			}
		}
	};

	reorder(dataItem) {
		const {activeItem, primaryKey} = this.state;

		if (!activeItem || !dataItem || activeItem[primaryKey] === dataItem[primaryKey]) {
			return;
		} else {
			const { loadOnce, dataResult, dataProducts } = this.state;
			let reorderedData = (loadOnce === true) ? dataProducts.data.slice() : dataResult.data.slice();
			let prevIndex = reorderedData.findIndex(p => (p === this.state.activeItem));
			let nextIndex = reorderedData.findIndex(p => (p === dataItem));
			reorderedData.splice(prevIndex, 1);
			reorderedData.splice(nextIndex, 0, this.state.activeItem);

			if (loadOnce === true) {
				this.setGridData({ data: reorderedData, total: this.state.dataProducts.total }, { data: reorderedData, total: this.state.dataResult.total });
			} else {
				console.log(' reorderedData ', reorderedData);
				this.setGridData({ data: reorderedData, total: this.state.dataResult.total }, { data: reorderedData, total: this.state.dataResult.total });
			}

			this.setState({
				active: this.state.activeItem
			});
		}
	}

	dragStart(dataItem) {
		this.setState({
			gridData: this.state.dataResult.data,
			activeItem: dataItem
		});
	}

	showColor = (customizedRow, available) => {
		if(!customizedRow){
			return false;
		}

		let value = customizedRow.value;
		let result = false;
		let operator = customizedRow.operator;
		if (operator === ">=") {
			result = (available >= value) ? true : false;
		}
		if (operator === "<=") {
			result = ((available <= value) ? true : false)
		}
		if (operator === ">") {

			result = (available > value) ? true : false;
		}
		if (operator === "<") {
			result = (available < value) ? true : false;
		}
		if ((operator === "=") || (operator === "==") || (operator === "===")) {
			result = (available === parseInt(value)) ? true : false;
		}
		return result;
	}

	styleRows = (trElement, props) => {
		let { customizedRow } = this.state.style;

		if (customizedRow) {
			const available = props.dataItem[customizedRow.field];
			const trProps = { style: (this.showColor(customizedRow, available)) ? customizedRow.style : {} };
			return React.cloneElement(trElement, { ...trProps }, trElement.props.children);
		} else {
			const trProps = { style: {} };
			return React.cloneElement(trElement, { ...trProps }, trElement.props.children);
		}
	}

	render() {
		const options = this.props.options;
		const { dataProducts, dataResult, otherGridOptions, exportOptions, pageable, style, loadOnce, allEditable, rowInEditMode, externalEditMode, allowNewRow, externalEditItem, filterable, groupable, showColumns, showExportPdfColumns, sortable, selectionMode, dataState, isSavingChanges, isLoadingData, advanced, headerAllSelection, dataUrl } = this.state;

		return (
			<LocalizationProvider language={this.state.currentLocale.language}>
				<IntlProvider locale={this.state.currentLocale.locale} >
					<div className="VS-Parent">
						{(options.globalSearch) ?
							<label className="VS-SearchLabel" >Search:&nbsp;
								<input className="VS-GlobalSearch" type="text" placeholder="Search in entire columns"
									{...dataState} onChange={this.globalSearch}
								></input></label> : ""}
						<ExcelExport
							data={dataResult}
							ref={(exporter) => { this._export = exporter; }} />

						<Grid
							id="kendo-grid"
							ref={(grid) => { this._grid = grid; }}
							style={style.gridStyle}
							rowRender={this.styleRows}
							pageable={(options.pageable) ? pageable : null}
							onScroll={(options.pageable) ? null : this.scrollHandler}
							{...otherGridOptions}
							selectedField="selected"
							editField={((rowInEditMode === true || allEditable === true) && (externalEditMode === false)) ? "inEdit" : ""}
							sortable={sortable}
							data={(loadOnce === true) ? dataProducts : dataResult}
							{...dataState}
							detail={(advanced && (advanced.masterDetail || advanced.detailRows)) ? detailColumn(this.props) : null}
							filterOperators={DEFAULT_FILTER_OPERATORS}
							groupable={groupable}
							filterable={filterable}
							onFilterChange={(filterable === false) ? this.onFilterChange : (false || null)}
							onCloseMenu={(filterable === false) ? this.onCloseMenu : (false || null)}
							onDataStateChange={this.dataStateChange}
							onPageChange={this.pageChange}
							onHeaderSelectionChange={this.headerSelectionChange}
							onSelectionChange={this.selectionChange}
							onExpandChange={this.expandChange}
							onItemChange={this.onItemChange}
							onRowClick={(e) => {
								this.selectionChange(e)
							}}
							expandField="expanded"
						>
							<GridToolbar>
								{(exportOptions.toExcel === true && selectionMode === false) ?
									<div className="VS-dropdown">
										<button
											title="Export to Excel"
											className="k-button k-primary VS-PullLeft VS-Grid-Export-Dropdown"
										> Export to Excel
										</button>
										{
											this.renderExportColumns('excel')
										}
									</div>
									: ""
								}

								{(exportOptions.toPDF === true && selectionMode === false) ?
									<div className="VS-dropdown">
										<button
											className="k-button k-primary VS-PullLeft VS-Grid-Export-Dropdown"
										>Export to PDF
										</button>
										{
											this.renderExportColumns('pdf')
										}
									</div> :
									""}
								{
									(selectionMode === false) ?
										<button className="k-button k-primary VS-PullLeft" onClick={this.toSelectionMode}>Select Rows</button> : ""
								}
								{
									(selectionMode === true) ?
										<div className="VS-Grid-Export-Buttons">
											{
											(exportOptions.toExcel === true)?
												<button className="k-button k-primary VS-PullLeft" onClick={() => this.exportExcel(true)}>
													Export Selected to Excel
												</button> : ''
											}
											{
											(exportOptions.toPDF === true)?
												<button className="k-button k-primary VS-PullLeft" onClick={() => this.exportPDF(true)}>
													Export Selected to PDF
												</button> : ''
											}
										</div> : ""
								}
								{
									(selectionMode === true) ?
										<button className="k-button k-primary VS-Grid-Export-Dropdown VS-PullLeft" onClick={this.exitSelectionMode}>
											<span className="k-icon k-i-logout" /></button> : ""
								}

								{
									(selectionMode === true) ?
										<div className="VS-Grid-Selection-Dropdown">
											<button className="k-button k-primary VS-PullLeft" onClick={this.showHideSelectionOptions}>
												<span className="k-icon k-i-list-bulleted" />
											</button>
											{
												this.renderShowHideSelection()
											}
										</div> : ""
								}

								{
									(allowNewRow === true || rowInEditMode === true || allEditable === true) ?
										<button
											title="Add new"
											className={this.getChangedButtonClasses()}
											onClick={this.cancelChanges}
										>
											Cancel changes
									</button> : ""
								}
								{
									(allowNewRow === true || rowInEditMode === true || allEditable === true) ?
										<button
											title="Add new"
											className={this.getChangedButtonClasses()}
											onClick={this.saveChanges}
										>
											Save changes
									</button> : ""
								}
								{
									(allowNewRow === true) ?
										<button
											title="Add new"
											className="k-button k-primary VS-PullRight"
											onClick={this.addNewRow}
										>
											Add new
									</button> : ""
								}
							</GridToolbar>
							{

								(selectionMode === true) ?
									<GridColumn
										field="selected"
										width="120px"
										headerSelectionValue={headerAllSelection}
									/> : ""
							}
							{
								(this.props.options.reorderRows === true) ?
									<GridColumn
										title="" width="80px" cell={DragCell}
									/> : ""
							}
							{
								(options.reorderableRows === true) ?
									<GridColumn
										title="" width="80px" cell={DragCell}
									/> : ""
							}
							{
								showColumns.map((column, index) => this.renderGrid(column, index))
							}
							{
								(rowInEditMode === true) ?
									<GridColumn cell={this.CommandCell} width="240px" filterable={false} /> : ""
							}
						</Grid>

						<GridPDFExport ref={(element) => { this._pdfExport = element; }}
						>
							{
								showExportPdfColumns.map((column, index) => this.rendePdfExportColumns(column, index))
							}
							{
								<Grid
									style={style}
									pageable={pageable}
									{...otherGridOptions}
									selectedField="selected"

									data={(loadOnce === true) ? dataProducts : dataResult}
									{...dataState}

									filterOperators={DEFAULT_FILTER_OPERATORS}

									onDataStateChange={this.dataStateChange}
									onSelectionChange={this.selectionChange}
									onHeaderSelectionChange={this.headerSelectionChange}

									onExpandChange={this.expandChange}
									expandField="expanded"
								>
								</Grid>
							}
						</GridPDFExport>
						{
							externalEditMode === true && externalEditItem && <DialogContainer dataItem={externalEditItem} saveExternalForm={(e) => this.saveExternalForm(e)} cancelExternalForm={this.cancelExternalForm} />
						}
						<DataLoader
							dataState={dataState}
							onDataRecieved={this.dataRecieved}
							displayTheError={this.displayTheError}
							options={this.props.options}
							dataUrl={dataUrl}
							loadOnce={otherGridOptions.loadOnce}
						/>
						{
							(isSavingChanges || isLoadingData) ?
								<Loader /> : ''
						}
					</div>
				</IntlProvider>
			</LocalizationProvider>
		);
	}
}

export default FxGrid;