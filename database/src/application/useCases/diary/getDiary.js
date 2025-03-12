class GetDiary{
    constructor(diaryService){
        this.diaryService = diaryService;
    }

    async execute(userid){
        const { UserID, day }  = userid
        try{
            return await this.diaryService.getdiary(UserID, day);
        }catch(error){
            throw error;
        }
    }
}

module.exports = GetDiary;