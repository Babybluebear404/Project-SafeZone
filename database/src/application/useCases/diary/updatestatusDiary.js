class UpdateStatusDiary{
    constructor(diaryService){
        this.diaryService = diaryService;
    }

    async execute(dto){
        const {UserID, diaryid, status} = dto;
        try{
            if(!['0', '1'].includes(String(status))){
                throw new Error("Invalid status");
            }
            const result = await this.diaryService.updateStatusDiary(UserID, diaryid, status);
            if (result.affectedRows > 0) {
                return { success: true, message: "Update successful" };
            } else {
                return { success: false, message: "No rows updated" };
            }
        }catch(error){
            throw error;
        }
    }
}

module.exports = UpdateStatusDiary;