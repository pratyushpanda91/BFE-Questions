
// This is a JavaScript coding problem from BFE.dev 

/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */

function curry(fn) {
  const _ = curry.placeholder;

  function curried(...args) {
    const filledArgs = args;

    // If all necessary arguments are filled (non-placeholder or all required), call the function
    if (
      filledArgs.length >= fn.length &&
      filledArgs.slice(0, fn.length).every((arg) => arg !== _)
    ) {
      return fn(...filledArgs);
    }

    // Return a function to collect more arguments
    return (...nextArgs) => {
      const updatedArgs = [];

      // Fill placeholders with new arguments from nextArgs
      let nextArgIndex = 0;
      for (let arg of filledArgs) {
        if (arg === _ && nextArgIndex < nextArgs.length) {
          updatedArgs.push(nextArgs[nextArgIndex++]);
        } else {
          updatedArgs.push(arg);
        }
      }

      // Add any remaining nextArgs
      updatedArgs.push(...nextArgs.slice(nextArgIndex));

      return curried(...updatedArgs);
    };
  }

  return curried;
}

// Set the placeholder value
curry.placeholder = Symbol('placeholder');

// Example usage
const join = (a, b, c) => `${a}_${b}_${c}`;
const curriedJoin = curry(join);
const _ = curry.placeholder;

console.log(curriedJoin(1, 2, 3)); // '1_2_3'
console.log(curriedJoin(_, 2)(1, 3)); // '1_2_3'
console.log(curriedJoin(_, _, _)(1)(_, 3)(2)); // '1_2_3'


