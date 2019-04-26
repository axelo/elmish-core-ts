const log = (message: string) => <A>(a: A) => {
  message.length > 0 ? console.log(message, a) : console.log(a);
  return a;
};

export const Debug = Object.freeze({
  /**
   * Console log a value with a message.
   */
  log
});
