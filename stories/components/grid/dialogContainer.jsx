
import React from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { FormGenerator } from '../FormGenerator/form-generator';
import { isObject, isBoolean, isNumber } from '../../utils/utils';

export class DialogContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			externalEditItem: this.props.dataItem || null,
			formJson: {
				"form": {
					"props": {
						"action": "https://www.fintellix.com",
						"method": "post"
					}
				},
				"rows": []
			}
		};
	}

    componentDidMount() {
		this.setState({
			formJson: this.generateFormJson(this.state.externalEditItem)
		});
	}

	getRowElementByType = (type, key, isRequired, value) => {
		if(type === 'radio'){
			return [
				{ 
					"elementType":"input",
					"props":{ 
					   "type":"radio",
					   "id":key,
					   "name":key,
					   "onChange": (e) => {this.onDialogInputChange(e, type, key, true)}
					},
					"elementLabel":{ 
					   "name":"yes"
					}
				},
				{ 
					"elementType":"input",
					"props":{ 
					   "type":"radio",
					   "id":key,
					   "name":key,
					   "onChange": (e) => {this.onDialogInputChange(e, type, key, false)}
					},
					"elementLabel":{ 
					   "name":"no"
					}
				}
			];
		} else {
			return [
				{
					"elementType": "input",
					"props": {
						"type": type,
						"id": key,
						"className": "vs-textbox",
						"required": isRequired,
						"value": value,
						"title": key,
						"onChange": (e) => {this.onDialogInputChange(e, type, key, value)}
					}
				}
			];
		}
	}

	generateFormJson = (externalEditItem) => {
		let { formJson } = this.state;

		let currentFormJson = {...formJson}

		currentFormJson['rows'] = [];

		if (externalEditItem) {
			for (let key in externalEditItem) {
				let value = externalEditItem[key];

				if(!isObject(value) && key !== 'isNew' && key !== 'inEdit' && key !== 'selected'){
					let type = (isNumber(value))? 'number' : (isBoolean(value))? 'radio' : 'text';
					let isRequired = false;
					let rowObj = {
						"rowElements": this.getRowElementByType(type, key, isRequired, value),
						"rowLabel": {
							"name": key,
							"props": {
								"class": "vs-body-regular-primary"
							}
						}
					}
	
					currentFormJson['rows'].push(rowObj);
				}
			}
			return currentFormJson;
		} else {
			return currentFormJson;
		}
	}

	handleSubmit(event) {
		event.preventDefault();
	}

	onDialogInputChange = (event, type, key, value) => {
		let target = event.target;
		const newValue = target.type === 'checkbox' ? target.checked : (type === 'number')? parseInt(target.value) : (type === 'radio')? value : target.value;
		const name = key;

		const edited = this.state.externalEditItem;
		edited[name] = newValue;

		this.setState({
			externalEditItem: edited,
			formJson: this.generateFormJson(edited)
		});
	}

	render() {
		return (
			<Dialog
				className="VS-DialogWrapper"
				onClose={this.props.cancel}
			>
				<FormGenerator options={this.state.formJson} />

				<DialogActionsBar>
					<button
						className="k-button VS-FormCancelButton"
						onClick={this.props.cancelExternalForm}
						>
							Cancel
					</button>
						<button
							className="k-button k-primary VS-FormSaveButton"
							onClick={this.props.saveExternalForm}
						>
							Save
					</button>
				</DialogActionsBar>
			</Dialog>
		);
	}
}
