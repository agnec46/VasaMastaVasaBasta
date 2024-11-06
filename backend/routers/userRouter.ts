import express from 'express'
import { UserController } from '../controllers/userController'

const userRouter = express.Router()

userRouter.route("/login").post(
    (req,res)=>new UserController().login(req,res)
)

userRouter.route("/register").post(
    (req,res)=>new UserController().register(req,res)
)

userRouter.route("/getUser").post(
    (req,res)=>new UserController().getUser(req,res)
)

userRouter.route("/updatePassword").post(
    (req,res)=>new UserController().updatePassword(req,res)
)

userRouter.route("/updateUser").post(
    (req,res)=>new UserController().updateUser(req,res)
)

userRouter.route("/getUsers").post(
    (req,res)=>new UserController().getUsers(req,res)
)

userRouter.route("/prihvati").post(
    (req,res)=>new UserController().prihvati(req,res)
)

userRouter.route("/odbij").post(
    (req,res)=>new UserController().odbij(req,res)
)

userRouter.route("/getRadniks").get(
    (req,res)=>new UserController().getRadniks(req,res)
)

userRouter.route("/dodajFirmu").post(
    (req,res)=>new UserController().dodajFirmu(req,res)
)

userRouter.route("/zaposli").post(
    (req,res)=>new UserController().zaposli(req,res)
)

userRouter.route("/getFirme").get(
    (req,res)=>new UserController().getFirme(req,res)
)

userRouter.route("/zakazivanje").post(
    (req,res)=>new UserController().zakazivanje(req,res)
)

userRouter.route("/getZakazivanja").post(
    (req,res)=>new UserController().getZakazivanja(req,res)
)

userRouter.route("/otkaziPosao").post(
    (req,res)=>new UserController().otkaziPosao(req,res)
)

userRouter.route("/zakazivanjaFirme").post(
    (req,res)=>new UserController().zakazivanjaFirme(req,res)
)

userRouter.route("/prihvatiZakazivanje").post(
    (req,res)=>new UserController().prihvatiZakazivanje(req,res)
)

userRouter.route("/odbijZakazivanje").post(
    (req,res)=>new UserController().odbijZakazivanje(req,res)
)

userRouter.route("/getMojaZakazivanja").post(
    (req,res)=>new UserController().getMojaZakazivanja(req,res)
)

userRouter.route("/zavrsiZakazivanje").post(
    (req,res)=>new UserController().zavrsiZakazivanje(req,res)
)

userRouter.route("/zakaziServis").post(
    (req,res)=>new UserController().zakaziServis(req,res)
)

userRouter.route("/getZakazivanjaServis").post(
    (req,res)=>new UserController().getZakazivanjaServis(req,res)
)

userRouter.route("/prihvatiServis").post(
    (req,res)=>new UserController().prihvatiServis(req,res)
)

userRouter.route("/odbijServis").post(
    (req,res)=>new UserController().odbijServis(req,res)
)

userRouter.route("/getAllZakazivanjaFirme").post(
    (req,res)=>new UserController().getAllZakazivanjaFirme(req,res)
)

userRouter.route("/getUsersByType").post(
    (req,res)=>new UserController().getUsersByType(req,res)
)

userRouter.route("/getAllGotovaZakazivanja").get(
    (req,res)=>new UserController().getAllGotovaZakazivanja(req,res)
)

export default userRouter;