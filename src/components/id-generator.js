let record = [1, 2, 3, 4, 5, 6, 7];

function generateID() {
  let lastNumber = record[record.length - 1];
  let newNumber = lastNumber + 1;
  record.push(newNumber);
  return newNumber;
}

export default generateID;
