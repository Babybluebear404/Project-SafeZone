const Getquestion = require('../../application/useCases/question/getquestion');
const Savequestion = require('../../application/useCases/question/savequestion');

class QuestionController{
    constructor(questionService){
        this.questionService = questionService;
        this.savequestionuseCaes = new Savequestion(questionService);
        this.getquestionuseCaes = new Getquestion(questionService);
    }

    async savequestion(req, res){
        try{
            const dto = {
                ...req.body,
                UserID: req.user.id
            };
            await this.savequestionuseCaes.execute(dto);
            res.status(201).json({
                success: true,
                message: 'savequestion successfully'
            });
        }catch(error){
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    async getquestion(req, res){
        try{
            const dto = {
                    UserID: req.user.id
            };
            const qusetion = await this.getquestionuseCaes.execute(dto);
            res.status(201).json({
                success: true,
                data: qusetion
            });
        }catch(error){
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
}

module.exports = QuestionController