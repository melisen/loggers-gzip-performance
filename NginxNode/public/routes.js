const logger = require("./winston-logger");


function getRoot(req, res) {
    res.render("index", {});
    logger.log("info", "/ - GET")
}
  



  function getSignup(req, res) {
    logger.log("info", "/signup - GET")
    if (req.isAuthenticated()) {
      const { username, password } = req.user;
      const user = { username, password };
      res.render("profileUser", { user });
    } else {
      res.render("signup");
    }
  }

  function postSignup(req, res) {
    logger.log("info", "/signup - POST")
    const { username, password } = req.user;
    const user = { username, password };
    res.render("profileUser", { user });
  }

  function getFailsignup(req, res) {
    logger.log("info", "/failsignup - GET")
    res.render("signup-error");
  }


  
  function getLogin(req, res) {
    logger.log("info", "/login - GET")
    if (req.isAuthenticated()) {
        const { username, password } = req.user;
        const user = { username, password };
        res.render("profileUser", { user });
      } else {
        res.render("login");
      }
  }

function postLogin(req, res){
  logger.log("info", "/login - POST")
    const { username, password } = req.user;
  const user = { username, password };
  res.render("profileUser", { user });
}

function getFaillogin(req, res) {
  logger.log("info", "/faillogin - GET")
  res.render("faillogin")
}



function getLogout(req, res){
  logger.log("info", "/logout - GET")
  const { username, password } = req.user;
  const user = { username, password };
    req.session.destroy((err) => {
      if (err) {        
        console.log(err)
            res.send("no se pudo deslogear");
      } else {
        
            res.render("logout", {user} );
            
            setTimeout(
              function(){res.redirect("/login")}, 
              2000) 
        }
    });
}

function failRoute(req, res) {
  logger.log("warn", "petición a ruta inexistente")
  res.status(404).render("routing-error", {});
  }

module.exports = {
    getRoot,
    getLogin,
    getSignup,
    postLogin,
    postSignup,
    getFaillogin,
    getFailsignup,
    getLogout,
    failRoute,
  };