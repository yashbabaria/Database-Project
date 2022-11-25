require("dotenv").config();

const express = require("express");
const db = require('./db')
const app = express();
const cors = require("cors")

app.use(cors())
app.use(express.json())

// check if the entered username and password match a saved user
app.get("/api/users", async (req, res) =>{
    try {
        const results = await db.query("SELECT * FROM Users WHERE Username = $1 AND Password = $2", 
        [req.body.userName, req.body.passWord])
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
    } catch (error) {
        
    }
})
// Post new User (SignUp Page)
app.post("/api/users", async (req, res) =>{
    try {
        const results = await db.query("INSERT users (Username, Password) VALUES ($1, $2) returning *", 
        [req.body.userName, req.body.passWord])
        //console.log(results)
        res.status(201).json({
            status: "success",
            data: {
                group: results.rows[0]
            }
        })
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
        const results = await db.query("SELECT TitleName as title, Description as actors," +
        "Round(AVG(Rating.RatingNumber), 0) as rating," +
        "ReleaseYear as year, RuntimeMinutes as duration FROM Title " +
        "JOIN Rating ON Title.TitleID = Rating.TitleID " +
        "GROUP BY title, actors, year, duration ORDER BY year DESC, 1 LIMIT 10")
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
        const results = await db.query("SELECT TitleName as title, Description as actors," +
        "Round(AVG(Rating.RatingNumber), 0) as rating," +
        "ReleaseYear as year, RuntimeMinutes as duration FROM Title " +
        "JOIN Rating ON Title.TitleID = Rating.TitleID " +
        "GROUP BY title, actors, year, duration ORDER BY 3 DESC, 2 LIMIT 10")
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
// Post ratings to Movie and Group
app.post("/api/ratings", async (req, res) =>{
    try {
        const results = await db.query("INSERT INTO Rating(UserID, TitleID, RatingNumber, likeNumber, ratingComment)" +
        " VALUES ($1, (SELECT TitleID FROM Title WHERE TitleName = $2), $3, $4, $5) returning *", 
        [req.body.userID, req.body.titleName, req.body.ratingNum, 
            req.body.likeNumber, req.body.rateComment])
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
app.get("/api/ratings", async (req, res) =>{
    try {
        const results = await db.query("SELECT Users.username as user, Title.TitleName as title," +
        "Title.description as description, Title.releaseyear as year, Title.runtimeminutes as duration," +
        "Rating.ratingnumber as rating, Rating.ratingcomment as comment " +
        "FROM Rating " +
        "JOIN Users ON Users.UserID = Rating.UserID " +
        "JOIN Title ON Title.TitleID = Rating.TitleID " +
        "WHERE Title.genre = $1 ORDER BY Rating.ratingid;", 
        [req.body.genre])
        // console.log(results)
        res.status(200).json({
                status: "success",
                data:{
                    users: results.rows,
                }
        })
    } catch (error) {
        console.log(error)
    }
})

// Query to get all previously created ratings by userID input
app.get("/api/myratings", async (req, res) =>{
    try {
        const results = await db.query("SELECT Title.TitleName as title," +
        "Title.description as description, Title.releaseyear as year, Title.runtimeminutes as duration," +
        "Rating.ratingnumber as rating, Rating.ratingcomment as comment " +
        "FROM Rating " +
        "JOIN Users ON Users.UserID = Rating.UserID " +
        "JOIN Title ON Title.TitleID = Rating.TitleID " +
        "WHERE Users.UserID = $1", 
        [req.body.userID])
        // console.log(results)
        res.status(200).json({
                status: "success",
                data:{
                    users: results.rows,
                }
        })
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