import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coordinatorFilter'
})
export class CoordinatorFilterPipe implements PipeTransform {

  transform(list: any[], text: string): unknown {
    if (text === '') {
      return list;
    }
    text = text.toLowerCase();
    return list.filter(coordinator => {
      let auxCoordinator = coordinator.name.toLowerCase();
      return auxCoordinator.includes(text);
    })
  }

}
