##  🌟StudyNotion

StudyNotion is a fully functional ed-tech platform that enables users to create, consume, and rate educational content. The platform is built using the MERN stack, which includes ReactJS, NodeJS, MongoDB, and ExpressJS.

____________________________________________________________________________________________________________________
____________________________________________________________________________________________________________________

### Technology Used
<a name="tech-stack"></a>

## 📌 Frontend
<a F="frontend"></a>
<p>
  <a href="https://www.w3schools.com/html/"> <img src="https://img.icons8.com/color/70/000000/html-5--v1.png" alt="HTML" /></a>
  <a href="https://www.w3schools.com/css/"> <img src="https://img.icons8.com/color/70/000000/css3.png" alt="CSS" /></a>
  <a href="https://www.w3schools.com/js/"><img src="https://img.icons8.com/color/70/000000/javascript--v1.png" alt="JS" /></a>
  <a href="https://www.w3schools.com/REACT/DEFAULT.ASP"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="React.js" width="50" height="50" /></a>
  </p>

- **HTML**:HTML (HyperText Markup Language) is a skeleton of a website, structuring content with tags and elements.
- **CSS**:CSS is a style sheet language used to style web pages.It enables the application of different styles based on media types and user preferences, enhancing user accessibility and readability
- **JavaScript**:JavaScript is a programming language used to add interactivity to websites.
- **React.js**:A JavaScript library for building user interfaces. It allows developers to create large web applications that can update and render efficiently in response to data changes.

## 📌 Backend
<a m="backend"></a>
<p>
<a href="https://www.w3schools.com/nodejs/"><img src="https://e7.pngegg.com/pngimages/247/558/png-clipart-node-js-javascript-express-js-npm-react-github-angle-text.png" alt="Node.js" width="50" height="50" /></a>
<a href="https://www.javatpoint.com/expressjs-tutorial"><img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/expressjs_logo_icon_169185.png" alt="expressjs" width="50" height="50" /></a>
<a href="https://www.mongodb.com/docs/"><img src="https://w7.pngwing.com/pngs/956/695/png-transparent-mongodb-original-wordmark-logo-icon-thumbnail.png" alt="MongoDB" width="50" height="50" /></a>
</p>
<!-- rm -f .git/index.lock -->
- **MongoDB**: A NoSQL database that provides high performance, high availability, and easy scalability. It stores data in flexible, JSON-like documents.
- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, enabling server-side scripting and running scripts server-side to produce dynamic web page content.

____________________________________________________________________________________________________________________
____________________________________________________________________________________________________________________

## 📌 Database
<a j="database"></a>
The database for the platform is built using MongoDB, which is a NoSQL database that
provides a flexible and scalable data storage solution. MongoDB allows for the storage of
unstructured and semi-structured data. The database stores the course content, user data, and other
relevant information related to the platform.

____________________________________________________________________________________________________________________
____________________________________________________________________________________________________________________

## 📌 API Design
<a k="api-design"></a>

The StudyNotion platform's API is designed following the REST architectural style. The
API is implemented using Node.js and Express.js. It uses JSON for data exchange and
follows standard HTTP request methods such as GET, POST, PUT, and DELETE.
Sample list of API endpoints and their functionalities: 
1. /api/auth/signup (POST) - Create a new user (student or instructor) account.
2. /api/auth/login (POST) – Log in using existing credentials and generate a JWT
token.
3. /api/auth/verify-otp (POST) - Verify the OTP sent to the user's registered email.
4. /api/auth/forgot-password (POST) - Send an email with a password reset link to
the registered email.
5. /api/courses (GET) - Get a list of all available courses.
6. /api/courses/:id (GET) - Get details of a specific course by ID.
7. /api/courses (POST) - Create a new course.
8. /api/courses/:id (PUT) - Update an existing course by ID.
9. /api/courses/:id (DELETE) - Delete a course by ID.
10. /api/courses/:id/rate (POST) - Add a rating (out of 5) to a course.
Sample API requests and responses: 
1. GET /api/courses: Get all courses
   * Response: A list of all courses in the database
2. GET /api/courses/:id: Get a single course by ID
   * Response: The course with the specified ID
3. POST /api/courses: Create a new course
   * Request: The course details in the request body
   * Response: The newly created course
4. PUT /api/courses/:id: Update an existing course by ID
   * Request: The updated course details in the request body
   * Response: The updated course
5. DELETE /api/courses/:id: Delete a course by ID
   * Response: A success message indicating that the course has been deleted.
