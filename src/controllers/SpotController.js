const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    async index(req, res){
        const { tech } = req.query;

        const spot = await Spot.find({techs: tech});

        return res.json(spot);
    },

    async store(req, res){
        console.log(req.body);
        console.log(req.file);

        const {filename} = req.file;
        const {company, price, techs} = req.body;
        const {user_id} = req.headers;

        const user = await User.findById(user_id);

        if(!user)
            return res.status(400).json({error: 'Usuário não existe'});

        if(!filename || !company || !price || !techs || !user_id)
            return res.status(400).json({error: 'Nada pode estar vazio'});

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech=> tech),
            price
        })

        
        return res.json(spot)
    }
}