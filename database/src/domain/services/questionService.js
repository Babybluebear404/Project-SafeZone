const Questionnaire = require('../../domain/entities/questionnaire');
const getuuid = require('../../utils/uuid/getuuid');

class QuestionService{
    constructor(questionService) {
        this.questionService = questionService;
    }

    async savequestion(userid, q2, q9, q8){
        const questionid = getuuid();
        const questionnaire = new Questionnaire(questionid, userid, q2, q9, q8);
        await this.questionService.save(questionnaire);
    }
}

module.exports = QuestionService;