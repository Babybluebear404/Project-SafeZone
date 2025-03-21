const RegisterUser = require('../../application/useCases/user/registerUser');
const LoginUser = require('../../application/useCases/user/loginUser');
const ForgotPassword = require('../../application/useCases/user/forgotPassword');
const Profile = require('../../application/useCases/user/ProfileUser');
const ChangePassword = require('../../application/useCases/user/changePassword');
const googleLogin = require('../../application/useCases/user/authGoogleLogin');
const UpdateProfile = require('../../application/useCases/user/updateProfileUser');

class UserController {
    constructor(userService) {
        this.userService = userService;
        this.registerUserUseCase = new RegisterUser(userService);
        this.loginUserUseCase = new LoginUser(userService);
        this.forgotPasswordUseCase = new ForgotPassword(userService);
        this.changePasswordUseCase = new ChangePassword(userService);
        this.profileUserUseCase = new Profile(userService);
        this.googleLoginUseCase = new googleLogin(userService);
        this.UpdateProfileUseCase = new UpdateProfile(userService);
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

    async login(req, res) {
        try {
            const dto = req.body;
            const token = await this.loginUserUseCase.execute(dto);
            res.status(200).json({ message: "Login successfully", token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async googleLogin(req, res) {
        try {
            const { access_token  } = req.body;
            const token = await this.googleLoginUseCase.execute({ access_token });
            res.status(200).json({ message: "Google Login successful",token });
        } catch (error) {   
            res.status(500).json({ error: error.message }); 
        }
    }
    
    async forgot(req, res) {
        try {
            const dto = req.body;
            const token = await this.forgotPasswordUseCase.execute(dto);
            res.status(201).json({token});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async change(req, res) {
        try {
            const dto = {
                ...req.body,
                UserID: req.user.id
            };
            await this.changePasswordUseCase.execute(dto);
            res.status(201).json({ message: 'Password changed successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getProfile(req, res) {
        try {
            const dto = {
                UserID: req.user.id
            };
            const user = await this.profileUserUseCase.execute(dto);
            const users = {
                id: user.id,
                username: user.username,
                email: user.email,
                profile: user.profile
            }
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateProfile(req, res) {
        try {
            const dto = {
                ...req.body,
                UserID: req.user.id
            };
            await this.UpdateProfileUseCase.execute(dto);
            res.status(201).json({ message: 'Update Profile successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;
