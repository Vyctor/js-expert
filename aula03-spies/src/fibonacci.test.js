const Fibonacci = require("./fibonacci");
const sinon = require("sinon");
const assert = require("assert");

(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    // generators retornam iterators .next
    // existem 3 formas de ler os dados
    // usando as funções .next, for await e rest/spread
    for await (const i of fibonacci.execute(3)) {
    }
    const expectedCallCount = 4;
    assert.deepStrictEqual(spy.callCount, expectedCallCount);
  }
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const [...results] = fibonacci.execute(5);
    const expectedCallCount = 6;
    assert.deepStrictEqual(spy.callCount, expectedCallCount);
    const expectedResult = [0, 1, 1, 2, 3];
    assert.deepStrictEqual(results, expectedResult);
  }
})();
