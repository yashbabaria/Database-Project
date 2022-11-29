require("dotenv").config();

const express = require("express");
const db = require('./db')
const app = express();
const cors = require("cors")

app.use(cors())
app.use(express.json())

// check if the entered username and password match a saved user
app.get("/api/users/:userName/:passWord", async (req, res) =>{
    try {
        const results = await db.query("SELECT UserID FROM Users WHERE Username = $1 AND Password = $2", 
        [req.params.userName, req.params.passWord])
        //console.log(results)
        // if(results.rows.length == 0){
        //     res.status(200).json({
        //         status: "fail",
        //         results: results.rows.length
        //     })
        // }else{
        //     res.status(200).json({
        //         status: "success",
        //         data:{
        //             users: results.rows,
        //         }
        //     })
        // }
        res.json(results.rows)
    } catch (error) {
        
    }
})
// Post new User (SignUp Page)
app.post("/api/users", async (req, res) =>{
    try {
        const {username, password} = req.body

        const results = await db.query("INSERT users (Username, Password) VALUES ($1, $2) returning *", 
        [username, password])
        //console.log(results)
        // res.status(201).json({
        //     status: "success",
        //     data: {
        //         group: results.rows[0]
        //     }
        // })
        res.json(results.rows[0])
    } catch (error) {
        
    }
})
// Get User Info (Profile Page) with Ratings
app.get("/api/users_profile", async (req, res) =>{
    try{
        const results = await db.query("SELECT * FROM Users WHERE UserID = $1", [req.body.userID])
        //console.log(results)
        if(results.rows.length == 0){
            res.status(200).json({
                status: "fail",
                results: results.rows.length
            })
        }else{
            res.status(200).json({
                status: "success",
                data:{
                    users: results.rows,
                }
            })
        }
        
    }catch(err){
        console.log(err)
    }
})
// Get all Movies Ordered By Newest
app.get("/api/movies_newest", async (req, res) =>{
    try {
        const results = await db.query("SELECT TitleName as title, Description as description," +
        "Round(AVG(Rating.RatingNumber), 0) as rating," +
        "ReleaseYear as year, RuntimeMinutes as duration FROM Title " +
        "JOIN Rating ON Title.TitleID = Rating.TitleID " +
        "GROUP BY title, description, year, duration ORDER BY year DESC, 3 LIMIT 10")
        //console.log(results)
        // res.status(200).json({
        //         status: "success",
        //         data:{
        //             users: results.rows,
        //         }
        // })
        res.json(results.rows)
    } catch (error) {
        console.log(error)
    }
})

// Get all Movies Ordered By Highest Rate http://localhost:3001/api/movies_rating
app.get("/api/movies_rating", async (req, res) =>{
    try {
        const results = await db.query("SELECT TitleName as title, Description as description," +
        "Round(AVG(Rating.RatingNumber), 0) as rating," +
        "ReleaseYear as year, RuntimeMinutes as duration FROM Title " +
        "JOIN Rating ON Title.TitleID = Rating.TitleID " +
        "GROUP BY title, description, year, duration ORDER BY 3 DESC, 4 LIMIT 10")
        //console.log(results)
        // res.status(200).json({
        //         status: "success",
        //         data:{
        //             users: results.rows,
        //         }
        // })
        res.json(results.rows)
    } catch (error) {
        console.log(error)
    }
})

app.get("/api/movies/:sort/:genre", async (req, res) =>{
    try {
        let results
        if(req.params.sort == "highest"){
            if(req.params.genre != "all"){
                results = await db.query("SELECT TitleName as title, Description as description," +
                    "Round(AVG(Rating.RatingNumber), 0) as rating," +
                    "ReleaseYear as year, RuntimeMinutes as duration FROM Title " +
                    "JOIN Rating ON Title.TitleID = Rating.TitleID " +
                    "WHERE Title.genre LIKE $1 " +
                    "GROUP BY title, description, year, duration ORDER BY 3 DESC, 2", ["%" + req.params.genre + "%"])
            }else{
                results = await db.query("SELECT TitleName as title, Description as description," +
                    "Round(AVG(Rating.RatingNumber), 0) as rating," +
                    "ReleaseYear as year, RuntimeMinutes as duration FROM Title " +
                    "JOIN Rating ON Title.TitleID = Rating.TitleID " +
                    "GROUP BY title, description, year, duration ORDER BY 3 DESC, 2")
            }
        }else if(req.params.sort == "newest"){
            if(req.params.genre != "all"){
                results = await db.query("SELECT TitleName as title, Description as description," +
                    "Round(AVG(Rating.RatingNumber), 0) as rating," +
                    "ReleaseYear as year, RuntimeMinutes as duration FROM Title " +
                    "JOIN Rating ON Title.TitleID = Rating.TitleID " +
                    "WHERE Title.genre LIKE $1 " +
                    "GROUP BY title, description, year, duration ORDER BY year DESC, 1", ["%" + req.params.genre + "%"])
            }else{
                results = await db.query("SELECT TitleName as title, Description as description," +
                    "Round(AVG(Rating.RatingNumber), 0) as rating," +
                    "ReleaseYear as year, RuntimeMinutes as duration FROM Title " +
                    "JOIN Rating ON Title.TitleID = Rating.TitleID " +
                    "GROUP BY title, description, year, duration ORDER BY year DESC, 1")
            }
            
        }
        //console.log(results)
        res.json(results.rows)
    } catch (error) {
        console.log(error)
    }
})
// Post ratings to Movie and Group
app.post("/api/ratings", async (req, res) =>{
    try {
        //console.log(req.body)
        const{userID, titleName, ratingNum} = req.body
        const results = await db.query("INSERT INTO Rating(UserID, TitleID, RatingNumber)" +
        " VALUES ($1, (SELECT TitleID FROM Title WHERE TitleName = $2), $3) returning *", 
        [userID, titleName, ratingNum])
        // res.status(201).json({
        //     status: "success",
        //     data: {
        //         group: results.rows[0]
        //     }
        // })
        res.json(results.rows[0])
    } catch (error) {
        console.log(error)
    }
})

// Query to get all previously created ratings by genre input
app.get("/api/ratings/:genre", async (req, res) =>{
    try {
        let results
        if(req.params.genre != "all"){
            results = await db.query("SELECT Users.username as user, Title.TitleName as title," +
            "Title.description as description, Title.releaseyear as year, Title.runtimeminutes as duration," +
            "Rating.ratingnumber as rating, Rating.ratingcomment as comment " +
            "FROM Rating " +
            "JOIN Users ON Users.UserID = Rating.UserID " +
            "JOIN Title ON Title.TitleID = Rating.TitleID " +
            "WHERE Title.genre LIKE $1 ORDER BY Rating.ratingid;", 
            ["%" + req.params.genre + "%"])
        }else{
            results = await db.query("SELECT Users.username as user, Title.TitleName as title," +
                "Title.description as description, Title.releaseyear as year, Title.runtimeminutes as duration," +
                "Rating.ratingnumber as rating, Rating.ratingcomment as comment " +
                "FROM Rating " +
                "JOIN Users ON Users.UserID = Rating.UserID " +
                "JOIN Title ON Title.TitleID = Rating.TitleID " +
                "ORDER BY Rating.ratingid;")
        }
        
        //console.log(results.rows)
        // res.status(200).json({
        //         status: "success",
        //         data:{
        //             users: results.rows,
        //         }
        // })
        res.json(results.rows)
    } catch (error) {
        console.log(error)
    }
})

// Query to get all previously created ratings by userID input
app.get("/api/myratings/:genre/:userID", async (req, res) =>{
    try {
        // const results = await db.query("SELECT Title.TitleName as title," +
        // "Title.description as description, Title.releaseyear as year, Title.runtimeminutes as duration," +
        // "Rating.ratingnumber as rating, Rating.ratingcomment as comment " +
        // "FROM Rating " +
        // "JOIN Users ON Users.UserID = Rating.UserID " +
        // "JOIN Title ON Title.TitleID = Rating.TitleID " +
        // "WHERE Users.UserID = $1", 
        // [req.body.userID])
        let results
        if(req.params.genre != "all"){
            results = await db.query("SELECT Title.TitleName as title," +
            "Title.description as description, Title.releaseyear as year, Title.runtimeminutes as duration," +
            "Rating.ratingnumber as rating, Rating.ratingcomment as comment " +
            "FROM Rating " +
            "JOIN Users ON Users.UserID = Rating.UserID " +
            "JOIN Title ON Title.TitleID = Rating.TitleID " +
            "WHERE Users.UserID = $1 AND Title.genre LIKE $2", 
            [req.params.userID, "%" + req.params.genre + "%"])
            //console.log(results.rows)
        }else{
            results = await db.query("SELECT Title.TitleName as title," +
                "Title.description as description, Title.releaseyear as year, Title.runtimeminutes as duration," +
                "Rating.ratingnumber as rating, Rating.ratingcomment as comment " +
                "FROM Rating " +
                "JOIN Users ON Users.UserID = Rating.UserID " +
                "JOIN Title ON Title.TitleID = Rating.TitleID " +
                "WHERE Users.UserID = $1", 
                [req.params.userID])
        }
        
        // res.status(200).json({
        //         status: "success",
        //         data:{
        //             users: results.rows,
        //         }
        // })
        res.json(results.rows)
    } catch (error) {
        console.log(error)
    }
})

app.get("/", (req, res) =>{
    res.json({
        status: "success",
        page: "Home"
    })
});

app.get("/test", async (req, res) =>{
    try{
        const results = await db.query("SELECT * FROM Users")
        //console.log(results)
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data:{
                users: results.rows,
            }
        })
    }catch(err){
        console.log(err)
    }
    
});

const port = process.env.PORT || 8080;
app.listen(port, () =>{
    console.log("Server is up and running on " + port);
});

// http://localhost:3000/test