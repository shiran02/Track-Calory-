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
        const remaining = this._caloriesLimit - this._totalCalories;

        calorieRemainingEl.innerHTML = remaining;
    }

    


    _render(){
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
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


const tracker = new CalarieTracker();

const braekFast = new Meal('break fast',400);
const lunch = new Meal('lunch',480);
tracker.addMeal(braekFast);
tracker.addMeal(lunch);


const run = new workOut('Morning Run',230);
const walk = new workOut('After Lunch walk',33);
tracker.addWorkOut(walk);
tracker.addWorkOut(run);



console.log(tracker._workouts);
console.log(tracker._meals);
console.log(tracker._totalCalories);