import React from 'react';
import axios from 'axios';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { DialogContainer } from './dialogContainer.jsx';
import { EditCustomCell, HeaderCell } from './customCell.jsx';
import { DataLoader } from './data-loader.jsx';
import { Loader } from './loader.jsx';
import { EditCommandCell } from './editCommandCell.jsx';
import { CustomColumnMenu } from './customColumnMenu.jsx';
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
import { detailColumn } from '../grid/detailColumn';
import esMessages from './../es.json';
import { process } from '@progress/kendo-data-query';
import { locales, isEmpty, isUndefinedOrNull, formatter } from '../../utils/utils'
import { resetGridOptions, resetFilterOptions, resetDataState, resetPageable, resetStyle, DEFAULT_FILTER_OPERATORS, resetSortable, cloneData, isShowModeAll, isShowModeSelected, isShowModeUnselected, SHOW_MODES, resetExportOptions } from '../../utils/gridutils'
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
	_export;
	_grid;
	_pdfExport;

	constructor(props) {
		super(props);
		let { options } = this.props;

		let { dataState, otherGridOptions, filterOptions, pageable, style, aggregates, dataUrl, showColumns, dataOperations, selectedRowPrimaryKey, sortable, exportOptions, advanced } = options;

		let newDataState = (isUndefinedOrNull(dataState)) ? resetDataState({}) : resetDataState(dataState);
		let newOtherOptions = (isUndefinedOrNull(otherGridOptions)) ? resetGridOptions({}) : resetGridOptions(otherGridOptions);
		let newFilterOptions = (isUndefinedOrNull(filterOptions)) ? resetFilterOptions({}) : resetFilterOptions(filterOptions);
		let newExportOptions = (isUndefinedOrNull(exportOptions)) ? resetExportOptions({}) : resetExportOptions(exportOptions);
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
			isShowSelectionOption: false,
			dataUrl: dataUrl,
			allowUnsort: this.props.options.allowUnsort,
			multiple: this.props.options.multipleSort,
			scrollCounter: 1,
			pdfDataResult: [],
			pdfDataProducts: [],
			isExporting: false,
			

			dataResult: [],
			dataProducts: [],

			defaultDataResult: [],
			defaultDataProducts: [],
			dataState: { ...newDataState },
			defaultDataState: { ...newDataState },
			otherGridOptions: newOtherOptions,
			exportOptions: newExportOptions,
			filterOptions: newFilterOptions,
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
			expandField: (newOtherOptions.expandField === true),
			groupable: (newOtherOptions.groupable === true),
			allEditable: (newOtherOptions.allEditable === true),
			filterMode: (newFilterOptions.filterMode === "row") ? newFilterOptions.filterMode : "menu",
			filterable: (newFilterOptions.filterable === true),
			sortable: { ...newSortable },
			isMultiValueFilter: (newFilterOptions.isMultiValueFilter === true),
			showColumns: showColumns,
			showExportExcelColumns: [],
			showExportPdfColumns: [],
			exportExcelColumns: [],
			exportPdfColumns: [],

			allColumns: [],
			primaryKey: (dataOperations.primaryKey) ? dataOperations.primaryKey : "",
			dataOperations: dataOperations,
			changedData: { 'newAdded': [], 'updated': [], 'removed': [], 'isChanged': false },
			isSavingChanges: false,
			addEditRows: [],
			externalEditItem: undefined,
			selectedRowPrimaryKey: (selectedRowPrimaryKey) ? selectedRowPrimaryKey : null
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
		this.setShowDataMode = this.setShowDataMode.bind(this);
	}

	// Component lifecycle methods started
	componentDidMount() {
		this.updateExportColumns();
	}

	componentDidUpdate(prevProps, prevState) {

	}
	// Component lifecycle methods end


	updateExportColumns = () => {
		const {showColumns} = this.state;

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
		console.log(' expandChange ', event);
		const isExpanded =
			event.dataItem.expanded === undefined ?
				event.dataItem.aggregates : event.dataItem.expanded;
		event.dataItem.expanded = !isExpanded;

		this.setState({ ...this.state });
	}

	exportExcel = () => {
		let { exportOptions, isExporting, showColumns, dataResult, dataState, exportExcelColumns } = this.state;

		// this.setState({
		// 	isExporting: true
		// });

		if (exportOptions && exportOptions.allPages === true) {
			this._export.save(dataResult.data, exportExcelColumns);
		} else {
			console.log(this._grid.columns, ' else ', exportExcelColumns);
			this._export.save((process(dataResult.data, dataState)).data, exportExcelColumns);
		}
	}

	exportPDF = () => {
		let { exportOptions, dataProducts, dataResult, dataState, exportPdfColumns } = this.state;

		this.setState({
			pdfDataResult: cloneData(dataResult),
			pdfDataProducts: cloneData(dataProducts),
			isExporting: true
		});

		if (exportOptions && exportOptions.allPages === true) {
			this._pdfExport.save(dataResult.data, exportPdfColumns);
		} else {
			this._pdfExport.save((process(dataResult.data, dataState)).data, exportPdfColumns);
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

	postRequest = (url, body, callback) => {
		axios.post(url, body)
			.then((response) => {
				console.log(response);
				callback(null, response);
			})
			.catch((error) => {
				console.log(error);
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
		let { filter } = e;
		let currentFilter = (!filter) ? undefined : this.state.filter;
		let _filter = (isUndefinedOrNull(currentFilter)) ? undefined : currentFilter;

		if (filter) {
			_filter['filters'].push(filter);
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
		console.log(this.state.defaultDataState, 'e.data', e.data);
		this.setState({
			...this.state,
			dataState: { ...e.data },
			defaultDataState: { ...e.data },
			dataProducts: (process(this.state.dataResult.data, e.data)),
			dataResult: { data: (process(this.state.dataResult.data, e.data)).data, total: this.state.dataResult.total }
		});
	}

	pageChange = (event) => {
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
		let { loadOnce, dataResult, dataProducts, groupable, expandField } = this.state;

		if (groupable === true) {

			if (loadOnce === true) {
				const result1 = [...dataProducts.data];
				const result2 = [...dataResult.data];

				const data1 = result1.map(obj => ({ ...obj, expanded: expandField }));
				const data2 = result2.map(obj => ({ ...obj, expanded: expandField }));

				this.setGridData({ data: [...data2], total: dataResult.total }, { data: [...data1], total: dataProducts.total });
			} else {
				const result2 = [...dataResult.data];
				const data = result2.map(obj => ({ ...obj, expanded: expandField }));
				this.setGridData({ data: [...data], total: dataResult.total }, { ...dataProducts });
			}
		}
	}

	dataRecieved = (data) => {
		let { loadOnce, groupable, selectedRowPrimaryKey, primaryKey, headerAllSelection } = this.state;

		if (headerAllSelection === true) {
			const newData = data.data.map((item, index) => ({ ...item, selected: true }));

			this.setGridData((loadOnce === false && groupable === true) ? { data: (process(newData, this.state.defaultDataState)).data, total: data.total } : { data: newData, total: data.total }, (process(newData, this.state.dataState)));

			this.setDefaultList();

			this.setState({
				headerAllSelection: true
			});

		} else {

			const newData = cloneData(data.data).map((item, index) => ({ ...item, selected: false, HtmlField: "<button></button>" }));

			this.setGridData((loadOnce === false && groupable === true) ? { data: (process(newData, this.state.defaultDataState)).data, total: data.total } : { data: newData, total: data.total }, (process(newData, this.state.dataState)));

			if (selectedRowPrimaryKey && primaryKey) {
				// const data1 = data.data.map((item, index) => ({ ...item, selected: item[primaryKey] === selectedRowPrimaryKey }));
				const originalItem = newData.find(p => p[primaryKey] === selectedRowPrimaryKey);
				if (originalItem) {
					this.rowClick({ dataItem: originalItem })
				}
			}

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
					console.log(' dataResult ', dataResult);
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
		console.log(currentDataProducts, ' newDataProducts ', cloneData(newDataProducts));

		setTimeout(() => {
			this.setState({
				defaultDataResult: cloneData(newDataResult),
				defaultDataProducts: cloneData(newDataProducts)
			});
		}, 10);
	}

	updateDataResultByDataMode = (showDataMode) => {
		let { dataResult, dataProducts, loadOnce, defaultDataResult, defaultDataProducts } = this.state;

		if (isShowModeAll(showDataMode)) {
			console.log(defaultDataProducts, ' defaultDataResult ', defaultDataResult);
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
				console.log(' defaultDataResult ', defaultDataResult);
				let data1 = (cloneData(defaultDataResult.data)).filter(item => (item.selected === flag));

				console.log(' data1 ', data1);
				this.setState({
					...this.state,
					dataResult: { data: data1, total: defaultDataResult.total }
				});
			}
		}
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
			"skip": this.props.options.dataState.skip,
			"take": this.props.options.dataState.take,
			"sort": this.props.options.dataState.sort,
			"group": this.props.options.dataState.group
		}
		console.log('eventData', eventData);
		this.setState({
			...this.state,
			// dataState: eventData,
			// dataResult: (process(this.state.dataResult.data, eventData)),
			dataProducts: (process(this.state.dataResult.data, eventData))
		})
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
			<GridColumn key={'parent'} title={parentColumn.title}>
				{
					results.map((childColumn, subIndex) => this.renderChildColumn(parentColumn, childColumn, subIndex))
				}
			</GridColumn>
		);
	}
	iscellheader = (column) => {

	}
	renderChildColumn(parentColumn, childColumn, index) {

		let { isMultiValueFilter, showColumns, allColumns, dataResult, addEditRows, allEditable, filterMode, filterable } = this.state;

		if (childColumn.isParent === true) {
			let results = showColumns.filter(item => (item.parentName === childColumn.name));

			if (results && results.length > 0) {
				return this.renderParentColumn(childColumn, index, results);
			} else {
				return "";
			}
		} else {
			let htmlElementObject = showColumns.find(o => o.field === childColumn.field);
			let columnObject = (dataResult && dataResult.data) ? dataResult.data.map(a => a[childColumn.field])
				: {};
			let editable = (htmlElementObject && htmlElementObject.editable === false) ? false : true;
			if (htmlElementObject && addEditRows.length <= 0 && allEditable === false) {
				this.CustomCellUI = EditCustomCell({
					htmlElementObject: htmlElementObject,
					columnObject: columnObject,
					title: columnObject[index]
				});
				return (
					<GridColumn key={index} field={childColumn.field} width={childColumn.width} locked={(childColumn.locked) ? true : false} title={childColumn.title} filter={childColumn.filter} data={childColumn.data} editor="text" editable={editable} headerCell={HeaderCell(childColumn)} cell={this.CustomCellUI} columnMenu={(filterMode === 'menu' && filterable === false) ?
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
					htmlElementObject: {},
					columnObject: {},
					title: childColumn.title
				});
				return (
					<GridColumn key={index} field={childColumn.field} width={childColumn.width} locked={(childColumn.locked) ? true : false} title={childColumn.title} filter={childColumn.text} data={childColumn.data} editor="text" editable={editable} cell={this.CustomCellUI} headerCell={HeaderCell(childColumn)} columnMenu={(filterMode === 'menu' && filterable === false) ?
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

		console.log(this.state.showExportColumns, ' type ', type);
		let newShowExportColumns = cloneData(showExportColumns);

		newShowExportColumns.forEach((element) => {
			element.isExport = false;
		});

		if(type === 'pdf'){
			this.setState({
				showExportColumns: cloneData(newShowExportColumns),
				exportPdfColumns: []
			});
		} else {
			this.setState({
				showExportColumns: cloneData(newShowExportColumns),
				exportExcelColumns: []
			});
		}
	}

	handleExportColumnCheckChange = (event, column, type) => {
		let isChecked = event.target.checked;
		let { exportExcelColumns, exportPdfColumns, showExportExcelColumns, showExportPdfColumns, showColumns } = this.state;

		let index = showExportExcelColumns.findIndex((x) => x.field === column.field);

		if (type === 'pdf') {
			index = showExportPdfColumns.findIndex((x) => x.field === column.field);
		}

		// let newExportExcelColumns = cloneData(exportExcelColumns);
		// let newExportPdfColumns = cloneData(exportPdfColumns);
		
		let newShowExportExcelColumns = cloneData(showExportExcelColumns);
		let newShowExportPdfColumns = cloneData(showExportPdfColumns);

		if (type === 'pdf') {
			newShowExportPdfColumns.forEach((element, i) => {
				if(i === index){
					newShowExportPdfColumns[i].isExport = isChecked;
				}
			});
		} else {
			newShowExportExcelColumns.forEach((element, i) => {
				if(i === index){
					newShowExportExcelColumns[i].isExport = isChecked;
					console.log(newShowExportExcelColumns, ' showColumns ', showColumns, element, i);
				}
			});
		}

		// if (isChecked === true && index === -1) {
		// 	if (type === 'pdf') {
		// 		newExportPdfColumns.push(column);
		// 	} else {
		// 		newExportExcelColumns.push(column);
		// 	}
		// } else if (isChecked === false && index !== -1) {
		// 	if (type === 'pdf') {
		// 		newExportPdfColumns.splice(index, 1);
		// 	} else {
		// 		newExportExcelColumns.splice(index, 1);
		// 	}
		// }

		this.setState({
			showExportExcelColumns: cloneData(newShowExportExcelColumns),
			showExportPdfColumns: cloneData(newShowExportPdfColumns)
		});
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
						onChange={(e) => this.handleExportColumnCheckChange(e, column, type)}
						checked={column.isExport}
					/>
					{column.title}
				</label>
			</div>
		);
	}

	renderExportColumns(type) {
		const { showExportExcelColumns, showExportPdfColumns, isExporting, exportExcelColumns, exportPdfColumns } = this.state;
		let columns = (type === 'pdf')? cloneData(showExportPdfColumns) : cloneData(showExportExcelColumns);

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
										<button className={((exportExcelColumns.length <= 0) ? 'k-state-disabled ' : '') + 'k-button k-primary VS-PullRight'} onClick={this.exportExcel}>ok</button> :
										<button className={((exportPdfColumns.length <= 0) ? 'k-state-disabled ' : '') + 'k-button k-primary VS-PullRight'} onClick={this.exportPDF}>ok</button>
								}
							</div>
							: 'Exporting'
					}
				</div>
			)
		}
	}

	setShowDataMode = (value) => {
		const { defaultDataResult } = this.state;

		if (isShowModeAll(value)) {

			this.setState({
				showDataMode: value
			});

			this.updateDataResultByDataMode(value);
		} else {
			let _data = defaultDataResult.data.find(o => (o.selected === true));
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

	showModeOptions = (mode, index) => {
		const { showDataMode } = this.state;
		return (
			<label
				htmlFor={`column-visiblity-show-${mode}-${index}`}
				className="k-checkbox-label"
				style={{ userSelect: 'none' }}
			>
				<input
					id={`column-visiblity-show-${mode}-${index}`}
					className="k-checkbox"
					type="checkbox"
					checked={showDataMode === mode}
				/>
				{(isShowModeSelected(mode)) ? 'Show Selected' : (isShowModeUnselected(mode)) ? 'Show UnSelected' : 'Show All'}
			</label>
		)
	}

	renderShowHideSelection() {
		const { showDataMode } = this.state;
		return (
			<div className="VS-Grid-Selection-Items">
				{/* {SHOW_MODES.map((mode, index) => this.showModeOptions(mode, index))} */}
				<div className={this.getSelectedClass('Selected')}><span onClick={() => this.setShowDataMode('Selected')}>Show Selected</span></div>
				<div className={this.getSelectedClass('UnSelected')}><span onClick={() => this.setShowDataMode('UnSelected')}>Show Unselected</span></div>
				<div className={this.getSelectedClass('All')}><span onClick={() => this.setShowDataMode('All')}>Show All</span></div>
			</div>
		)
	}

	isLockedField = (column) => {
		let lockedColumns = this.props.options.lockedColumns;
		if (lockedColumns.includes(column.field))
			return true;
		else
			return null
	}

	renderGrid(column, index) {
		let { aggregates, showColumns, dataResult } = this.state;

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
						let total = (dataResult && dataResult.data) ? dataResult.data.reduce((prev, next) => prev + next['value'], 0) : 0;
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
						<GridColumn key={index} field={column.field} width={column.width} locked={this.isLockedField(column)} title={column.title} filter={column.filter} data={column.data} footerCell={aggregatesCell} />
					)
				} else {
					return (
						<GridColumn key={index} field={column.field} width={column.width} locked={this.isLockedField(column)} title={column.title} filter={column.filter} data={column.data} />
					)
				}
			} else {
				return (
					this.renderChildColumn("", column, index)
				)
			}
		}
	}

	selectionChange = (event) => {
		let { loadOnce, primaryKey, dataProducts, dataResult } = this.state;
		let selectedRowPrimaryKey = event.dataItem[primaryKey];

		if (loadOnce === true) {
			const result1 = cloneData(dataProducts.data);
			const result2 = cloneData(dataResult.data);
			const data1 = result1.map((item, index) => ({ ...item, selected: ((item[primaryKey] === selectedRowPrimaryKey && !item.selected) || (item[primaryKey] !== selectedRowPrimaryKey && item.selected)) ? true : false }));
			const data2 = result2.map((item, index) => ({ ...item, selected: ((item[primaryKey] === selectedRowPrimaryKey && !item.selected) || (item[primaryKey] !== selectedRowPrimaryKey && item.selected)) ? true : false }));

			this.setDefaultList({ data: [...data2], total: dataResult.total }, { data: [...data1], total: dataProducts.total });
			this.setGridData({ data: [...data2], total: dataResult.total }, { data: [...data1], total: dataProducts.total });

			// this.setState({ dataResult });
			this.setHeaderAllSelection(data1);
		} else {
			const result2 = cloneData(dataResult.data);

			const data2 = result2.map((item, index) => ({ ...item, selected: ((item[primaryKey] === selectedRowPrimaryKey && !item.selected) || (item[primaryKey] !== selectedRowPrimaryKey && item.selected)) ? true : false }));

			this.setDefaultList({ data: [...data2], total: dataResult.total });
			this.setGridData({ data: [...data2], total: dataResult.total }, {});
			// this.setState({ dataProducts });
			this.setHeaderAllSelection(data2);
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
		const { loadOnce, dataResult, dataProducts, headerAllSelection } = this.state;
		let flag = true;
		// const _data = (loadOnce === true)? dataProducts.data : dataResult.data;
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

	// getHeaderSelection = () => {
	// 	const { loadOnce, dataResult, headerAllSelection } = this.state;
	// 	if(isUndefinedOrNull(dataResult) || isUndefinedOrNull(dataResult.data)){
	// 		return false;
	// 	} else if(headerAllSelection === true){
	// 		return true;
	// 	} else {
	// 		let flag = true;
	// 		let obj = dataResult.data.find(o => (isUndefinedOrNull(o.selected) || o.selected === false));
	// 		if(obj){
	// 			flag = false;
	// 		}
	// 		return flag;
	// 	}
	// }

	headerSelectionChange = (event) => {
		const { loadOnce, primaryKey, dataProducts, dataResult, headerAllSelection } = this.state;
		let isSelected = !headerAllSelection;

		if (loadOnce === true) {
			const result1 = [...dataProducts.data];
			const result2 = [...dataResult.data];
			const data1 = result1.map((item, index) => ({ ...item, selected: isSelected }));
			const data2 = result2.map((item, index) => ({ ...item, selected: isSelected }));

			this.setGridData({ data: [...data2], total: dataResult.total }, { data: [...data1], total: dataProducts.total });
		} else {
			const result2 = [...dataResult.data];
			const data2 = result2.map((item, index) => ({ ...item, selected: isSelected, hidden: true }));
			this.setGridData({ data: [...data2], total: dataResult.total }, { data: dataProducts.data, total: dataProducts.total });
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

	showHideSelectionOptions = () => {
		this.setState({
			isShowSelectionOption: !this.state.isShowSelectionOption
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
		if (this.state.activeItem === dataItem) {
			return;
		}

		const { loadOnce, dataResult, dataProducts } = this.state;
		let reorderedData = (loadOnce === true) ? dataProducts.data.slice() : dataResult.data.slice();
		let prevIndex = reorderedData.findIndex(p => (p === this.state.activeItem));
		let nextIndex = reorderedData.findIndex(p => (p === dataItem));
		reorderedData.splice(prevIndex, 1);
		reorderedData.splice(nextIndex, 0, this.state.activeItem);

		if (loadOnce === true) {
			this.setGridData({ data: reorderedData, total: this.state.dataProducts.total }, { data: reorderedData, total: this.state.dataResult.total });
		} else {
			this.setGridData({ data: reorderedData, total: this.state.dataResult.total }, { data: reorderedData, total: this.state.dataResult.total });
		}

		this.setState({
			active: this.state.activeItem
		});
	}

	dragStart(dataItem) {
		this.setState({
			gridData: this.state.dataResult.data,
			activeItem: dataItem
		});
	}
	showColor = (customizedRow, available) => {
		let value = customizedRow.value;
		let result = false;
		let operator = customizedRow.operator;
		if (operator === ">=") {
			result = (value >= available) ? true : false;
		}
		if (operator === "<=") {

			result = ((value <= available) ? true : false)

		}
		if (operator === ">") {

			result = (value > available) ? true : false;
		}
		if (operator === "<") {
			result = (value < available) ? true : false;
		}
		if ((operator === "=") || (operator === "==") || (operator === "===")) {
			result = (parseInt(value) === available) ? true : false;
		}
		return result;
	}

	styleRows = (trElement, props) => {
		let options = this.props.options.style;
		const available = props.dataItem[options.customizedRow.field];
		const customizedRow = options.customizedRow;
		const red = { backgroundColor: "#ffffff;" };
		const color1 = options.customizedRow.style;
		const trProps = { style: (this.showColor(customizedRow, available)) ? color1 : red };
		return React.cloneElement(trElement, { ...trProps }, trElement.props.children);
	}

	render() {
		const options = this.props.options;
		const { dataProducts, dataResult, pdfDataProducts, pdfDataResult, otherGridOptions, exportOptions, pageable, style, loadOnce, allEditable, rowInEditMode, externalEditMode, allowNewRow, externalEditItem, filterable, groupable, showColumns, sortable, selectionMode, isShowSelectionOption, dataState, isSavingChanges, advanced, headerAllSelection } = this.state;

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
							ref={(exporter) => { this._export = exporter; }}
						/>
						<Grid
							ref={(grid) => { this._grid = grid; }}
							style={style}
							pageable={pageable}
							{...otherGridOptions}
							selectedField="selected"
							editField={((rowInEditMode === true || allEditable === true) && (externalEditMode === false)) ? "inEdit" : ""}
							sortable={sortable}
							data={(loadOnce === true) ? dataProducts : dataResult}
							{...dataState}
							detail={(advanced && advanced.masterDetail) ? detailColumn(this.props) : (advanced && advanced.detailRows) ? advanced.detailRows : null}
							filterOperators={DEFAULT_FILTER_OPERATORS}
							onScroll={this.scrollHandler}
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
								this.rowClick(e)
							}}
							expandField="expanded"
						>
							<GridToolbar>
								Locale:
								<DropDownList
									value={this.state.currentLocale}
									textField="language"
									onChange={(e) => { this.setState({ currentLocale: e.target.value }); }}
									data={this.locales} />

								{(exportOptions.toExcel) ?
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

								{(exportOptions.toPDF) ?
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
									(options.reorderableRows === true) ?
										<GridColumn
											title="" width="80px" cell={DragCell}
										/> : ""
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
								<Grid
									style={style}
									pageable={pageable}
									{...otherGridOptions}
									selectedField="selected"

									data={(loadOnce === true) ? pdfDataProducts : pdfDataResult}
									{...dataState}

									filterOperators={DEFAULT_FILTER_OPERATORS}

									onDataStateChange={this.dataStateChange}
									onSelectionChange={this.selectionChange}
									onHeaderSelectionChange={this.headerSelectionChange}

									onExpandChange={this.expandChange}
									expandField="expanded"
								>
									{
										showColumns.map((column, index) => this.renderGrid(column, index))
									}
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
							loadOnce={otherGridOptions.loadOnce}
						/>
						{
							(isSavingChanges) ?
								<Loader /> : ''
						}
					</div>
				</IntlProvider>
			</LocalizationProvider>
		);
	}
}

export default FxGrid;