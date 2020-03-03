# Requirements 

## Vision - To give back to such a wonderful community of software developers, educate them on health and wellness and allow them to see local events. The user can then create a login and have CRUD capabilities to add/edit their favorite events which are then populated on to a MyStuff page.

## Scope In/Out
In: 
1. Our site will provide users with general health and wellness information. We are focused on the software developer as our user. 
1. Our site will have a hamburger menu that allows users to navigate through the site
1. Our site will have a sub-nav on the health & wellness page that allows users to jump down to specific sections of the page, organized by topic
1. Our site allows the user to create a profile and saves My Favorites to the database and then shows it on the MyStuff page
1. Our site allows the user to fill out a form that gives them CRUD capabilities to communicate with their data stored in the database


Out: 
1. Your data will never be shared with others
1. This is not specific medical advice and should not be perceived as such. This is just a general health and wellness information site.

## MVP
1. Allow users to view health and wellness information on the home page and then on the drill-down page for more details
1. Pull data from an event API that renders on a page
1. Create ability for the user to create a login that allows them to view their customized My Favorites on the MyStuff page
1. Create a Database where a user can Create, Store, Read, Update, and Delete items. These items should include events indicated as My Favorite.
-- To do the above two MVP goals, the database will have 3 tables: Users, Events and a Join table


## Stretch Goals
- Remember to stretch your hamstrings :)-
1. Workout and nutrition plan
1. Adding additional tables to database so user can keep track of more items they like
1. Render search criteria from the API in calendar form
1. Calculate the users BMI and chart it vs national average BMI
1. Use weather API to change CSS particular to live weather data (ie. darktheme at midnight)

## Functional Requirements
1. Users can create usernames and passwords.
1. Calendar of Events will render up-and-coming events thru the RunSignUp API.
1. Relative health and wellness data will appear on its proper page.
1. Database with three tables; users, events, and user/events.

## Data Flow
1. User navigates to landing page.
1. On landing page, modal prompts users to create profile or login.
1. Landing page loads application introduction: paragraphs and videos; navigation bar clearly visible to include hamburger menu of available pages.
1. Upon hamburger menu selection, users are directed to preferred page (Health and wellness, Events, User Data, About Us).
1. On Health and wellness page, navigation bar allows for directing users to its three sections: Herbal, Nutrition, Mindfulness.
1. In Events page, superagent calls RunSignUp API and JQuery renders the results into listings.
1. After Events page list loads, users can select a favorite event that is then saved into database tables and table join: users, events, and user/events.
1. My stuff page loads with info from database and allows for deleting events.
1. About Us page contains software developer information in carousel and links to our external portfolios.

## Non-Functional Requirements
1. User authentication, so that, upon login, users can CRUD their favorites in-and-out of database.
1. Events pages renders limited amount of calendar events (ie. next 30- 90 days).
