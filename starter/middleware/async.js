const asyncWrapper=(fn)=>{
    return async(req,res,next)=>{
        try{
            await fn(req,res,next)
        }catch(error){
            // next pases the error the express error handler is we don't have a custom errror handler created for it.
            // error-handler was created  and use in the app.js  to handler the next() error sent to the express handler
           next(error); 
        }
    }
}
module.exports=asyncWrapper;