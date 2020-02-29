const server = require("./server");
const { PORT } = require("./congif");

server.listen(PORT, () =>{
    console.log(`Desarrollo en equipo app esta corriendo por el puerto ${PORT}`);
})