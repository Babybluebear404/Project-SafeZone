class GetFeelings {
    constructor(diaryService) {
        this.diaryService = diaryService;
    }

    async execute(dto) {
        const { UserID, day } = dto
        try{
            if (!UserID || !day) {
                throw new Error("Missing required parameters.");
            }
            return this.diaryService.getFeeling(UserID, day);
        }catch(error){
            throw error;
        }
    }
}

module.exports = GetFeelings;