import {
    MongoClient,
    ObjectID
} from 'mongodb';

const url = 'mongodb://localhost:27017'; // адреса сервера

const dbName = 'carDB'; // назва Бази даних

const collectiionName = "cars"; //назва колекції

function makeQueryObject(query) {
    let result = {};
    console.log(query);
    let cars = data;

    if (req.query.ownerName) {
        cars = cars.filter(car => car.ownerName === req.query.ownerName)
    }

    if (req.query.carNumber) {
        cars = cars.filter(car => car.carNumber.split(' ')[0] === req.query.carNumber)
    }
    
    res.send(cars)
    console.log(result);
    return result;
};


const carControler = {
    get_async: async (req, res) => { //асинхронна функція
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            }); // створюємо нового клієнта для підключення
            const connection = await client.connect(); // підключаємось
            const cars = connection.db(dbName).collection(collectiionName); // вибираємо коллекцію            
            const result = await cars
                .find(
                    
                    makeQueryObject(req.query)
                )
                .toArray(); // дія (повернути всізаписи колекції)            
            res.send(result); // надіслати результат
            client.close(); //закрити підключення
        } catch (error) { // якщо сталася помилка
            console.log(error);
            res.status(500).send(error);
        }
    },
    get_promise: (req, res) => { // функція з промісами      
        const client = new MongoClient(url, {
            useUnifiedTopology: true
        }); // створюємо нового клієнта для підключення
        client.connect() // підключаємось
            .then(connection => {
                const cars = connection.db(dbName).collection(collectiionName); // вибираємо коллекцію  
                cars.find(makeQueryObject(req.query)).toArray()
                    .then(result => {
                        client.close();
                        res.send(result);
                    })
                    .catch(error => { // обробка помилки
                        throw error;
                    });
            })
            .catch(error => {
                console.log(error);
                res.status(500).send(error);
            });
    },
    get_callback: (req, res) => { // функція з колбеками  
        function logError(error){ //обробка помилки
            console.log(error);
            res.status(500).send(error);
        }   

        const client = new MongoClient(url, {
            useUnifiedTopology: true
        }); // створюємо нового клієнта для підключення
        client.connect(
            (error, connection) => { // підключаємось
                if (error) { // якщо помилка
                    logError(error);
                } else {
                    const cars = connection.db(dbName).collection(collectiionName);
                    // вибираємо коллекцію  
                    cars.find(makeQueryObject(req.query),
                        (error, result) => {
                            if (error) {
                                logError(error);
                            } else {
                                result.toArray(
                                    (error, result) => {
                                        if (error) {
                                            logError(error);
                                        } else {
                                            connection.close();
                                            res.send(result);
                                        }
                                    }
                                );
                            }
                        }
                    );

                }
            }
        );
    },
    getById: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });

            const connection = await client.connect();
            const cars = connection.db(dbName).collection(collectiionName);
            const result = await cars.findOne({
                _id: ObjectID(req.params.id)
            }); // знайти
            if (result) //якщо знайшло
                res.send(result);
            else
                res.status(404).send("Not Found");
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    post: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });

            const connection = await client.connect();
            const cars = connection.db(dbName).collection(collectiionName);
            const result = await cars.insertOne(req.body);
            res.send(result.ops);
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    delete: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });

            const connection = await client.connect();
            const cars = connection.db(dbName).collection(collectiionName);
            const result = await cars.findOneAndDelete({
                _id: ObjectID(req.params.id)
            }, req.body);
            if (result)
                res.send(result);
            else
                res.status(404).send("Not Found");
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    patch: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });

            const connection = await client.connect();
            const cars = connection.db(dbName).collection(collectiionName);
            const result = await cars.findOneAndUpdate({
                    _id: ObjectID(req.params.id)
                },
                {
                    $set: req.body
                }, );
            if (result.value)
                res.send(result.value);
            else
                res.status(404).send("Not Found");
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
}

export default carControler;