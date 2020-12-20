import Car from "./model";

function makeQueryObject(query) {
    let result = {};
    let cars = data;

    if (req.query.ownerName) {
        cars = cars.filter(car => car.ownerName === req.query.ownerName)
    }

    if (req.query.carNumber) {
        cars = cars.filter(car => car.carNumber.split(' ')[0] === req.query.carNumber)
    }
    
    res.send(cars)
    return result;
};

const carControler = {
 
    get: async (req, res) =>{
        try {
            const cars = await Car.find(makeQueryObject(req.query));
            res.send(cars);
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    getById: async (req, res) =>{
        try {
            const car = await Car.findById(req.params.id);
            if (car) 
                res.send(car);
            else
                res.status(404).send("Not Found");             
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    post: async (req, res) =>{
        try {
            const newCar = new Car(req.body);
            const car = await newCar.save();            
            res.send(car);             
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    delete: async (req, res) =>{
        try {
            const car = await Book.findByIdAndDelete(req.params.id);
            if (car) 
                res.send(car);
            else
                res.status(404).send("Not Found");             
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    patch: async (req, res) =>{
        try {
            const car = await Car.findOneAndUpdate(req.params.id, req.body, {
                returnOriginal: false
            } );
            if (car) 
                res.send(car);
            else
                res.status(404).send("Not Found");             
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    }
}


export default carControler;