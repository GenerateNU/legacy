# Legacy
An all-encompassing end-of-life planning app.

## Running Application

### Prerequisites
- [Node.js](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/en/)
- [expo](https://expo.io/)
- [golang](https://golang.org/)
- [docker](https://www.docker.com/)
- [postgresql](https://www.postgresql.org/)
- [taskfile](https://taskfile.dev/#/installation?id=installation)

### Setup

1. **Clone the repository**
    ```bash
    git clone https://github.com/GenerateNU/legacy.git
    cd legacy
    ```

2. **Install dependencies**
    ```bash
    cd client
    yarn install

    cd server
    go get ./...
    ```

### Running 

1. **Start the client**
    ```bash
    cd client
    yarn start
    ```

2. **Start the server**
    ```bash
    cd server
    task run
    ```

3. **Start the database**
    1. **Start postgresql**
        - MacOS
        ```bash
        brew services start postgresql@[version]
        ```

    2. **Open Docker**

    3. **Start the database**
        ```bash
        task docker
        ```

## Contributing

### Getting Started

1. **Clone the repository**
    ```bash
    git clone <repository-url>
    ```

2. **Create a new branch**
    ```bash
    git checkout -b feature/<branch-name>
    ```

3. **Make changes and commit changes:**

    - **Commit changes**
        ```bash
        git add .
        git commit -m "commit message"
        ```

4. **Push changes to GitHub**
    ```bash
    git push origin feature/<branch-name>
    ```

5. **Create a pull request**
    - Go to the [repository](https://github.com/GenerateNU/legacy) on GitHub
    - Click on the `Pull requests` tab
    - Click on the `New pull request` button
    - Select the `base` branch as `main`
    - Select the `compare` branch as `feature/<branch-name>`
    - Click on the `Create pull request` button

### Commit Messages

- Commit messages should be in the present tense.
- Keep them short and concise. If necessary, add a longer description in the body of the commit.
- Use the following format for commit messages:
    ```
    <type>: <subject>
    <BLANK LINE>
    <body>
    ```
- The `<type>` can be one of the following:
    - **feat**: A new feature
    - **fix**: A bug fix
    - **docs**: Documentation only changes
    - **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
    - **refactor**: A code change that neither fixes a bug nor adds a feature
    - **perf**: A code change that improves performance
    - **test**: Adding missing tests
    - **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Pull Requests

- Ensure your pull request has a clear title and a summary of the changes made.
- Describe the problem you're solving or the feature you're adding.
- Mention any related issues or dependencies.
- Ensure your changes don't break any existing functionality, add tests if necessary.
- Request reviews from fellow developers or team members.


