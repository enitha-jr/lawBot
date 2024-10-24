class HelloController {
    sendHello = async (req, res) => {
        try {
            res.send('Hello')
        } catch {
            res.status(500).json({error: "Server Error", message: error.message})
        }
    }

    getUser = async (req, res) => {
        try{
            const username = req.user.username
            const role = req.user.role
            res.json({username: username, role: role})
        } catch (error) {
            res.status(500).json({error: "Server Error", message: error.message})
        }
    }
}

module.exports = HelloController;