class UserRepository {
    async save(user) {
        throw new Error("Method 'save' must be implemented.");
    }

    async findByEmail(email) {
        throw new Error("Method 'findByEmail' must be implemented.");
    }

    async findById(UserID){
        throw new Error("Method 'findById' must be implemented.");
    }

    async getById(UserID){
        throw new Error("Method 'getById' must be implemented.");
    }

    async upDatePassword(id, password) {
        throw new Error("Method 'upDatePassword' must be implemented.");
    }
}

module.exports = UserRepository;
