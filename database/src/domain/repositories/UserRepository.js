class UserRepository {
    async save(user) {
        throw new Error("Method 'save' must be implemented.");
    }

    async findByEmail(email) {
        throw new Error("Method 'findByEmail' must be implemented.");
    }

    async findUserById(UserID){
        throw new Error("Method 'findUserById' must be implemented.");
    }
}

module.exports = UserRepository;
