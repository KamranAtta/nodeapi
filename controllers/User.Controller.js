var mongoose = require('mongoose');
const User = mongoose.model('User');
passport = require('passport');
var randtoken = require('rand-token')
const refreshTokens = {};

exports.signup = async (req, res) => {
    try {
        if (!req.body.emailAddress) {
            res.status(400).json({ message: "All fields required" });
        }
        const userExists = await User.findOne({ emailAddress: req.body.emailAddress });
        if (userExists) {
            res.status(500).json('User Already  Exists');
        } else {
            const user = new User(req.body);
            user.accessToken = 'access-token-' + Math.random();
            user.refreshToken = 'access-token-' + Math.random();
            tempPass = user.hash;
    
            if(req.body.password && req.body.password != ''){
                user.setPassword(req.body.password);
            }
            else if (req.body.hash && req.body.hash != ''){
                user.setPassword(req.body.hash);
            }
            else {
                user.hash = tempPass;
            }
            await user.save();
            res.status(201).json(user);
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
    
}

exports.login = (req, res) => {
    try {
        if (!req.body.emailAddress || !req.body.hash) {
            res.status(400).json('error logging in!');
        }
        passport.authenticate("user", (err, client, info) => {
        let token;
        if (err) {
            console.log('ERROR HEREEEE');
            res.status(200).json(false);
        }
        if (client) {
            var user = {
            email: client.emailAddress,
            }
            token = jwt.sign(user, 'secret',
            {expiresIn: '4h'});
            const refreshToken = randtoken.uid(256);
            refreshTokens[refreshToken] = client.emailAddress;
            client.accessToken = token;
            client.refreshToken = refreshToken;
            res.status(200).json({'accessToken':client.accessToken,'refreshToken':client.refreshToken});
        } else {
            res.status(200).json(false);
        }
        })(req, res);
    } catch (error) {
        res.status(401).json(error);
    }
};

exports.getAllUsers = async (req, res) => {
    // Get all users
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).send();
        }
        res.send(user);
      } catch (error) {
        res.status(500).send(error);
    }
}

exports.updateUserById = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['age', 'address', 'country'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
        return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
          return res.status(404).send();
        }
        res.send(user);
      } catch (error) {
        res.status(500).send(error);
    }
}