// Define your quiz questions, options & answers in an array of object called "quizData"
const quizData = [
    {
      question: "1. What's the capital of France",
      options: ["Paris", "Doherty", "Abuja", "London"],
      answer: "Paris",
    },
    {
      question: "2. What's the full meaning of PHP?",
      options: [
        "Post Hyper Programming", "Python, Hello world, and Preprocessor",
        "Hypertext Preprocessor", "None of the above"
      ],
      answer: "Hypertext Preprocessor",
    },
    {
      question: '3. The app "Figma" is used for what?',
      options: [
        "Programming", "Product Design",
        "Product Management", "Engineering Drawing"
      ],
      answer: "Product Design",
    }
  ];

  const quizContainer = document.querySelector(".quiz-container");
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const submitButton = document.getElementById("submit");
  const paginationElement = document.getElementById("pagination"); //display page numbers
  const resultElement = document.getElementById("result");

  let currentQuestion = 0;
  let score = 0;

  // Function to display the current question & its options from the "quizData" array
  function displayQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.textContent = currentQuizData.question;

    optionsElement.innerHTML = ""; // Clear previous options

    currentQuizData.options.forEach((option, optionIndex) => {
      const optionInput = document.createElement("input"); //creates radio input elements for each option
      optionInput.type = "radio";
      optionInput.name = `question_${currentQuestion}`; // Use a unique name for each question group
      optionInput.id = `option_${currentQuestion}_${optionIndex}`; // Unique ID for each radio input

      const optionLabel = document.createElement("label");
      optionLabel.textContent = option;
      optionLabel.htmlFor = `option_${currentQuestion}_${optionIndex}`;

      optionsElement.appendChild(optionInput); // append the radio input to the options element
      optionsElement.appendChild(optionLabel);
      optionsElement.appendChild(document.createElement("br")); // Line break for separation
    });

    showPagination();
  }

  // Function to load the next question
  function loadNextQuestion() {
    currentQuestion++; // increments by 1
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      showResults();
    }
  }

  // Function to show the final results after the last question
  function showResults() {
    quizContainer.style.display = "none";
    resultElement.style.display = "block";
    resultElement.innerHTML = `You scored ${score} out of ${quizData.length}`;
  }

  // Function to handle user's answer selection
  function handleAnswerSelection(e) {
    const selectedOption = e.target.nextSibling.textContent;
    const correctAnswer = quizData[currentQuestion].answer;

    // checks the selected option against the correct answer and updates the score accordingly
    if (selectedOption === correctAnswer) {
      score++;
    }

    // save the selected option in localStorage
    localStorage.setItem(`question_${currentQuestion}`, JSON.stringify(selectedOption))

    // reset input on browser refresh
    optionsInputs.forEach(input => (input.checked = false))
    e.target.checked = true // set the clicked input as checked

    loadNextQuestion();
  }

  // Function to show pagination buttons
  function showPagination() {
    paginationElement.innerHTML = "";

    // adding previous button
    if(currentQuestion > 0){
      const prevButton = document.createElement("button")
      prevButton.textContent = "Previous" // the write-up of the created button element
      prevButton.addEventListener("click", ()=> goToQuestion(currentQuestion - 1)) // when the button is clicked, it subtracts 1 from the current question to take us back to the previous question
      paginationElement.appendChild(prevButton)
    }

    for (let i = 0; i < quizData.length; i++) {
      const button = document.createElement("button");
      button.textContent = i + 1;
      button.addEventListener("click", () => goToQuestion(i)); //switch to the corresponding question number when clicked
      paginationElement.appendChild(button);
    }

    // adding next button
    if(currentQuestion < quizData.length - 1){
      const nextButton = document.createElement("button");
      nextButton.textContent = "Next"
      nextButton.addEventListener("click", ()=> goToQuestion(currentQuestion + 1))
      paginationElement.appendChild(nextButton)
    }
  }

  // Function to navigate to a specific question via the pagination button
  function goToQuestion(questionNumber) {
    currentQuestion = questionNumber;
    displayQuestion(); // Updates the current question and displays it
  }

  // Event listeners
  submitButton.addEventListener("click", showResults); //listens for clicks to submit all what the user has inputted and displays the final result
  
  // Select all input elements within the optionsElement
  const optionsInputs = optionsElement.querySelectorAll('input[type="radio"]');
  // Attach the event listener only to these input elements
  optionsInputs.forEach(input => input.addEventListener("change", handleAnswerSelection));

  // Display the first question on page load
  displayQuestion();