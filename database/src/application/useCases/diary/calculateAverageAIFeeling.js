class CalculateAverageAIFeeling {
    constructor(diaryService) {
        this.diaryService = diaryService;
    }

    async execute(dto) {
        const {UserID, day} = dto;
        if (!UserID || !day) {
            throw new Error("Missing required parameters.");
        }

        try {
            return await this.diaryService.calculateAverageAIFeeling(UserID, day);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = CalculateAverageAIFeeling;
