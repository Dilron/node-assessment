let userData = require('./userData.json');
let manipulableData = [...userData]
// const parsedData = JSON.parse(userData);
let idInit = 101;

function newId(){
    return idInit++
}

function responseChecker(arr, val) {
    for( let i = 0; i < arr.length; i++ ){
        if(arr[i] === val){
            return true
        }
    }
    return false
};

module.exports = {
    getUsers: (req, res) => {
        const { query } = req;
        let response = [];
        if (query.age){
            for( let i = 0; i < manipulableData.length; i++){
                if(manipulableData[i].age < query.age){
                    response.push(manipulableData[i])
                }
            }
        }
        if (query.email){
            for( let i = 0; i < manipulableData.length; i++){
                if(manipulableData[i].email === query.email && !responseChecker(response, manipulableData[i].id)){
                    response.push(manipulableData[i])
                }
            }
        }
        if (query.favorites){
            for( let i = 0; i < manipulableData.length; i++){
                if(manipulableData[i].favorites.includes(query.favorites) && !responseChecker(response, manipulableData[i].id)){
                    response.push(manipulableData[i])
                }
            }
        }
        if (!query.age && !query.email && !query.favorites){
            response = [...manipulableData]
            res.status(200).send(response)
        } else {
            res.status(200).send(response)
        }
    },
    getUserById: (req, res) => {
        let id = req.params.userId;
        for(let i = 0; i < manipulableData.length; i++){
            if(manipulableData[i].id == id){
                res.status(200).send(manipulableData[i])
                return
            }
        }
        res.sendStatus(404)
    },
    getAdmin: (req, res) => {
        let response = [];
        for(let i = 0; i < manipulableData.length; i++){
            if(manipulableData[i].type === 'admin'){
                response.push(manipulableData[i])
            }
        }
        res.status(200).send(response)
    },
    getNonadmin: (req, res) => {
        let response = [];
        for(let i = 0; i < manipulableData.length; i++){
            if(manipulableData[i].type !== 'admin'){
                response.push(manipulableData[i])
            }
        }
        res.status(200).send(response)
    },
    getUsersByType: (req, res) => {
        let response = [];
        for(let i = 0; i < manipulableData.length; i++){
            if(manipulableData[i].type == req.params.userType){
                response.push(manipulableData[i])
            }
        }
        res.status(200).send(response)
    },
    updateUserById: (req, res) => {
        let response = [...manipulableData];
        const {body} = req;
        const {userId} = req.params;
        const newUser = {id: parseInt(userId), ...body};
        console.log(newUser, req.params, req.body)
        for(let i = 0; i < response.length; i++){
            if(response[i].id == userId){
                response.splice(i, 1, newUser)
            }
        }
        manipulableData = [...response];
        res.status(200).send(response)
    },
    deleteById: (req, res) => {
        // let response = [...manipulableData];
        const {userId} = req.params;
        for(let i = 0; i < manipulableData.length; i++){
            if(manipulableData[i].id == userId){
                manipulableData.splice(i, 1)
            }
        }
        res.status(200).send(manipulableData)
    },
    addNewUser: (req, res) => {
        // let response = [...manipulableData];
        const {body} = req;
        const newUser = {id: newId(), ...body}
        manipulableData.push(newUser)
        res.status(200).send(manipulableData)
    }
}