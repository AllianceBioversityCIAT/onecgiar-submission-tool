import {ParseError} from 'got/dist/source';

/*eslint-enable*/
export class ResponseHandler {
  private response;
  private title;
  constructor(
    title: string,
    response: {} | ParseError,
    userInitiativeRole?: [] | {}
  ) {
    this.response = this.getMetada(response);
    this.title = title;
  }

  private getMetada(response: {}) {
    // read object properties
    // for (const key in response) {
    //     if (Object.prototype.hasOwnProperty.call(response, key)) {
    //         const element = response[key];
    //         console.log(key)
    //     }
    // }
    return response;
  }
}
