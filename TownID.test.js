import * as t from "https://deno.land/std/testing/asserts.ts";
import { TownID } from "./TownID.js";
import { Geo3x3 } from "https://geo3x3.com/Geo3x3.js";

Deno.test("test", async () => {
  t.assertEquals(await TownID.find("福井県", "鯖江市", "新横江一丁目"), "E9138732346");
  // console.log(Geo3x3.decode("E9138732346"));
});
Deno.test("test2", async () => {
  t.assertEquals(await TownID.find("福井県", "鯖江市", "新横江x丁目"), null);
  // console.log(Geo3x3.decode("E9138732346"));
});
Deno.test("pref", async () => {
  const prefs = await TownID.getPrefs(); // 47都道府県一覧
  t.assertEquals(prefs.length, 47);
  t.assertEquals(prefs.find(p => p == "福井県"), "福井県");
});
Deno.test("city", async () => {
  const cities = await TownID.getCities("福井県"); // 福井県内の市区町村一覧
  t.assertEquals(cities.length, 17);
  t.assertEquals(cities.find(p => p == "鯖江市"), "鯖江市");
});
Deno.test("town", async () => {
  const towns = await TownID.getTowns("福井県", "鯖江市"); // 鯖江市内の町一覧
  t.assertEquals(towns.length, 153);
  t.assertEquals(towns.find(p => p == "新横江一丁目"), "新横江一丁目");
});
Deno.test("getLGCode", async () => {
  t.assertEquals(await TownID.getLGCode("福井県", "鯖江市"), "18207");
  t.assertEquals(await TownID.getLGCode("福井県"), "18");
  t.assertEquals(await TownID.getLGCode("福井県鯖江市"), "18207");
  t.assertEquals(await TownID.getLGCode("鯖江市"), null);
});
Deno.test("fromLGCode", async () => {
  t.assertEquals(await TownID.fromLGCode("18207"), ["福井県", "鯖江市"]);
});
