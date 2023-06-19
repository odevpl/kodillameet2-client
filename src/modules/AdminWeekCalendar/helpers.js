export const sortEventsByTime = (events) => {
  return events.sort((a, b) => {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  });
};

export const weekdaysTranslation = {
  Wed: "Środa",
  Thu: "Czwartek",
  Fri: "Piątek",
  Sat: "Sobota",
  Sun: "Niedziela",
  Mon: "Poniedziałek",
  Tue: "Wtorek",
};

export const getUserProperty = (users, event, type) => {
  const foundUser = users.find(user => user.uuid === event.user_uuid);
  return foundUser?.[type] || '';
}

export const weekdays = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
