const {
  colors,
  isValidName,
  isValidEmail,
  getUserBundle,
} = require("./miscellaneous");
const connectionDataBase = require("./mysql");

const bcrypt = require("bcryptjs");

colors.enable();

exports.updatePersonalDetails = (req, res) => {
  console.log(req.body);

  const { name, email } = req.body;

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
          message: "That email is already in use",
        });
      }

      connectionDataBase.query(
        "UPDATE user SET name = ?, email = ? WHERE id = ?;",
        [name, lowerCaseEmail, userId],
        (error, result) => {
          if (error) {
            console.log("Error:".red, colors.red(error));
          } else {
            console.log("Personal Details Updated");

            return res.redirect("/profile");
          }
        }
      );
    }
  );
};

exports.updatePassword = async (req, res) => {
  console.log(req.body);

  const { currentPassword, password, passwordConfirm } = req.body;

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
  const userId = userBundle[0].id;

  try {
    const passwordMatch = await bcrypt.compare(currentPassword, userPassword);

    if (passwordMatch) {
      console.log("Passwords iguais");
      // Faça o que precisa fazer quando as senhas são iguais

      if (password === passwordConfirm) {
        let hashedPassword = await bcrypt.hash(password, 8);

        connectionDataBase.query(
          "UPDATE user SET password = ? WHERE id = ?;",
          [hashedPassword, userId],
          (error, result) => {
            if (error) {
              console.log("Error:".red, colors.red(error));
            } else {
              console.log("Password Updated");

              return res.redirect("/profile");
            }
          }
        );
      } else {
        return res.render("profile", {
          showProfileFragment: false,
          personalDetailsFragment: false,
          changePasswordFragment: true,
          message: "New Passwords Don't Match",
        });
      }
    } else {
      return res.render("profile", {
        showProfileFragment: false,
        personalDetailsFragment: false,
        changePasswordFragment: true,
        message: "Old password don't match",
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
