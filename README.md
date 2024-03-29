# PGR305-Exam - Webutvikling 3

### Group members:
* Exam candidate 2035
* Exam candidate 2061

## Our project
We opted for the theme `Football players / football team` and made a website for the team Liverpool FC. It's a website that showcases players, staff and trophies, with options to add and edit all of it. 

Both backend and frontend are built the way shown in class. A .NET/C# Web Api connected to MongoDB, and a frontend made in React with Typescript.

Our database is setup so players, staff and trophies are their own collections inside a database. 


## Initialization:
In order to run this on your machine, you need both .NET and Node.js installed. 

To run the backend, enter the /backend directory and enter the following command:
- `dotnet watch run`

To run the frontend, you need to first install the dependencies before you run it with the following commands below. Use either npm or yarn.
- `npm install` / `yarn install`
- `npm start` / `yarn start`

Info of endpoints can be found through the Swagger interface, found on https://localhost:5001/swagger/index.html

The website will then be availbile at http://localhost:3000/

## Structure and decisions

### Backend:
The backend is structured like how it was shown in class with Models, Interfaces, Services, Controllers and CORS-setup. 

It allows for all CRUD-operations, and is set up to give the correct response code according to HTTP Standards. The difference here from what was shown in class, is that POST will return 201 Created.

### Frontend:
The frontend is structured like shown in class. We've focused on making components as small and readable as possible. Shared code like API URL and handling of image upload are located in the utils folder, while shared components are in components/shared. 

For all axios-calls, there's code to handle and show the response. Errors are dealt with by the shared HandleError function in the utils folder, and showing the response info is done through the shared component ResponseView which utilizes Modal from react-bootstrap.

We've split the frontend in two parts. One for the user-side, where you can just view, and one for the admin-side, where you can add, edit and delete.

For the list of players, you can click each player to enter a player-details page for the selected player. For staff, all info is shown in the staff page. The same goes for trophies, but here you can click the 'See year won' to show a list of years Liverpool FC won that specific trophy.

In the list of players for users, there's a filter dropdown where the user can choose to only see players from a specific position, and a search-bar to search for players. Both can be combined. In the admin page for managing players, there's a search-bar to make it easier to find a specific player.

## Bugs and issues
Clicking 'players' in the NavBar while in the player component is supposed to bring the user down to the player-list with React-Scroll. This works fine in Safari, but in Chrome the scrolling is behaving weird. 

When doing changes to the database through the frontend, the user has to refresh in order to get the updated info from the database.