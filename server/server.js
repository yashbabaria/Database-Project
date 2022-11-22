require("dotenv").config();

const express = require("express");
const db = require('./db')
const app = express();

//app.use(cors())
app.use(express.json())

// Get Username and Password (SignIn Page)
app.get("/api/users", async (req, res) =>{
    try {
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
// Get User Info (Profile Page) with Ratings and Group (If they are in one)
app.get("/api/users/", async (req, res) =>{
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
// Post new Group or join group (Group Page)
app.post("/api/groups", async (req, res) =>{
    try {
        const results = await db.query("INSERT INTO groups (UserID, GroupName, Leader) VALUES ($1, $2, $3) returning *", 
        [req.body.userID, req.body.groupName, req.body.leader])
        //console.log(results)
        res.status(201).json({
            status: "success",
            data: {
                group: results.rows[0]
            }
        })
    } catch (error) {
        console.log(error)
    }
})
// Get All Groups (Group Page)
app.get("/api/groups", async (req, res) =>{
    try {
        const results = await db.query("SELECT * FROM Groups")
        //console.log(results)
        res.status(200).json({
                status: "success",
                data:{
                    users: results.rows[0],
                }
        })
    } catch (error) {
        
    }
})
// Get Group Info (Group Page)
app.get("/api/groups_info", async (req, res) =>{
    try {
        const results = await db.query("SELECT * FROM Groups WHERE GroupID in (SELECT GroupID FROM Groups WHERE GroupName = $1)", 
        [req.body.groupName])
        //console.log(results)
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
// Post movies 
app.post("/api/movies", async (req, res) =>{
    try {
        const results = await db.query("INSERT INTO title (groupID, TitleName, Description, Genre, ReleaseYear, RuntimeMinutes)" +
        " VALUES ((SELECT GroupID FROM Groups WHERE GroupName = $1), $2, $3, $4, $5, $6) returning *", 
        [req.body.groupName, req.body.titleName, req.body.description, req.body.genre, 
            req.body.releaseYear, req.body.runtimeMin])
        res.status(201).json({
            status: "success",
            data: {
                group: results.rows[0]
            }
        })
    } catch (error) {
        console.log(error)
    }
})
// Get all Movies for a Group (Group Page or Movies Page)
app.get("/api/movies", async (req, res) =>{
    try {
        const results = await db.query("SELECT * FROM Title WHERE groupID IN (SELECT GroupID FROM Groups WHERE GroupName = $1)",
        [req.body.groupName])
        //console.log(results)
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
// Post ratings to Movie and Group
app.post("/api/ratings", async (req, res) =>{
    try {
        const results = await db.query("INSERT INTO Rating(GroupID, UserID, TitleID, RatingNumber, likeNumber, ratingComment)" +
        " VALUES ((SELECT GroupID FROM Groups WHERE GroupName = $1), $2, $3, $4, $5, $6) returning *", 
        [req.body.groupName, req.body.userID, req.body.titleID, req.body.ratingNum, 
            req.body.likeNumber, req.body.rateComment])
        res.status(201).json({
            status: "success",
            data: {
                group: results.rows[0]
            }
        })
    } catch (error) {
        console.log(error)
    }
})
// Get all ratings for a Movie
app.get("/api/ratings", async (req, res) =>{
    try {
        const results = await db.query("SELECT * FROM Rating WHERE TitleID in (SELECT TitleID FROM Title WHERE TitleName = $1)", 
        [req.body.titleName])
        //console.log(results)
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

app.get("/test_sql", async (req, res) =>{
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