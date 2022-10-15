const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
        default: ""
    },
    last_name: {
        type: String,
        trim: true,
        default: ""
    },
    accountName: {
        type: String,
        default: ""
    },
    client_id: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        lowercase:true,
        unique: true
    },
    password: {
        type: String
    },
    phone: {
        type: String,
        trim: true,
        unique: true
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/specialman/image/upload/f_auto,fl_lossy,q_auto/v1600110269/profile_hk4zyr.png"
    },
    role: {
        type: String,
        default: "client"
    },
    bvn: {
        type: String
    },
    dob: {
        type: Date
    },
    gender: {
        type: String
    },
    employment: {
        type: Map,
        of: String,
        default:{
            status: "",
            employer_name: "",
            office_address: "",
            sector: "",
            position: "",
            funding_sources: "",
            annual_income: ""
        }
    },
    investment: {
        type: Map,
        of: String,
        default:{
            goal: "",
            experience: "",
            marital_status: "",
            next_of_kin_name: "",
            next_of_kin_phone: "",
            next_of_kin_email: "",
            next_of_kin_relationship: ""
        }
    },
    document: {
        type: Map,
        of: String,
        default:{
            name:"",
            image:""
        }
    },
    bank: {
        type: Map,
        of: String,
        default:{
            name:"",
            account_number:"",
            account_name:""
        }
    },
    status: {
        type: Map,
        of:String,
        default:{
            employment:"Pending",
            document:"Pending",
            investment:"Pending",
            bank:"Pending",
            biodata:"Pending",
            access:"Approved"
        }
    },
    createdAt: Date
})



userSchema.index({first_name: 'text', last_name: 'text', email: 'text', phone: 'text', client_id: 'text'})

let userModel = mongoose.model("User", userSchema) 

module.exports = userModel