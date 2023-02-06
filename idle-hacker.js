// IDLE HACKER - jack@latrobe.group

/* define the jobs */
const jobs = {
    "line_cook": {
        "title": "Line Cook",
        "company": "McDonalds",
        "salary": 15
    }
}

/* define the education */
const education = {
    "wikipedia": {
        "title": "Wikipedia.org",
        "desc": "Learn basic knowledge about how the world around you fits together.",
        "date": "Forever",
        "skills" : ["electronics","computer_hardware", "office_software"]
    },
    "codeacademy": {
        "title": "CodeAcademy.com",
        "desc": "Slowly develop basic program skills in your spare time",
        "date": "Forever",
        "skills" : ["computer_hardware", "developer_environments", "server_hardware"]
    },
    "high_school": {
        "title": "High School",
        "desc": "It ain't nothin fancy, but they taught you to read reeeeeel gud.",
        "date": "2005 - ???",
        "skills" : ["computer_hardware","server_hardware", "office_software", "known_vulnerabilities"]
    }
}

/* define the skills */
var skills = {
    "electronics": {
        "title": "Electronics",
        "desc": "An understanding of circuits, voltage and wiring.",
        "progress": 0
    },
    "computer_hardware": {
        "title": "Computer Hardware",
        "desc": "Knowing how compute and storage form the basis of a system.",
        "progress": 0
    },
    "office_software": {
        "title": "Office Software",
        "desc": "Maximise your personal productivity with spreadsheets, macros and browser hacks.",
        "progress": 0
    },
    "developer_environments": {
        "title": "Developer Environments",
        "desc": "Set up your local development environment to support your coding journey.",
        "progress": 0
    },
    "server_hardware": {
        "title": "Server Hardware",
        "desc": "Common components and configurations of servers and mainframes.",
        "progress": 0
    },
    "known_vulnerabilities": {
        "title": "Known Vulnerabilities",
        "desc": "A basic knowledge of some published CVEs and how to exploit them",
        "progress": 0
    }
}

/* define the languages */
var languages = {
    "vbnet": {
        "title": "VB.NET",
        "desc": "Visual Basic dotNet - increases your basic productivity",
        "progress": 0
    },
    "javascript": {
        "title": "JavaScript",
        "desc": "A flexible and widely used web language",
        "progress": 0
    },
    "python": {
        "title": "Python",
        "desc": "A flexible language for buidling web servers to basic AI models",
        "progress": 0
    },
    "cplusplus": {
        "title": "C++",
        "desc": "A powerful low-level language for high performance applications.",
        "progress": 0
    }
}

/* main game loop */
var game_date = new Date(2010, 0, 1);
var cash = 0;
var current_job = jobs.line_cook;

console.log("Welcome to IDLE HACKER V0.1 - jack@latrobe.group");
var gameLoop = function () {
    /* handle date change */
    game_date.setDate(game_date.getDate() + 1);
    console.log("Incrementing date to " + (game_date.getDate() + '/' + game_date.getMonth() + '/' + game_date.getFullYear()));
    document.getElementById('date_line').innerHTML = (
        '<i class="fa fa-calendar fa-fw w3-margin-right w3-large w3-text-teal"></i>' +
        game_date.getDate() + '/' + game_date.getMonth() + '/' + game_date.getFullYear());


    /* handle cash change */
    cash = cash + (current_job.salary * 8);
    console.log("Incrementing cash to $" + cash);
    document.getElementById('cash_line').innerHTML = (
        '<i class="fa fa-usd fa-fw w3-margin-right w3-large w3-text-teal"></i>' + 
        cash);


    /* handle education change */
    console.log("Doing education change");
    for (var course in education) {
        course_details = education[course];
        console.log(course_details.title + " increases " + course_details.skills);
        for (var i = 0; i < course_details.skills.length; i++) {
            course_skill = course_details.skills[i];
            console.log("Checking " + course_skill);
            if (skills[course_skill].progress < 100) {
                console.log(course_skill + " is less than 100, increasing");
                skills[course_skill].progress = skills[course_skill].progress + 1
                document.getElementById('skill-bar-' + course_skill).style = "width:" + skills[course_skill].progress + "%";
                document.getElementById('skill-number-' + course_skill).innerHTML = skills[course_skill].progress + "%";
            }
            else {
                console.log(course_skill + " is 100, not increasing");
            }
        }
      }

    setTimeout(gameLoop, 1000);
};

gameLoop();