import net from "net"

const server = net.createServer(connections => {
    console.log('Client Connected')

    connections.on("data", data => {
        console.log("=>", data.toString())
    })

})

server.listen(8000, () => {
    console.log('custom redis server running of port 8000')
})
