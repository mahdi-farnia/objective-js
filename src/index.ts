import { NSObject } from 'Foundation/Foundation';
import { NSLog } from 'Foundation/NSLog';

class Person extends NSObject {
  declare name: string;

  initWithName(name: string) {
    this.name = name;
    return this;
  }

  override description(): string {
    return `member#${this.name}`;
  }
}

class House extends NSObject {
  declare member: Person;

  initWithPerson(member: Person) {
    this.member = member;
    return this;
  }

  override description(): string {
    return this.member.name;
  }

  override dealloc(): void {
    super.dealloc();
  }
}
