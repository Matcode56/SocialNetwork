//Configuration de multer pour importer des images

const multer= require('multer');


    const storage= multer.diskStorage({
        destination: (req, file, cb)=>{
          
            if(file.fieldname=== 'profilPhoto') {
                cb(null,`${__dirname}/../../frontend/sn/public/upload/PhotoProfil`)
            }
            if(file.fieldname === 'postImage'){
                cb(null,`${__dirname}/../../frontend/sn/public/upload/PhotoPost`)
            }
        }, 
        filename: (req, file, cb)=>{
            
            let mimetype= file.mimetype;
            
            let suffix= mimetype.replace('image/', '')
            
            if(file.fieldname === 'profilPhoto'){
                cb(null, Date.now()+'-User-'+ req.params.id+ '.'+ suffix.replace('img/', ''))
            }
            
            if(file.fieldname === 'postImage'){
                cb(null, Date.now()+'-PosterId-'+ req.body.posterId+ '.'+ suffix.replace('img/', ''))
            }
        }   
    }) 
    
    const upload = multer({storage: storage, fileFilter: (req, file, cb)=> {
        
         if(
             file.mimetype !== "image/jpg" 
         &&  file.mimetype !== "image/png" 
         &&  file.mimetype !== "image/jpeg" 
         ){
             throw Error ('invalid file')
         } 
         else {
           cb(null, true);   
         }},
         limits:{fileSize:2000000},
       });

    module.exports= upload
   
