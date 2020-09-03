# perUse
A ReactJS front end application to search an API for jobs, authenticate a user, and allow for applications to jobs. It was made using React and puts a focus on front end logic. However, the app was originally scaled out to handle routing through a back end server using Axios calls. More about that in **Full Stack** section below.

## Usage
This React app is designed to be used in a web browser after cloning the repo. From the **Client** directory, run *npm start* to start the app in a web browser at localhost:3000.

## Navigation
The app has a fixed top nav bar to allow the user to go to the home page, the search page or, depending on the user's log in status, either log in, sign up, or log out of the application. A successful logout reloads the Navbar and then displays "login" and "signup" instead. There is a known issue where occasionally the navbar will not update when the user logs into the application. Upon refreshing the page or navigating to another page the navbar will display correctly, however the rendering is cometimes faulty upon initial log in or sign up.

The landing page also has a button directing the user to the search page and urging them to sign in or sign up to get the most out of perUse. As this is the main functionality of the app, it should be readily available to the user upon landing on the site. More in **Search** below for functionality of the page.

Login and Signup link to dedicated pages to handle the selected operation and also link to each other (once on the page) in case the user chose the wrong method. More below in **User Auth**.

Each job displayed on the Search page links to a form to apply for the job. More in **Apply** section below.

## Search
The main functionality of the app comes in the Search page. Users can Display All Jobs or filter jobs by Location, Type, or Skills.

The Display All Jobs button calls the API to `get` all jobs currently available. It then renders a section for each displaying information about the job. **Note:** It is recognized that in this section, `dangerouslySetInnerHTML` is not best practice when importing data from outside APIs for consumption. However, it does allow for the most flexibility in terms of consuming this particular API and is limited in scope to this small project. An alternative would be to import the description and .replace() all tags with apces, however this does not allow for flexibility in formatting of description. Upon larger implementation, a different method of consumption of the data would have to be implemented.

If the user is logged in, an Apply button will appear that will take them to an application form for the selected job. The ID of the job persists to the application form using Session Storage so the proper call to the API can be made. If the user is not logged in, Login or Signup buttons will appear under the job information with a message urging them to log in or sign in to apply for the job. 

Filtering allows for three different options: Location, Type, and Skills. Each button calls the API to search for the available options in each category. They are then added to a new Set and displayed as buttons. This takes away any guesswork on the part of the user having to use a text field and gives the user a higher chance of finding a job they are interested in. It is acknowledged that for a scaled up application this could become problematic very quickly as the number of options may be very large--this can be solved by only printing the first X number of the options and allowing the user to cycle through them until they find a desired option. Again, the scope of this application is small enough to warrant the use of this functionality.

Each button the user can choose as a filter option will then call the API and filter out job results for that specific criteria. Jobs will be rendered onto the page in cards identical to the ones displayed using *Display All Jobs* button, including Apply or Login/Sign Up buttons.

## Apply
The application page dynamically populates the title of the job. Upon clicking the Apply button on the search page, the title is stored in session storage to allow for a more personalized form. The job ID is also pulled upon clicking the Apply button and is used to make the correct API call when submitting the application.

User entered information is validated to make sure no blank sections of form are submitted. A warning message dynamically appears depending upon which (if any) of the fields are left blank upon clicking the 'Apply!' button.

The API call is only executed if the user is logged in, a state that is tracked using the presence or absence of a 'token' value in session storage. This allows for authorization for the API call to submit an application. Upon successful application submission, the user is presented with a good luck message and a button to take them back to the search page if they would like to search again.

## User Auth
User authentication is accomplished on both the Sign Up and Login pages.

Upon successful sign up of a user, the API is called to log them in and retrieve their token. This is stored in session storage and is used to track their log in status and provide authorization for the API call to submit an application. Succefful login by a user on the Log In page also takes the user token and places it in session storage. Session storage is used over local storage to allow for clearing of the values upon exit for security and privacy.

## Full Stack
This app was originally started as a full stack application with its own server and route handling on the backend. I'm a full stack developer by training--my default was to layout the app as if I needed to handle the backend routes and server logic. By the time I realized my mistake, I had already built out all of this functionality, so I left the code in the files. This allows for some higher functionality in the future if needed as users and jobs could be stored in a personal database instead of making an API call. It would also allow for more effecient filtering for results as many database tools allow for things such as `find` in Mongoose that can be passed filtering parameters and take away the need to write the filtering logic ourselves. In addition, I also felt rather defeated getting rid of a lot of code I'd spent time on. I'm waiting for a atch for that part of my developer ego in my next personality update :D