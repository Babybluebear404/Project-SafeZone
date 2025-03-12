class Diary {
    constructor(id = null, userid, story, feeling, aifeeling = 0, sharestatus = 0){
        this.id = id;
        this.userid = userid;
        this.story = story;
        this.feeling = feeling;
        this.aifeeling = aifeeling;
        this.sharestatus = sharestatus;
    }
}

module.exports = Diary;