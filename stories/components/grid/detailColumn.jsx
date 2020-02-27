
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
        render() {
            const dataItem = this.props.dataItem;
            return (
                <div>{
                    <section className="VS-ROW-Detailing">
                        <p><strong>ReorderLevel:</strong></p>
                    </section>
                    }
                    <Grid className="VS-nestedGrid" data={dataItem[options.advanced.masterDetail].slice(this.state.skip, this.state.take + this.state.skip)}
                        pageCount={this.state.pageable.buttonCount}
                        skip={this.state.skip}
                        take={this.state.take}
                        total={options.advanced.masterDetail.length}
                        pageable={this.state.pageable}
                        onPageChange={this.pageChange}>
                    </Grid>
                </div>
            );

        }
    }
};
