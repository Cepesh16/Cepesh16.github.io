/*function car(name, model, owner, year, phone, image) {
	return {
		name, model, owner, year, phone, image
	}
}*/

// упрощенный вариант "function car()"
const car = (name, model, owner, year, phone, image) => ({name, model, owner, year, phone, image})

const cars = [
	car('Ford', 'Focus', 'Max', 2016, '+1 934 395 90 11', './assets/img/bmw.png'),
	car('Toyota', 'New', 'Petro', 2019, '+2 454 365 50 22', './assets/img/toyota.png'),
	car('Range Rover', 'Old', 'Tom', 2013, '+3 804 045 93 33', './assets/img/range-rover.png')
]



new Vue({
	el: '#app',
	data: {
		cars: cars,
		car: cars[0]
	},
	methods: {
		selectCar: function(index) {
			this.car = cars[index]
		}
	}
})