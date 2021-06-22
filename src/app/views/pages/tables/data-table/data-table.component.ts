import { Component, OnInit } from '@angular/core';

import { DataTable } from "simple-datatables";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  dataTable: any
  constructor() { }

  ngOnInit(): void {
    this.dataTable = new DataTable("#dataTableExample",
      {
        exportable: {
          type: 'csv',
          download: true,
          escapeHTML: true,
          includeHeadings: true
        }
      });
  }

  onExport() {
    this.dataTable.export({
      type: "csv",
      filename: "my-csv-file",
    });
  }
}
