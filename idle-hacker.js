// IDLE HACKER - jack@latrobe.group
// https://github.com/jacklatrobe/idle-hacker

/* data structure for the logging framework */
const LoggingLevel = {
  get INFO() {
    return {
      name: "INFO",
      value: 0,
    };
  },
  get WARN() {
    return {
      name: "WARN",
      value: 1,
    };
  },
  get ERROR() {
    return {
      name: "ERROR",
      value: 2,
    };
  },
};

/* main game class */
class IdleGame {
  constructor() {
    this.current_game_date = Date.now();
    this.current_cash = 0;
    this.current_job = new Job("Line Cook", "McDonalds", "15");
    this.previous_jobs = [];

    IdleGame.gameLog("Welcome to IDLE HACKER V0.1 - jack@latrobe.group");
    this.gameLoop();
  }

  gameLoop() {
    /* handle date change */
    IdleGame.gameLog("Updating game date", LoggingLevel.INFO);
    this.current_game_date = (this.current_game_date + 1);

    /* handle cash change */
    this.current_cash = this.current_cash + (this.current_job.get_salary());
    IdleGame.gameLog("Incrementing cash to $" + this.current_cash, LoggingLevel.INFO);
    document.getElementById("cash_line").innerHTML =
      `<i class="fa fa-usd fa-fw w3-margin-right w3-large w3-text-teal"></i>${this.current_cash}`;

    /* handle education change */
    IdleGame.gameLog("Doing education / skills change", LoggingLevel.INFO);
    for (let course in courses_list) {
        let courseObj = courses_list[course];
        IdleGame.gameLog(`${courseObj} increases ${courseObj.skills}`, LoggingLevel.INFO);
        courseObj.do_skill_increase();
    };
    this.render_page();
    setTimeout(this.gameLoop(), 1000);
  };

  render_page() {
    IdleGame.gameLog("Rendering game HTML content", LoggingLevel.INFO);

    /* render game date change */
    IdleGame.gameLog("Rendering new game date", LoggingLevel.INFO);
    var pretty_game_date = new Date(this.current_game_date).toLocaleString("en-AU");
    document.getElementById("date_line").innerHTML =
      '<i class="fa fa-calendar fa-fw w3-margin-right w3-large w3-text-teal"></i>' +
      pretty_game_date;

    /* render game cash change */
    IdleGame.gameLog("Rendering new cash value", LoggingLevel.INFO);
    document.getElementById("cash_line").innerHTML =
      '<i class="fa fa-usd fa-fw w3-margin-right w3-large w3-text-teal"></i>' +
      this.current_cash;

    /* render jobs */
    IdleGame.gameLog("Rendering list of jobs", LoggingLevel.INFO);
    let tempHTML = this.current_job.render_html();
    for (let old_job in this.previous_jobs) {
        let jobObj = this.previous_jobs[old_job];
        tempHTML = tempHTML + jobObj.render_html();
    };
    document.getElementById("jobs-box").innerHTML = tempHTML;

    /* render education */
    IdleGame.gameLog("Rendering list of courses", LoggingLevel.INFO);
    tempHTML = "";
    for (let course in courses_list) {
        let courseObj = courses_list[course];
        tempHTML = tempHTML + courseObj.render_html();
    };
    document.getElementById("education-box").innerHTML = tempHTML;

    /* render skills */
    IdleGame.gameLog("Rendering list of skills", LoggingLevel.INFO);
    tempHTML = "";
    for (let skill in skills_list) {
        let skillObj = skills_list[skill];
        tempHTML = tempHTML + skillObj.render_html();
    };
    document.getElementById("skills-box").innerHTML = tempHTML;
  };

  static gameLog(text, severity = LoggingLevel.WARN) {
    var logLevel = LoggingLevel.INFO;
    if (severity.value >= logLevel.value) {
      let currDate = new Date(Date.now());
      currDate =
        currDate.getDate() +
        "/" +
        currDate.getMonth() +
        "/" +
        currDate.getFullYear() +
        " " +
        currDate.getHours() +
        ":" +
        currDate.getMinutes();
      let logline = severity.name + " - " + currDate + " - " + text;
      console.log(logline);
    }
  };

  changeJob(newJob) {
    IdleGame.gameLog("Changing job to " + newJob.toString(), LoggingLevel.INFO);
    this.previous_jobs.push(this.current_job);
    this.current_job = newJob;
  };
};

/* define a class for jobs */
class Job {
  constructor(
    title,
    company,
    salary,
    start_date = Date.now(),
    end_date = null
  ) {
    this.title = title;
    this.company = company;
    this.salary = salary;
    this.start_date = start_date;
    this.end_date = end_date;
  };
  toString() {
    return this.title + " - " + this.company;
  };
  get_salary(hours = 8) {
    return this.salary * hours;
  };
  render_dates() {
    let start_month = this.start_date.toLocaleString("default", {
      month: "long",
    });
    let start_year = this.start_date.toLocaleString("default", {
      year: "full",
    });
    let end_month = this.start_date.toLocaleString("default", {
      month: "long",
    });
    let end_year = this.start_date.toLocaleString("default", { year: "full" });
    return start_month + " " + start_year + " - " + end_month + " " + end_year;
  };
  render_html() {
    let innerHTML = '<div class="w3-container">';
    innerHTML =
      innerHTML + '<h5 class="w3-opacity"><b>' + this.toString() + "</b></h5>";
    innerHTML =
      innerHTML +
      '<h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>';
    innerHTML =
      innerHTML +
      '<span class="w3-tag w3-teal w3-round">' +
      this.render_dates() +
      "</span></h6>";
    innerHTML = innerHTML + "<p>" + this.description + "</p>";
    innerHTML = innerHTML + "<hr></div>";
    return innerHTML;
  };
};

/* define parent class for skills and education */
class Advancable {
  constructor() {
    this.xp = 0;
    this.level = 0;
  };
  xp_to_advance = function () {
    return 1000 + this.level * 1.3 * 500;
  };
  add_xp(amount = 1) {
    this.xp = this.xp + amount;
    this.advance_progress();
  };
  advance_progress() {
    while (this.xp > this.xp_to_advance) {
      this.xp = this.xp - this.xp_to_advance;
      this.level = this.level + 1;
    }
  };
  render_html() {
    let innerHTML = "<p>" + this.toString() + "</p>";
    let percent_left = Math.round((this.xp / this.xp_to_advance) * 100);
    innerHTML =
      innerHTML + '<div class="w3-light-grey w3-round-xlarge w3-small">';
    innerHTML =
      innerHTML +
      '<div class="w3-container w3-center w3-round-xlarge w3-teal" style="width:' +
      percent_left +
      '%">';
    innerHTML =
      innerHTML + '<div class="w3-center w3-text-white">' + this.level + "%";
    innerHTML = innerHTML + "</div></div></div>";
    return innerHTML;
  };
  toString() {
    return this.title;
  };
};

/* define a class for education */
class Education extends Advancable {
  constructor(
    title,
    description,
    skills,
    start_date = Date.now(),
    end_date = null
  ) {
    super();
    this.title = title;
    this.description = description;
    this.skills = skills;
    this.start_date = start_date;
    this.end_date = end_date;
  };
  toString() {
    let start_date_obj = new Date(this.start_date);
    let date_string = start_date_obj.toLocaleString("default", {year: "numeric"});
    if ((this.end_date !== undefined) && (this.end_date !== null)) {
      let end_date_obj = new Date(this.end_date);
      date_string = date_string + " - " + end_date_obj.toLocaleString("default", {year: "numeric"});
    }
    return (`${this.title} (${date_string})`);
  };
  render_dates() {
    let start_month = this.start_date.toLocaleString("default", {
      month: "long",
    });
    let start_year = this.start_date.toLocaleString("default", {
      year: "full",
    });
    let end_month = this.start_date.toLocaleString("default", {
      month: "long",
    });
    let end_year = this.start_date.toLocaleString("default", { year: "full" });
    return start_month + " " + start_year + " - " + end_month + " " + end_year;
  };
  render_html() {
    let innerHTML = '<div class="w3-container">';
    innerHTML =
      innerHTML + '<h5 class="w3-opacity"><b>' + this.toString() + "</b></h5>";
    innerHTML =
      innerHTML +
      '<h6 class="w3-text-teal"><i class="fa fa-calendar fa-fw w3-margin-right"></i>';
    innerHTML =
      innerHTML +
      '<span class="w3-tag w3-teal w3-round">' +
      this.render_dates() +
      "</span></h6>";
    innerHTML = innerHTML + "<p>" + this.description + "</p>";
    innerHTML = innerHTML + "<hr></div>";
    return innerHTML;
  };
  do_skill_increase() {
    for (let skill in this.skills) {
      let skillObj = this.skills[skill];
      skillObj.add_xp(100);
    }
  };
  graduate() {
    this.end_date = Date.now();
  };
}

/* define a class for skills */
class Skill extends Advancable {
  constructor(title, description) {
    super();
    this.title = title;
    this.description = description;
  }
}

/* define a class for languages */
class Language extends Advancable {
  constructor(title, description) {
    super();
    this.title = title;
    this.description = description;
  }
}

/* set the initial skills */
var skills_list = {
  electronics: new Skill(
    "Electronics",
    "An understanding of circuits, voltage and wiring"
  ),
  computer_hardware: new Skill(
    "Computer Hardware",
    "Knowing how compute and storage form the basis of a system"
  ),
  office_software: new Skill(
    "Office Software",
    "Maximise your personal productivity with spreadsheets, macros and browser hacks"
  ),
  developer_environments: new Skill(
    "Developer Environments",
    "Set up your local development environment to support your coding journey"
  ),
  server_hardware: new Skill(
    "Server Hardware",
    "Common components and configurations of servers and mainframes"
  ),
  known_vulnerabilities: new Skill(
    "Known Vulnerabilities",
    "A basic knowledge of some published CVEs and how to exploit them"
  ),
};

/* set the initial languages */
var languages_list = [
  new Skill(
    "VB.NET",
    "Visual Basic dotNet - increases your basic productivity"
  ),
  new Skill("JavaScript", "A flexible and widely used web language"),
  new Skill(
    "Python",
    "A flexible language for buidling web servers to basic AI models"
  ),
  new Skill(
    "C++",
    "A powerful low-level language for high performance applications"
  ),
];

/* set the initial educations */
var courses_list = {
  wikipedia: new Education(
    "Wikipedia.org",
    "Learn basic knowledge about how the world around you fits together",
    [
      skills_list.electronics,
      skills_list.computer_hardware,
      skills_list.office_software,
    ]
  ),
  codeacademy: new Education(
    "CodeAcademy.com",
    "Slowly develop basic program skills in your spare time",
    [
      skills_list.computer_hardware,
      skills_list.developer_environments,
      skills_list.server_hardware,
    ]
  ),
  highschool: new Education(
    "High School",
    "It ain't nothin fancy, but they taught you to read reeeeeel gud",
    [
      skills_list.computer_hardware,
      skills_list.developer_environments,
      skills_list.office_software,
      skills_list.known_vulnerabilities,
    ]
  ),
};

/* main game flow */
var gameObj = new IdleGame();

//TODO - gameLoopPhase2() - What happens when you reach the limits of a single human hacker?
