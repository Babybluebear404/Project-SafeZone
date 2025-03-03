const RegisterUser = require("../../application/useCases/registerUser");
const LoginUser = require("../../application/useCases/loginUser");
const googleLogin = require("../../application/useCases/authGoogleLogin");


class UserController {
    constructor(userService) {
        this.userService = userService;
        this.registerUserUseCase = new RegisterUser(userService);
        this.loginUserUseCase = new LoginUser(userService);
    }

    async register(req, res) {
        try {
            const dto = req.body;
            const user = await this.registerUserUseCase.execute(dto);
            res.status(201).json({ message: "User registered successfully", user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const dto = req.body;
            const token = await this.loginUserUseCase.execute(dto);
            res.status(201).json({ message: "Login successfully", token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async googleLogin(req, res) {
        try {
            const { access_token } = req.body;
            const { user, token } = await googleLogin(access_token);

            res.status(200).json({ message: "Google Login successful", user, token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = UserController;
