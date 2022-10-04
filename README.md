# Objective-JS

A little implementation of ObjC into javascript.
This project is all about hobby and exercise, and this project may have more progress in the future or by another person that interested in (PRs are welcome).

## Example

In javascript there is no such thing called memory. You don't have any access to it. But I simulate memory in `objc/memory.ts` file. It's just a `WeakMap` nothing more.

```ts
import { NSObject, NSLog } from "Foundation/Foundation"

class Person extends NSObject {
  declare name: string;

  initWithName(name: string): this {
    this.name = name;
    return this;
  }

  override description(): string {
    return this.name;
  }

  override dealloc(): void {
    super.dealloc();
    console.log('Deallocated');
  }
}

const SoR = Person.alloc().initWithName('SoR');

NSLog('My name is %@', SoR); // my name is SoR

SoR.dealloc();

SoR.name = "Another"; // TypeError, cannot set name on revoked proxy...
NSLog('My name is %@', SoR); // TypeError, cannot call description on revoked proxy
```

## License
Nothing! But notify me if you enjoyed it or used it. :)

