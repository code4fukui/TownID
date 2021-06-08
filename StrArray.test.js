import * as t from "https://deno.land/std/testing/asserts.ts";
import { StrArray } from "./StrArray.js";

Deno.test("test", () => {
  const ss = ["abc", "abd", "def"];
  t.assertEquals(StrArray.getUnique(ss, "abc"), "abc");
});
Deno.test("test1", () => {
  const ss = ["abc", "abd", "def"];
  t.assertEquals(StrArray.getUnique(ss, "abcdefg"), "abc");
});
Deno.test("test2", () => {
  const ss = ["abc", "add", "def", "acd"];
  t.assertEquals(StrArray.getUnique(ss, "abc"), "ab");
});
Deno.test("test3", () => {
  const ss = ["abc", "abd", "def", "acd"];
  t.assertEquals(StrArray.getUnique(ss, "def"), "d");
});
