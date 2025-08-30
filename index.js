import net from "net"
import Parser from "redis-parser"

const server = net.createServer(connections => {
    console.log('Client Connected')

    const parser = new Parser({
        returnReply: (reply) => {
            console.log('=>', reply)

            if (reply[0] && reply[0].toUpperCase() === "PING") {
                connections.write("+PONG\r\n")
            } else {
                connections.write("+OK\r\n")
            }
        },
        returnError: (err) => console.log('=>', err)
    })

    connections.on("data", data => {
        parser.execute(data)
    })
})

server.listen(8000, () => {
    console.log('custom redis server running on port 8000')
})
