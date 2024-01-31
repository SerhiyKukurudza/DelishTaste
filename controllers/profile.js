const { colors, isValidName, isValidEmail, getUserBundle } = require("./miscellaneous");
const connectionDataBase = require("./mysql");

const bcrypt = require("bcryptjs");

colors.enable();

exports.updatePersonalDetails = (req, res) => {
  console.log(req.body);

  const { name, email } = req.body;

  // Validar campos obrigatórios
  if (!name || !email) {
    return res.render("profile", {
      showProfileFragment: false,
      personalDetailsFragment: true,
      changePasswordFragment: false,
      message: "All fields are mandatory",
    });
  }

  if (!isValidName(name)) {
    return res.render("profile", {
      showProfileFragment: false,
      personalDetailsFragment: true,
      changePasswordFragment: false,
      message: "Please enter a valid name (only letters)",
    });
  }

  if (!isValidEmail(email)) {
    return res.render("profile", {
      showProfileFragment: false,
      personalDetailsFragment: true,
      changePasswordFragment: false,
      message: "Please enter a valid email (example: fullname@example.com)",
    });
  }

  const lowerCaseEmail = email.toLowerCase();

  connectionDataBase.query(
    "SELECT email FROM user WHERE email = ?;",
    [lowerCaseEmail],
    async (error, result) => {
      if (error) {
        console.log("Error:".red, colors.red(error));
      }

      const userBundle = JSON.parse(getUserBundle());
      const userId = userBundle[0].id;

      if (result.length > 0) {
        console.log("Email existe");
        return res.render("profile", {
          showProfileFragment: false,
          personalDetailsFragment: true,
          changePasswordFragment: false,
          message: "That email is already in use"
        });
      }

      connectionDataBase.query(
        "UPDATE user SET name = ?, email = ? WHERE id = ?;",
        [name, lowerCaseEmail, userId],
        (error, result) => {
          if (error) {
            console.log("Error:".red, colors.red(error));
          } else {
            console.log("User atualizado");

            return res.redirect("/profile")
          }
        }
      );
    }
  );
};

exports.updatePassword = async (req, res) => {
    console.log(req.body);

    const { currentPassword, password, passwordConfirm } = req.body;
 
    // Validar campos obrigatórios
    if (!currentPassword || !password || !passwordConfirm) {
      return res.render("profile", {
        showProfileFragment: false,
        personalDetailsFragment: false,
        changePasswordFragment: true,
        message: "All fields are mandatory",
      });
    }

    const userBundle = JSON.parse(getUserBundle());
    const userPassword = userBundle[0].password;

    try {
        const passwordMatch = await bcrypt.compare(currentPassword, userPassword);
  
        if (passwordMatch) {
          console.log("Passwords iguais");
          // Faça o que precisa fazer quando as senhas são iguais
        } else {
            return res.render("profile", {
                showProfileFragment: false,
                personalDetailsFragment: false,
                changePasswordFragment: true,
                message: "Old password dont match",
              });
        }
      } catch (error) {
        console.error("Erro ao comparar as senhas:", error);
      }
     /*
  
    connectionDataBase.query(
      "SELECT email FROM user WHERE email = ?;",
      [lowerCaseEmail],
      async (error, result) => {
        if (error) {
          console.log("Error:".red, colors.red(error));
        }
  
        const userBundle = JSON.parse(getUserBundle());
        const userId = userBundle[0].id;
  
        if (result.length > 0) {
          console.log("Email existe");
          return res.render("profile", {
            showProfileFragment: false,
            personalDetailsFragment: true,
            changePasswordFragment: false,
            message: "That email is already in use"
          });
        }
  
        connectionDataBase.query(
          "UPDATE user SET name = ?, email = ? WHERE id = ?;",
          [name, lowerCaseEmail, userId],
          (error, result) => {
            if (error) {
              console.log("Error:".red, colors.red(error));
            } else {
              console.log("User atualizado");
  
              return res.redirect("/profile")
            }
          }
        );
      }
    );
    */
  };