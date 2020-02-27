import React from 'react';
import { isValidUIElement } from '../../utils/utils';
import { GridCell } from '@progress/kendo-react-grid';
var isHTML = function (str){
    return /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/.test(str);
}

export function HeaderCell(column) {
    return class HeaderCell extends React.Component {
        render() {
        return (
            <a className="k-link" onClick={this.props.onClick}>
            <span title={column.title}>{this.props.title}</span>
                {this.props.children}
            </a>
        );
    }
  }
}

export function EditCustomCell({ htmlElementObject, columnObject, title }) {

    return class extends GridCell {
        constructor(props) {
            super(props);

            this.state = {
                dataItem: this.props.dataItem,
                htmlElementObject: htmlElementObject,
                columnObject: columnObject,
                value: (this.props.dataItem && htmlElementObject.field) ? this.props.dataItem[htmlElementObject.field] : ""
            };
        }

        getRowElementByType = (type, key, isRequired, value) => {
            if (type === 'radio') {
                return [
                    {
                        "elementType": "input",
                        "props": {
                            "type": "radio",
                            "id": key,
                            "name": key
                        },
                        "elementLabel": {
                            "name": "yes"
                        }
                    },
                    {
                        "elementType": "input",
                        "props": {
                            "type": "radio",
                            "id": key,
                            "name": key
                        },
                        "elementLabel": {
                            "name": "no"
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
                            "title": key
                        }
                    }
                ];
            }
        }

        getDisplayValue = () => {
            let { dataItem, htmlElementObject } = this.state;
            let value = (dataItem && htmlElementObject.field) ? dataItem[htmlElementObject.field] : "";

            if (htmlElementObject.htmlElement && isValidUIElement(htmlElementObject.htmlElement)) {
                let htmlElement = htmlElementObject.htmlElement;
                let rowObj = {
                    "rowElements": this.getRowElementByType(htmlElement.type, htmlElementObject.field, htmlElement.required, value),
                    "rowLabel": {
                        "name": "",
                        "props": {
                            "class": "vs-body-regular-primary"
                        }
                    }
                }

                let formJson = {
                    "form": {
                        "props": {
                            "action": "https://www.fintellix.com",
                            "method": "post"
                        }
                    },
                    "rows": []
                }

                formJson['rows'].push(rowObj);

                // let str = "<div>{value}</div>";
                // str = str.replace("{value}", value);

                // return <FormGenerator options={formJson} />;
                return value;
            } else {
                return value;
            }
        }

        render() {
            const { value } = this.state;
            // return (
            //     <td title={value} >{value}</td>
            // );
            return (
                (value && 
                isHTML(value.toString())) ?
                    <td><div dangerouslySetInnerHTML={{__html: "<p><progress value='50' max='100'>50%</progress> A progress displaying 50%.</p>"}}></div></td> :
                    <td>{value}</td>
            );
        }
    }
}
