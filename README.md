This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, Install all the required project dependencies:
```bash
npm install

```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```
## Features 

- > For styling I have used MUI Components due to time crunch , and I have thought of styling all by myself , I have a little knowledge of designing and have a habit of translating designs from the designers.

 - > This Next.js project has 3 main routes namely : 
     1. Home page ("/")
     2. Schools listing page ("/schools")
     3. Individual school pages (e.g., "/schools/s1", "/schools/s2")

- > Flow of the Application : 
- On the home Page , click on Go To Schools link and this shall redirect you to the "School Listing Page "

- School Listing Page : There are 5 schools , fetched from the JSON file and displayed in Cards , to view individual Schools click on 
"Learn More" , this will redirect you to individual School pages .

- On the individual School Page , you can see the "Distance Calculator Feature " 

"Distance Calculator Feature " : Here you can add Longitude and Latitude in the input text box and when you click on the "Calculate Distance " you can see the distance displayed . This will be vanished once both text boxes are empty . 

Distance is calculated from the latitude & longitude postions  in the json files mentioned. 

- Review Feature : User can set review from the feedback stars , and can write their feedback in the textfield provided . Furthermore 
on clicking "Submit Review" , the Review is stored in "Local Storage " , and you can see a Modal , that review is submitted . 

To test this : Ctrl+shift+i and scroll in the console to see all the reviews . 

NOTE : Most compatible in browsers for now . 

