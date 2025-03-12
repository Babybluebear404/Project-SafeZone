class GetShareDiary{
    constructor(diaryService){
        this.diaryService = diaryService;
    }
    async execute(dto){
        const { UserID } = dto;
        try{
            return await this.diaryService.getsharediary(UserID);
        }catch(error){
            throw error
        }
    }
}

module.exports = GetShareDiary;