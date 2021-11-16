import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wp-reports',
  templateUrl: './wp-reports.component.html',
  styleUrls: ['./wp-reports.component.scss']
})
export class WpReportsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.exportExcel();
  }

  saveAsExcelFile(buffer: any, fileName: string = "test"): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }

  exportExcel() {
    import("xlsx").then(xlsx => {

      let example = [
        {
          impactAreaTitle:'Impact Area: Nutrition, health and food security'
        },
        {
          impactIndicatorTitle:'Impact indicator: #cases communicable and noncommunicable diseases'
        },
        {
          breadth: '2.8 Millions of people',
          depth: 'Life saving',
          probability: 'High certainty'
        },
        {
          breadth: '2.5 Millions of people',
          depth: 'Perceptible',
          probability: 'High certainty'
        },
        {
          breadth: '3.1 Millions of people',
          depth: 'Significant',
          probability: 'High certainty'
        }
      ]

      let result2 =[
        { a: "Breadth", b: "Depth", c: "Probability"},
        { a: "S", b: "h", c: "e"}
      ]

      const merge = [
        
      ];
      let result = [{ a: "Breadth", b: "Depth", c: "Probability"}];

      example.map((item,index)=>{
        let i = index +1
        if (item.hasOwnProperty('impactAreaTitle')) {
          console.log(item);
          result.push({a:item.impactAreaTitle,b:'',c:''})
          merge.push({ s: { r: i, c: 0 }, e: { r: i, c: 2 } })
          return;
        }

        if (item.hasOwnProperty('impactIndicatorTitle')) {
          console.log(item);
          result.push({a:item.impactIndicatorTitle,b:'',c:''})
          merge.push({ s: { r: i, c: 0 }, e: { r: i, c: 2 } })
          return;
        }

        result.push({a:item.breadth,b:item.depth,c:item.probability})
        
        console.log(item);

      })

      console.log(result);
      console.log(result2);

      var worksheet = xlsx.utils.json_to_sheet(result, {header: ["a", "b", "c"], skipHeader: true});



      // const worksheet = xlsx.utils.json_to_sheet(example);
      var wscols = [
        {wpx:250},
        {wpx:250},
        {wpx:250},
    ];
    
    worksheet['!cols'] = wscols;
    // worksheet['D5'].v ="hola mundo"
    // worksheet['B6'].l = { Target:"https://sheetjs.com", Tooltip:"Find us @ SheetJS.com!" };


    // Here s = start, r = row, c=col, e= end
    // const merge = [
    //   { s: { r: 1, c: 0 }, e: { r: 2, c: 0 } },{ s: { r: 3, c: 0 }, e: { r: 4, c: 0 } },
    // ];
    worksheet["!merges"] = merge;
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      xlsx.utils.sheet_add_aoa(workbook, [[123]], {origin: 'A1'});
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });


      this.saveAsExcelFile(excelBuffer, "partners");
    });
  }

}
