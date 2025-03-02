const RegisterUser = require('../../application/useCases/registerUser');
const LoginUser = require('../../application/useCases/loginUser');

class UserController {
    constructor(userService) {
        this.registerUserUseCase = new RegisterUser(userService);
        this.loginUserUseCase = new LoginUser(userService);
    }

    async register(req, res) {
        try {
            const dto = req.body;
            await this.registerUserUseCase.execute(dto);
            res.status(201).json({ massage: 'User registered successfully' });
        } catch (error) {
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
