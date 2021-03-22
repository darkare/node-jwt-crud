const express= require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./users/routes.config');
const authRouter = require('./authorization/routes.config');
const PORT = 8889;


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

authRouter.routesConfig(app);
usersRouter.routesConfig(app);


app.get('/', (req, res) => {
    res.send('Hello ' + Date.now() )
})

app.listen(PORT, ()=>{
    console.log('Listening at ' + PORT );
} )