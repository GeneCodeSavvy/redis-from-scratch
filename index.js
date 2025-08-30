import net from "net"
import Parser from "redis-parser"

const server = net.createServer(socket => {
    console.log('Client Connected')

    let object = {}

    const parser = new Parser({
        returnReply: (input) => {
            console.log('=>', input)
            switch (input[0].toLowerCase()) {
                case "get":
                    socket.write(`+${object[input[1]]}\r\n`)
                    break;
                case "set":
                    object[input[1]] = input[2]
                    socket.write("+OK\r\n");
                    break;
                case "ping":
                    socket.write("+PONG\r\n")
                    break
                case "del":
                    delete object[input[1]]
                    socket.write("+OK\r\n")
                    break
                case "exists":
                    if (object[input[1]]) {
                        socket.write("+TRUE\r\n")
                    } else {
                        socket.write("+FALSE\r\n")
                    }
                    break
                default:
                    socket.write("+OK\r\n");
            }
        },
        returnError: (err) => {
            console.error("Parsing error:", err);
            socket.write(`-ERR Protocol error: ${err.message}\r\n`);
        }
    })

    socket.on("data", data => {
        parser.execute(data)
    })
})

server.listen(8000, () => {
    console.log('custom redis server running on port 8000')
})
