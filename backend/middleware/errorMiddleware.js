//change default express error handler
const errorHandler = (err, req, res, next) =>{
    //get status code otherwise get 500 status 
    const statusCode = res.statusCode ? res.statusCode : 500 

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
} 

module.exports = {
    errorHandler
}