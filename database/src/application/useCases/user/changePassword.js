class Change {
    constructor(userService) {
        this.userService = userService;
    }

    async execute(dto) {
        const { UserID, newPassword } = dto;

        try {
            const existingUser = await this.userService.findUserById(UserID);
            if (!existingUser) {
                throw new Error("User not found");
            }
            await this.userService.change(UserID, newPassword);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Change;