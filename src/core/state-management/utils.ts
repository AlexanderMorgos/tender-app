/* eslint-disable  @typescript-eslint/no-explicit-any */

import { IComputedFactory, IObservableFactory, makeObservable } from 'mobx';
export { observable as appObservable, computed as appComputed, action as appAction } from 'mobx';
export { observer as appObserver } from 'mobx-react';

export const appMakeObservable = <T>(target: T, annotations: { [key: string]: IObservableFactory | IComputedFactory }) =>
  makeObservable<any>(target, annotations);
