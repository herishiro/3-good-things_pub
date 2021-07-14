import { EventStatus } from "context/slices/diary";
import { updateEventStatus, sortFilledEvents, getInitialDiary, getNextEventAndDrawerStatus } from "libs/diaries";

describe("sortFilledEvents", () => {
  test("2番目のeventのmainFieldにだけ文字が入力されていたら1番目のeventと入れ替える", () => {
    const initialDiary = getInitialDiary("2020-01-01")
    initialDiary.events[1].textFields[0].value = "aaaaaaa"
    const resultDiary = getInitialDiary("2020-01-01")
    resultDiary.events[0].textFields[0].value = "aaaaaaa"
    expect(sortFilledEvents(initialDiary.events)).toStrictEqual(resultDiary.events);
  });
  test("1&3番目のeventのmainFieldが入力されていたら3が2に移る", () => {
    const initialDiary = getInitialDiary("2020-01-01")
    initialDiary.events[0].textFields[0].value = "a"
    initialDiary.events[2].textFields[0].value = "b"
    const resultDiary = getInitialDiary("2020-01-01")
    resultDiary.events[0].textFields[0].value = "a"
    resultDiary.events[1].textFields[0].value = "b"
    expect(sortFilledEvents(initialDiary.events)).toStrictEqual(resultDiary.events);

  });
  test("1番目にカテゴリだけあって、2番目に文字が入ってる時に1と2を入れ替える", () => {
    const initialDiary = getInitialDiary("2020-01-01")
    initialDiary.events[0].category = { emoji: "😊", name: "niko", id: 1, examples: [] }
    initialDiary.events[2].textFields[0].value = "b"
    const resultDiary = getInitialDiary("2020-01-01")
    resultDiary.events[0].textFields[0].value = "b"
    resultDiary.events[1].category = { emoji: "😊", name: "niko", id: 1, examples: [] }
    expect(sortFilledEvents(initialDiary.events)).toStrictEqual(resultDiary.events);
  });
})

describe("updateEventStatus", () => {
  test("初期状態のdiaryを評価", () => {
    const initialDiary = getInitialDiary("2020-01-01")
    expect(updateEventStatus(initialDiary.events)).toStrictEqual(["empty", "empty", "empty"]);
  });
  test("1：category", () => {
    const initialDiary = getInitialDiary("2020-01-01")
    initialDiary.events[0].category = { emoji: "😊", name: "niko", id: 1, examples: [] }
    expect(updateEventStatus(initialDiary.events)).toStrictEqual(["categoryFilled", "empty", "empty"]);
  });
  test("1：category & text", () => {
    const initialDiary = getInitialDiary("2020-01-01")
    initialDiary.events[0].category = { emoji: "😊", name: "niko", id: 1, examples: [] }
    initialDiary.events[0].textFields[0].value = "b"
    expect(updateEventStatus(initialDiary.events)).toStrictEqual(["textFilled", "empty", "empty"]);
  });
  test("1：category & text, 2: category", () => {
    const initialDiary = getInitialDiary("2020-01-01")
    initialDiary.events[0].category = { emoji: "😊", name: "niko", id: 1, examples: [] }
    initialDiary.events[0].textFields[0].value = "b"
    initialDiary.events[1].category = { emoji: "😊", name: "niko", id: 1, examples: [] }
    expect(updateEventStatus(initialDiary.events)).toStrictEqual(["textFilled", "categoryFilled", "empty"]);
  });
  test("1：category & text, 3: category, text", () => {
    const initialDiary = getInitialDiary("2020-01-01")
    initialDiary.events[0].category = { emoji: "😊", name: "niko", id: 1, examples: [] }
    initialDiary.events[0].textFields[0].value = "b"
    initialDiary.events[2].category = { emoji: "😊", name: "niko", id: 1, examples: [] }
    initialDiary.events[2].textFields[1].value = "b"
    expect(updateEventStatus(initialDiary.events)).toStrictEqual(["textFilled", "empty", "textFilled"]);
  });
})

describe("getNextEventAndDrawerStatus", () => {
  test("空のdiaryの場合", () => {
    const eventsStatus = ["empty", "empty", "empty"] as [EventStatus, EventStatus, EventStatus]
    expect(getNextEventAndDrawerStatus(eventsStatus)).toStrictEqual({ index: 0, drawerStatus: "category" });
  });
  test("1個めがcategoryまで埋まってる時", () => {
    const eventsStatus = ["categoryFilled", "empty", "empty"] as [EventStatus, EventStatus, EventStatus]
    expect(getNextEventAndDrawerStatus(eventsStatus)).toStrictEqual({ index: 0, drawerStatus: "text" });
  });
  test("1個めがtextまで埋まってる時", () => {
    const eventsStatus = ["textFilled", "empty", "empty"] as [EventStatus, EventStatus, EventStatus]
    expect(getNextEventAndDrawerStatus(eventsStatus)).toStrictEqual({ index: 1, drawerStatus: "category" });
  });
  test("2個めがtextまで埋まってる時", () => {
    const eventsStatus = ["textFilled", "textFilled", "empty"] as [EventStatus, EventStatus, EventStatus]
    expect(getNextEventAndDrawerStatus(eventsStatus)).toStrictEqual({ index: 2, drawerStatus: "category" });
  });
  test("全部埋まってる時", () => {
    const eventsStatus = ["textFilled", "textFilled", "textFilled"] as [EventStatus, EventStatus, EventStatus]
    expect(getNextEventAndDrawerStatus(eventsStatus)).toStrictEqual({ index: -1, drawerStatus: "text" });
  });
})
