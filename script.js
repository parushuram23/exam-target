let currentUser = null;
let currentUserData = null;

const STORAGE_USERS_KEY = "mcq_test_app_users";

function getUsers() {
  const users = localStorage.getItem(STORAGE_USERS_KEY);
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
}

function findUser(username) {
  const users = getUsers();
  return users.find(u => u.username.toLowerCase() === username.toLowerCase());
}

const questions = {
  History: [
    { question: "Where is Sabarmati Ashram located?", options: ["Ahmedabad", "Delhi", "Mumbai", "Chennai"], correct: "Ahmedabad" },
    { question: "Which British Viceroy announced the partition of Bengal in 1905?", options: ["Lord Curzon", "Lord Minto", "Lord Ripon", "Lord Mountbatten"], correct: "Lord Curzon" },
    { question: "Who composed the Indian national anthem?", options: ["Rabindranath Tagore", "Bankim Chandra Chatterjee", "Sarojini Naidu", "Subhash Chandra Bose"], correct: "Rabindranath Tagore" },
    { question: "What was the main demand of the 'Khudai Khidmatgar' movement?", options: ["Self-rule", "Land reforms", "Education", "End of British rule"], correct: "End of British rule" },
    { question: "Which movement was led by B.R. Ambedkar to fight for Dalit rights?", options: ["Non-Cooperation Movement", "Dalit Buddhist Movement", "Quit India Movement", "Civil Disobedience Movement"], correct: "Dalit Buddhist Movement" },
    { question: "Who was the founder of the Arya Samaj?", options: ["Swami Vivekananda", "Dayananda Saraswati", "Ramakrishna Paramahamsa", "Mahatma Gandhi"], correct: "Dayananda Saraswati" },
    { question: "The Jallianwala Bagh massacre took place in which year?", options: ["1919", "1920", "1918", "1925"], correct: "1919" },
    { question: "Who was known as 'Iron Man of India'?", options: ["Sardar Vallabhbhai Patel", "Jawaharlal Nehru", "Mahatma Gandhi", "Bhagat Singh"], correct: "Sardar Vallabhbhai Patel" },
    { question: "The first Prime Minister of independent India was?", options: ["Jawaharlal Nehru", "Sardar Patel", "Rajendra Prasad", "Vallabhbhai Patel"], correct: "Jawaharlal Nehru" }
  ],
  Economy: [
    { question: "What is GDP?", options: ["Gross Domestic Product", "General Domestic Product", "Gross Development Product", "General Development Product"], correct: "Gross Domestic Product" },
    { question: "Which bank is the central bank of India?", options: ["State Bank of India", "Reserve Bank of India", "Punjab National Bank", "ICICI Bank"], correct: "Reserve Bank of India" },
    { question: "Inflation means?", options: ["Increase in prices", "Decrease in prices", "Stable prices", "None of the above"], correct: "Increase in prices" },
    { question: "What is the currency of India?", options: ["Dollar", "Rupee", "Pound", "Euro"], correct: "Rupee" },
    { question: "GST stands for?", options: ["Goods and Services Tax", "General Sales Tax", "Goods and Sales Tax", "General Service Tax"], correct: "Goods and Services Tax" },
    { question: "Which sector contributes the most to India's GDP?", options: ["Agriculture", "Industry", "Services", "Manufacturing"], correct: "Services" },
    { question: "What is a budget deficit?", options: ["When expenditure exceeds revenue", "When revenue exceeds expenditure", "Balanced budget", "None of the above"], correct: "When expenditure exceeds revenue" },
    { question: "Who presents the Union Budget in India?", options: ["Prime Minister", "Finance Minister", "President", "RBI Governor"], correct: "Finance Minister" },
    { question: "What is the main function of the Reserve Bank of India?", options: ["Monetary Policy", "Fiscal Policy", "Tax Collection", "Defense"], correct: "Monetary Policy" },
    { question: "Which is the largest stock exchange in India?", options: ["NSE", "BSE", "MCX", "FTSE"], correct: "NSE" },
    { question: "What is FDI?", options: ["Foreign Direct Investment", "Foreign Debt Investment", "Financial Debt Investment", "Foreign Deposit Investment"], correct: "Foreign Direct Investment" },
    { question: "Which is the currency symbol of the Indian Rupee?", options: ["$", "₹", "£", "€"], correct: "₹" },
    { question: "Which government body is responsible for economic planning in India?", options: ["NITI Aayog", "Planning Commission", "Finance Ministry", "RBI"], correct: "NITI Aayog" },
    { question: "Which tax was subsumed under GST?", options: ["VAT", "Income Tax", "Service Tax", "Wealth Tax"], correct: "VAT" },
    { question: "Microfinance mainly helps?", options: ["Large Corporations", "Small Businesses & Poor", "Government", "Banks"], correct: "Small Businesses & Poor" },
    { question: "What does CPI stand for?", options: ["Consumer Price Index", "Consumer Product Index", "Consumer Price Indicator", "Cost Price Index"], correct: "Consumer Price Index" },
    { question: "What is a bull market?", options: ["Market rising", "Market falling", "Market stable", "None of the above"], correct: "Market rising" },
    { question: "Demonetization happened in India in which year?", options: ["2016", "2015", "2017", "2018"], correct: "2016" },
    { question: "What does RBI stand for?", options: ["Reserve Bank of India", "Regional Bank of India", "Rural Bank of India", "Registered Bank of India"], correct: "Reserve Bank of India" },
    { question: "Which is the official economic policy document of India?", options: ["Economic Survey", "Budget Speech", "Finance Act", "Five Year Plan"], correct: "Economic Survey" }
  ]
};

let quizSubject = null;
let currentQuestionIndex = 0;
let score = 0;

// --- Page Controls ---
function showPage(pageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach(p => (p.style.display = "none"));
  document.getElementById(pageId).style.display = "block";
  if (pageId === "home-page") {
    renderHomePage();
  }
}

function showLogin() {
  currentUser = null;
  currentUserData = null;
  document.getElementById("user-display").textContent = "";
  renderHomeProfilePhoto();
  showPage("login-page");
}

function showRegister() {
  showPage("register-page");
}

function showForgot() {
  showPage("forgot-page");
}

function showHomePage() {
  if (!currentUser) {
    showLogin();
    return;
  }
  document.getElementById("user-display").textContent = currentUser;
  showPage("home-page");
  renderHomeProfilePhoto();
  renderHomePage();
}

function showTestPage() {
  showPage("test-page");
}

function showResultPage() {
  showPage("result");
}

function showProfilePage() {
  if (!currentUser) {
    showLogin();
    return;
  }
  document.getElementById("profile-username").textContent = currentUser;
  document.getElementById("profile-mobile").value = currentUserData.mobile || "";
  document.getElementById("profile-current-password").value = "";
  document.getElementById("profile-new-password").value = "";
  document.getElementById("profile-new-password-confirm").value = "";
  if (currentUserData.photo) {
    document.getElementById("profile-photo-display").style.backgroundImage = `url(${currentUserData.photo})`;
  } else {
    document.getElementById("profile-photo-display").style.backgroundImage = "";
  }
  document.getElementById("profile-msg").textContent = "";
  showPage("profile-page");
}

function logout() {
  currentUser = null;
  currentUserData = null;
  showLogin();
}

// --- Authentication ---
function login() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;
  const errorDiv = document.getElementById("login-error");
  errorDiv.textContent = "";

  if (!username || !password) {
    errorDiv.textContent = "Enter username and password.";
    return;
  }

  const user = findUser(username);
  if (!user) {
    errorDiv.textContent = "User not found.";
    return;
  }

  if (user.password !== password) {
    errorDiv.textContent = "Incorrect password.";
    return;
  }

  currentUser = user.username;
  currentUserData = user;
  showHomePage();
}

function register() {
  const username = document.getElementById("reg-username").value.trim();
  const mobile = document.getElementById("reg-mobile").value.trim();
  const password = document.getElementById("reg-password").value;
  const passwordConfirm = document.getElementById("reg-password-confirm").value;
  const errorDiv = document.getElementById("register-error");
  errorDiv.textContent = "";

  if (!username || !mobile || !password || !passwordConfirm) {
    errorDiv.textContent = "Please fill all fields.";
    return;
  }

  if (!/^\d{10}$/.test(mobile)) {
    errorDiv.textContent = "Mobile number must be 10 digits.";
    return;
  }

  if (password !== passwordConfirm) {
    errorDiv.textContent = "Passwords do not match.";
    return;
  }

  if (password.length < 6) {
    errorDiv.textContent = "Password must be at least 6 characters.";
    return;
  }

  if (findUser(username)) {
    errorDiv.textContent = "Username already taken.";
    return;
  }

  const users = getUsers();
  users.push({ username, mobile, password, photo: "" });
  saveUsers(users);

  alert("Registration successful. Please login.");
  showLogin();
}

function recoverPassword() {
  const username = document.getElementById("forgot-username").value.trim();
  const mobile = document.getElementById("forgot-mobile").value.trim();
  const errorDiv = document.getElementById("forgot-error");
  const resultDiv = document.getElementById("forgot-result");
  errorDiv.textContent = "";
  resultDiv.textContent = "";

  if (!username || !mobile) {
    errorDiv.textContent = "Please enter username and mobile number.";
    return;
  }

  if (!/^\d{10}$/.test(mobile)) {
    errorDiv.textContent = "Mobile number must be 10 digits.";
    return;
  }

  const user = findUser(username);
  if (!user) {
    errorDiv.textContent = "User not found.";
    return;
  }

  if (user.mobile !== mobile) {
    errorDiv.textContent = "Mobile number does not match.";
    return;
  }

  resultDiv.textContent = `Your password is: ${user.password}`;
}

// --- Home Page and Subject List ---
function renderHomePage() {
  const subjectListDiv = document.getElementById("subject-list");
  subjectListDiv.innerHTML = "";
  const subjects = Object.keys(questions);
  subjects.forEach(subj => {
    const btn = document.createElement("button");
    btn.classList.add("subject-btn");
    btn.textContent = subj;
    btn.onclick = () => startTest(subj);
    subjectListDiv.appendChild(btn);
  });
}

// Filter subjects by search input
function filterSubjects() {
  const searchVal = document.getElementById("subject-search").value.toLowerCase();
  const subjectListDiv = document.getElementById("subject-list");
  const buttons = subjectListDiv.querySelectorAll(".subject-btn");
  buttons.forEach(btn => {
    const subj = btn.textContent.toLowerCase();
    btn.style.display = subj.includes(searchVal) ? "inline-block" : "none";
  });
}

// --- Test Functions ---
function startTest(subject) {
  quizSubject = subject;
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("quiz-subject").textContent = subject;
  showTestPage();
  showQuestion();
}

function showQuestion() {
  const q = questions[quizSubject][currentQuestionIndex];
  document.getElementById("question").textContent = `Q${currentQuestionIndex + 1}. ${q.question}`;
  const optionsForm = document.getElementById("options");
  optionsForm.innerHTML = "";

  q.options.forEach((option, i) => {
    const label = document.createElement("label");
    label.classList.add("option");
    label.htmlFor = "opt" + i;

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.id = "opt" + i;
    input.value = option;

    label.appendChild(input);
    label.appendChild(document.createTextNode(option));
    optionsForm.appendChild(label);
  });
}

function submitAnswer() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    alert("Please select an answer.");
    return;
  }

  const userAnswer = selected.value;
  const correctAnswer = questions[quizSubject][currentQuestionIndex].correct;

  if (userAnswer === correctAnswer) {
    score++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex >= questions[quizSubject].length) {
    showResult();
  } else {
    showQuestion();
  }
}

function showResult() {
  document.getElementById("scoreText").textContent = `You scored ${score} out of ${questions[quizSubject].length}`;
  const passMark = Math.ceil(questions[quizSubject].length * 0.5);
  const passFailText = document.getElementById("passFailText");
  if (score >= passMark) {
    passFailText.textContent = "You passed!";
    passFailText.classList.remove("fail");
  } else {
    passFailText.textContent = "You failed.";
    passFailText.classList.add("fail");
  }
  showResultPage();
}

function goHome() {
  quizSubject = null;
  currentQuestionIndex = 0;
  score = 0;
  showHomePage();
}

// --- Profile Functions ---
function previewProfilePhoto() {
  const input = document.getElementById("profile-photo-input");
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById("profile-photo-display").style.backgroundImage = `url(${e.target.result})`;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function updateProfile() {
  const mobile = document.getElementById("profile-mobile").value.trim();
  const currentPassword = document.getElementById("profile-current-password").value;
  const newPassword = document.getElementById("profile-new-password").value;
  const newPasswordConfirm = document.getElementById("profile-new-password-confirm").value;
  const photoInput = document.getElementById("profile-photo-input");

  if (!/^\d{10}$/.test(mobile)) {
    document.getElementById("profile-msg").textContent = "Mobile number must be 10 digits.";
    return;
  }

  let users = getUsers();
  let userIndex = users.findIndex(u => u.username === currentUser);

  if (userIndex === -1) {
    document.getElementById("profile-msg").textContent = "User not found.";
    return;
  }

  if (currentPassword || newPassword || newPasswordConfirm) {
    if (currentPassword !== users[userIndex].password) {
      document.getElementById("profile-msg").textContent = "Current password is incorrect.";
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      document.getElementById("profile-msg").textContent = "New passwords do not match.";
      return;
    }
    if (newPassword.length < 6) {
      document.getElementById("profile-msg").textContent = "New password must be at least 6 characters.";
      return;
    }
    users[userIndex].password = newPassword;
  }

  users[userIndex].mobile = mobile;

  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      users[userIndex].photo = e.target.result;
      saveUsers(users);
      currentUserData = users[userIndex];
      document.getElementById("profile-msg").style.color = "lightgreen";
      document.getElementById("profile-msg").textContent = "Profile updated successfully.";
      renderHomeProfilePhoto();
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    saveUsers(users);
    currentUserData = users[userIndex];
    document.getElementById("profile-msg").style.color = "lightgreen";
    document.getElementById("profile-msg").textContent = "Profile updated successfully.";
    renderHomeProfilePhoto();
  }
}

function renderHomeProfilePhoto() {
  const div = document.getElementById("home-profile-photo");
  if (currentUserData && currentUserData.photo) {
    div.style.backgroundImage = `url(${currentUserData.photo})`;
  } else {
    div.style.backgroundImage = "";
  }
}

// --- Initialization ---
showLogin();
