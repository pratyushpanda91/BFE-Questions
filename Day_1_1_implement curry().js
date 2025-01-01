function curry(fn) {
  return function curried(...args) {
    // If enough arguments are provided, call the original function
    if (args.length >= fn.length) {
      return fn(...args);
    }
    // Otherwise, return a function to collect more arguments
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
}

// Example usage
const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};
const curriedJoin = curry(join);

console.log(curriedJoin(1, 2, 3)); // '1_2_3'
console.log(curriedJoin(1)(2, 3)); // '1_2_3'
console.log(curriedJoin(1, 2)(3)); // '1_2_3'
