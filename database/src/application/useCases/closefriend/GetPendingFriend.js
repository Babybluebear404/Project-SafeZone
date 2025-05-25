class GetUserById {
    constructor(userService) {
        this.userService = userService;
    }

    async execute(dto) {
        const { userId } = dto;
        try {
            const user = await this.userService.getUserById(userId);
            if (!user) {
                throw new Error("User not found.");
            }
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = GetUserById;
