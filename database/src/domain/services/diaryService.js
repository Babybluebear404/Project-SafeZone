const generateUUID = require("../../utils/uuid/getuuid");
const Diary = require("../entities/diary");

class DiaryService{
    constructor(diaryRepository){
        this.diaryRepository = diaryRepository;
    }

    async addDiary(userid, story, feeling, status){
        const diaryid = generateUUID();
        const aifeeling = 0; // รอ API
        const diary = new Diary(diaryid, userid, story, feeling, aifeeling, status);
        await this.diaryRepository.save(diary);
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

    async chack(userid, diaryid){
        return await this.diaryRepository.chackdiaryid(userid, diaryid);
    }
}

module.exports = DiaryService;