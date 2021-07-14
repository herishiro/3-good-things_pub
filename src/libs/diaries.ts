import { useState, useEffect } from "react";
import { Diary, DiaryDate, Event, TextFieldKey } from "interfaces";
import { format, parse, getDaysInMonth, compareDesc } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { EventItem, EventStatus, updateCategory, updateTextField } from "context/slices/diary";
import { InputDrawerStatue, selectIsInputDrawerOpened, selectIsListOpened } from "context/slices/ui";


export const getDividedDiariesByMonth = (diaries: Diary[]): Diary[][] | null => {
  let dividedDiariesByMonth = diaries.reduce((prev, current) => {
    if (!prev.length) {
      prev.push([current])
      return prev
    }
    const lastItem = prev[prev.length - 1]
    const { year: prevYear, month: prevMonth } = getDiaryDateObj(lastItem[0]).str
    const { year: diaryYear, month: diaryMonth } = getDiaryDateObj(current).str
    const inSamePeriod = prevYear === diaryYear && prevMonth === diaryMonth
    if (inSamePeriod) {
      lastItem.push(current)
    } else {
      prev.push([current])
    }
    return prev
  }, [] as Diary[][])
  return dividedDiariesByMonth.length ? dividedDiariesByMonth : null
}


const getFilledEvents = (diary: Diary) => {
  const filledEvents = diary.events.filter(event => {
    const { textFields } = event
    const isTextFilledEvent = textFields.some(item => item.value)
    return isTextFilledEvent
  })
  return filledEvents
}

export const getFilledEventCount = (diary: Diary) => {
  const filledEvents = getFilledEvents(diary)
  return filledEvents.length
}

export const getDiaryDateObj = (diary: Diary) => {
  const dateStr = format(new Date(diary.date.seconds * 1000), "yyyy-MM-dd");
  const [year, month, day] = dateStr.split("-")
  return {
    str: { year, month, day },
    num: {
      year: Number(year), month: Number(month), day: Number(day)
    }
  }
}
export const isTextFilledEvent = (event: Event) => {
  const { textFields } = event
  const isTextFilledEvent = textFields.some(item => item.value)
  return isTextFilledEvent
}

export const getInitialDiary = (diaryId: string): Diary => {
  const date = parse(diaryId, "yyyy-MM-dd", new Date())
  const diaryDate: DiaryDate = {
    seconds: date.getTime() / 1000,
    nanoseconds: 0
  }
  return {
    date: diaryDate,
    events: [
      {
        id: 1,
        category: null,
        textFields: [
          {
            name: "title",
            label: "今日あった良かったこと", type: "main",
            value: "",
          },
          {
            name: "detail",
            label: "できごとの詳細", type: "detail",
            value: "",
          },
          {
            name: "feelingAt",
            label: "その時の気分", type: "detail",
            value: "",
          },
          {
            name: "feelingAfter",
            label: "その後の気分", type: "detail",
            value: "",
          },
          {
            name: "whySuccessed",
            label: "どうして上手くいったのか", type: "detail",
            value: "",
          },
        ]
      },
      {
        id: 2,
        category: null,
        textFields: [
          {
            name: "title",
            label: "今日あった良かったこと", type: "main",
            value: "",
          },
          {
            name: "detail",
            label: "できごとの詳細", type: "detail",
            value: "",
          },
          {
            name: "feelingAt",
            label: "その時の気分", type: "detail",
            value: "",
          },
          {
            name: "feelingAfter",
            label: "その後の気分", type: "detail",
            value: "",
          },
          {
            name: "whySuccessed",
            label: "どうして上手くいったのか", type: "detail",
            value: "",
          },
        ]
      },
      {
        id: 3,
        category: null,
        textFields: [
          {
            name: "title",
            label: "今日あった良かったこと", type: "main",
            value: "",
          },
          {
            name: "detail",
            label: "できごとの詳細", type: "detail",
            value: "",
          },
          {
            name: "feelingAt",
            label: "その時の気分", type: "detail",
            value: "",
          },
          {
            name: "feelingAfter",
            label: "その後の気分", type: "detail",
            value: "",
          },
          {
            name: "whySuccessed",
            label: "どうして上手くいったのか", type: "detail",
            value: "",
          },
        ]
      },
    ],
  }
}

type Prop2<T> = {
  diary: Diary;
  index: number;
  name: T;
};
export const useInputTextWithDiaryCtx = <T extends TextFieldKey | null>({ diary, index, name }: Prop2<T>) => {
  const dispatch = useDispatch()
  const isDrawerOpened = useSelector(selectIsInputDrawerOpened);
  const isListOpened = useSelector(selectIsListOpened);
  const event = diary.events.find((event) => event.id === index + 1);
  if (!event) {
    throw new Error();
  }
  const value = getEventValue(event, name);
  const fieldName = getFieldName(name)
  const [inputText, setInputText] = useState(value);
  useEffect(() => {
    setInputText(getEventValue(event, name))
  }, [event])

  useEffect(() => {
    dispatch(
      updateTextField({
        cardIndex: index,
        label: fieldName,
        newValue: inputText,
      })
    );
  }, [isDrawerOpened, isListOpened]);
  return { inputText, setInputText };
};

export const getEventValue = (event: Event, name: TextFieldKey | null) => {
  if (name === null) return ""
  const field = event.textFields.find(field => field.name === name)
  if (!field) {
    throw new Error();
  }
  return field.value;
};
export const getFieldName = (name: TextFieldKey | null) => {
  if (name === null) {
    return "feelingAfter"
  }
  return name
}
type Prop3 = {
  diary: Diary;
  index: number;
};
export const useCategoryWithDiaryCtx = ({ diary, index }: Prop3) => {
  const [category, setCategory] = useState(diary.events[index].category);
  const dispatch = useDispatch()
  useEffect(() => {
    setCategory(diary.events[index].category)
  }, [diary.events[index].category])
  useEffect(() => {
    dispatch(updateCategory({ cardIndex: index, newValue: category }))
  }, [category]);
  return { category, setCategory };
};

export const addEmptyDiaries =
  (dividedDiariesByMonth: Diary[][], selectedPeriod: string): Diary[][] => {
    if (!dividedDiariesByMonth.length) {
      if (!selectedPeriod) {
        throw new Error();
      }
      const [yearStr, monthStr] = selectedPeriod.split("/")
      const year = Number(yearStr)
      const month = Number(monthStr)
      const daysInMonth = getDaysInMonth(new Date(year, month - 1))
      const diariesInMonthWithEmpty = [...Array(daysInMonth)].map((v, i) => {
        const day = i + 1
        const diaryId = format(new Date(year, month - 1, day), "yyyy-MM-dd");
        return getInitialDiary(diaryId)
      })
      return [diariesInMonthWithEmpty.reverse()]
    }

    const dividedDiariesByMonthWithEmpty = dividedDiariesByMonth.map(diariesInMonth => {
      const { year, month } = getDiaryDateObj(diariesInMonth[0]).num
      const daysInMonth = getDaysInMonth(new Date(year, month - 1))
      const diariesInMonthWithEmpty = [...Array(daysInMonth)].map((v, i) => {
        const day = i + 1
        const createdDiary = diariesInMonth.find(diary => {
          const diaryDate = new Date(diary.date.seconds * 1000)
          return day === diaryDate.getDate()
        })
        const diaryId = format(new Date(year, month - 1, day), "yyyy-MM-dd");
        return createdDiary ? createdDiary : getInitialDiary(diaryId)
      })
      return diariesInMonthWithEmpty.reverse()
    })
    return dividedDiariesByMonthWithEmpty
  }

export const removeEmptyDiaries = (dividedDiariesByMonth: Diary[][]): Diary[][] => {
  const dividedDiariesByMonthWithOutEmpty = dividedDiariesByMonth.map(diariesInMonth => {
    return diariesInMonth.filter(diary => {
      const isEmptyDiary = diary.events.every(event => {
        return event.textFields.every(field => !field.value)
      })
      return !isEmptyDiary
    })
  })
  return dividedDiariesByMonthWithOutEmpty
}

export const flattenToDiaries = (dividedDiaries: Diary[][]) => {
  return dividedDiaries.reduce(
    (acc, curVal) => acc.concat(curVal),
    []
  );
}

export const sortByDiaryData = (diaries: Diary[]) => {
  const sortByDate = (a: Diary, b: Diary) => {
    const dateA = new Date(a.date.seconds * 1000)
    const dateB = new Date(b.date.seconds * 1000)
    return compareDesc(dateA, dateB)
  }
  return diaries.sort(sortByDate)
}

export const checkDiaryIfAfterPeriod = (diary: Diary, diaries: Diary[]) => {
  const lastTs = diaries[diaries.length - 1].date.seconds
  const thisTs = diary.date.seconds
  return lastTs < thisTs
}

export const sortFilledEvents = (events: Event[]) => {
  const newEvents = events.filter(event => isTextFilledEvent(event))
  const emptyEvents = events.filter(event => !isTextFilledEvent(event))
  newEvents.push(...emptyEvents)
  const sortedEvents = newEvents.map((event, i) => {
    const newEvent = { ...event }
    newEvent.id = i + 1
    return newEvent
  })
  return sortedEvents
}

export const updateEventStatus = (events: Event[]) => {
  const eventsStatus: EventItem<EventStatus>["eventsStatus"] =
    events.map((event): EventStatus => {
      if (!event.category && isTextFilledEvent(event)) throw new Error("no category but text");
      if (!event.category && !isTextFilledEvent(event)) return "empty"
      if (!isTextFilledEvent(event)) return "categoryFilled"
      return "textFilled"
    }) as [EventStatus, EventStatus, EventStatus]
  return eventsStatus
}


export const getNextEventAndDrawerStatus = (eventsStatus: [EventStatus, EventStatus, EventStatus]) => {
  const nextEventIndex = eventsStatus.findIndex(eventStatus => eventStatus !== "textFilled")
  const drawerStatus: InputDrawerStatue = eventsStatus[nextEventIndex] === "empty" ? "category" : "text"
  return { index: nextEventIndex, drawerStatus }
}


export const getDiaryId = (diary: Diary) => {
  const date = new Date(diary.date.seconds * 1000)
  return format(date, "yyyy-MM-dd")
}
