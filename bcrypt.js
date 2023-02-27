const bcrypt = require('bcryptjs');

const hashPass = async (password) => {
    const hash = await bcrypt.hash(password, 12)
    console.log(hash)
}

// hashPass('password123')

// $2a$12$SLZliJJGnQUhOFSyJfMMKOkxkvyFGa.V9wsL2jzkAbsmR.zMAKIVO
// \__/\/ \____________________/\_____________________________/
// Alg Cost      Salt (22)                       Hash


let hash = '$2a$12$SLZliJJGnQUhOFSyJfMMKOkxkvyFGa.V9wsL2jzkAbsmR.zMAKIVO'
let password = 'password123'
const testPass = async (password, hash) => {
    const isPass = await bcrypt.compare(password, hash)
    console.log(isPass)
}

testPass(password, hash)