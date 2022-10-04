import NSObject from 'Foundation/NSObject';
import Memory from './memory';

Object.defineProperties(window, {
  nil: {
    value: null
  },
  YES: {
    value: true
  },
  NO: {
    value: false
  }
});

const inAble = (o: any) => o != nil && typeof o === 'object';

/** @returns NSObject instance */
export function malloc(ns: NSObject): pointer {
  const proxy = make_ptr();
  Memory.set(proxy, ns);

  return proxy;
}

/** @returns pointer to object */
function make_ptr(): pointer {
  const ptr: object = new Proxy(
    {},
    {
      has(_, key) {
        return key in Memory.get(ptr)!;
      },
      get(_, key) {
        const ns = Memory.get(ptr) as any;

        return ns[key];
      },
      set(_, key, newValue) {
        if (newValue instanceof NSObject && newValue !== this) {
          Reflect.set(newValue, '__$refCount_', Reflect.get(newValue, '__$refCount_') + 1);
        }

        const ns = Memory.get(ptr) as any,
          oldValue = ns[key];

        if (inAble(oldValue) && 'instanceOf' in oldValue && oldValue.instanceOf(NSObject)) {
          oldValue.release();
        }

        ns[key] = newValue;

        return true;
      }
    }
  );

  return ptr;
}
