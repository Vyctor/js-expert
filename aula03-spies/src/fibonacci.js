class Fibonacci {
  *execute(input, current = 0, next = 1) {
    if (input === 0) {
      return current;
    }
    // retorna o valor
    yield current;
    // depois de yield, continua a função onde parou
    yield* this.execute(input - 1, next, current + next);
  }
}

module.exports = Fibonacci;
