***TODO tasks***

- Add usertype choice during signup. {done}
- Add a strip showing time in different timezones between the calendar and greeting component on the homepage.
- Remove the username field in login page. Sign in with email & password
- Implement Radio Group Component {for radio elm's}
- Make auth work (FIX auth BUGS~~!!~~!!)
- Implement a stack for storing routes;
- Implement custom routing logic:
```ts
    // list of all available routes in the application
    let routes_: string[] = [];

    // define a variable for routes supported by specific usertypes

    let routesConfig = {
        // list of all routes to be used in this config instance
        // all routes includes in supportedRoutes[] should be part of routes_ variable
        supportedRoutes: []
        // routes that support all usertypes
        globalRoutes: [],
        // currently available routes
        /**
         * for example if a user is authenticated, has 2FA enabled in account but hasn't yet confirmed the 2FA token:
         *      then the only pages/routes available => ["/auth/twofactorauth"]
        */
        availableRoutes: []
        // usertype specific routes
        organization: [],
        usertypes: [],
        multiUserRoutes: [
            {
                route: "/",
                usertypes: ["individual", "organization"]
            }
        ]
    }

    // create a Stack class with the stack implementation methods

    class Stack<T> {
        items: T[]
        constructor() {
            this.items = []
        }
    }

    // create a Router instance with the methods such as history, push();
    // Use next/router for routing
    // persist the routing logic in store (prevent route stack loss on page reload)

    interface Router_instance_args {
        allRoutes: string[]
    }

    interface RouterTypes {
        getRoutes: ()
    }

    class Router {
        routes: string[]
        constructor({allRoutes}: Router_instance_args){
            this.routes = allRoutes;
        }
    }
```