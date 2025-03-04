class ShareRepository{
    async share(userid){
        throw new Error("Method 'shares' must be implemented.");
    }

    async stopshare(diaryid){
        throw new Error("Method 'stopshares' must be implemented.");
    }
}

module.exports = ShareRepository;