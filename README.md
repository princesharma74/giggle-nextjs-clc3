# CLC3.tech

**Combining Codeforces, Leetcode & Codechef**

[CLC3.tech](https://clc3.tech) is a comprehensive platform designed to integrate and display coding profiles and competitive programming data from Codeforces, Leetcode, and Codechef. This project aggregates information like ratings, submissions, and rating changes into a unified interface giving you a ability to create your friendlist of fellow competitive programmers.

## Project Overview

The website pulls data from multiple competitive programming sites using APIs and web scraping techniques, delivering real-time updates and valuable insights.

## Key Features

- **Unified Dashboard:** View coding profiles, ratings, submissions, and rating changes from Codeforces, Leetcode, and Codechef in one place.
- **Data Updates:** Automatically refreshes information to keep users updated with the latest changes.
- **User Profiles:** Allows users to track and compare their coding profiles across different platforms.
- **Token-Based Verification:** Verifies coding profile IDs for secure and accurate data retrieval.
- **Leaderboards and Social Features:** Includes leaderboards and the ability to follow friends to enhance community engagement.

## Technologies Used

- **Next.js** - Framework for server-side rendering and building the user interface.
- **Typescript** - Superset of JavaScript for type safety and better development experience.
- **Python** - Programming language used for backend development and data scraping.
- **Docker** - Containerization platform to ensure consistent development and deployment environments.
- **EC2** - Amazon's cloud computing service for hosting the application.
- **MySQL** - Relational database management system for storing user and platform data.
- **Postman** - Tool for API testing and development.
- **Github Actions** - CI/CD pipeline for automating the build, test, and deployment processes.

## Getting Started

To set up and run this project locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/princesharma74/giggle-nextjs-clc3.git
   cd giggle-nextjs-clc3
   ```

2. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add the necessary environment variables for API keys, database credentials, and other configuration settings.

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. **Access the Application:**
   Open your browser and go to `http://localhost:3000` to view the application.

## API and Web Scraping

The platform uses both API calls and web scraping to gather data from Codeforces, Leetcode, and Codechef. 

- **API Integration:** Handles authenticated requests to fetch data securely.
- **Web Scraping:** Uses Beautiful Soup to scrape data from web pages when APIs are not available.

## Contributing

Contributions are welcome! Please follow these steps to contribute to the project:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Open a pull request with a detailed description of your changes.

## Contact

For any questions or support, please contact [princesharma2899@gmail.com]
