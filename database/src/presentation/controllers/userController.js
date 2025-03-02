const RegisterUser = require('../../application/useCases/user/registerUser');
const LoginUser = require('../../application/useCases/user/loginUser');
const ForgotUser = require('../../application/useCases/user/forgotUser');
const Profile = require('../../application/useCases/user/ProfileUser');

class UserController {
    constructor(userService) {
        this.registerUserUseCase = new RegisterUser(userService);
        this.loginUserUseCase = new LoginUser(userService);
        this.forgotUserUseCase = new ForgotUser(userService);
        this.profileUserUseCase = new Profile(userService);
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

    async forgot(req, res){
        try{
            const dto = {
                ...req.body,
                UserID: req.user.id
            };
            const token = await this.registerUserUseCase.execute(dto);
            res.status(201).json(token);
        }catch(error){
            res.status(500).json({ error: error.message });
        }
    }

    async getProfile(req, res) {
        try {
            const dto = {
                UserID: req.user.id
            };
            const user = await this.profileUserUseCase.execute(dto);
            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;
