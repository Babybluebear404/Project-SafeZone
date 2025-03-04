class User {
    constructor(id, username, email, password = null) {
        this.id = id; 
        this.username = username;
        this.email = email
        this.password = password;
    }
}

module.exports = User;
