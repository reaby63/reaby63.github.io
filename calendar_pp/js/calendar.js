console.clear();
//事件來源
const events = [
  {
    id: "E001",
    name: "看牙醫",
    description: "記得先刷牙",
    date: "2023/12/05",
    type: "event",
    everyYear: false
  },
  {
    id: "E002",
    name: "聖誕節",
    date: "2023/12/25",
    type: "holiday",
    everyYear: true
  },
  {
    id: "E003",
    name: "旅行",
    description: "報平安",
    date: ["2023/12/10", "2023/12/14"],
    type: "holiday",
    everyYear: false
  }
];

/* 月曆初始化控制 ============*/
$("#calendar")
  .evoCalendar({
    format: "yyyy/mm/dd", //時間格式
    todayHighlight: true, //標註今天
    sidebarDisplayDefault: false, //左側月份預設顯示狀態
    eventDisplayDefault: false, //右側事件預設顯示狀態
    calendarEvents: events //傳入套件的事件來源
  })
  .on("selectEvent", function (event, activeEvent) {
    // 點擊月曆右側的事件列才會觸發
    console.log("你選擇的事件是", event);
  })
  .on("selectDate", function (event, activeDate) {
    // 點擊月曆日期會觸發
    console.log(
      "你選擇的事件 id 是",
      event.target.evoCalendar.$active.events[0].id
    );
    console.log(`你選擇的日期是：${activeDate}`);
  })
  .on("selectMonth", function (event, activeMonth) {
    // 點擊月曆月份會觸發
    console.log(`你選擇的月份是：${activeMonth}`);
  });

/* 新增事件 =============*/
//綁定送出按鈕
const btnAddEvent = document.querySelector(".addEvent");
//綁定所有輸入格
const eventInput = document.querySelectorAll(".event-input");
//綁定表單
const form = document.querySelector(".form");

btnAddEvent.addEventListener("click", addEvent);

function addEvent() {
  //有未填欄位就跳出
  if (!checkFormError()) {
    return;
  }

  const data = {
    id: new Date().getTime(),
    name: eventInput[0].value,
    description: eventInput[5].value,
    date: [eventInput[1].value, eventInput[2].value],
    type: eventInput[3].value,
    everyYear: eventInput[4].value === "yes" ? true : false
  };

  //印出要新增的資料
  console.log(data);

  //在月曆上新增事件
  $("#calendar").evoCalendar("addCalendarEvent", data);

  //執行月曆初始化
  $("#calendar").evoCalendar();

  //清除表單
  form.reset();
}

function checkFormError() {
  let isFilledForm = true;

  eventInput.forEach((item) => {
    if (item.value.trim() === "") {
      isFilledForm = false;
    }
  });

  alert("欄位均須填寫");
  return isFilledForm;
}

$("#calendar").on("selectEvent", function (event, activeEvent) {
  console.log(activeEvent);
});