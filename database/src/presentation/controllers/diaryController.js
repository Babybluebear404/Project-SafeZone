const AddDiary = require('../../application/useCases/diary/addDiary');
const CalculateAverageAIFeeling = require('../../application/useCases/diary/calculateAverageAIFeeling');
const CalculateAverageFeeling = require('../../application/useCases/diary/calculateAverageFeeling');
const DeleteDiary = require('../../application/useCases/diary/deleteDiary');
const GetDiary = require('../../application/useCases/diary/getDiary');
const GetShareDiary = require('../../application/useCases/diary/getsharediary');
const GetFeelings = require('../../application/useCases/diary/getFeeling');
const GetAIFeelings = require('../../application/useCases/diary/getAIFeeling');
const UpdateStatusDiary = require('../../application/useCases/diary/updatestatusDiary');
class DiaryController{
    constructor(diaryService){
        this.diaryService = diaryService;
        this.adddiaryuseCase = new AddDiary(diaryService);
        this.getdiaryuseCase = new GetDiary(diaryService);
        this.getsharediaryuseCase = new GetShareDiary(diaryService);
        this.deletediaryuseCase = new DeleteDiary(diaryService);
        this.calculateAverageAIFeelinguseCase = new CalculateAverageAIFeeling(diaryService);
        this.calculateAverageFeelinguseCase = new CalculateAverageFeeling(diaryService);
        this.getFeelinguseCase = new GetFeelings(diaryService);
        this.getAIFeelinguseCase = new GetAIFeelings(diaryService);
        this.updatestatusdiaryuseCase = new UpdateStatusDiary(diaryService);
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

    async updatestatusdiary(req, res){
        try{
            const dto = {
                ...req.body,
                UserID: req.user.id
            }
            const success = await this.updatestatusdiaryuseCase.execute(dto);
            res.status(201).json(success);
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async getdiary(req, res){
        try{
            const day = req.query.day;
            const dto = {
                ...req.body,
                UserID: req.user.id,
            }
            const diary = await this.getdiaryuseCase.execute(dto);
            const diaries =  diary.map(diary => ({
                    id: diary.ID,
                    userid: diary.UserID,
                    date_and_time: diary.Date_and_Time,
                    story: diary.Story,
                    feeling: diary.Feeling,
                    aifeeling: diary.AIFeeling,
                    sharestatus: diary.ShareStatus
                }))
            res.status(201).json(diaries); 
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
            const diaries = diary.map(diary => ({
                    id: diary.ID,
                    userid: diary.UserID,
                    date_and_time: diary.Date_and_Time,
                    story: diary.Story,
                    feeling: diary.Feeling,
                    aifeeling: diary.AIFeeling,
                    sharestatus: diary.ShareStatus
                }))
            res.status(201).json(diaries); 
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }

    async deletediary(req, res){
        try{
            const dto = {
                ...req.body,
                UserID: req.user.id
            };
            await this.deletediaryuseCase.execute(dto);
            res.status(200).json({ message: "delete successfully" }); 
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }
    

    async getAverageFeeling(req, res){
        try {
            const dto = {
                    UserID: req.user.id,
                    day: parseInt(req.body.day, 10)
            }
            const result = await this.calculateAverageFeelinguseCase.execute(dto);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAverageAIFeeling(req, res){
        try {
            const dto = {
                    UserID: req.user.id,
                    day: parseInt(req.body.day, 10)
            }
            const result = await this.calculateAverageAIFeelinguseCase.execute(dto);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getFeeling(req, res){
        try {
            const dto = {
                    UserID: req.user.id,
                    day: parseInt(req.body.day, 10)
            }
            const result = await this.getFeelinguseCase.execute(dto);
            const formattedData = result.map(entry => ({
                feeling: entry.feeling,
                date_and_time: entry.date_and_time.toISOString().split("T")[0] // แยกเฉพาะวันที่
            }));
            res.status(201).json(formattedData);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAIFeeling(req, res){
        try {
            const dto = {
                    UserID: req.user.id,
                    day: parseInt(req.body.day, 10)
            }
            const result = await this.getAIFeelinguseCase.execute(dto);
            const formattedData = result.map(entry => ({
                aifeeling: entry.aifeeling,
                date_and_time: entry.date_and_time.toISOString().split("T")[0] // แยกเฉพาะวันที่
            }));
            res.status(201).json(formattedData);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = DiaryController;