class User {
    constructor(id, username, email, password = null, profile = 0) {
        this.id = id; 
        this.username = username;
        this.email = email
        this.password = password;
        this.profile = profile;
    }
}

module.exports = User;
