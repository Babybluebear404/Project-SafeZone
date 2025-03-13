class GetAIFeelings {
    constructor(diaryService) {
        this.diaryService = diaryService;
    }

    async execute(dto) {
        const { UserID, day } = dto
        try{
            if (!UserID || !day) {
                throw new Error("Missing required parameters.");
            }
            return this.diaryService.getAIFeeling(UserID, day);
        }catch(error){
            throw error;
        }
    }
}

module.exports = GetAIFeelings;