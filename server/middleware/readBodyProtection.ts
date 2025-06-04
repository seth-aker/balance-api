import readBodyProtection from "~/utils/readBodyProtection"

export default defineEventHandler((event) => {
    if(event.method === "POST" || event.method === "PUT") {
        readBodyProtection(event)
    }
})
