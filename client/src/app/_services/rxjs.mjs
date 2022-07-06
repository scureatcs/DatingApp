import { of } from "rxjs";
const map = require("rxjs/operator/map");
/* (() => {
  const observable = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
      subscriber.next(4);
      subscriber.complete();
    }, 1000);
  });

  console.log("just before subscribe");
  observable.subscribe({
    next(x) {
      console.log("got value " + x);
    },
    error(err) {
      console.error("something wrong occurred: " + err);
    },
    complete() {
      console.log("done");
    },
  });

  console.log("just after subscribe");
})(); */

/* (() => {
  const observable = from([10, 20, 30]);
  const subscription = observable.subscribe((x) => console.log(x));
  subscription.unsubscribe();
})(); */

/* const observable = new Observable(function subscribe(subscriber) {
  // Keep track of the interval resource
  const intervalId = setInterval(() => {
    subscriber.next("hi");
  }, 1000);

  // Provide a way of canceling and disposing the interval resource
  return function unsubscribe() {
    clearInterval(intervalId);
  };
});

const subscription = observable.subscribe((hello) => console.log(hello));

setTimeout(() => subscription.unsubscribe(), 5000); */

/* Just like observable.subscribe resembles new Observable(function subscribe() {...}), the unsubscribe we return from subscribe is
 conceptually equal to subscription.unsubscribe. In fact, if we remove the ReactiveX types surrounding these concepts, we're left
  with rather straightforward JavaScript. */

/* function subscribe(subscriber) {
  const intervalId = setInterval(() => {
    subscriber.next("hi");
  }, 1000);

  return function unsubscribe() {
    clearInterval(intervalId);
  };
}

const unsubscribe = subscribe({ next: (x) => console.log(x) }); 

// Later:
unsubscribe(); // dispose the resources */

// observers

/* const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  throw new Error("failed");
  subscriber.complete();
});

const observer = {
  next: (x) => console.log("Observer got a next value: " + x),
  error: (err) => console.error("Observer got an error: " + err),
  complete: () => console.log("Observer got a complete notification"),
};

// you can pass the object above or you can pass the individual functions as different arguments
observable.subscribe(
  (x) => console.log("Observer got a next value: " + x),
  (x) => x
);
 */

// ---- aside, what is "to pipe" ----

console.log(rxjs);

for (const e in operators) {
  console.log(e);
}

const pipe = (x, ...fns) => fns.reduce((v, f) => f(v), x);
console.log(
  pipe(
    1,
    (x) => x + 2,
    (x) => x * 2
  ),
  pipe(
    3,
    (x) => x + 2,
    (x) => x * 2
  )
);

//---- pipeable operators

of(
  1,
  2,
  (() => 2 * 2)
    .pipe(map((x) => x * x))
    .subscribe((v) => console.log(`value: ${v}`))
);
