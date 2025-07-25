const generateUUID = require("../../utils/uuid/getuuid");
const Diary = require("../entities/diary");
const { analyzeEmotion } = require("../../infrastructure/api/aifeeling");

class DiaryService{
    constructor(diaryRepository){
        this.diaryRepository = diaryRepository;
    }

    async addDiary(userid, story, feeling, status){
        const diaryid = generateUUID();
        const aifeeling = await analyzeEmotion(story);
        console.log(aifeeling);
        const diary = new Diary(diaryid, userid, story, feeling, aifeeling, status);
        await this.diaryRepository.save(diary);
    }

    async updateStatusDiary(userid, diaryid, status){
        return await this.diaryRepository.updateStatus(userid, diaryid, status);
    }

    async getdiary(userid, day){
        return await this.diaryRepository.getDiary(userid, day);
    }

    async getsharediary(userid){
        return await this.diaryRepository.shareDiary(userid);
    }

    async deletediary(userid, diaryid){
        await this.diaryRepository.delete(userid, diaryid);
    }

    async check(userid, diaryid){
        return await this.diaryRepository.chackdiaryid(userid, diaryid);
    }

    async calculateAverageFeeling(userId, days) {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days); // หาค่าวันเริ่มต้น

        const feelings = await this.diaryRepository.getFeelingsInDateRange(userId, startDate, endDate);

        if (feelings.length === 0) {
            return { averageFeeling: 0 };
        }

        // คำนวณค่าเฉลี่ย
        const totalFeeling = feelings.reduce((sum, entry) => sum + entry.feeling, 0);
        const averageFeeling = totalFeeling / feelings.length;

        return { averageFeeling };
    }

    async calculateAverageAIFeeling(userId, days) {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days); // หาค่าวันเริ่มต้น

        const aifeelings = await this.diaryRepository.getAIFeelingsInDateRange(userId, startDate, endDate);

        if (aifeelings.length === 0) {
            return { averageFeeling: 0 };
        }

        // คำนวณค่าเฉลี่ย
        const totalAIFeeling = aifeelings.reduce((sum, entry) => sum + entry.aifeeling, 0);
        const averageAIFeeling = totalAIFeeling / aifeelings.length;

        return { averageAIFeeling } ;
    }

    async getFeeling(userid, days){
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days);
    
        return await this.diaryRepository.getFeelingsInDateRange(userid, startDate, endDate);
    }

    async getAIFeeling(userid, days){
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days);
    
        return await this.diaryRepository.getAIFeelingsInDateRange(userid, startDate, endDate);
    }

    async getDiaryTimeFeelinguse(userid) {
        if (!userid) {
            throw new Error("Missing required parameters");
        }
        return await this.diaryRepository.getDiaryTimeFeelingByID(userid);
    }
}

module.exports = DiaryService;