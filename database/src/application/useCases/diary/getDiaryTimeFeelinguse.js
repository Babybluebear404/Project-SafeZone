class getDiaryTimeFeelinguse {
    constructor(diaryService) {
        this.diaryService = diaryService;
    }

    async execute(dto) {
        const { UserID } = dto;
        try {
            if (!UserID) {
                throw new Error("Missing required parameters");
            }
            return await this.diaryService.getDiaryTimeFeelinguse(UserID);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = getDiaryTimeFeelinguse; 