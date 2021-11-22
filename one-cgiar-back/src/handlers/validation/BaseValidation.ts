export class BaseValidation {
  /**
   *
   * @param array
   * @returns isEmpty
   */
  public checkEmptyArray(array: any[]) {
    let isEmpty = true;
    array.forEach((element) => {
      if (!element) return;
      else if (element) isEmpty = false;
      else isEmpty = true;
    });
    return !isEmpty;
  }
}
