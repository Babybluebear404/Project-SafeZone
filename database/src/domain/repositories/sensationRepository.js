class SensationRepository{
    async save(Overalldailysensation){
        throw new Error("Method 'save' must be implemented.");
    }

    async getOverall(userid){
        throw new Error("Method 'getOverall' must be implemented.");
    }
}

module.exports = SensationRepository;