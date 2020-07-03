const {google} = require('googleapis');
const mailComposer = require('nodemailer/lib/mail-composer');
	
class CreateMail{
    
    constructor(me, auth, to, sub, body, task){
        this.me = me
        this.task = task;
        this.auth = auth;
        this.to = to;
        this.sub = sub;
        this.body = body;
        this.gmail = google.gmail({version: 'v1', auth});
    }


    makeBody(res){
		var arr = [];
		
        let mail = new mailComposer({
            to: this.to,
            html: this.body,
            subject: this.sub,
            textEncoding: "base64"
        });
		
		//Compiles and encodes the mail.
		mail.compile().build((err, msg) => {
			if (err){
				return console.log('Error compiling email ' + error);
			} 
		
            const encodedMessage = Buffer.from(msg)
			  .toString('base64')
			  .replace(/\+/g, '-')
			  .replace(/\//g, '_')
			  .replace(/=+$/, '');
			
			if(this.task === 'mail'){
				this.sendMail(encodedMessage, res);
			}
			else{
				this.saveDraft(encodedMessage);
			}
		});
    }
    
    //Send the message to specified receiver.
    sendMail(encodedMessage, res){
        this.gmail.users.messages.send({
            userId: this.me,
            resource: {
                raw: encodedMessage,
            }
        }, (err, result) => {
            if(err){
                console.log('NODEMAILER - The API returned an error: ' + err);
                return res.send("Failed to send the email");
            }
                    
            console.log("NODEMAILER - Sending email reply from server:", result.data);
            res.send("Email sent successfully");
        });
    }

    //Saves the draft.
    saveDraft(encodedMessage){
        this.gmail.users.drafts.create({
            'userId': this.me,
            'resource': {
                'message': {
                    'raw': encodedMessage
                }
            }
        })
    }
}

module.exports = CreateMail;