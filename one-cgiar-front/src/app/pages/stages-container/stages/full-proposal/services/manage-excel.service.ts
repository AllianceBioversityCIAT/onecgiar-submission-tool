import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageExcelService {

  constructor() { }

  saveAsExcelFile(buffer: any, fileName: string = "unnamed"): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(
        data,
        fileName + EXCEL_EXTENSION
        // "_export_" + new Date().getTime() +
      );
    });
  }

  exportBasicExcel(list:any[],fileName:string,wscols?:any[]) {
    import("xlsx").then(xlsx => {


      const worksheet = xlsx.utils.json_to_sheet(list);
      
    
      worksheet['!cols'] = wscols.length ? wscols : [];
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });


      this.saveAsExcelFile(excelBuffer, fileName);
    });
  }

}
