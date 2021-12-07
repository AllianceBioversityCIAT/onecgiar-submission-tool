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

  toggleExpand(subSectionsList: HTMLElement) {
    console.log(subSectionsList)
    subSectionsList.classList.toggle('expandIbd');
    subSectionsList.classList.toggle('collapseIbd');
    // console.log('toggleExpand');
  }

  sortAlphabetically(list) {
    list.sort(function (a, b) {
      if (a[list.sort] < b[list.sort]) {
        return -1;
      }
      if (a[list.sort] > b[list.sort]) {
        return 1;
      }
      return 0;
    });
    return list;
  }

}
