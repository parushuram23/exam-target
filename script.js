// --- User management ---
function getUsers() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function findUser(username) {
  return getUsers().find(u => u.username === username);
}

let currentUser = null;
let currentUserData = null; // full user object

// --- Questions ---
const questions = {
 History: [
  { question: "Who was the first Governor-General of independent India?", options: ["Lord Mountbatten", "C. Rajagopalachari", "Rajendra Prasad", "Jawaharlal Nehru"], correct: "C. Rajagopalachari" },
  { question: "Which empire was founded by Chandragupta Maurya?", options: ["Gupta Empire", "Maurya Empire", "Mughal Empire", "Chola Empire"], correct: "Maurya Empire" },
  { question: "The Battle of Plassey was fought in which year?", options: ["1757", "1764", "1857", "1776"], correct: "1757" },
  { question: "Who wrote the book 'Discovery of India'?", options: ["Jawaharlal Nehru", "Mahatma Gandhi", "B.R. Ambedkar", "Subhash Chandra Bose"], correct: "Jawaharlal Nehru" },
  { question: "The Rowlatt Act was passed in which year?", options: ["1919", "1920", "1918", "1925"], correct: "1919" },
  { question: "Who among the following started the Non-Cooperation Movement?", options: ["Bal Gangadhar Tilak", "Mahatma Gandhi", "Lala Lajpat Rai", "Jawaharlal Nehru"], correct: "Mahatma Gandhi" },
  { question: "The Quit India Movement was launched in which year?", options: ["1942", "1930", "1929", "1947"], correct: "1942" },
  { question: "Who was the first woman ruler of Delhi Sultanate?", options: ["Razia Sultana", "Nur Jahan", "Chand Bibi", "Begum Rokeya"], correct: "Razia Sultana" },
  { question: "Which Indian freedom fighter was known as 'Netaji'?", options: ["Subhash Chandra Bose", "Bhagat Singh", "Mahatma Gandhi", "Bal Gangadhar Tilak"], correct: "Subhash Chandra Bose" },
  { question: "The Indian National Congress was founded in which year?", options: ["1885", "1905", "1919", "1920"], correct: "1885" },
  { question: "Who was the last Governor-General of India?", options: ["Lord Mountbatten", "C. Rajagopalachari", "Lord Wavell", "Lord Curzon"], correct: "C. Rajagopalachari" },
  { question: "The famous 'Dandi March' was started from which place?", options: ["Sabarmati Ashram", "Gandhi Ashram", "Sabarmati River", "Ahmedabad"], correct: "Sabarmati Ashram" },
  { question: "The Indian Constitution was adopted in which year?", options: ["1947", "1950", "1949", "1952"], correct: "1949" },
  { question: "Who was the leader of the Salt Satyagraha?", options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Subhash Chandra Bose", "Bhagat Singh"], correct: "Mahatma Gandhi" },
  { question: "Which dynasty was ruled by Samudragupta?", options: ["Gupta Dynasty", "Maurya Dynasty", "Chola Dynasty", "Mughal Dynasty"], correct: "Gupta Dynasty" },
  { question: "The Battle of Panipat (1526) was fought between Babur and?", options: ["Ibrahim Lodi", "Sher Shah Suri", "Humayun", "Akbar"], correct: "Ibrahim Lodi" },
  { question: "Who was the founder of the Mughal Empire?", options: ["Babur", "Akbar", "Aurangzeb", "Shah Jahan"], correct: "Babur" },
  { question: "The 'Aligarh Movement' was started by?", options: ["Sir Syed Ahmed Khan", "Maulana Azad", "B.R. Ambedkar", "Rash Behari Bose"], correct: "Sir Syed Ahmed Khan" },
  { question: "Which of the following was NOT part of the Swadeshi Movement?", options: ["Boycott of foreign goods", "Promotion of Indian-made goods", "Non-payment of taxes", "Spread of nationalist ideas"], correct: "Non-payment of taxes" },
  { question: "The Champaran Satyagraha (1917) was led by?", options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Lala Lajpat Rai", "Bal Gangadhar Tilak"], correct: "Mahatma Gandhi" }
]
,
  Geography: [
    { question: "Which is the longest river in India?", options: ["Ganga", "Yamuna", "Godavari", "Brahmaputra"], correct: "Ganga" },
    { question: "Which state is the largest by area in India?", options: ["Maharashtra", "Rajasthan", "Uttar Pradesh", "Madhya Pradesh"], correct: "Rajasthan" },
  ],
  Polity: [
  { question: "Who is known as the 'Father of the Indian Constitution'?", options: ["Mahatma Gandhi", "B.R. Ambedkar", "Jawaharlal Nehru", "Sardar Patel"], correct: "B.R. Ambedkar" },
  { question: "How many Fundamental Rights are there in the Indian Constitution?", options: ["6", "5", "7", "4"], correct: "6" },
  { question: "Which part of the Indian Constitution deals with the Directive Principles of State Policy?", options: ["Part III", "Part IV", "Part V", "Part VI"], correct: "Part IV" },
  { question: "The President of India is elected by an electoral college consisting of?", options: ["Members of Parliament only", "Members of Legislative Assemblies only", "Members of Parliament and Legislative Assemblies", "Citizens of India"], correct: "Members of Parliament and Legislative Assemblies" },
  { question: "Which amendment gave the Right to Education the status of a Fundamental Right?", options: ["42nd Amendment", "44th Amendment", "86th Amendment", "73rd Amendment"], correct: "86th Amendment" },
  { question: "Who has the power to dissolve the Lok Sabha?", options: ["Prime Minister", "President", "Speaker of Lok Sabha", "Supreme Court"], correct: "President" },
  { question: "Which schedule of the Constitution deals with the allocation of seats in the Rajya Sabha?", options: ["1st Schedule", "2nd Schedule", "3rd Schedule", "4th Schedule"], correct: "4th Schedule" },
  { question: "The concept of 'Basic Structure' of the Constitution was laid down in which Supreme Court judgment?", options: ["Kesavananda Bharati", "Golaknath", "Maneka Gandhi", "Minerva Mills"], correct: "Kesavananda Bharati" },
  { question: "The Fundamental Duties were added to the Constitution by which amendment?", options: ["42nd Amendment", "44th Amendment", "61st Amendment", "73rd Amendment"], correct: "42nd Amendment" },
  { question: "The Vice President of India is elected by?", options: ["Lok Sabha", "Rajya Sabha", "Electoral College of both Houses of Parliament", "Electoral College of State Legislatures"], correct: "Electoral College of both Houses of Parliament" },
  { question: "Who appoints the Chief Election Commissioner of India?", options: ["Prime Minister", "President", "Parliament", "Supreme Court"], correct: "President" },
  { question: "The emergency provisions in the Indian Constitution are contained in which part?", options: ["Part X", "Part XI", "Part XII", "Part XVIII"], correct: "Part XVIII" },
  { question: "Which article of the Constitution guarantees the Right to Equality?", options: ["Article 14", "Article 19", "Article 21", "Article 32"], correct: "Article 14" },
  { question: "Which of the following is NOT a Fundamental Right?", options: ["Right to Property", "Right to Freedom of Speech", "Right to Equality", "Right to Life and Personal Liberty"], correct: "Right to Property" },
  { question: "The Indian Constitution is adopted from which constitution?", options: ["British Constitution", "US Constitution", "Irish Constitution", "Australian Constitution"], correct: "Irish Constitution" },
  { question: "The judiciary in India is?", options: ["Unitary", "Federal", "Quasi-federal", "Confederal"], correct: "Quasi-federal" },
  { question: "The term of the Lok Sabha is?", options: ["4 years", "5 years", "6 years", "Till dissolved"], correct: "5 years" },
  { question: "Who presides over the joint sitting of both Houses of Parliament?", options: ["President", "Prime Minister", "Speaker of Lok Sabha", "Chairman of Rajya Sabha"], correct: "Speaker of Lok Sabha" },
  { question: "Which article of the Constitution protects the Right to Freedom of Religion?", options: ["Article 25", "Article 21", "Article 32", "Article 19"], correct: "Article 25" },
  { question: "The Constitution of India came into effect on?", options: ["15th August 1947", "26th January 1950", "26th November 1949", "1st January 1950"], correct: "26th January 1950" },
]
,
  Economy: [
  { question: "Which institution publishes the 'World Economic Outlook' report?", options: ["World Bank", "International Monetary Fund (IMF)", "Asian Development Bank", "UNDP"], correct: "International Monetary Fund (IMF)" },
  { question: "What is the main function of the Reserve Bank of India?", options: ["Printing currency", "Controlling inflation", "Regulating banks and monetary policy", "Collecting taxes"], correct: "Regulating banks and monetary policy" },
  { question: "GST stands for?", options: ["Goods and Service Tax", "General Sales Tax", "Goods and Subsidy Tax", "General Service Tariff"], correct: "Goods and Service Tax" },
  { question: "Which of the following is NOT a direct tax?", options: ["Income Tax", "Corporate Tax", "GST", "Wealth Tax"], correct: "GST" },
  { question: "Fiscal deficit means?", options: ["Difference between total revenue and total expenditure", "Difference between total income and savings", "Excess of expenditure over revenue excluding borrowings", "Total borrowings by government"], correct: "Excess of expenditure over revenue excluding borrowings" },
  { question: "What does the term 'Repo Rate' refer to?", options: ["Rate at which RBI lends to commercial banks", "Interest rate on government bonds", "Rate of inflation", "Bank savings interest rate"], correct: "Rate at which RBI lends to commercial banks" },
  { question: "Which of the following sectors contributes the most to India's GDP?", options: ["Agriculture", "Industry", "Services", "Manufacturing"], correct: "Services" },
  { question: "The Monetary Policy Committee (MPC) is responsible for?", options: ["Fixing interest rates", "Regulating stock markets", "Controlling inflation and money supply", "Supervising commercial banks"], correct: "Controlling inflation and money supply" },
  { question: "What is the primary objective of the National Bank for Agriculture and Rural Development (NABARD)?", options: ["Provide credit to farmers", "Manage foreign exchange reserves", "Regulate the banking sector", "Implement fiscal policies"], correct: "Provide credit to farmers" },
  { question: "What does 'Make in India' initiative aim at?", options: ["Promoting foreign direct investment", "Boosting domestic manufacturing", "Improving agricultural productivity", "Enhancing service sector exports"], correct: "Boosting domestic manufacturing" },
  { question: "Which is the official currency of India?", options: ["Dollar", "Euro", "Rupee", "Yen"], correct: "Rupee" },
  { question: "What is the Goods and Services Tax (GST) Council responsible for?", options: ["Setting GST rates", "Collecting GST from taxpayers", "Implementing GST across India", "Auditing GST returns"], correct: "Setting GST rates" },
  { question: "Inflation means?", options: ["Increase in price levels", "Decrease in price levels", "Increase in employment", "Decrease in money supply"], correct: "Increase in price levels" },
  { question: "Which of the following is NOT a function of the Reserve Bank of India?", options: ["Issuer of currency", "Banker to government", "Maintaining foreign exchange reserves", "Fixing income tax rates"], correct: "Fixing income tax rates" },
  { question: "Fiscal policy deals with?", options: ["Government revenue and expenditure", "Monetary supply", "Foreign trade", "Price control"], correct: "Government revenue and expenditure" },
  { question: "Which of the following schemes is aimed at financial inclusion?", options: ["Jan Dhan Yojana", "Make in India", "Skill India", "Digital India"], correct: "Jan Dhan Yojana" },
  { question: "What does 'FDI' stand for?", options: ["Foreign Direct Investment", "Financial Development Index", "Foreign Debt Investment", "Fiscal Deficit Indicator"], correct: "Foreign Direct Investment" },
  { question: "Which institution regulates the capital markets in India?", options: ["SEBI", "RBI", "IRDA", "PFRDA"], correct: "SEBI" },
  { question: "What is the main aim of the 'Atmanirbhar Bharat' initiative?", options: ["Make India self-reliant", "Promote foreign trade", "Reduce inflation", "Increase imports"], correct: "Make India self-reliant" },
  { question: "Which of the following is a fiscal stimulus?", options: ["Reducing interest rates", "Increasing government spending", "Controlling money supply", "Increasing bank reserve requirements"], correct: "Increasing government spending" }
]

};

let currentSubject = null;
let filteredQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

// --- DOM elements ---
const pages = {
  login: document.getElementById("login-page"),
  register: document.getElementById("register-page"),
  forgot: document.getElementById("forgot-page"),
  home: document.getElementById("home-page"),
  profile: document.getElementById("profile-page"),
  test: document.getElementById("test-page"),
  result: document.getElementById("result"),
  settings: document.getElementById("settings-page"),
};

const navMenu = document.getElementById("main-nav");
const userDisplay = document.getElementById("user-display");
const subjectList = document.getElementById("subject-list");
const profileUsername = document.getElementById("profile-username");
const profileMobileInput = document.getElementById("profile-mobile");
const profileCurrentPass = document.getElementById("profile-current-password");
const profileNewPass = document.getElementById("profile-new-password");
const profileNewPassConfirm = document.getElementById("profile-new-password-confirm");
const profileMsg = document.getElementById("profile-msg");

const loginError = document.getElementById("login-error");
const registerError = document.getElementById("register-error");
const forgotError = document.getElementById("forgot-error");
const forgotResult = document.getElementById("forgot-result");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreText = document.getElementById("scoreText");
const passFailText = document.getElementById("passFailText");
const quizSubjectTitle = document.getElementById("quiz-subject");

// --- Utility ---
function clearMessages() {
  loginError.innerText = "";
  registerError.innerText = "";
  forgotError.innerText = "";
  forgotResult.innerText = "";
  profileMsg.innerText = "";
}

function showPage(pageName) {
  Object.values(pages).forEach(p => p.style.display = "none");
  pages[pageName].style.display = "block";
  navMenu.style.display = (pageName === "login" || pageName === "register" || pageName === "forgot") ? "none" : "flex";
}

// --- Show pages ---
function showLogin() {
  clearMessages();
  document.getElementById("login-username").value = "";
  document.getElementById("login-password").value = "";
  showPage("login");
}

function showRegister() {
  clearMessages();
  document.getElementById("reg-username").value = "";
  document.getElementById("reg-mobile").value = "";
  document.getElementById("reg-password").value = "";
  document.getElementById("reg-password-confirm").value = "";
  showPage("register");
}

function showForgot() {
  clearMessages();
  document.getElementById("forgot-username").value = "";
  document.getElementById("forgot-mobile").value = "";
  showPage("forgot");
}

function showHomePage() {
  userDisplay.innerText = currentUser;
  showPage("home");
  renderSubjectButtons();
}

function showProfilePage() {
  if (!currentUserData) return;
  profileUsername.innerText = currentUserData.username;
  profileMobileInput.value = currentUserData.mobile || "";
  profileCurrentPass.value = "";
  profileNewPass.value = "";
  profileNewPassConfirm.value = "";
  profileMsg.innerText = "";
  showPage("profile");
}

function showTestPage() {
  if (!currentSubject) {
    alert("Please select a subject from Home page first.");
    showHomePage();
    return;
  }
  quizSubjectTitle.innerText = currentSubject;
  showPage("test");
  loadQuestion();
}

function showSettingsPage() {
  showPage("settings");
}

// --- Register ---
function register() {
  const username = document.getElementById("reg-username").value.trim();
  const mobile = document.getElementById("reg-mobile").value.trim();
  const password = document.getElementById("reg-password").value;
  const passwordConfirm = document.getElementById("reg-password-confirm").value;

  clearMessages();

  if (!username || !password || !passwordConfirm || !mobile) {
    registerError.innerText = "All fields including mobile number are required.";
    return;
  }
  if (!/^\d{10}$/.test(mobile)) {
    registerError.innerText = "Mobile number must be 10 digits.";
    return;
  }
  if (password !== passwordConfirm) {
    registerError.innerText = "Passwords do not match.";
    return;
  }
  if (findUser(username)) {
    registerError.innerText = "Username already exists.";
    return;
  }

  const users = getUsers();
  users.push({ username, password, mobile });
  saveUsers(users);

  alert("Registration successful! Please login.");
  showLogin();
}

// --- Login ---
function login() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;

  clearMessages();

  if (!username || !password) {
    loginError.innerText = "Both username and password are required.";
    return;
  }

  const user = findUser(username);
  if (!user || user.password !== password) {
    loginError.innerText = "Invalid username or password.";
    return;
  }

  currentUser = user.username;
  currentUserData = user;

  currentSubject = null;
  filteredQuestions = [];
  currentQuestionIndex = 0;
  score = 0;

  showHomePage();
}

// --- Recover Password ---
function recoverPassword() {
  const username = document.getElementById("forgot-username").value.trim();
  const mobile = document.getElementById("forgot-mobile").value.trim();

  forgotError.innerText = "";
  forgotResult.innerText = "";

  if (!username || !mobile) {
    forgotError.innerText = "Please fill both fields.";
    return;
  }

  const user = findUser(username);
  if (!user) {
    forgotError.innerText = "User not found.";
    return;
  }

  if (user.mobile !== mobile) {
    forgotError.innerText = "Mobile number does not match our records.";
    return;
  }

  forgotResult.innerText = `Your password is: ${user.password}`;
}

// --- Logout ---
function logout() {
  currentUser = null;
  currentUserData = null;
  currentSubject = null;
  filteredQuestions = [];
  currentQuestionIndex = 0;
  score = 0;
  showLogin();
}

// --- Subject buttons ---
function renderSubjectButtons() {
  subjectList.innerHTML = "";
  const subjects = Object.keys(questions);
  subjects.forEach(subject => {
    const btn = document.createElement("button");
    btn.className = "subject-btn";
    btn.innerText = subject;
    btn.onclick = () => {
      currentSubject = subject;
      startTest();
    };
    subjectList.appendChild(btn);
  });
}

// --- Start Test ---
function startTest() {
  filteredQuestions = [...questions[currentSubject]];

  // shuffle and limit to 20
  filteredQuestions.sort(() => Math.random() - 0.5);
  filteredQuestions = filteredQuestions.slice(0, 20);

  currentQuestionIndex = 0;
  score = 0;

  showTestPage();
}

// --- Load question ---
function loadQuestion() {
  if (currentQuestionIndex >= filteredQuestions.length) {
    showResult();
    return;
  }

  const q = filteredQuestions[currentQuestionIndex];
  questionEl.innerText = `${currentQuestionIndex + 1}. ${q.question}`;

  optionsEl.innerHTML = "";
  q.options.forEach(option => {
    const label = document.createElement("label");
    label.classList.add("option");

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "option";
    input.value = option;

    label.appendChild(input);
    label.appendChild(document.createTextNode(option));

    optionsEl.appendChild(label);
  });
}

// --- Submit answer ---
function submitAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an answer.");
    return;
  }

  if (selected.value === filteredQuestions[currentQuestionIndex].correct) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < filteredQuestions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// --- Show result ---
function showResult() {
  showPage("result");
  scoreText.innerText = `You scored ${score} out of ${filteredQuestions.length}`;
  const passMark = filteredQuestions.length / 2;
  if (score > passMark) {
    passFailText.innerText = "🎉 You Win! Congratulations!";
    passFailText.classList.remove("fail");
  } else if (score === passMark) {
    passFailText.innerText = "🤝 It's a Draw! You did okay.";
    passFailText.classList.remove("fail");
  } else {
    passFailText.innerText = "😞 You Lose! Better luck next time.";
    passFailText.classList.add("fail");
  }
}

// --- Back to home ---
function goHome() {
  currentSubject = null;
  filteredQuestions = [];
  currentQuestionIndex = 0;
  score = 0;
  showHomePage();
}

// --- Update profile ---
function updateProfile() {
  profileMsg.innerText = "";
  profileMsg.style.color = "#e53e3e";

  const newMobile = profileMobileInput.value.trim();
  const currentPass = profileCurrentPass.value;
  const newPass = profileNewPass.value;
  const newPassConfirm = profileNewPassConfirm.value;

  if (!/^\d{10}$/.test(newMobile)) {
    profileMsg.innerText = "Mobile number must be 10 digits.";
    return;
  }

  // Update mobile if changed
  if (newMobile !== currentUserData.mobile) {
    currentUserData.mobile = newMobile;
  }

  // Password update logic
  if (currentPass || newPass || newPassConfirm) {
    if (!currentPass) {
      profileMsg.innerText = "Please enter your current password to change it.";
      return;
    }
    if (currentPass !== currentUserData.password) {
      profileMsg.innerText = "Current password is incorrect.";
      return;
    }
    if (newPass.length < 4) {
      profileMsg.innerText = "New password should be at least 4 characters.";
      return;
    }
    if (newPass !== newPassConfirm) {
      profileMsg.innerText = "New passwords do not match.";
      return;
    }
    currentUserData.password = newPass;
  }

  // Save updated user in storage
  const users = getUsers();
  const index = users.findIndex(u => u.username === currentUser);
  if (index !== -1) {
    users[index] = currentUserData;
    saveUsers(users);
    profileMsg.style.color = "green";
    profileMsg.innerText = "Profile updated successfully.";
  } else {
    profileMsg.style.color = "red";
    profileMsg.innerText = "Error saving profile.";
  }

  // Clear password fields
  profileCurrentPass.value = "";
  profileNewPass.value = "";
  profileNewPassConfirm.value = "";
}

// --- On load ---
window.onload = () => {
  showLogin();
};
function previewProfilePhoto() {
  const fileInput = document.getElementById("profile-photo-input");
  const display = document.getElementById("profile-photo-display");
  const reader = new FileReader();
  if (fileInput.files.length > 0) {
    reader.onload = function(e) {
      display.style.backgroundImage = `url('${e.target.result}')`;
      localStorage.setItem(currentUser + "_photo", e.target.result);
    };
    reader.readAsDataURL(fileInput.files[0]);
  }
}

function loadProfilePhoto() {
  const photoData = localStorage.getItem(currentUser + "_photo");
  if (photoData) {
    document.getElementById("home-profile-photo").style.backgroundImage = `url('${photoData}')`;
    document.getElementById("profile-photo-display").style.backgroundImage = `url('${photoData}')`;
  }
}

// Call after login and profile update
const originalLogin = login;
login = function() {
  originalLogin();
  if (currentUser) loadProfilePhoto();
};

const originalUpdateProfile = updateProfile;
updateProfile = function() {
  originalUpdateProfile();
  if (currentUser) loadProfilePhoto();
};
