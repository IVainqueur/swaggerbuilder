let SERVER_URI = (process.env.NODE_ENV === "development") ? "http://localhost" : "https://swaggerbuilder.herokuapp.com"

export {SERVER_URI}