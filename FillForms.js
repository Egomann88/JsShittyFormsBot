function meta() {
  console.log("important Information:");

  console.log("All qustions are in 'question-list' (use children and start with 1)");
  console.log(document.getElementById("question-list").children);
  // question list (start with 1)

  // list of answers
  console.log("The Answers are in the 6-Chilren Layer:");
  console.log(getChildLayer(document.getElementById("question-list"), [1, 0, 1, 0, 0]).children);

  // random answer
  console.log("Choose a random answer:");
  let answers = getChildLayer(document.getElementById("question-list"), [1, 0, 1, 0, 0]).children;
  getChildLayer(answers[Math.floor(Math.random() * answers.length)], [0, 0, 0, 0]).click();

  // click
  console.log("Click on the checkbox");
  getChildLayer(document.getElementById("question-list"), [1, 0, 1, 0, 0, 0, 0, 0, 0, 0].click());

  // net score is special case
  console.log("Net score is special case");
  answers = getChildLayer(document.getElementById("question-list"), [17, 0, 1, 0, 1, 1, 1, 0]).children;
  getChildLayer(answers[Math.floor(Math.random() * answers.length)], [0, 0]).click();
}

function fillForms(index = 0, max = 5) {
  document.getElementsByTagName("a")[0].remove()
  if (index >= max) return;

  setTimeout(() => {
    let questions = document.getElementById("question-list").children;

    for (let i = 1; i < questions.length; i++) {
      let answerProps = answerPropabilities[i - 1];
      let answer = getRndAnswer(answerProps);

      console.log(i);

      if (i == 17) { // net score question
        let answers = getChildLayer(questions[i], [0, 1, 0, 1, 1, 1, 0]).children;

        if (answer == 0) answer = Math.floor(Math.random() * 5) + 1;
        else answer = Math.floor(Math.random() * 5) + 6;

        getChildLayer(answers[answer], [0, 0]).click();
      } else {
        let answers = getChildLayer(questions[i], [0, 1, 0, 0]).children;

        if (getChildLayer(answers[0], [0, 0, 0, 0]).type == "checkbox") { // multiple choice
          let loopNumber = Math.floor(Math.random() * answers.length - 1);
          let clickedAnswers = [];

          for (let j = 0; j < loopNumber; j++) {
            let maxTries = 8;

            while (clickedAnswers.includes(answer)) {
              if (maxTries-- <= 0) break;

              answer = getRndAnswer(answerProps);
            }
            if (maxTries <= 0) break;
            console.log("ans", answer, "lengh", answers.length);
            if (answer >= answers.length) break;

            clickedAnswers.push(answer);
            console.log("this answer is clicked:", answers[answer]);
            getChildLayer(answers[answer], [0, 0, 0, 0]).click();
          }
        } else { // single choice
          getChildLayer(answers[answer], [0, 0, 0, 0]).click();
        }
      }
    }

    // search for "submit" button
    let buttons = document.getElementsByTagName("button");

    // get last button
    let lastButton = buttons[buttons.length - 1];
    //lastButton.click();
  }, 500);

  setTimeout(() => {
    // get "Send more Answers" text
    let links = document.getElementsByTagName("a");
    console.log(links[0], "timeout");
    //links[0].click();
    //fillForms(index + 1, max);
  }, 3200);
}

function getChildLayer(element, indexList) {
  for (let i = 0; i < indexList.length; i++) {
    element = element.children[indexList[i]];
  }
  return element;
}

let answerPropabilities = [
  [25, 40, 25, 10],
  [50, 5, 5, 25, 15],
  [15, 25, 25, 20, 15],
  [40, 15, 25, 5, 15],
  [15, 15, 5, 5, 30, 30], // last is special case
  [15, 15, 15, 15, 15, 25], // last is special case
  [8, 20, 40, 32],
  [5, 15, 40, 40],
  [25, 40, 35],
  [15, 35, 50],
  [20, 40, 40],
  [40, 40, 20],
  [30, 35, 25, 10],
  [10, 35, 30, 25],
  [15, 15, 15, 55],
  [10, 55, 25, 10],
  [70, 30], // 1. unter 5 ; 2. über 5
  [10, 30, 35, 25],
  [30, 25, 20, 15, 7, 3],
  [20, 50, 30],
  [15, 20, 20, 22, 23],
  [10, 20, 30, 25, 15],
  [31, 27, 15, 10, 2, 0, 15],
  [36, 33, 31],
  [25, 30, 30, 15],
  [40, 20, 5, 3, 20, 12],
];

function checkIfCorrect() {
  for (let i = 0; i < answerPropabilities.length; i++) {
    getRndAnswer(answerPropabilities[i]);
    console.log(i + 1, answerPropabilities[i]);
  }
}


function getRndAnswer(propabilityList) {
  const allPropabilities = propabilityList.reduce((sum, p) => sum + p, 0);

  if (allPropabilities !== 100) {
    throw new Error("Die Summe der Wahrscheinlichkeiten muss 100 betragen.");
  }

  const rnd = Math.random() * 100;
  let culmulativePropabilitiy = 0;

  for (let i = 0; i < propabilityList.length; i++) {
    culmulativePropabilitiy += propabilityList[i];
    if (rnd <= culmulativePropabilitiy) {
      return i;
    }
  }
}