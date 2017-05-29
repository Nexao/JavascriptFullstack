

var userFacade = require("./userFacade")

userFacade.createNewUser("emil", "123", function(data){
    if(data != null) console.log("succes creating emil")
    
})

userFacade.createNewUser("test", "test", function(data){
    if(data != null) console.log("succes creating test")
})