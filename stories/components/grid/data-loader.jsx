import React from 'react';
import { toODataString } from '@progress/kendo-data-query';
import {Loader} from './loader.jsx';

export class DataLoader extends React.Component {
    
    baseUrl = this.props.dataUrl;
    init = { method: 'GET', accept: 'application/json', headers: {} };

    lastSuccess = '';
    pending = '';

    displayTheError = (errorMessage) => {
        this.props.displayTheError(errorMessage);
    }

    requestDataIfNeeded = () => {
        if ((!this.baseUrl && this.pending) || (this.lastSuccess !== "" && this.props.loadOnce === true) || (toODataString(this.props.dataState) === this.lastSuccess)) {
            return;
        }
        this.pending = toODataString(this.props.dataState);
        fetch(this.baseUrl + ((this.props.loadOnce === true)? "" : this.pending), this.init)
            .then(response => response.json())
            .then(json => {
                this.lastSuccess = this.pending;
                this.pending = '';
                if (toODataString(this.props.dataState) === this.lastSuccess) {
                    this.props.onDataRecieved.call(undefined, {
                        data: json.value,
                        total: json['@odata.count']
                    });
                } else {
                    this.requestDataIfNeeded();
                }
            }).catch( err => {
                this.displayTheError(err)
            });
    }

    render() {
        this.requestDataIfNeeded();
        return this.pending && <Loader />;
    }
}
