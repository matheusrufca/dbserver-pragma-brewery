# Application

This application monitors the temperature of beer containers and shows it in real time on the application dashboard.
Each container has a panel, that can be blue, dark or red according to current temperature.

Also it notifies the user with a toast message every time a container has passed the limit.

## Setup

Run `npm install` to install dependencies.
Run `npm start` for a dev server. Navigate to `http://localhost:4200/`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## What are the highlights of your logic/code writing style?

I make use of Typescript features to create a typesafe application, and small methods to improve readability.

The gauge chart is a friendly way to show temperature.

The temperature observables goes pretty well to watch temperature changes.

## What could have been done in a better way? What would you do in version 2.0?

Sound notification so Shane could be aware of heating problems while he is driving

Log temperatures on a database

Hide/Show/Mute container panel

Show heating details like if there is a door open

Add a spinner on page components that take a while to load

There is some cleanups to do on BeerContainerComponent class properties

Integration tests

## What were the questions you would ask and your own answers/assumptions?

- To keep it simple, I assume that there is a service to provide temperatures but does not provide more information about some possible heat or cooling problem.

- I assume that there is a service to provide container definitions.

- It probably should be used on a mobile device, tablet or smartphone.

- I would ask if notification via toastr is necessary as the panel color do the same function
