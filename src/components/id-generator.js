let record = [0];

function generateID() {
  let lastNumber = record[record.length - 1];
  let newNumber = lastNumber + 1;
  record.push(newNumber);
  return newNumber;
}

export default generateID;
