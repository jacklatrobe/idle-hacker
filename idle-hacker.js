// IDLE HACKER - jack@latrobe.group
// https://github.com/jacklatrobe/idle-hacker

/* data structure for the logging framework */
const LoggingLevel = {
  INFO: 0,
  WARN: 1,
  ERROR: 2,
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
  current_game_date = Date.now();
  current_cash = 0;
  current_job = new Job("Line Cook", "McDonalds", "15");
  previous_jobs = [];
  logLevel = LoggingLevel.INFO;

  gameLoop() {
    /* handle date change */
    current_game_date.setDate(current_game_date.getDate() + 1);
    var pretty_game_date =
      current_game_date.getDate() +
      "/" +
      current_game_date.getMonth() +
      "/" +
      current_game_date.getFullYear();
    gameLog("Incrementing date to " + pretty_game_date, LoggingLevel.INFO);
    document.getElementById("date_line").innerHTML =
      '<i class="fa fa-calendar fa-fw w3-margin-right w3-large w3-text-teal"></i>' +
      pretty_game_date;

    /* handle cash change */
    current_cash = current_cash + current_job.get_salary();
    gameLog("Incrementing cash to $" + current_cash, LoggingLevel.INFO);
    document.getElementById("cash_line").innerHTML =
      '<i class="fa fa-usd fa-fw w3-margin-right w3-large w3-text-teal"></i>' +
      current_cash;

    /* handle education change */
    gameLog("Doing education change", LoggingLevel.INFO);
    for (var course in courses_list) {
      gameLog(course + " increases " + course.skills, LoggingLevel.INFO);
      course.do_skill_increase();
    }

    setTimeout(gameLoop, 1000);
  };

  gameLog(text, severity = LoggingLevel.WARN) {
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
    previous_jobs.push(current_job);
    current_job = newJob;
  };
};

/* define a class for jobs */
class Job {
  constructor(title, company, salary) {
    this.title = title;
    this.company = company;
    this.salary = salary;
  }
  toString() {
    return this.title + " - " + this.company;
  }
  get_salary(hours = 8) {
    return this.salary * hours;
  }
};

/* define parent class for skills and education */
class Advancable {
  xp = 0;
  level = 0;
  xp_to_advance = function () {
    return 1000 + level * 1.3 * 500;
  };
  add_xp(amount = 1) {
    this.xp = this.xp + amount;
    this.#advance_progress();
  }
  #advance_progress() {
    while (this.xp > this.xp_to_advance) {
      this.xp = this.xp - this.xp_to_advance;
      this.level = this.level + 1;
    }
  }
}

/* define a class for education */
class Education extends Advancable {
  constructor(
    title,
    description,
    skills,
    start_date = Date.now(),
    end_date = null
  ) {
    this.title = title;
    this.description = description;
    this.skills = skills;
    this.start_date = start_date;
    this.end_date = end_date;
  }
  toString() {
    return (
      this.title +
      "(" +
      this.start_date.getFullYear() +
      "-" +
      this.end_date.getFullYear() +
      ")"
    );
  }
  htmlClassName() {
    return "todo";
  }
  do_skill_increase() {
    for (var skill in this.skills) {
      skill.add_xp(100);
    }
  }
  graduate() {
    this.end_date = Date.now();
  }
}

/* define a class for skills */
class Skill extends Advancable {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
  toString() {
    return this.title;
  }
}

/* define a class for languages */
class Language extends Advancable {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
  toString() {
    return this.title;
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
  new Skill(
    "JavaScript", 
    "A flexible and widely used web language"),
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

gameObj.gameLog("Welcome to IDLE HACKER V0.1 - jack@latrobe.group");
gameObj.gameLoop();

//TODO - gameLoopPhase2() - What happens when you reach the limits of a single human hacker?
