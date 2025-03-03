class Diary {
    constructor(id = null, userid, story, feeling, aifeeling, sharestatus){
        this.id = id;
        this.userid = userid;
        this.story = story;
        this.feeling = feeling;
        this.aifeeling = aifeeling;
        this.sharestatus = sharestatus;
    }
}

module.exports = Diary;