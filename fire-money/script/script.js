let outSum = document.querySelector(".promo-form__output-sum");
const outputSumCredut = document.querySelector(".promo-form__output");
const inputSumCredit = document.querySelector(".promo-form__input");
const inputSumCreditWidth = Number(inputSumCredit.clientWidth);
const circleSumCredit = document.querySelector(".promo-form__circle");
const creditTake = document.querySelector(".sum-credit-take");
const sumReturn = document.querySelector(".promo-form__sum-return");
const sumMonth = document.querySelector(".promo-form__sum-month");

let outTerm = document.querySelector(".promo-form__return-period");
const outputTermCredit = document.querySelector(
  ".promo-form__output-term-credit"
);
const inputTermCredit = document.querySelector(
  ".promo-form__input-term-credit"
);
const inputTermCreditWidth = Number(inputTermCredit.clientWidth);
const circleTermCredit = document.querySelector(
  ".promo-form__circle-term-credit"
);
const outTermDay = document.querySelector(".promo-form__term-day");
const dateReturn = document.querySelector(".date-return");
dateReturn.textContent = getReturnDate(8);

function updateToValue(value, id) {
  if (id === "range1") {
    outSum.innerText = value;
    creditTake.textContent = value + " 000 ₽";
    outputSumCredut.style.left =
      (inputSumCreditWidth - 21) * (value / 130) + "px";
    circleSumCredit.style.left =
      (inputSumCreditWidth - 21) * (value / 100) + "px";
    sum = Number(value);
    sum = sum * 0.1 + sum;
    sumMonth.textContent =
      (
        calculateMonthlyPayment(Number(sum), Number(outTerm.textContent)) / 10
      ).toFixed(0) + " ₽";
    sumReturn.textContent = formatNumber(sum) + " ₽";
  } else if (id === "range2") {
    let textTerm = value;
    outputTermCredit.style.left =
      (inputTermCreditWidth - 21) * (value / 40) + "px";
    circleTermCredit.style.left =
      (inputTermCreditWidth - 21) * ((value - 3) / 27) + "px";
    sumMonth.textContent =
      calculateMonthlyPayment(
        Number(outSum.textContent * 0.1 + outSum.textContent),
        Number(outTerm.textContent)
      ) + " ₽";
    outTerm.textContent = value;
    if (textTerm == 1 || textTerm == 21) {
      outTermDay.textContent = " день";
    } else if ((value >= 2 && value <= 4) || (value >= 22 && value <= 24)) {
      outTermDay.textContent = " дня";
    } else {
      outTermDay.textContent = " дней";
    }
    dateReturn.textContent = getReturnDate(textTerm);
  }
}

function formatNumber(number) {
  if (isNaN(number)) {
    return "Неверный формат числа";
  }
  const numberString = number.toString();
  const parts = numberString.split(".");
  if (parts.length === 1) {
    parts.push("000");
  } else if (parts[1].length === 1) {
    parts[1] += "00";
  }
  const formattedNumber = parts[0] + " " + parts[1];
  return formattedNumber;
}

function getReturnDate(numDay) {
  const today = new Date();
  const day = today.getDate() + Number.parseInt(numDay);
  today.setDate(day);
  let month = today.toLocaleDateString("default", { month: "long" });
  if (
    today.getMonth() === 2 || // март
    today.getMonth() === 7
  ) {
    month += "а";
  } else {
    month = month.slice(0, -1);
    month += "я";
  }
  const dateString = today.getDate() + " " + month + " " + today.getFullYear();
  return dateString;
}

function calculateMonthlyPayment(P, n) {
  P = P * 1000;
  let r = P / n;
  let M = r * 10;
  return M.toFixed(0);
}
