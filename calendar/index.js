import React from "react";
import dateFns from "date-fns";
import { getDatesByWeekNo, daysOfTheWeek } from "../shared";

const cellSize = 38;
const green = "#00a699";
const lightGrey = "#e4e7e7";
const mediumGrey = "#ced2d2";
const arrow = (
  <svg viewBox="0 0 1000 1000">
    <path d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z" />
  </svg>
);
const styles = {
  arrow: {
    width: 20,
    height: 20,
    padding: 5,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: mediumGrey,
    borderRadius: 3,
    cursor: "pointer"
  },
  calCell: {
    textAlign: "center",
    userSelect: "none",
    width: cellSize
  },
  timeInput: {
    borderWidth: 0,
    textAlign: "right",
    width: 40,
    fontSize: 16,
    padding: 2.5
  },
  disabledCell: {
    color: lightGrey
  }
};

const now = new Date();
const EventUrl = "http://localhost:8000/api/events/";
const mockEvents = [
  {
    uuid: "33787f01608c432890314c7374882d99",
    title: "million tickets test",
    start_date: "2020-01-09T12:15:00+01:00",
    images: [],
    url: "http://localhost:8000/en/e/million-tickets-test/",
    address: {
      whitelabel: 2,
      first_name: "first",
      last_name: "last",
      title: "",
      business_name: "",
      cvr: "",
      ean: "",
      street: "",
      street_2: "",
      city: "",
      postcode: "",
      country: "",
      phone: "42424242",
      email: "admin@example.com",
      language: "",
      get_full_address: ",  , ",
      full_address: ",  , "
    },
    is_expired: false,
    price_min: 0.0,
    price_max: 0.0,
    currency: "DKK",
    members_only: false,
    description: "",
    summary: "",
    sold_out: false
  },
  {
    uuid: "d7faf900d5904067983c0ec4a385d9da",
    title: "helloo",
    start_date: "2019-12-31T09:45:00+01:00",
    images: [],
    url: "http://localhost:8000/en/e/helloo/",
    address: {
      whitelabel: 2,
      first_name: "first",
      last_name: "last",
      title: "",
      business_name: "",
      cvr: "",
      ean: "",
      street: "",
      street_2: "",
      city: "",
      postcode: "",
      country: "",
      phone: "42424242",
      email: "admin@example.com",
      language: "",
      get_full_address: ",  , ",
      full_address: ",  , "
    },
    is_expired: false,
    price_min: 0.0,
    price_max: 100.0,
    currency: "DKK",
    members_only: false,
    description: "",
    summary: "",
    sold_out: false
  },
  {
    uuid: "0d6f4265fa964c83ab4bcd1b54bae0e8",
    title: "neprasyk",
    start_date: "2019-12-30T15:30:00+01:00",
    images: [],
    url: "http://localhost:8000/en/e/neprasyk/",
    address: {
      whitelabel: 2,
      first_name: "first",
      last_name: "last",
      title: "",
      business_name: "",
      cvr: "",
      ean: "",
      street: "",
      street_2: "",
      city: "",
      postcode: "",
      country: "",
      phone: "42424242",
      email: "admin@example.com",
      language: "",
      get_full_address: ",  , ",
      full_address: ",  , "
    },
    is_expired: false,
    price_min: 0.0,
    price_max: 0.0,
    currency: "DKK",
    members_only: false,
    description: "",
    summary: "",
    sold_out: false
  },
  {
    uuid: "328879e537c54527a101659451346b57",
    title: "ar man padesi?",
    start_date: "2019-12-17T15:15:00+01:00",
    images: [],
    url: "http://localhost:8000/en/e/ar-man-padesi/",
    address: {
      whitelabel: 2,
      first_name: "first",
      last_name: "last",
      title: "",
      business_name: "",
      cvr: "",
      ean: "",
      street: "",
      street_2: "",
      city: "",
      postcode: "",
      country: "",
      phone: "42424242",
      email: "admin@example.com",
      language: "",
      get_full_address: ",  , ",
      full_address: ",  , "
    },
    is_expired: false,
    price_min: 0.0,
    price_max: 100.0,
    currency: "DKK",
    members_only: false,
    description: "",
    summary: "",
    sold_out: false
  },
  {
    uuid: "efc6e749f4744daf963b31a0adde3c20",
    title: "gbfgbgfb",
    start_date: "2019-12-30T15:15:00+01:00",
    images: [],
    url: "http://localhost:8000/en/e/gbfgbgfb/",
    address: {
      whitelabel: 2,
      first_name: "first",
      last_name: "last",
      title: "",
      business_name: "",
      cvr: "",
      ean: "",
      street: "",
      street_2: "",
      city: "",
      postcode: "",
      country: "",
      phone: "42424242",
      email: "admin@example.com",
      language: "",
      get_full_address: ",  , ",
      full_address: ",  , "
    },
    is_expired: false,
    price_min: 0.0,
    price_max: 0.0,
    currency: "DKK",
    members_only: false,
    description: "",
    summary: "",
    sold_out: false
  },
  {
    uuid: "c8b759ccd6334eae9a76869dc1a493fa",
    title: "discout code test",
    start_date: "2019-12-30T09:15:00+01:00",
    images: [],
    url: "http://localhost:8000/en/e/discout-code-test/",
    address: {
      whitelabel: 2,
      first_name: "first",
      last_name: "last",
      title: "",
      business_name: "",
      cvr: "",
      ean: "",
      street: "",
      street_2: "",
      city: "",
      postcode: "",
      country: "",
      phone: "42424242",
      email: "admin@example.com",
      language: "",
      get_full_address: ",  , ",
      full_address: ",  , "
    },
    is_expired: false,
    price_min: 100.0,
    price_max: 100.0,
    currency: "DKK",
    members_only: false,
    description: "",
    summary: "",
    sold_out: false
  },
  {
    uuid: "87b1e09767f94d65be6f18f4ca881d8b",
    title: "order list test",
    start_date: "2019-12-25T13:45:00+01:00",
    images: [],
    url: "http://localhost:8000/en/e/order-list-test/",
    address: {
      whitelabel: 2,
      first_name: "first",
      last_name: "last",
      title: "",
      business_name: "",
      cvr: "",
      ean: "",
      street: "",
      street_2: "",
      city: "",
      postcode: "",
      country: "",
      phone: "42424242",
      email: "admin@example.com",
      language: "",
      get_full_address: ",  , ",
      full_address: ",  , "
    },
    is_expired: false,
    price_min: 0.0,
    price_max: 0.0,
    currency: "DKK",
    members_only: false,
    description: "",
    summary: "",
    sold_out: false
  },
  {
    uuid: "74ad1c47b4f24632879acb21ee5ea919",
    title: "helllooo",
    start_date: "2019-11-25T12:00:00+01:00",
    images: [],
    url: "http://localhost:8000/en/e/helllooo-1/",
    address: {
      whitelabel: 2,
      first_name: "first",
      last_name: "last",
      title: "",
      business_name: "",
      cvr: "",
      ean: "",
      street: "",
      street_2: "",
      city: "",
      postcode: "",
      country: "",
      phone: "42424242",
      email: "admin@example.com",
      language: "",
      get_full_address: ",  , ",
      full_address: ",  , "
    },
    is_expired: true,
    price_min: 0.0,
    price_max: 0.0,
    currency: "DKK",
    members_only: false,
    description: "",
    summary: "",
    sold_out: false
  },
  {
    uuid: "4578259c79dd43afa336a9ff188a4531",
    title: "test",
    start_date: "2019-12-18T22:00:00+01:00",
    images: [],
    url: "http://localhost:8000/en/e/test/",
    address: {
      whitelabel: 2,
      first_name: "first",
      last_name: "last",
      title: "",
      business_name: "",
      cvr: "",
      ean: "",
      street: "213",
      street_2: "",
      city: "",
      postcode: "",
      country: "",
      phone: "42424242",
      email: "admin@example.com",
      language: "",
      get_full_address: "213,  , ",
      full_address: "213,  , "
    },
    is_expired: false,
    price_min: 0.0,
    price_max: 0.0,
    currency: "DKK",
    members_only: false,
    description: "",
    summary: "",
    sold_out: false
  },
  {
    uuid: "304182905e514f0089642b360224a14b",
    title: "helllooo",
    start_date: "2019-12-18T14:45:00+01:00",
    images: [],
    url: "http://localhost:8000/en/e/helllooo/",
    address: {
      whitelabel: 2,
      first_name: "first",
      last_name: "last",
      title: "",
      business_name: "",
      cvr: "",
      ean: "",
      street: "",
      street_2: "",
      city: "",
      postcode: "",
      country: "",
      phone: "42424242",
      email: "admin@example.com",
      language: "",
      get_full_address: ",  , ",
      full_address: ",  , "
    },
    is_expired: false,
    price_min: 100.0,
    price_max: 100.0,
    currency: "DKK",
    members_only: false,
    description: "",
    summary: "",
    sold_out: true
  },
  {
    uuid: "75a070b441a34f45b2c2cbb2bf023aad",
    title: "test self registration",
    start_date: "2019-12-20T10:15:00+01:00",
    images: [],
    url: "http://localhost:8000/en/e/test-self-registration/",
    address: {
      whitelabel: 2,
      first_name: "first",
      last_name: "last",
      title: "",
      business_name: "",
      cvr: "",
      ean: "",
      street: "Amager Strand",
      street_2: "",
      city: "Copenhagen",
      postcode: "2300",
      country: "",
      phone: "42424242",
      email: "admin@example.com",
      language: "",
      get_full_address: "Amager Strand, 2300 Copenhagen, ",
      full_address: "Amager Strand, 2300 Copenhagen, "
    },
    is_expired: false,
    price_min: 0.0,
    price_max: 0.0,
    currency: "DKK",
    members_only: false,
    description: "",
    summary: "",
    sold_out: false
  }
];

function getDayId(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthDay = date.getDate();
  return [year, month, monthDay].join("-");
}

export default function Calendar() {
  const [shownMonthDate, setShownMonthDate] = React.useState(now);
  const [selectedDate, setSelectedDate] = React.useState(now);
  const datesInMonthByWeek = getDatesByWeekNo(shownMonthDate);
  const [eventsByDay, setEventsByDay] = React.useState();

  React.useEffect(function() {
    setEventsByDay(
      mockEvents.reduce(function(acc, event) {
        const eventDayId = getDayId(new Date(event.start_date));
        const eventsForDay = acc[eventDayId] || [];
        return { ...acc, [eventDayId]: eventsForDay.concat(event) };
      }, {})
    );
    // async function fetchEvents() {
    //   const req = await fetch(EventUrl);
    //   if (req.ok) {
    //     const res = await req.json();
    //     setEvents(res);
    //   }
    // }
    // fetchEvents();
  }, []);
  return (
    <div>
      <div
        style={{
          width: "100%",
          maxWidth: 315,
          backgroundColor: "white",
          borderRadius: 3,
          margin: "10px 0",
          border: "1px solid #eee",
          outline: 0,
          zIndex: 50
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            margin: 15
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%"
            }}
          >
            <div
              className="date-time-picker-arrow"
              style={{ ...styles.arrow, transform: "rotate(180deg)" }}
              onClick={() =>
                setShownMonthDate(date => date.setMonth(date.getMonth() - 1))
              }
            >
              {arrow}
            </div>

            <span style={{ fontWeight: "bold", userSelect: "none" }}>
              {dateFns.format(shownMonthDate, "MMMM YYYY")}
            </span>
            <div
              className="date-time-picker-arrow"
              style={styles.arrow}
              onClick={() =>
                setShownMonthDate(
                  setShownMonthDate(date => date.setMonth(date.getMonth() + 1))
                )
              }
            >
              {arrow}
            </div>
          </div>
          <table
            style={{
              tableLayout: "fixed",
              borderCollapse: "collapse",
              margin: "15px 0"
            }}
          >
            <thead>
              <tr>
                {daysOfTheWeek.map(day => (
                  <td
                    key={day}
                    style={{
                      ...styles.calCell,
                      cursor: "default",
                      color: "#6b6b6b",
                      fontSize: 12
                    }}
                  >
                    {day}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {datesInMonthByWeek.map((weekDays, i) => (
                <tr
                  key={i}
                  style={{
                    height: cellSize
                  }}
                >
                  {weekDays.map((day, i) => {
                    const min =
                      min && dateFns.isAfter(dateFns.startOfDay(min), day.date);
                    const max =
                      max && dateFns.isBefore(dateFns.endOfDay(max), day.date);
                    // Render days in week for each week
                    if (day.date) {
                      const dayId = getDayId(day.date);
                      return (
                        <td
                          key={i}
                          className={min || max ? "" : "valid-cell"}
                          style={{
                            ...styles.calCell,
                            // borderWidth: 1,
                            // borderStyle: "solid",
                            // borderColor: "#ccc",
                            position: "relative",
                            border:
                              dateFns.isSameDay(day.date, now) &&
                              "1px solid #9A9A9A",
                            cursor: "pointer",

                            // ...(dateFns.isSameDay(day.date, selectedDate)
                            //   ? {
                            //       // border: "1px solid #9A9A9A",
                            //       // borderRadius: "5px"
                            //     }
                            //   : {}),
                            ...(min || max ? styles.disabledCell : {})
                          }}
                          onClick={function() {
                            setSelectedDate(day.date);
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              textAlign: "right",
                              height: 8
                            }}
                          >
                            {eventsByDay &&
                              eventsByDay[dayId] &&
                              eventsByDay[dayId].map(event => {
                                return (
                                  <div
                                    key={event.uuid}
                                    style={{
                                      display: "inline-block",
                                      marginLeft: 2,
                                      width: 8,
                                      height: 8,
                                      backgroundColor: event.sold_out
                                        ? "#EF6363"
                                        : "#84C069",
                                      borderRadius: "50%"
                                    }}
                                  ></div>
                                );
                              })}
                          </div>
                          <span>{dateFns.getDate(day.date)}</span>
                        </td>
                      );
                    } else {
                      return <td key={i} />;
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
