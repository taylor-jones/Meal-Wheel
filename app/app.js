const bodyParser = require('body-parser');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');

const adminRouter = require('./routes/admin');
const cuisineRouter = require('./routes/cuisine');
const dietRouter = require('./routes/diet');
const foodGroupRouter = require('./routes/foodGroup');
const indexRouter = require('./routes/index');
const ingredientRouter = require('./routes/ingredient');
const loginRouter = require('./routes/login');
const newUserRouter = require('./routes/newUser');
const recipeRouter = require('./routes/recipe');
const recipeCategoryRouter = require('./routes/recipeCategory');
const recipeSignificanceTypeRouter = require('./routes/recipeSignificanceType');
const unitOfMeasureRouter = require('./routes/unitOfMeasure');
const userProfileRouter = require('./routes/userProfile');
const userRouter = require('./routes/user');



const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
  secret: 'password',
  resave: false,
  saveUninitialized: false,
}));



/*
 * Routes
 */
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/cuisines', cuisineRouter);
app.use('/dietary-restrictions', dietRouter);
app.use('/food-groups', foodGroupRouter);
app.use('/ingredients', ingredientRouter);
app.use('/login', loginRouter);
app.use('/newUser', newUserRouter);
app.use('/recipes', recipeRouter);
app.use('/recipe-categories', recipeCategoryRouter);
app.use('/recipe-significance-types', recipeSignificanceTypeRouter);
app.use('/units-of-measure', unitOfMeasureRouter);
app.use('/userProfile', userProfileRouter);
app.use('/users', userRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  context = {page: 'Error Page'};
  res.render('error', context);
});

module.exports = app;
