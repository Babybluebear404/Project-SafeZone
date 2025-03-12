class DeleteDiary{
    constructor(diaryService){
        this.diaryService = diaryService
    }

    async execute(dto){
        const { UserID, diaryid } = dto;
        try{
            const existingRequest = await this.diaryService.chack(UserID, diaryid);
            if (!existingRequest){
                throw new Error("There is no diary.");
            }
            await this.diaryService.deletediary(UserID, diaryid);
        }catch(error){
            throw error;
        }
    }
}

module.exports = DeleteDiary;