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

function fillForms(index = 0, max = 200) {
  if (index >= max) return;

  setTimeout(() => {
    let questions = document.getElementById("question-list").children;

    for (let i = 1; i < questions.length; i++) {
      if (i == 17) { // net score question
        let answers = getChildLayer(questions[i], [0, 1, 0, 1, 1, 1, 0]).children;
        getChildLayer(answers[Math.floor(Math.random() * answers.length)], [0, 0]).click();
      } else {
        let answers = getChildLayer(questions[i], [0, 1, 0, 0]).children;

        if (getChildLayer(answers[0], [0, 0, 0, 0]).type == "checkbox") { // multiple choice
          let valueBefore = null;
          for (let j = 0; j < Math.floor(Math.random() * answers.length); j++) {
            let value = getChildLayer(answers[Math.floor(Math.random() * answers.length)], [0, 0, 0, 0])

            if (value == valueBefore) continue;

            valueBefore = value;
            value.click();
          }
        } else { // single choice
          getChildLayer(answers[Math.floor(Math.random() * answers.length)], [0, 0, 0, 0]).click();
        }
      }
    }

    // search for "submit" button
    let buttons = document.getElementsByTagName("button");

    // get last button
    let lastButton = buttons[buttons.length - 1];
    lastButton.click();
  }, 1000);

  setTimeout(() => {
    // get "Send more Answers" text
    let links = document.getElementsByTagName("a");
    console.log("timeout");
    links[0].click();
    fillForms(index + 1, max);
  }, 1200);
}

function getChildLayer(element, indexList) {
  for (let i = 0; i < indexList.length; i++) {
    element = element.children[indexList[i]];
  }
  return element;
}