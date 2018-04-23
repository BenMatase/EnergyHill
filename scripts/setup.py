import getpass
import json

# build db config
config_dict = {}
config_dict['DB_URL'] = input("Please enter the DB host name (ex. db.eg.bucknell.edu: ")
config_dict['DB_NAME'] = input("Please enter the DB name (ex. energyhill)")
config_dict['DB_USERNAME'] = input("Please enter the DB user (ex. user123)")
config_dict['DB_PASSWORD'] = getpass.getpass("Please enter the DB password") 

create_config_file('../config.json', config_dict)

# build deployment
deployment_dict = {}
deployment_dict['FLASK_SERVER'] = input("Please enter the url for the flask server (ex. https://eg.bucknell.edu/energyhill)")
deployment_dict['GOOGLE_CLIENT_ID'] = input("Please enter the Google client id for this project (ex. <45 randome letters/numbers>.apps.googleusercontent.com)")

create_config_file('../deployment.json', deployment_dict)

def create_config_file(file_name, content_dict):
   # open file if one doesn't exist
    # get json string
    # write to file
     
