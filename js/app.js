class CalarieTracker{
    constructor(){
        this._caloriesLimit = 2090;
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];

        this._displayCaloriesTotal();
        this._displayCaloriesLimit();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress(); 
    }
    // add meal ---------------------------------
    addMeal(meal){
        this._meals.push(meal);
        this._totalCalories += meal.calories;


        this._render();
    }
    // add workout --------------------------------
    addWorkOut(workOut){
        this._workouts.push(workOut);
        this._totalCalories -= workOut.calories;
        this._render();

    }


    // private methods --------------------------

    _displayCaloriesTotal(){
        const totalCaloriesEl = document.getElementById('calories-total');
        totalCaloriesEl.innerHTML = this._totalCalories;
    }

    _displayCaloriesLimit(){
        const calorieLimitEl = document.getElementById('calories-limit');
        calorieLimitEl.innerHTML = this._caloriesLimit;
    }

    _displayCaloriesConsumed(){
        const calorieConsumedtEl = document.getElementById('calories-consumed');
        const consumed = this._meals.reduce(
            (total,meal) => total + meal.calories,
            0
        );
        calorieConsumedtEl.innerHTML = consumed;
    }

    _displayCaloriesBurned(){
        const calorieBurnedEl = document.getElementById('calories-burned');
        const burned = this._workouts.reduce(
            (total,workout) => total + workout.calories,
            0
        );
        calorieBurnedEl.innerHTML = burned;
    }

    _displayCaloriesRemaining(){
        const calorieRemainingEl = document.getElementById('calories-remaining');
        const progressEl = document.getElementById('calorie-progress');
        const remaining = this._caloriesLimit - this._totalCalories;

        calorieRemainingEl.innerHTML = remaining;

        if(remaining <= 0){
            calorieRemainingEl.parentElement.parentElement.classList.remove('bg-light');
            calorieRemainingEl.parentElement.parentElement.classList.add('bg-danger');
            progressEl.classList.remove('bg-sucess');
            progressEl.classList.add('bg-danger');
        }else{
            calorieRemainingEl.parentElement.parentElement.classList.remove('bg-danger');
            calorieRemainingEl.parentElement.parentElement.classList.add('bg-light');
            progressEl.classList.remove('bg-danger');
            progressEl.classList.add('bg-sucess');
        }

        
    }


    _displayCaloriesProgress(){
        const progressEl = document.getElementById('calorie-progress');
        const percentage = (this._totalCalories / this._caloriesLimit) * 100;
        const width = Math.min(percentage , 100);
        progressEl.style.width = `${width}%`;
    }

    


    _render(){
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }
}

class Meal{
    constructor(name,calories){
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}

class workOut{
    constructor(name,calories){
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}


// const tracker = new CalarieTracker();

// const braekFast = new Meal('break fast',400);
// const lunch = new Meal('lunch',480);
// tracker.addMeal(braekFast);
// tracker.addMeal(lunch);


// const run = new workOut('Morning Run',20);
// const walk = new workOut('After Lunch walk',33);
// tracker.addWorkOut(walk);
// tracker.addWorkOut(run);



// console.log(tracker._workouts);
// console.log(tracker._meals);
// console.log(tracker._totalCalories);


class App{
    constructor(){
        this._tracker = new CalarieTracker();

        document.getElementById('meal-form').addEventListener('submit',this._newMeal.bind(this));
        document.getElementById('workout-form').addEventListener('submit',this._newWorkout.bind(this));
    }

    _newMeal(e){
        e.preventDefault();

        console.log(1);
        const name = document.getElementById('meal-name');
        const calories = document.getElementById('meal-calories');

        // validate input --

        if (name.value === '' || calories.value === '') {
            alert('Please fill in all fields');
            return;
          }

        //console.log(this);

        const meal = new Meal(name.value , +calories.value);
        this._tracker.addMeal(meal);

        name.value = '';
        calories.value = '';

        const collapseMeal = document.getElementById('collapse-meal');
        const bsCollapse = new bootstrap.Collapse(collapseMeal,{
            toggle:true
        });
    }


    _newWorkout(e){
        e.preventDefault();

        console.log(1);
        const name = document.getElementById('workout-name');
        const calories = document.getElementById('workout-calories');

        // validate input --

        if (name.value === '' || calories.value === '') {
            alert('Please fill in all fields');
            return;
          }

        //console.log(this);

        const workout = new Meal(name.value , +calories.value);
        this._tracker.addWorkOut(workout);

        name.value = '';
        calories.value = '';

        const collapseWorkOut = document.getElementById('collapse-workout');
        const bsCollapse = new bootstrap.Collapse(collapseWorkOut,{
            toggle:true
        });
    }
}

const app = new App();