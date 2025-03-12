class AddDiary{
    constructor(diaryService){
        this.diaryService = diaryService;
    }

    async execute(dto){
        const {UserID, story, feeling, status} = dto;
        try{
            await this.diaryService.addDiary(UserID, story, feeling, status);
        }catch(error){
            throw error;
        }
    }
}

module.exports = AddDiary;