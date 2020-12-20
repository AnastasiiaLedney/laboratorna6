import {Schema, model } from 'mongoose';

const userSchema = new Schema({
    login: {
        type:String, 
        unique:[true, "Такий логін вже є"], // може містити тільки унікальні значення 
        required:true,      // обов'язкове поле
        minlength:[3, "Логін повинен бути довжиною не менше 3 символів"], //мінімальна довжина
        maxlength: 150  // максимальна дожина
    },
    password:{
        type:String, 
        validate:{ //кастомна функція
            validator: password => {
                let areDigits = /\d+/.test(password);
                let areCapitalLetters = /[A-Z]+/.test(password);   
                return areDigits && areCapitalLetters;
            },
            message:"Пароль повинен містити щонайменше 1 велику літеру, 1 цифру, ... "
        }
    },
    mail:{
        type:String,
        required:true, // обов'язкове поле 
        match: [/^[\w\.-]+@[\w\.]+$/,"Введіть пошту в форматі example@mail.com"], //відповідає регулярному виразу
    },
    age:{
        type:Number,
        min:18,
        max:100,
        validate:{
            validator: age =>{
                if (Math.abs(Math.trunc (age) - age) < 0.0001) 
                    return true;
                else
                    return false;                                          
            },
        }        
    },
    role:{
        type:String,
        enum:{  //тільки значення із переліку  
            values:["Admin", "User", "Boss"],         
            message: 'Дозволені ролі "Admin", "User", "Boss"',
        },
        default:"User" // значення за замовчуванням

    },
    registred:{
        type:Date,
        default: Date.now() //значення за  замовчуванням
    }


});

const User = model("User", userSchema);

export default User;