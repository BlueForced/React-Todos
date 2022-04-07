const sorts = {
  dateAdded: "dateAdded",
  dateDue: "dateDue",
  importance: "importance",
};

const sorterFuncs = {
  dateAdded: (a, b) =>
    a.dateAdded < b.dateAdded ? 1 : a.dateAdded > b.dateAdded ? -1 : 0,
  dateDue: (a, b) =>
    a.dateDue < b.dateDue ? -1 : a.dateDue > b.dateDue ? 1 : 0,
  importance: (a, b) =>
    a.importance < b.importance ? 1 : a.importance > b.importance ? -1 : 0,
  isDone: (a, b) => {
    if (a.dateDone) {
      if (b.dateDone) {
        return 0;
      }
      return 1;
    }
    if (b.dateDone) {
      return -1;
    }
    return 0;
  },
};

export { sorts, sorterFuncs };
