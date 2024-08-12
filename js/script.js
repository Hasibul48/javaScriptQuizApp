const Fbtn = document.querySelector(".btnWrapper button"), page2 = document.querySelector(".page2"), page3 = document.querySelector(".page3"), exitBtn = document.querySelector(".p3Btn1"), continuebtn = document.querySelector(".p3Btn2");

Fbtn.addEventListener("click", function () {
    page2.style.display = "block";
})
exitBtn.addEventListener("click", function () {
    page2.style.display = "none";
})

continuebtn.addEventListener("click", function () {
    page3.style.display = "block";
    showDynamically(0);
    setTimer(30)
});

let lastPage = document.querySelector('.page4');

let queCount = 0;

let crrentTime = document.querySelector("#crrTime");
let counter;
let nextBtn = document.querySelector('.qnB');


let showResult = document.querySelector(".page4");

nextBtn.addEventListener("click", function () {
    if (queCount < questions.length - 1) {
        queCount++;
        showDynamically(queCount);
        clearInterval(counter);
        setTimer(30)
        nextBtn.style.display = "none";
    } else {
        showResult.style.display = "block";
    }
})
let optionsM = document.querySelector('.optionWrapper');

function showDynamically(indexNumber) {
    const maniQuestion = document.querySelector(".crrQuestion");
    maniQuestion.innerHTML = questions[indexNumber].number + "." + " " + questions[indexNumber].question;

    // let optionsM = document.querySelector('.optionWrapper');
    optionsM.innerHTML = `<li  class="options">` + questions[indexNumber].options[0] + `</li>` + `<li  class="options">` + questions[indexNumber].options[1] + `</li>` +
        `<li  class="options">` + questions[indexNumber].options[2] + `</li>` +
        `<li  class="options">` + questions[indexNumber].options[3] + `</li>`;

    document.querySelector(".qnP").innerHTML = `${indexNumber + 1} of ${questions.length} Questions`;

    const option = optionsM.querySelectorAll(".options");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }

}
let points = 0;
let WrongPoints = 0;
let scoreArea = document.querySelector(".scoreArea");
const tikIcon = `<div class="tikIcon"><i class="fa fa-check" aria-hidden="true"></i></div>`, crossIcon = `<div class="crossIcon"><i class="fa fa-times" aria-hidden="true"></i></div>`;

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let rightAnswer = questions[queCount].answer;
    let alloptions = optionsM.children.length;
    clearInterval(counter);

    if (userAnswer === rightAnswer) {
        answer.classList.add("currect");
        // console.log("currect");
        answer.insertAdjacentHTML("beforeend", tikIcon);
        points += 1;
        console.log(points);
        if (points === 0) {
            points = 0;
        }
    } else {
        answer.classList.add("incurrect");
        // console.log("Incurrect");
        answer.insertAdjacentHTML("beforeend", crossIcon)
        for (i = 0; i < alloptions; i++) {
            if (optionsM.children[i].textContent === rightAnswer) {
                optionsM.children[i].classList.add("options");
                optionsM.children[i].classList.add("currect");
                optionsM.children[i].insertAdjacentHTML("beforeend", tikIcon);
            }
        }
        WrongPoints += 1;
        console.log(WrongPoints);
        if (WrongPoints === 0) {
            WrongPoints = 0;
        }
    }
    dynamicResult(points, WrongPoints);

    for (let i = 0; i < alloptions; i++) {
        optionsM.children[i].classList.add("disabled");
    }
    nextBtn.style.display = "block";
}

function setTimer(time) {
    counter = setInterval(timerCount, 1000);
    let alloptions = optionsM.children.length;
    let rightAnswer = questions[queCount].answer;
    function timerCount() {
        crrentTime.textContent = time;

        time--

        if (time <= 9) {
            crrentTime.textContent = "0" + time;
        }
        if (time <= 0) {
            clearInterval(counter);
        }
        if (time === 0) {
            for (let i = 0; i < alloptions; i++) {
                optionsM.children[i].classList.add("disabled");
            }

            nextBtn.style.display = "block";

            for (i = 0; i < alloptions; i++) {
                if (optionsM.children[i].textContent === rightAnswer) {
                    optionsM.children[i].classList.add("options");
                    optionsM.children[i].classList.add("currect");
                    optionsM.children[i].insertAdjacentHTML("beforeend", tikIcon);
                }
            }
        }
    }

}

function dynamicResult(points, WrongPoints) {
    scoreArea.innerHTML = `<h1 style= "margin-bottom: 20px; text-align: center">Your Score</h1><p>Currect Answer(s) : ${points}</p><p>Wrong Answer(s) : ${WrongPoints}</p><p>Missed: ${questions.length - (points + WrongPoints)}</p><p>Total mark(s): ${points} Out Of ${questions.length}</p>`
}

document.querySelector(".exitQBtn").addEventListener("click", function () {
    window.location.reload();
});

document.querySelector(".replayBtn").addEventListener("click", function () {
    window.location.reload();
})

// MADE BY HASIBUL ISLAM