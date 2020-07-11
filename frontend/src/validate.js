import React from 'react';
import './validate.css'
import { HTMLTable } from "@blueprintjs/core";

export class ValidateApp extends React.Component {
    renderTableRow = (tableRow, rowIndex) => {
        if (rowIndex === 0) {
            return (
                <tr key={rowIndex}>
                    {tableRow.map((row, columnIndex) => (<th key={columnIndex}>{row}</th>))}
                </tr>
            );
        }
        return (
            <tr key={rowIndex}>
                {tableRow.map((row, columnIndex) => (<td key={columnIndex}>{row}</td>))}
            </tr>
        );
    }

    renderTable = (csvPreview) => {
        console.log(csvPreview);

        return (
            <div>
                <div>
                    Please check the data you submitted and give the model context on how
                    to interpret the data.
                </div>
                <HTMLTable
                    className="validation-table"
                    interactive={true}
                    striped={true}
                >
                    <thead>
                        {csvPreview.slice(0, 1).map((row, rowIndex) => this.renderTableRow(row, rowIndex))}
                    </thead>
                    <tbody>
                        {csvPreview.slice(1).map((row, rowIndex) => this.renderTableRow(row, rowIndex+1))}
                    </tbody>
                </HTMLTable>
            </div>
        );
    }

    render() {
        const { csvPreview } = this.props;

        return (
            <div>
                <h2>Validate</h2>
                {this.renderTable(csvPreview)}
            </div>
        );
    }
}