import requests
from selenium_driver import driversetup
import codeforces
from datetime import datetime, timedelta
import codechef
import leetcode
import upcomingContests
import leetcodeContest
import codeforcesContest
import codechefContest
import os
from dotenv import load_dotenv
import json
import time

load_dotenv()

api_endpoint = os.getenv('BACKEND_API_URL')

driver = driversetup()

platforms = ['codeforces', 'codechef', 'leetcode']

# deploy
def user_submissions(username, platform):
    print(f"Getting submissions for {platform}...")
    if platform == 'codeforces':
        return codeforces.get_user_submissions(username)
    elif platform == 'codechef':
        return codechef.get_user_submissions(driver, username)
    elif platform == 'leetcode':
        return leetcode.get_user_submissions(username)


def get_user_data(userinfo, platform):
    print(f"Getting rating for {platform}...")
    if platform == 'codeforces':
        return codeforces.get_user_data(userinfo)
    elif platform == 'codechef':
        return codechef.get_user_data(driver, userinfo)
    elif platform == 'leetcode':
        return leetcode.get_user_data(userinfo)


def get_contest_data():
    print("Getting upcoming contests...")
    contest_data = upcomingContests.getCodeforcesContests()
    contest_data.extend(upcomingContests.getCodechefContests())
    contest_data.extend(upcomingContests.getLeetcodecontests())
    return contest_data


def get_contest_history(username, platform):
    print(f"Getting contest history for {platform}...")
    if platform == 'codeforces':
        return codeforcesContest.codeforces_contestHistory(username)
    elif platform == 'codechef':
        return codechefContest.codechef_contestHistory(driver, username)
    elif platform == 'leetcode':
        return leetcodeContest.leetcode_contestHistory(username)

def push_to_api(endpoint, data, chunk_size=5, method='POST', max_retries=500, retry_delay=1):
    bearer_token = os.getenv('BEARER_TOKEN')
    api_url = api_endpoint + endpoint
    headers = {
        'Authorization': f'Bearer {bearer_token}',
        'Content-Type': 'application/json'
    }

    # If the data is an array, chunk it into smaller pieces
    if isinstance(data, list):
        data_chunks = [data[i:i + chunk_size] for i in range(0, len(data), chunk_size)]
    else:
        data_chunks = [data]

    # Push each chunk of data to the API
    for i, chunk in enumerate(data_chunks):
        chunk_size = len(chunk)
        retries = 0
        while retries < max_retries:
            try:
                print(f"Processing chunk {i+1}/{len(data_chunks)} of size {chunk_size}...")
                if method.upper() == 'POST':
                    response = requests.post(api_url, json=chunk, headers=headers)
                elif method.upper() == 'PATCH':
                    response = requests.patch(api_url, json=chunk, headers=headers)
                response.raise_for_status()
                print("Chunk pushed successfully.")
                break
            except requests.exceptions.RequestException as e:
                print(f"Failed to push chunk. Error: {e}")
                retries += 1
                if retries < max_retries:
                    print(f"Retrying in {retry_delay} seconds...")
                    time.sleep(retry_delay)
                else:
                    print(f"Max retries reached for chunk. Skipping this chunk.")

def run_tasks(user):
    print(f"Running tasks for [{user.get('first_name')}] @{user.get('username')}...")
    username = user.get('username')
    email = user.get('email')
    user_data = {}
    submissions = []
    contest_data = []
    for platform in platforms:
        platform_data = user.get(platform)
        if platform_data and platform_data.get(f'{platform}_id') is not None:
            platform_id = platform_data[f'{platform}_id']
            user_data[platform] = get_user_data(platform_data, platform)
            submissions.extend(user_submissions(platform_id, platform))
            contest_data.extend(get_contest_history(platform_id, platform))
    user_data['lastUpdatedAt'] = datetime.now().isoformat()[:-3] + 'Z'
    user_data['isAdmin'] = True
    push_to_api(f'/users/{email}/update', user_data, method='PATCH')
    push_to_api(f'/users/{email}/ratingchange/updateAll', contest_data, method='PATCH')
    push_to_api(f'/users/{email}/submissions/update', submissions, method='PATCH')

def main():
    bearer_token = os.getenv('BEARER_TOKEN')
    api_url = api_endpoint + "/users/paginated"
    headers = {
        'Authorization': f'Bearer {bearer_token}',
        'Content-Type': 'application/json'
    }
    
    page = 1
    size = 1  # Adjust as needed or set dynamically

    max_retries = 500
    retry_delay = 1

    while True:
        try:
            response = requests.get(f"{api_url}?page={page}&size={size}", headers=headers)
            if response.status_code == 200:
                data = response.json()
                for user in data['results']:
                    print(f"{data['pagination']['page']}/{data['pagination']['totalPages']} {user.get('first_name')} {user.get('last_name')}")
                    run_tasks(user)
                if page >= data['pagination']['totalPages']:
                    break
                page += 1
            else:
                print(f"Failed to fetch user data. Status code: {response.status_code}, Error: {response.text}")
                break
        except Exception as e:
            print("An error occurred:", e)
            retries = 0
            while retries < max_retries:
                print("Retrying to fetch user data...")
                time.sleep(retry_delay)
                try:
                    response = requests.get(f"{api_url}?page={page}&size={size}", headers=headers)
                    if response.status_code == 200:
                        data = response.json()
                        for user in data['results']:
                            print(f"{data['pagination']['page']}/{data['pagination']['totalPages']} {user.get('first_name')} {user.get('last_name')}")
                            run_tasks(user)
                        if page >= data['pagination']['totalPages']:
                            break
                        page += 1
                        break
                    else:
                        print(f"Failed to fetch user data. Status code: {response.status_code}, Error: {response.text}")
                        break
                except Exception as e:
                    print("An error occurred:", e)
                    retries += 1
            if retries == max_retries:
                print("Max retries reached. Exiting.")
                break
    
    print("All user data pushed successfully.")
    print("Getting upcoming contests...")
    contest_data = upcomingContests.getCodeforcesContests()
    contest_data.extend(upcomingContests.getCodechefContests())
    contest_data.extend(upcomingContests.getLeetcodecontests())
    push_to_api('/contests/update', contest_data, method='PATCH')

if __name__ == "__main__":
    main()

