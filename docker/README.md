#Docker Quickstart
**Installation**<br/>
1) Download the installer appropriate for you system and run it.<br/>https://www.docker.com/
2) Open Docker Desktop which should start the background service
3) Open your preferred command line terminal (Powershell, Bash, etc.)
   1) You may have to restart your computer for this to be added to your PATH
4) Navigate to the `docker` directory in your cloned repository using the terminal
5) Run the command `docker compose up -d`
   1) This uses the `docker-compose.yaml` file to set up a PHP 8/Apache container and a MariaDB container
   2) `-d` Runs these containers in a detached state (They run in the background).
6) The `api` directory on your host machine is mapped to the `/var/www/html` directory on the `api` machine
   1) Any changes made in this directory are reflected inside the docker container
7) The `api` container can be accessed in a browser by visiting http://localhost:8080
8) The `db` container can be accessed on port 3306 using a MySQL client such as MySQL Workbench or one built into your IDE
   1) <i>Note</i>: We will need to set a much more secure password than the one in the `docker-compose.yaml` before running in production
9) To run a shell in one of the containers:
   1) Run `docker ps` to get the `Container ID` (A 12 digit Hexadecimal number)
   2) Run `docker exec -it {CONTAINER ID} bash`