import readBodyProtection from "~/utils/readBodyProtection"

export default defineRequestMiddleware((event) => {
    if(event.method === "POST" || event.method === "PUT") {
        readBodyProtection(event)
    }
})