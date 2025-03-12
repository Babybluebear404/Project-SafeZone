const AddDiary = require('../../application/useCases/diary/addDiary');
const DeleteDiary = require('../../application/useCases/diary/deleteDiary');
const GetDiary = require('../../application/useCases/diary/getDiary');
const GetShareDiary = require('../../application/useCases/diary/getsharediary');
class DiaryController{
    constructor(diaryService){
        this.adddiaryuseCase = new AddDiary(diaryService);
        this.getdiaryuseCase = new GetDiary(diaryService);
        this.getsharediaryuseCase = new GetShareDiary(diaryService);
        this.deletediaryuseCase = new DeleteDiary(diaryService);
    }

    async adddiary(req, res){
        try{
            const dto = {
                ...req.body,
                UserID: req.user.id
            }
            await this.adddiaryuseCase.execute(dto);
            res.status(201).json({ message: "Record successfully" });
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async getdiary(req, res){
        try{
            const dto = {
                ...req.body,
                UserID: req.user.id
            }
            const diary = await this.getdiaryuseCase.execute(dto);
            res.status(201).json({
                diaries: diary.map(diary => ({
                    id: diary.ID,
                    userid: diary.UserID,
                    date_and_time: diary.Data_and_Time,
                    story: diary.Story,
                    feeling: diary.Feeling,
                    aifeeling: diary.AIFeeling,
                    sharestatus: diary.ShareStatus
                }))
            }); 
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async getsharediary(req, res){
        try{
            const dto = {
                UserID: req.user.id
            }
            const diary = await this.getsharediaryuseCase.execute(dto);
            res.status(201).json({
                diaries: diary.map(diary => ({
                    id: diary.ID,
                    userid: diary.UserID,
                    date_and_time: diary.Data_and_Time,
                    story: diary.Story,
                    feeling: diary.Feeling,
                    aifeeling: diary.AIFeeling,
                    sharestatus: diary.ShareStatus
                }))
            }); 
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async deletediary(req, res){
        try{
            const dto = {
                ...req.body,
                UserID: req.user.id
            }
            await this.deletediaryuseCase.execute(dto);
            res.status(201).json({ message: "delete successfully" });
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = DiaryController;