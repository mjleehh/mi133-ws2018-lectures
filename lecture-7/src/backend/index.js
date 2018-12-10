import mg from 'mongoose'
import startGraphQlServer from './Queries'

const DB_URL = 'mongodb://localhost/mi133-lecture-7'

async function main() {
    await mg.connect(DB_URL)
    startGraphQlServer()
    console.log('listening')
}

main()