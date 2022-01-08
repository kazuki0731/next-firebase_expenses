const test = ["a", "b", "c"];

const func = () => {
  // return [1, 2, 3];
  const sample = {
    name: "kawabata",
    age: 31,
  };
  return [sample, { name: "ok" }];
};

const [result1, result2] = func();

console.log(result1.age);
console.log(result2);
console.log(result2.name);