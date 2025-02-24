const RegisterUser = require('../../application/useCases/registerUser');
const loginUser = require('../../application/useCases/loginUser');

class UserController {
    constructor(userService) {
        this.registerUserUseCase = new RegisterUser(userService);
        this.loginUserUseCase = new loginUser(userService);
    }

    async register(req, res) {
        try {
            const dto = req.body;
            const user = await this.registerUserUseCase.execute(dto);
            res.status(201).json({ massage: 'User registered successfully', user });
        } catch (error) {
            if (error.message === 'InvalidEmailError' || error.message === 'PasswordError') {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }

    async login(req, res){
        try{
            const dto = req.body;
            const token = await this.loginUserUseCase.execute(dto);
            res.status(201).json({ message: 'Login successfully', token });
        }catch(error){
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;
