import type NSObject from './NSObject';

const formatSymbol = /%./g;

function switchFormatter(formatter: string, val: any): string {
  switch (formatter) {
    case '@': // NSObject instance
      return (<NSObject>val).description();

    default:
      return val;
  }
}

export default function NSLog(message: string, ...args: any): void {
  let msg = message,
    i = 0;

  for (const { 0: match } of message.matchAll(formatSymbol)) {
    msg = msg.replace(match, switchFormatter(match[1], args[i]));
    ++i;
  }

  console.log(msg);
}
