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
  ExternalHyperlink,
  PageOrientation,
  WidthType
} from "docx";



@Injectable({
  providedIn: 'root'
})
export class ManageDocxService {

  private regexHtml: RegExp = /(<([^>]+)>)/g;
  private regexSpacing: RegExp = /(\s+\s)|(&nbsp;)/g;
  private regexFormat: regexFormat = {
    links: /<\s*a[^>]*>((.*\n.*?)|.*?)<\s*\/\s*a>/g,
    bold: /<\s*b[^>]*>((.*\n.*?)|.*?)<\s*\/\s*b>|<\s*strong[^>]*>((.*\n.*?)|.*?)<\s*\/\s*strong>/g,
    italic: /<\s*i[^>]*>((.*\n.*?)|.*?)<\s*\/\s*i>|<\s*em[^>]*>((.*\n.*?)|.*?)<\s*\/\s*em>/g,
    points: /<\s*li[^>]*>((.*\n.*?)|.*?)<\s*\/\s*li>/g,
    lineBreak: /<\s*\/\s*p>/g
  };
  private configDocx: configDocx = {
    font: 'Arial',
    orientation: 'LANDSCAPE'
  }

  constructor(private _initiativesService: InitiativesService) { }

  public createExport(configHeader: configList[], configBody: any[], date: string, section: string = '', complex: boolean = false, configDoc: configDocx = this.configDocx) {
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
          margins:{
            bottom: 200,
            left: 200,
            right: 200,
            top: 200
          }, 
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
                  font: this.configDocx.font
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
              margins:{
                bottom: 200,
                left: 200,
                right: 200,
                top: 200
              }, 
              children: [
                new Paragraph({
                  children:[
                    new TextRun({
                      text: el[cell.attribute].replace(this.regexHtml, ''),
                      style: "Hyperlink",
                      font: this.configDocx.font
                    })
                  ]
                })
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
    let complexBodyFlat: complexFlat[][] = [];
    body.forEach((el) => {
      let complexRow: complexFlat[] = [];
      config.forEach((cell) => {
        complexRow.push({
          links: el[cell.attribute]?el[cell.attribute].match(this.regexFormat.links):null,
          bold:el[cell.attribute]?el[cell.attribute].match(this.regexFormat.bold):null,
          italic:el[cell.attribute]?el[cell.attribute].match(this.regexFormat.italic):null,
          points:el[cell.attribute]?el[cell.attribute].match(this.regexFormat.points):null,
          textArray: el[cell.attribute]?this.getFormats(el[cell.attribute]):[]
        })
      });
      complexBodyFlat.push(complexRow);
    });

    return complexBodyFlat;
  }

  private getFormats( data: string): string[][]{
    let formats: string[][] = [];
    const formatsReplace = data.replace(this.regexFormat.points, '(:[:points:]:)')
                               .replace(this.regexFormat.links, '(:[:link:]:)')
                               .replace(this.regexFormat.bold, '(:[:bold:]:)')
                               .replace(this.regexFormat.italic, '(:[:italic:]:)')
                               .replace(/<([\/p^>]+)>|<([\/ul^>]+)>/g, '(:[:jump:]:)')
                               .split('(:[:jump:]:)').filter(el => el != '\n  ' && el != '');
    formatsReplace.forEach(el => {
      formats.push(el.split(/\(:\[|\]:\)/g));
    })
    return formats;
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
    let countCovert = {
      link: 0,
      bold: 0,
      italic: 0,
      points: 0
    };
    let isList: boolean = false;
    let contentParagraph: any[] = [];
    let complexCell: any[] = [];
    let complexPoint: Paragraph [] = [];
    cell.textArray.forEach((data) => {
      complexCell = [];
      data.forEach(el => {
        if(/:link:/.test(el)){
          complexCell.push(
            new ExternalHyperlink({
              link: cell.links[countCovert.link].replace(/<.+href="|".+/g,''),
              children:[
                new TextRun({
                  text: cell.links[countCovert.link].replace(this.regexSpacing, ' ').replace(this.regexHtml,''),
                  style: "Hyperlink",
                  font: this.configDocx.font
                })
              ]
            })
            
          );
          countCovert.link++;
        }else if(/:bold:/.test(el)){
          complexCell.push(
            new TextRun({
              text: cell.bold[countCovert.bold].replace(this.regexSpacing, ' ').replace(this.regexHtml,''),
              bold: true,
              font: this.configDocx.font
            })
          );
          countCovert.bold++;
        }else if(/:italic:/.test(el)){
          complexCell.push(
            new TextRun({
              text: cell.italic[countCovert.italic].replace(this.regexSpacing, ' ').replace(this.regexHtml,''),
              italics: true,
              font: this.configDocx.font
            })
          );
          countCovert.italic++;
        }else if(/:points:/.test(el)){
          complexPoint.push(
            new Paragraph({
              bullet:{
                level: 0
              },
              children:[
                new TextRun({
                  text: cell.points[countCovert.points].replace(this.regexSpacing, ' ').replace(this.regexHtml,''),
                  font: this.configDocx.font
                })
              ]
            })
          );
          isList = true;
          countCovert.points++;
        }else{
          complexCell.push(
            new TextRun({
              text: el.replace(this.regexSpacing,' ').replace(this.regexHtml, ''),
              font: this.configDocx.font
            })
          );
        }
      });

      if(isList){
        contentParagraph.push(
          ...complexPoint,
          new Paragraph({
            children: []
          })
        )
        isList = false;
      }else{
        contentParagraph.push(
          new Paragraph({
            children: complexCell
          }),
          new Paragraph({
            children: []
          })
        )
      }
      

    })
    return new TableCell({
      margins:{
        bottom: 200,
        left: 200,
        right: 200,
        top: 200
      }, 
      children: contentParagraph
    });
  }

  private packageDocument(table: Table, date: string, section: string) {
    const doc = new Document({
      sections: [
        {
          properties:{
            page:{
              size:{
                orientation: PageOrientation.LANDSCAPE
              }
            }
          },
          children: [
            new Paragraph({
              heading: HeadingLevel.TITLE,
              children:[
                new TextRun({
                  text: "One CGIAR Submission Tool",
                  font: this.configDocx.font
                })
              ]
            }),
            new Paragraph({
              heading: HeadingLevel.HEADING_1,
              children:[
                new TextRun({
                  text: `${this._initiativesService.initiative.official_code}: ${this._initiativesService.initiative.name}`,
                  font: this.configDocx.font
                })
              ]
            }),
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              children:[
                new TextRun({
                  text: section,
                  font: this.configDocx.font
                })
              ]
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
  links: any[];
  bold: any[];
  italic: any[];
  textArray: any[];
  points: any[];
}

interface regexFormat{
  links: RegExp;
  bold: RegExp;
  italic: RegExp;
  lineBreak: RegExp;
  points: RegExp;
}

interface configDocx{
  orientation?: 'LANDSCAPE'|'PORTRAIT';
  font?: 'Arial';
}