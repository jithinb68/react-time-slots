React Time Block Selector

<img src="https://ibb.co/BqpwT8S" width="500">

This is a React application built with TypeScript and Tailwind CSS, allowing users to select time slots across different days of the week. Users can configure start time, end time, and intervals for their selections. Blocked time slots are displayed and cannot be selected.

Features

	•	Time Interval Selection: Choose the interval for time slots (e.g., 1 hour).
	•	Configurable Start and End Time: Set the start and end times for each day.
	•	Day Selection: Select days of the week to apply the time slot settings.
	•	Blocked Hours: Certain hours are blocked and cannot be selected, marked in red.
	•	Responsive UI: Built with Tailwind CSS for a responsive and visually consistent design.

Technologies Used

	•	React: Frontend framework for building user interfaces.
	•	TypeScript: Adds static typing to JavaScript, improving code quality and maintainability.
	•	Tailwind CSS: Utility-first CSS framework for styling.

Setup

	1.	Clone the repository:

git clone https://github.com/yourusername/react-time-block-selector.git
cd react-time-block-selector


	2.	Install dependencies:

npm install


	3.	Run the application:

npm start


	4.	Open http://localhost:3000 in your browser to view the application.

Folder Structure

	•	src/components: Contains reusable components such as TimeBlock, DaySelector, and TimeSettings.
	•	src/pages: Main pages of the application.
	•	src/styles: Custom styles using Tailwind.
	•	src/utils: Utility functions for time calculations and validations.

Components

	1.	TimeBlock: Displays selectable and blocked time slots based on the selected interval.
	2.	DaySelector: Allows users to select days of the week to apply the time slot settings.
	3.	TimeSettings: Dropdowns to set start time, end time, and interval for time blocks.

Usage

	1.	Select Interval: Use the dropdown to choose the time interval (e.g., 1 hour).
	2.	Set Start and End Times: Choose start and end times to define the range of selectable time slots.
	3.	Choose Days: Select the days of the week to apply the settings.
	4.	View Blocked Hours: Blocked hours are indicated in red and cannot be selected.

Customization

You can customize blocked hours or time intervals by modifying the logic in TimeBlock component and related utility functions in src/utils.

Future Improvements

	•	Persistent Storage: Save user selections in local storage.
	•	Dynamic Blocked Hours: Allow users to define custom blocked hours.
	•	Timezone Support: Add timezone selection to make it adaptable for different locations.

License

This project is licensed under the MIT License.