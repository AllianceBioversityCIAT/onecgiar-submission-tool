import { OnlyActivesPipe } from './only-actives.pipe';

describe('OnlyActivesPipe', () => {
  it('create an instance', () => {
    const pipe = new OnlyActivesPipe();
    expect(pipe).toBeTruthy();
  });
});
