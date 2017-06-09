function test(i) {
  i.value++;
}

let i = {value: 0};
test(i);
console.log(i.value);