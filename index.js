const userBirthday = document.querySelector(".user-birthday");
const submitButton = document.querySelector(".submit-button");
const outputMessage = document.querySelector(".output-message");
const nextPalindromeMessage = document.querySelector(
  ".next-palindrome-message"
);

submitButton.addEventListener("click", checkPalindrome);

function checkPalindrome() {
  const birthDay = userBirthday.value.split("-"); // an array of birthday year, month , date
  var isPalindrome = checkPalindromeForAllFormats(birthDay);

  if (isPalindrome === true) {
    outputMessage.innerText = "Is a palindrome";
  } else {
    outputMessage.innerText = "Is not a palindrome";
  }
  var getNextPalindrome = getNextPalindromeDate(birthDay);
  let nextPalindromeDate = getNextPalindrome.date;
  let nextPalindromeCount = getNextPalindrome.delay;
  nextPalindromeMessage.innerText =
    "Next Palindrome Date: " +
    nextPalindromeDate[2] +
    "-" +
    nextPalindromeDate[1] +
    "-" +
    nextPalindromeDate[0] +
    " You missed it by: " +
    nextPalindromeCount +
    " days";

  // console.log(typeof birthDay.join(""));
  // console.log(typeof nextD);

  // if (isLeapYear(birthDay) === true) {
  //   console.log("Is leap year");
  //   console.log(isLeapYear(birthDay));
  // } else {
  //   console.log("Not a leap year");
  // }
}

//a function to reverse the birthday
function reverseBirthday(birthDay) {
  const reverseBirthday = birthDay.split("").reverse().join("");
  return reverseBirthday;
}

// a function to check if the reverse birthday equal birthday and pass true and false
function isPalindrome(birthDay) {
  var invertBirthday = reverseBirthday(birthDay);
  return birthDay === invertBirthday;
}

function allDateFormats(birthDay) {
  var ddmmyyyy = birthDay[2] + birthDay[1] + birthDay[0];
  var mmddyyyy = birthDay[1] + birthDay[2] + birthDay[0];
  var yyyymmdd = birthDay[0] + birthDay[1] + birthDay[0];
  var ddmmyy = birthDay[2] + birthDay[1] + birthDay[0].slice(-2);
  var mmddyy = birthDay[1] + birthDay[2] + birthDay[0].slice(-2);
  var yyddmm = birthDay[0].slice(-2) + birthDay[2] + birthDay[1];

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeForAllFormats(birthDay) {
  let allDate = allDateFormats(birthDay); // an array of all date formats
  for (let i = 0; i < allDate.length; i++) {
    if (isPalindrome(allDate[i]) === true) {
      return true;
      break;
    }
  }
  return false;
}

function isLeapYear(birthDay) {
  const year = birthDay[0];
  // year/4 ==0 && year/100!=0 && year/400==0 then leap year
  if (year % 4 == 0 && year % 100 != 0) {
    return true;
  } else if (year % 4 == 0 && year % 100 == 0 && year % 400 == 0) {
    return true;
  }
  // year/4!=0 or year/4==0 && year/100==0 && year/400!=0 then not leap year
  else {
    return false;
  }
}

function addZeroInDateAndMonth(date, month) {
  //if date<10 "0"+ date.toString(10)
  let stringDate = "0";
  let stringMonth = "0";
  if (date < 10) {
    stringDate = "0" + date.toString(10);
  } else {
    stringDate = date.toString(10);
  }

  //if month<10 "0"+ month.toString(10)
  if (month < 10) {
    stringMonth = "0" + month.toString(10);
  } else {
    stringMonth = month.toString(10);
  }
  // return stringDate, stringMonth; wrong way to return two values from a function
  return {
    date: stringDate,
    month: stringMonth,
  };
}

function nextDate(birthDay) {
  let date = Number(birthDay[2]); //01
  let month = Number(birthDay[1]); //02
  let year = Number(birthDay[0]); //2023
  let nextDay = 0;

  const dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // when next day is 29 feb of a leap year
  if (month === 2 && isLeapYear(birthDay) === true && date === 28) {
    date = 29;
    month = 2;
    // If date is 28Feb of a nonLeapYear
  } else if (month === 2 && isLeapYear === false && day === 28) {
    day = 1;
    month = 3;
  } // when next day is 1 jan after 31 December
  else if (month === 12 && date === 31) {
    date = 1;
    month = 1;
    year = year + 1;
  }
  // when next day is 1st day of next month
  else if (date > dayInMonth[month - 1] || date === dayInMonth[month - 1]) {
    date = 1;
    month = month + 1;
  } else {
    date = date + 1;
  }
  //for all normal date=date+1

  const stringDateMonth = addZeroInDateAndMonth(date, month);
  // nextDay = year.toString(10) + month + date;
  // return nextDay; // in string type
  return {
    date: stringDateMonth.date,
    month: stringDateMonth.month,
    year: year.toString(10),
  };
}
function getNextPalindromeDate(birthDay) {
  let count = 0;
  let nextD = nextDate(birthDay);
  let currentDay = [nextD.year, nextD.month, nextD.date];
  var isPalindrome = checkPalindromeForAllFormats(currentDay);
  while (isPalindrome === false) {
    if (isPalindrome === true) {
      count = count + 1;
      break;
    } else {
      currentDay = [
        nextDate(currentDay).year,
        nextDate(currentDay).month,
        nextDate(currentDay).date,
      ];
      count++;
      var isPalindrome = checkPalindromeForAllFormats(currentDay);
    }
  }
  return { date: currentDay, delay: count };
}
