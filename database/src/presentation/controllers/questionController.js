const Savequestion = require('../../application/useCases/question/savequestion');

class QuestionController{
    constructor(questionService){
        this.questionService = questionService;
        this.savequestionuseCaes = new Savequestion(questionService);
    }

    async savequestion(req, res){
        try{
            const dto = {
                ...req.body,
                UserID: req.user.id
            };
            await this.savequestionuseCaes.execute(dto);
            res.status(201).json({ massage: 'savequestion successfully' });
        }catch(error){
            res.status(500).json({error: error.message});
        }
    }


}

module.exports = QuestionController