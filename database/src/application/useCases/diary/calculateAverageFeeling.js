class CalculateAverageFeeling {
    constructor(diaryService) {
        this.diaryService = diaryService;
    }

    async execute(dto) {
        const {UserID, day} = dto;
        try {
            if (!UserID || !day) {
                throw new Error("Missing required parameters.");
            }
            return await this.diaryService.calculateAverageFeeling(UserID, day);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = CalculateAverageFeeling;