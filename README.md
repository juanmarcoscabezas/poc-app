# POC APP
Frontend Home Work

https://juan-pokemon.surge.sh/

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


### Tasks
-   &#9745; Create a view to make the Login, without API call.
    -   &#9745; Validate the email and password.
    -   &#9745; Next time the application is opened, if the user is already logged in, the home screen should be shown instead of the login form.
-   &#9745; Navigation tab bar: With two pages, one implemented and one dummy.
    -   &#9745; Home page: implement the Home list page with:
        -   &#9745; Scrollable list content.
        -   &#9745; Show initial 20 elements from API and request next elements via server-side pagination.
        -   &#9745; Favorite button on each item, that is persisted between app launches.
-   &#9745; Detail page: User should be able to navigate to the detail page when the user
touches on each item in the home page list. This page should open in a new page.


### Nice to have for this POC app:
-   &#9745; Implement a good architecture for the application.
-   &#9744; Create unit tests for the app logic.
-   &#9744; Implement a typeahead input (with suggestions as user types) for search in the home page.
-   &#9745; Change the dummy tab to show the favorite list.
-   &#9745; Animate transition between home and detail page.
-   &#9745; If it’s a web app => Deploy it into any free service such as netlify or vercel.