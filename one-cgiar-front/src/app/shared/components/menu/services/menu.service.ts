import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  activeClassByRoute(route: [],currentUrl) {
    let correct = 0;

    let baseUrl = currentUrl;
    route.map((resp: string) => {
      correct =
        baseUrl.indexOf(resp.toLowerCase().split(' ').join('-')) > -1
          ? correct + 1
          : correct;
    });
    // if (stage) {

    return correct == route.length ? true : false;
    // }else{
    //   return baseUrl.indexOf(route)>-1?true:false
    // }
  }

}
