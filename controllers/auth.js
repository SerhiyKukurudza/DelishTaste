const { colors, isValidName, isValidEmail } = require('./miscellaneous');
const connectionDataBase = require("./mysql");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { promisify } = require("util");

colors.enable();

let userBundle;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).render("login", {
        message: "Please provide an email and password",
      });
    }

    connectionDataBase.query(
      "SELECT * FROM user WHERE email = ?",
      [email],
      async (error, results) => {
        console.log(results);
        //console.log(results[0].name);

        if (
          !results ||
          results.length === 0 ||
          !(await bcrypt.compare(password, results[0].password))
        ) {
          res.status(401).render("login", {
            message: "Email or Password is incorrect",
          });
        } else {
          const id = results[0].id;

          // a seguir é gerado o token
          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });

          console.log("The token is: " + token);

          // aqui é definido que cookie expira em 5min (a conta abaixo faz convercao de 5min em milissegundos)
          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 60 * 1000
            ),
            httpOnly: true,
          };

          res.cookie("jwt", token, cookieOptions);
          res.status(200).redirect("/");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.signUp = (req, res) => {
  console.log(req.body);

  const { name, email, password, passwordConfirm } = req.body;

  // Validar campos obrigatórios
  if (!name || !email || !password || !passwordConfirm) {
    return res.render("signUp", {
      message: "All fields are mandatory",
    });
  }

  if (!isValidName(name)) {
    return res.render("signUp", {
      message: "Please enter a valid name (only letters)",
    });
  }
  
  if (!isValidEmail(email)) {
    return res.render("signUp", {
      message: "Please enter a valid email (example: fullname@example.com)",
    });
  }
  

  const lowerCaseEmail = email.toLowerCase();

  connectionDataBase.query(
    "SELECT email FROM user WHERE email = ?",
    [lowerCaseEmail],
    async (error, results) => {
      if (error) {
        console.log("Error:".red, colors.red(error));
      }

      if (results.length > 0) {
        return res.render("signUp", {
          message: "That email is already in use",
        });
      } else if (password !== passwordConfirm) {
        return res.render("signUp", {
          message: "Passwords do not match",
        });
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      connectionDataBase.query(
        "INSERT INTO user SET ?",
        { name: name, email: lowerCaseEmail, password: hashedPassword, role: 2},
        (error, results) => {
          if (error) {
            console.log("Error:".red, colors.red(error));
          } else {
            console.log(results);
            res.status(200).redirect("/");
          }
        }
      );
    }
  );
};

exports.isLoggedIn = async (req, res, next) => {
  // console.log(req.cookies);
  if (req.cookies && req.cookies.jwt) {
    try {
      // Somente verifica se não é um cookie 'logout'
      if (req.cookies.jwt !== "logout") {
        //1) verify the token
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET
        );

        //console.log("É INFO DO DECODED:" + " " + decoded);

        //2) Check if the user still exists
        connectionDataBase.query(
          "SELECT * FROM user WHERE id = ?",
          [decoded.id],
          (error, result) => {
            //console.log("Result from the database query:");
            //console.log(result);

            userBundle = JSON.stringify(result, null, 2);

            //console.log(userBundle);

            if (!Array.isArray(result) || result.length === 0) {
              console.log("User not found in the database");
              return next();
            }

            req.user = result[0];
            //console.log("user is");
            //console.log(req.user);
            return next();
          }
        );
      } else {
        // Se for um cookie 'logout', segue para a próxima etapa
        return next();
      }
    } catch (error) {
      console.log("Error verifying the token:");
      console.log(error);
      return next();
    }
  } else {
    console.log("No cookies or jwt found");
    next();
  }
};

exports.logout = async (req, res) => {
  res.cookie("jwt", "logout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });

  userBundle = null;

  res.status(200).redirect("/");
};

exports.checkData = (req, res) => {
  console.log(userBundle);

  res.status(200).redirect("/");
};