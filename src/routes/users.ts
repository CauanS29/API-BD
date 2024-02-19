
const express = require('express'); 


const router = express.Router(); 

import { createUserController } from "../controllers/createUser";
import { getUserController } from "../controllers/getUser";

console.log('users route'); 

router.get('/:id', getUserController);
router.post('/', createUserController);

module.exports = router; 

