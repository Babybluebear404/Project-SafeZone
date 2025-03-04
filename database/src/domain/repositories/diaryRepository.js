class DiaryRepository{
    async save(diary){
        throw new Error("Method 'save' must be implemented.");
    }
    
    async delete(diaryid){
        throw new Error("Method 'delete' must be implemented.");
    }

    async getdiary(userid){
        throw new Error("Method 'getdiary' must be implemented.");
    }

    async updateStatus(diaryid){
        throw new Error("Method 'updateStatus' must be implemented.");
    }
}

module.exports = DiaryRepository;