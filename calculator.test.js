import test from "node:test";
import assert from "node:assert/strict";
import { calculateDose } from "./calculator.js";

test("calculates the required medication volume", () => {
  assert.equal(calculateDose(40, 10, 20), 5);
});

test("rounds the result to two decimal places", () => {
  assert.equal(calculateDose(25, 7, 10), 2.8);
});

test("returns null for zero or negative inputs", () => {
  assert.equal(calculateDose(0, 10, 20), null);
  assert.equal(calculateDose(40, 0, 20), null);
  assert.equal(calculateDose(40, 10, 0), null);
  assert.equal(calculateDose(-40, 10, 20), null);
});

test("returns null for non-numeric inputs", () => {
  assert.equal(calculateDose(Number.NaN, 10, 20), null);
  assert.equal(calculateDose(40, Number.NaN, 20), null);
  assert.equal(calculateDose(40, 10, Number.NaN), null);
});
