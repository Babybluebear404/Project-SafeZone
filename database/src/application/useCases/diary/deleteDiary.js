class DeleteDiary{
    constructor(diaryService){
        this.diaryService = diaryService
    }

    async execute(dto){
        const { UserID, diaryId } = dto;
        try{
            const existingRequest = await this.diaryService.check(UserID, diaryId);
            if (!existingRequest){
                throw new Error("There is no diary.");
            }
            await this.diaryService.deletediary(UserID, diaryId);
        }catch(error){
            throw error;
        }
    }
}

module.exports = DeleteDiary;