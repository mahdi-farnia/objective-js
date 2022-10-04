import Memory from 'objc/memory';
import { malloc } from 'objc/runtime';

class NSObject {
  private declare readonly __$revoke_: VoidFunction;
  private __$refCount_: number = 1;
  private declare readonly __$ptr_: pointer;

  protected constructor() {}

  init(): this {
    return this;
  }

  retain(): this {
    ++this.__$refCount_;
    return this;
  }

  release(): void {
    --this.__$refCount_;

    if (this.__$refCount_ === 0) this.dealloc();
  }

  dealloc(): void {
    this.__$revoke_();
  }

  description(): string {
    throw new Error(this[Symbol.toStringTag] + '::description did not implemented');
  }

  instanceOf($super: any): boolean {
    return Memory.get(this.__$ptr_) instanceof $super;
  }

  get [Symbol.toStringTag]() {
    return this.constructor.name + 'Instance';
  }

  /** @returns pointer to this NSObject */
  static alloc<T extends Function>(this: T): T['prototype'] {
    // NOTE use revocable proxy as an garbage collector controller
    const { proxy: ns, revoke } = Proxy.revocable(new (<any>this)(), {}),
      ptr = malloc(ns);

    Object.defineProperties(ns, {
      __$revoke_: {
        value: revoke
      },
      __$ptr_: {
        value: ptr
      }
    });

    return ptr;
  }

  static description(): string {
    throw new Error(this[Symbol.toStringTag] + '::description did not implemented');
  }

  static get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
}

export default NSObject;
