import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import User from '../models/user'
import multer from 'multer'
import bcrypt from 'bcrypt'
import firma from '../models/firma'
import Zakazivanje from '../models/zakazivanje'



const app = express();
const upload = multer({ storage: multer.memoryStorage() }); // Ensure to use memoryStorage for buffer access

// Define the middleware for file upload
const uploadMiddleware = upload.single('picture');

export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let usernameP = req.body.username;
        let passwordP = req.body.password;
        //let typeP = req.body.type;
        console.log(usernameP)
        console.log(passwordP)
        //console.log(typeP)
        User.findOne({username: usernameP}).then((userd)=>{
            if(!userd){
                res.json(null)
                return
            }
            bcrypt.compare(passwordP,String(userd.password),(err,isMatch) =>{
                if(isMatch){
                    if(userd.blokiran == 1){
                        res.json(null)
                        return
                    }
                    res.json(userd)
                }
                else {
                    res.json(null)
                }
            })
        })
        
        
    }

    register = (req: express.Request, res: express.Response)=>{
        let usernameP = req.body.username;
        let passwordP = req.body.password;
        let nameP = req.body.name;
        let lastnameP = req.body.lastname;
        let mailP = req.body.mail;
        let phone_numberP = req.body.phone_number;
        let typeP = req.body.type
        let addressP = req.body.address
        let genderP = req.body.gender
        let credit_card_numberP = req.body.credit_card_number
        let pictureP = req.body.picture //? req.body.picture.path : null;

        //const storage = multer.diskStorage

        const user = new User({
            username: usernameP,
            password: passwordP,
            name: nameP,
            lastname: lastnameP,
            mail: mailP,
            phone_number: phone_numberP,
            type: typeP,
            address: addressP,
            gender: genderP,
            credit_card_number: credit_card_numberP,
            picture: pictureP,
            blokiran: 1
        })
        user.save().then(()=>{
            res.json(0)
        }).catch((err)=>{
            console.log(err)
            res.json(-1)
        })
    }

    getUser = (req: express.Request, res: express.Response)=>{

        let usernameP = req.body.username
        //console.log(usernameP)
        User.findOne({username: usernameP}).then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err)
        })
    }

    updatePassword = (req: express.Request, res: express.Response)=>{
        let userP = req.body.user
        let newPassword = req.body.n
        console.log('djerdap')
        User.findOne({username: userP.username}).then((djerdap)=>{
            if(djerdap){
                if(userP.password == djerdap.password){
                    //res.json(0)
                    //userP.password = newPassword
                    djerdap.password = newPassword;
                    djerdap.save().then(()=>{
                        res.json(0)
                    }).catch((err: any) =>{
                        console.log(err)
                        res.json(-1)
                    })
                }
                else{
                    res.json(-1)
                }
            }
            
        })
    }

    updateUser = (req: express.Request, res: express.Response)=>{
        let userP = req.body.user
        //console.log(userP)
        User.findOne({username: userP.username}).then((djerdap)=>{
            if(djerdap){
                djerdap.password = userP.password
                djerdap.name = userP.name
                djerdap.lastname = userP.lastname
                djerdap.mail = userP.mail
                djerdap.phone_number = userP.phone_number
                djerdap.type = userP.type
                djerdap.address = userP.address
                djerdap.gender = userP.gender
                djerdap.credit_card_number = userP.credit_card_number
                djerdap.picture = userP.picture
                djerdap.save().then(()=>{
                res.json(0) 
                }).catch(err=>{
                    console.log(err)
                    res.json(-1)
                })
            }
        })
    }

    getUsers = (req: express.Request, res: express.Response)=>{
        let nP = req.body.n
        //console.log(nP)
        User.find({blokiran: Number(nP),type: "vlasnik" }).then((users)=>{
           // console.log(users)
            res.json(users)
        }).catch(err =>{
            console.log(err)
            res.json(null)
        })
    }

    prihvati = (req: express.Request, res: express.Response)=>{
        let usernameP = req.body.username
        User.findOne({username: usernameP}).then((djerdap)=>{
            if(djerdap){
                djerdap.blokiran = 0
                djerdap.save().then(()=>{
                    res.json(0)
                }).catch(err =>{
                    console.log(err)
                    res.json(-1)
                })
            }
        })
    
    }

    odbij = (req: express.Request, res: express.Response)=>{
        let usernameP = req.body.username
        
        User.findOne({username: usernameP}).then((djerdap)=>{
            if(djerdap){
                djerdap.blokiran = 2
                djerdap.save().then(()=>{
                    res.json(0)
                }).catch(err =>{
                    console.log(err)
                    res.json(-1)
                })
            }
        }).catch(err =>{
            console.log(err)
            res.json(-1)
        })
    }

    getRadniks = (req: express.Request, res: express.Response)=>{

        User.find({type:"dekorater"}).then((users)=>{
            //console.log(users)
            res.json(users)
        }).catch(err =>{
            console.log(err)
            res.json(-1)
        })

    }

    dodajFirmu = (req: express.Request, res: express.Response)=>{//PROVERA ZA KONTAKT DA JE DOBAR USERNAME!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        let firmaP = req.body.firma
        let newFirma = new firma(firmaP)
        newFirma.save().then(()=>{
            res.json(0)
        }).catch((err: any)=>{
            console.log(err)
            res.json(-1)
        })
    }

    zaposli = (req: express.Request, res: express.Response)=>{
        let wP = req.body.w
        User.updateOne({username: wP},{blokiran: 4}).then(()=>{ 
            res.json(0)
            }).catch(err =>{
                console.log(err)
                res.json(-1)
            })
    }

    getFirme = (req: express.Request, res: express.Response)=>{
        firma.find().then((firme)=>{
            res.json(firme)
        }).catch(err =>{
            console.log(err)
            res.json(null)
        })
    }

    zakazivanje = (req: express.Request, res: express.Response)=>{
        let zakazivanjeP = req.body.zakazivanje
        let zak = new Zakazivanje(zakazivanjeP)
        zak.save().then(()=>{
            res.json(0)
        }).catch(err =>{
            console.log(err)
            res.json(-1)
        })
    }

    getZakazivanja = (req: express.Request, res: express.Response)=>{
        let usernameP = req.body.username
        Zakazivanje.find({vlasnik: usernameP}).sort({date: -1}).then((zakazivanja)=>{
            res.json(zakazivanja)
        }).catch(err =>{
            console.log(err)
            res.json(null)
        })
    }

    otkaziPosao = (req: express.Request, res: express.Response)=>{
        let dateP = req.body.date
        Zakazivanje.deleteOne({date: dateP}).then(()=>{
            res.json(0)
        }).catch(err =>{
            console.log(err)
            res.json(-1)
        })
    }

    zakazivanjaFirme = (req: express.Request, res: express.Response)=>{
        let nameP = req.body.name
        Zakazivanje.find({firmaName: nameP, status: 0}).sort({date: 1}).then((z) =>{
            res.json(z)
        })
    }

    prihvatiZakazivanje = (req: express.Request, res: express.Response)=>{
        let zP = req.body.z
        let usernameP = req.body.username
        Zakazivanje.updateOne({date: zP.date},{status: 2,dekorater: usernameP}).then(()=>{
            res.json(0)
        }).catch(err =>{
            console.log(err)
            res.json(-1)
        })
    }

    odbijZakazivanje = (req: express.Request, res: express.Response)=>{
        let zP = req.body.z
        Zakazivanje.updateOne({date: zP.date},{status: 3,komentar: zP.komentar}).then(()=>{
            res.json(0)
        }).catch(err =>{
            console.log(err)
            res.json(-1)
        })
    }

    getMojaZakazivanja = (req: express.Request, res: express.Response)=>{
        let fName = req.body.firma
        let uName = req.body.user
        console.log(fName)
        console.log(uName)
        Zakazivanje.find({firmaName: fName,dekorater: uName, status: 2}).then((z)=>{
            res.json(z)
        }).catch(err =>{
            console.log(err)
            res.json(null)
        })
    }

    zavrsiZakazivanje = (req: express.Request, res: express.Response)=>{
        let zP = req.body.z
        let djerdap = new Date()
        Zakazivanje.updateOne({date: zP.date},{status: 1, endDate: djerdap}).then(()=>{
            res.json(0)
        }).catch(err =>{
            console.log(err)
            res.json(-1)
        })
    }

    zakaziServis = (req: express.Request, res: express.Response)=>{
        let zP = req.body.z
        Zakazivanje.updateOne({date: zP.date},{odrzavanje: 1}).then(()=>{
            res.json(0)
        }).catch(err =>{
            console.log(err)
            res.json(-1)
        })
    }

    getZakazivanjaServis = (req: express.Request, res: express.Response)=>{
        let fName = req.body.firma
        let uName = req.body.username
        Zakazivanje.find({firmaName: fName,dekorater: uName, odrzavanje: 1}).then(z =>{
            res.json(z)
        }).catch(err =>{
            console.log(err)
            res.json(null)
        })
    }

    prihvatiServis = (req: express.Request, res: express.Response)=>{
        let zP = req.body.z
        let dateP = req.body.date
        
        Zakazivanje.updateOne({date: zP.date},{odrzavanje: 0,poslednjeOdrzavanje: dateP}).then(()=>{
            res.json(0)
        }).catch(err =>{
            console.log(err)
            res.json(-1)
        })
    }

    odbijServis = (req: express.Request, res: express.Response)=>{
        let zP = req.body.z
        Zakazivanje.updateOne({date: zP.date},{odrzavanje: 0}).then(()=>{
            res.json(0)
        }).catch(err =>{
            console.log(err)
            res.json(-1)
        })
    }

    getAllZakazivanjaFirme = (req: express.Request, res: express.Response)=>{
        let fName = req.body.firma
        //console.log(fName)
        Zakazivanje.find({firmaName: fName}).then(z =>{
            res.json(z)
        }).catch(err =>{
            console.log(err)
            res.json(null)
        })
    }

    getUsersByType = (req: express.Request, res: express.Response)=>{
        let typeP = req.body.type
        User.find({type: typeP}).then(users =>{
            res.json(users)
        }).catch(err =>{
            console.log(err)
            res.json(null)
        })
    }

    getAllGotovaZakazivanja = (req: express.Request, res: express.Response)=>{
        Zakazivanje.find({status: 1}).then(z =>{
            res.json(z)
            //console.log(z)
        }).catch(err =>{
            console.log(err)
            res.json(null)
        })
    }
} 
