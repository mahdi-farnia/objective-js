declare const nil: null;
declare const YES: true;
declare const NO: false;

declare type pointer = object;

declare interface Constructor<A = any[], R = any> extends Function {
  new (...args: any[]): any;
  prototype: any;
}
