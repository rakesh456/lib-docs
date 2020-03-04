
import React from 'react';
import { Grid } from '@progress/kendo-react-grid';

export function detailColumn({ options }) {
    return class extends Grid {
        constructor(props) {
            super(props)
            this.state = { skip: 0, take: 5, pageable: { "buttonCount": 5, "pageSizes": true, "type": "numeric" } }
        }

        pageChange = (event) => {
            this.setState({
                skip: event.page.skip,
                take: event.page.take
            });
        }

        renderDetail = (column, index, dataItem) => {
            return (
                <div key={index}>
                    {
                        (column && column.label && column.field)? <p><strong>{column.label}:</strong>{dataItem[column.field]}</p> : ''
                    }
                </div>
            )
        }

        render() {
            const dataItem = this.props.dataItem;
            let detailsColumns = (options && options.advanced && options.advanced.detailRows)? options.advanced.detailRows.columns : [];
            let nestedGridData = (options && options.advanced && options.advanced.masterDetail)? dataItem[options.advanced.masterDetail] : [];

            return (
                <div>
                    {
                        (detailsColumns && detailsColumns.length > 0)?
                        <section className="VS-ROW-Detailing">
                            {
                                detailsColumns.map((column, index) => this.renderDetail(column, index, dataItem))
                            }
                        </section>
                        : ''
                    }

                    {
                        (nestedGridData && nestedGridData.length > 0)?
                        <Grid className="VS-nestedGrid" data={nestedGridData.slice(this.state.skip, this.state.take + this.state.skip)}
                            pageCount={this.state.pageable.buttonCount}
                            skip={this.state.skip}
                            take={this.state.take}
                            total={nestedGridData.length}
                            pageable={this.state.pageable}
                            onPageChange={this.pageChange}>
                        </Grid> : ''
                    }
                </div>
            );

        }
    }
};
