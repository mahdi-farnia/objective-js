import type NSObject from 'Foundation/NSObject';

const Memory = new WeakMap<object, NSObject>();

// DEVELOPMENT
declare global {
  interface Window {
    MEMORY: WeakMap<object, NSObject>;
  }
}
if (process.env.NODE_ENV !== 'production') {
  window.MEMORY = Memory;
}

export default Memory;
