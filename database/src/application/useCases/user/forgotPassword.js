class Forgot {
    constructor(userService) {
        this.userService = userService;
    }

    async execute(dto) {
        const { email } = dto;
        try {
            const existingUser = await this.userService.findUserByEmail(email);
            if (!existingUser) {
                throw new Error('No Email This');
            }
            const token = await this.userService.forgot(existingUser);
            return token;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Forgot;