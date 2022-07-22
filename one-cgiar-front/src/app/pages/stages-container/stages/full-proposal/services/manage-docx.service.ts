import { Injectable } from '@angular/core';
import { InitiativesService } from '../../../../../shared/services/initiatives.service';
import {
  Packer,
  Document,
  Table,
  TableCell,
  TableRow,
  Paragraph,
  HeadingLevel,
  TextRun,
  ExternalHyperlink
} from "docx";



@Injectable({
  providedIn: 'root'
})
export class ManageDocxService {

  private regexHtml: RegExp = /(<([^>]+)>)|&nbsp;/g;

  constructor(private _initiativesService: InitiativesService) { }

  public createExport(configHeader: configList[], configBody: any[], date: string, section: string = '', complex: boolean = false) {
    const header = this.configHeader(configHeader);
    const body = this.configBody(configHeader, configBody, complex);
    const table = new Table({
      rows: [header, ...body]
    });
    this.packageDocument(table, date, section);
  }

  private configHeader(config: configList[]): any {
    let headerConfig: any[] = [];
    config.forEach(el => {
      headerConfig.push(
        new TableCell({
          shading: {
            fill: 'EEEEEE'
          },
          children: [
            new Paragraph({
              heading: HeadingLevel.HEADING_3,
              spacing: {
                after: 100,
                before: 100
              },
              children: [
                new TextRun({
                  text: el.name,
                  bold: true,
                })
              ]
            })
          ]
        })
      );
    })

    const configRows: any = new TableRow({
      tableHeader: true,
      children: headerConfig
    });

    return configRows;
  }

  private configBody(config: configList[], body: any[], complex: boolean = false): any[] {
    let bodyConfig: any[] = [];
    if (complex) {
      bodyConfig = this.complexConfigBody(body, config);
    } else {
      body.forEach(el => {
        let row: any[] = [];
        config.forEach(cell => {
          row.push(
            new TableCell({
              children: [
                new Paragraph(el[cell.attribute].replace(this.regexHtml, ''))
              ]
            })
          )
        });

        bodyConfig.push(new TableRow({
          tableHeader: true,
          children: row
        }))
      });
    }

    return bodyConfig;
  }

  private complexConfigBody(body: any[], config: configList[]) {
    const complexFlat = this.convertBodyToComplexBody(body, config);
    return this.convertFlatToCompoundBody(complexFlat);
  }

  private convertBodyToComplexBody(body: any[], config: configList[]): complexFlat[][]{
    const regexLink = /<\s*a[^>]*>(.*?)<\s*\/\s*a>/g;
    let complexBodyFlat: complexFlat[][] = [];
    body.forEach((el) => {
      let complexRow: complexFlat[] = [];
      config.forEach((cell) => {
        complexRow.push({
          links: el[cell.attribute].match(regexLink),
          textArray: el[cell.attribute].replace(regexLink, '(:[:link:]:)').split(/\(:\[|\]:\)/g)
        })
      });
      complexBodyFlat.push(complexRow);
    });

    return complexBodyFlat;
  }

  private convertFlatToCompoundBody(flatBody: complexFlat[][]){
    let complexBody: any[] = [];
    flatBody.forEach(el => {
      let complexRow: any[] = [];
      el.forEach(cell => {
        complexRow.push(this.asingDataComplex(cell));
      });
      complexBody.push(new TableRow({
        tableHeader: true,
        children: complexRow
      }));
    });
    return complexBody;
  }

  private asingDataComplex(cell: complexFlat){
    let countCovert: number = 0;
    let complexCell: any[] = [];
    cell.textArray.forEach((data) => {
      if(/:link:/.test(data)){
        complexCell.push(
          new ExternalHyperlink({
            link: cell.links[countCovert].replace(/<.+href="|".+/g,''),
            children:[
              new TextRun({
                text: cell.links[countCovert].replace(/(<([^>]+)>)/g,''),
                style: "Hyperlink"
              })
            ]
          })
          
        );
        countCovert++;
      }else{
        complexCell.push(
          new TextRun({
            text: data.replace(this.regexHtml, '')
          })
        );
      }
    })

    return new TableCell({
      children: [
        new Paragraph({
          children: complexCell
        })
      ]
    });
  }

  private packageDocument(table: Table, date: string, section: string) {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "One CGIAR Submission Tool",
              heading: HeadingLevel.TITLE
            }),
            new Paragraph({
              text: `${this._initiativesService.initiative.official_code}: ${this._initiativesService.initiative.name}`,
              heading: HeadingLevel.HEADING_1
            }),
            new Paragraph({
              text: section,
              heading: HeadingLevel.HEADING_2,
              spacing: {
                after: 200
              }
            }),
            table
          ]
        }
      ]
    });

    Packer.toBlob(doc).then(blob => {
      import("file-saver").then(FileSaver => {
        FileSaver.saveAs(
          blob,
          `${this._initiativesService.initiative.official_code}_ISDC_Feedback_Responses_${date}.docx`
        )
      })
    })
  }

}

interface configList {
  attribute: string,
  name: string
}

interface complexFlat {
  links: any[],
  textArray: any[]
}

