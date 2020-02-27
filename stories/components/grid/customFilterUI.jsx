
import React from 'react';

export class CustomFilterUI extends React.Component {
    onClick = (event, value) => {
        console.log(' value ', value);
        const { firstFilterProps } = this.props;

        // firstFilterProps.onChange({
        //     value,
        //     operator: 'eq',
        //     syntheticEvent: event.syntheticEvent
        // });
    }

    render() {
        const { firstFilterProps } = this.props;
        const value = firstFilterProps.value;

        return (
            <div className="VS-FilterButtons">
                <button onClick={(e) => this.onClick(e, 'contains')}>Contains</button>
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
        );
    }
}