const passwordValidator= require('password-validator')
const emailValidator= require('email-validator');
const passwordSchema= new passwordValidator();

passwordSchema
.is().min(6)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase(1)                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values



module.exports=(req,res, next)=>{

    
    if(emailValidator.validate(req.body.email)){
        if(passwordSchema.validate(req.body.password)){
            next()
        }
        else{
            return res.status(400).json({error: `Le mot de passe n'est pas assez fort ${passwordSchema.validate('req.body.password', { list: true })}`})
        }
    }
    else{
        return res.status(400).json({error: "email invalide"})
    }
    
}