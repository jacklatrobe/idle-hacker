# IDLE HACKER DEV DIARY

## 07/01/2023 - jack@latrobe.group
I got bored one night and decided to try and write an idle game. I downloaded a simple temple off the W3 website, asked ChatGPT how to get started, and pulled together and initial prototype of IDLE HACKER.
Still lots more to do. Need to move some of the generation of new HTML blocks into the javascript instead so that I can dynamically create new lines for new jobs, skills etc.... I think? Is that even the right way to do that? I have a feeling there must be some kind of better way that uses templates or something, but for now it'll do, so I'll do it, but fully expect this decision to bite me in the ass later... so thats why I have started this diary.

EDIT: Ride the dragon sooooonnn - started this thing at 2am, now at 2pm next day I have a working base prototype with a bonus logging framework!


## 08/01/2023 - jack@latrobe.group
As I started to write the code to render the skills etc onto the page I realised the limitations of my currently procedural approach. Remembering the words of Andrew Cain, I've taken the more object oriented approach, and have refactored the key data structures (courses, skills, etc) into classes that can inherit methods etc.
Now I can write helper functions at the class level, which makes it easier to tell each skill or object to RENDER THYSELF UNTO HTML.
I also set up github actions and a publish action to pages, and moved dev activity to a dev branch. Look at me being responsible.