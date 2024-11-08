## 0.9.0 (2023-12-06)

### Feat

- file upload to aws s3
- added SubTaskSummaryScreen visuals
- full fileviewer functionality
- added functions for uploading file from local storage to server
- added native base styling for search bar
- extracted search bar functionality + file viewer

### Fix

- cleaned up file uploader
- subtask merge change
- **guide.go**: update guide services for param

### Refactor

- added progress initalization, removed profile context
- added progress initalization, removed profile context

## 0.8.0 (2023-12-03)

### Feat

- added search for all tasks
- added multiselect ability + added comments to services
- **Minor-stuff**: Minor stuff
- meanial work on frontend, focusing on connection services to front end screens

### Fix

- resolved onboarding issues
- fixed search + added fuzzy search
- general onboarding flow resolved
- merging profile + user contexts
- fixed circle progress error
- removed comments
- resolved service calls handling + other profile page changes
- partial persona generation issue resolution
- partial persona generation issue resolution
- resolved login persistence issue
- slowly solving context issues
- handle user.id error
- resolved weird errors and warnings in cli

## 0.7.0 (2023-11-27)

### Feat

- added file size as attribute + bug fixes
- **File-Collection**: File Collection is now connected to backend
- **Frontend**: Signup/Login/Logout mostly working!
- **File-Collection**: Implemented Hardcoded version of File Collection

### Fix

- made base api endpoint consistent between all services
- major frontend issues, completed onboarding flow instantiation + user/profile management, also added import sorting
- minor api issues

## 0.6.0 (2023-11-21)

### Feat

- completed swagger documentation

## 0.5.0 (2023-11-17)

### Feat

- added swagger documentaiton + health check
- **Taskfile**: added a new way to serve up the backend, task dev

### Fix

- **SubTaskScreen.tsx**: updated fetch function
- **client**: missing imports + added new routing abilites
- **tunnel.sh**: addd third terminal for frontent
- minor issues
- minor issues
- **services**: updated services with endpoint const

## 0.4.0 (2023-11-06)

### Feat

- **files-+-tasks**: filterable based on users and tags
- **client**: fixed, refactored and improevd frontend services and contexts

### Fix

- **file.go**: print statement
- **user.go**: updated firebase param

## 0.3.0 (2023-11-01)

### Feat

- **server**: implemented services, controller, route, etc. to improve code quality
- **HomeScreen**: added new HomeScreen component/screen
- **HomeScreen**: implemented a simple HomeScreen for allhands

### Fix

- **persona.go**: linting error
- **Router.tsx**: added route for GuidesPage

## 0.2.0 (2023-10-19)

### BREAKING CHANGE

- Completely redos frontend

### Feat

- **Slider**: Make Slider update state
- **Onboarding-Flow**: Added boiler plate for Onboarding Context
- redo how the frontend is set up
- **migrations**: added insert, drop, and reset
- **db.go**: function to add data to the db

### Fix

- **Yarn-lock**: Fix node package issues that causes build to fail
- **taskfile.yaml**: added task kill function

## 0.1.1 (2023-10-07)

### Fix

- **db.go**: added error checking for migration

## 0.1.0 (2023-10-07)

### Feat

- **aws.go**: established s3 connectivity

### Fix

- added permissions
- **CI.yaml**: port change
- **CI.yaml**: remove alove instances of postgres
- **CI.yaml**: missing dependency
- **scripts/verify_os.sh**: added functionality to differ scripts per os
- **make-linter-happy**: made distinct err names
- **init.sql**: spelling

## 0.0.4 (2023-09-28)

### Fix

- **init.sql**: foreign key constrains
- **init.sql**: bad sql statements, errors on migration

### Refactor

- **TestComponent.tsx**: updated the text
- **init.sql**: updated migrations file for creating the db
- installation process
- **main.go**: fucked it up again
- **testcomponent.tsx**: fucked it up a little bit
- installation process

## 0.0.3 (2023-09-13)

### Fix

- **init_db.sh**: fixed path

## 0.0.2 (2023-09-12)

### Refactor

- tidy
