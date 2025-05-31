class GetAllUsers {
    constructor(userService) {
        this.userService = userService;
    }

    async execute(currentUserId) {
        return await this.userService.getAllUsers(currentUserId);
    }
}

module.exports = GetAllUsers; 